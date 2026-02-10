// src/components/shared/ChatModal.js
// Shared chat component for User <-> Driver communication

'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { X, Send, MessageCircle, User } from 'lucide-react';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ChatModal({ isOpen, onClose, transactionId, currentUserId, currentUserName, otherUserName, isDriver = false }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Fetch messages
    const fetchMessages = async () => {
        if (!transactionId) return;

        const { data } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('transaction_id', transactionId)
            .order('created_at', { ascending: true });

        setMessages(data || []);
    };

    // Subscribe to realtime messages
    useEffect(() => {
        if (!isOpen || !transactionId) return;

        fetchMessages();

        const channel = supabase
            .channel(`chat-${transactionId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'chat_messages',
                filter: `transaction_id=eq.${transactionId}`
            }, (payload) => {
                setMessages(prev => [...prev, payload.new]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isOpen, transactionId]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Send message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || loading) return;

        setLoading(true);
        try {
            await supabase.from('chat_messages').insert({
                transaction_id: transactionId,
                sender_id: currentUserId,
                sender_name: currentUserName,
                message: newMessage.trim(),
                is_driver: isDriver
            });
            setNewMessage('');
        } catch (err) {
            console.error('Send message error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white rounded-2xl w-full max-w-md h-[550px] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 p-4 flex items-center justify-between text-white shadow-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-inner">
                            {isDriver ? <User size={20} /> : <MessageCircle size={20} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight drop-shadow-sm">{otherUserName}</h3>
                            <div className="flex items-center gap-1.5 opacity-90">
                                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(134,239,172,0.8)]"></span>
                                <p className="text-xs font-medium">Online • Order #{transactionId?.slice(0, 6)}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <MessageCircle size={32} />
                            </div>
                            <p className="font-medium">Belum ada pesan</p>
                            <p className="text-xs">Sapa driver Anda sekarang!</p>
                        </div>
                    ) : (
                        messages.map((msg, i) => {
                            const isMe = msg.sender_id === currentUserId;
                            const showTime = true; // Bisa di-optimize untuk grouping

                            return (
                                <div
                                    key={msg.id || i}
                                    className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-300`}
                                >
                                    <div className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`px-4 py-2.5 shadow-sm relative text-sm leading-relaxed break-words ${isMe
                                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl rounded-tr-sm'
                                                    : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm'
                                                }`}
                                        >
                                            {!isMe && (
                                                <p className="text-[10px] font-bold text-green-600 mb-0.5 opacity-80 uppercase tracking-wide">
                                                    {msg.sender_name}
                                                </p>
                                            )}
                                            {msg.message}
                                        </div>
                                        {showTime && (
                                            <span className={`text-[10px] text-gray-400 mt-1 px-1 font-medium select-none transform transition-opacity duration-200 ${isMe ? 'text-right' : 'text-left'}`}>
                                                {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                {isMe && <span className="ml-1 text-green-500">✓</span>}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                    <div className="flex gap-2 items-end bg-gray-50 p-1.5 rounded-3xl border border-gray-200 focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all duration-300">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Tulis pesan..."
                            className="flex-1 px-4 py-2.5 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm max-h-32"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !newMessage.trim()}
                            className={`p-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${loading || !newMessage.trim()
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed scale-90'
                                    : 'bg-green-600 text-white shadow-md shadow-green-200 hover:bg-green-700 hover:scale-105 active:scale-95'
                                }`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Send size={18} className={newMessage.trim() ? 'ml-0.5' : ''} />
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
