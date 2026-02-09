// src/components/shared/ChatModal.js
// Shared chat component for User <-> Driver communication

"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Send, MessageCircle, User } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function ChatModal({
  isOpen,
  onClose,
  transactionId,
  currentUserId,
  currentUserName,
  otherUserName,
  isDriver = false,
}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch messages
  const fetchMessages = async () => {
    if (!transactionId) return;

    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("transaction_id", transactionId)
      .order("created_at", { ascending: true });

    setMessages(data || []);
  };

  // Subscribe to realtime messages
  useEffect(() => {
    if (!isOpen || !transactionId) return;

    fetchMessages();

    const channel = supabase
      .channel(`chat-${transactionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `transaction_id=eq.${transactionId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen, transactionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    setLoading(true);
    try {
      await supabase.from("chat_messages").insert({
        transaction_id: transactionId,
        sender_id: currentUserId,
        sender_name: currentUserName,
        message: newMessage.trim(),
        is_driver: isDriver,
      });
      setNewMessage("");
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-[500px] flex flex-col shadow-2xl animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-2xl flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-bold">Chat dengan {otherUserName}</h3>
              <p className="text-xs opacity-80">
                Order #{transactionId?.slice(0, 8)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <MessageCircle size={40} className="mx-auto mb-2 opacity-30" />
              <p>Belum ada pesan</p>
              <p className="text-xs">Mulai percakapan sekarang</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={msg.id || i}
                className={`flex ${msg.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.sender_id === currentUserId
                      ? "bg-green-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                  }`}
                >
                  <p
                    className={`text-xs font-bold mb-0.5 ${
                      msg.sender_id === currentUserId
                        ? "text-green-100"
                        : "text-gray-500"
                    }`}
                  >
                    {msg.sender_name}
                  </p>
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.sender_id === currentUserId
                        ? "text-green-200"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-gray-200 bg-white rounded-b-2xl"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 ring-green-500 outline-none text-gray-800"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newMessage.trim()}
              className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
