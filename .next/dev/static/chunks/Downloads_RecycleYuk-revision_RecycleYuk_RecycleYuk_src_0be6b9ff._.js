(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/utils/enhancedHelpers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateDistance",
    ()=>calculateDistance,
    "calculateDriverEarnings",
    ()=>calculateDriverEarnings,
    "calculateEnhancedStats",
    ()=>calculateEnhancedStats,
    "calculateRewardPoints",
    ()=>calculateRewardPoints,
    "default",
    ()=>__TURBOPACK__default__export__,
    "estimateETA",
    ()=>estimateETA,
    "exportToExcel",
    ()=>exportToExcel,
    "filterByDateRange",
    ()=>filterByDateRange,
    "formatRupiah",
    ()=>formatRupiah,
    "generateChartColors",
    ()=>generateChartColors,
    "getRewardBadge",
    ()=>getRewardBadge,
    "getStatusColor",
    ()=>getStatusColor,
    "groupByPeriod",
    ()=>groupByPeriod,
    "sendNotification",
    ()=>sendNotification,
    "uploadAvatar",
    ()=>uploadAvatar,
    "validateNIK",
    ()=>validateNIK,
    "validatePhone",
    ()=>validatePhone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Helper functions untuk enhance existing features di RecycleYuk
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://bvigrmajwdfpavxmxefl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aWdybWFqd2RmcGF2eG14ZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTE2MzAsImV4cCI6MjA4MzIyNzYzMH0.Qii8jaaMgtH5Sq-C7YfpQ26AmGnMmh3aEbsTX8Ciyg0"));
const calculateRewardPoints = (totalWeight)=>{
    const basePoints = Math.floor(totalWeight * 10); // 10 poin per kg
    // Bonus untuk milestone
    let bonus = 0;
    if (totalWeight >= 100) bonus += 500; // Bonus 500 poin untuk 100kg+
    if (totalWeight >= 50) bonus += 200; // Bonus 200 poin untuk 50kg+
    if (totalWeight >= 20) bonus += 50; // Bonus 50 poin untuk 20kg+
    return basePoints + bonus;
};
const getRewardBadge = (points)=>{
    if (points >= 5000) return {
        level: 'Diamond',
        color: 'bg-purple-500',
        icon: '💎'
    };
    if (points >= 2000) return {
        level: 'Gold',
        color: 'bg-yellow-500',
        icon: '🥇'
    };
    if (points >= 1000) return {
        level: 'Silver',
        color: 'bg-gray-400',
        icon: '🥈'
    };
    if (points >= 500) return {
        level: 'Bronze',
        color: 'bg-orange-600',
        icon: '🥉'
    };
    return {
        level: 'Starter',
        color: 'bg-green-500',
        icon: '🌱'
    };
};
const formatRupiah = (amount)=>{
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};
const calculateDriverEarnings = (transactions)=>{
    const completedTransactions = transactions.filter((t)=>t.status === 'done');
    const earnings = {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        total: 0,
        transactionCount: completedTransactions.length
    };
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    completedTransactions.forEach((t)=>{
        const transactionDate = new Date(t.created_at);
        const earning = (t.total_price || 0) * 0.15; // Driver gets 15% of each transaction
        earnings.total += earning;
        if (transactionDate >= todayStart) {
            earnings.today += earning;
        }
        if (transactionDate >= weekStart) {
            earnings.thisWeek += earning;
        }
        if (transactionDate >= monthStart) {
            earnings.thisMonth += earning;
        }
    });
    return earnings;
};
const calculateEnhancedStats = (transactions, userRole)=>{
    const stats = {
        total: transactions.length,
        pending: transactions.filter((t)=>t.status === 'Pending').length,
        inProgress: transactions.filter((t)=>t.status === 'In Progress').length,
        completed: transactions.filter((t)=>t.status === 'done').length,
        totalWeight: transactions.reduce((sum, t)=>sum + (Number(t.weight) || 0), 0),
        totalRevenue: transactions.reduce((sum, t)=>sum + (t.total_price || 0), 0)
    };
    // Calculate trend (last 7 days vs previous 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const recentTransactions = transactions.filter((t)=>new Date(t.created_at) >= sevenDaysAgo);
    const previousTransactions = transactions.filter((t)=>{
        const date = new Date(t.created_at);
        return date >= fourteenDaysAgo && date < sevenDaysAgo;
    });
    stats.trend = {
        transactions: recentTransactions.length - previousTransactions.length,
        weight: recentTransactions.reduce((sum, t)=>sum + (Number(t.weight) || 0), 0) - previousTransactions.reduce((sum, t)=>sum + (Number(t.weight) || 0), 0)
    };
    return stats;
};
const exportToExcel = async (data, filename)=>{
    try {
        // Convert data to CSV format
        const headers = Object.keys(data[0] || {});
        const csvContent = [
            headers.join(','),
            ...data.map((row)=>headers.map((header)=>`"${row[header] || ''}"`).join(','))
        ].join('\n');
        // Create blob and download
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
    } catch (error) {
        console.error('Export error:', error);
        return false;
    }
};
const sendNotification = async (userId, title, message, type = 'info')=>{
    try {
        const { error } = await supabase.from('notifications').insert({
            profile_id: userId,
            title,
            message,
            type,
            is_read: false
        });
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Notification error:', error);
        return false;
    }
};
const validateNIK = (nik)=>{
    return /^\d{16}$/.test(nik);
};
const validatePhone = (phone)=>{
    return /^(\+62|62|0)[0-9]{9,12}$/.test(phone);
};
const getStatusColor = (status)=>{
    const statusLower = (status || '').toLowerCase();
    const colorMap = {
        'done': 'bg-green-100 text-green-700 border-green-300',
        'selesai': 'bg-green-100 text-green-700 border-green-300',
        'resolved': 'bg-green-100 text-green-700 border-green-300',
        'in progress': 'bg-blue-100 text-blue-700 border-blue-300',
        'proses': 'bg-blue-100 text-blue-700 border-blue-300',
        'pending': 'bg-yellow-100 text-yellow-700 border-yellow-300',
        'menunggu': 'bg-yellow-100 text-yellow-700 border-yellow-300',
        'canceled': 'bg-red-100 text-red-700 border-red-300',
        'dibatalkan': 'bg-red-100 text-red-700 border-red-300'
    };
    return colorMap[statusLower] || 'bg-gray-100 text-gray-700 border-gray-300';
};
const calculateDistance = (lat1, lon1, lat2, lon2)=>{
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
};
const estimateETA = (distanceInKm)=>{
    const avgSpeed = 30; // km/h average speed in city
    const timeInHours = distanceInKm / avgSpeed;
    const timeInMinutes = Math.ceil(timeInHours * 60);
    if (timeInMinutes < 60) {
        return `${timeInMinutes} Menit`;
    } else {
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = timeInMinutes % 60;
        return `${hours} Jam ${minutes} Menit`;
    }
};
const generateChartColors = (count)=>{
    const colors = [
        '#10b981',
        '#3b82f6',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#ec4899',
        '#14b8a6',
        '#f97316',
        '#6366f1',
        '#84cc16'
    ];
    return Array.from({
        length: count
    }, (_, i)=>colors[i % colors.length]);
};
const filterByDateRange = (transactions, startDate, endDate)=>{
    if (!startDate || !endDate) return transactions;
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include entire end day
    return transactions.filter((t)=>{
        const transactionDate = new Date(t.created_at);
        return transactionDate >= start && transactionDate <= end;
    });
};
const groupByPeriod = (transactions, period = 'day')=>{
    const groups = {};
    transactions.forEach((t)=>{
        const date = new Date(t.created_at);
        let key;
        switch(period){
            case 'hour':
                key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;
                break;
            case 'day':
                key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                break;
            case 'week':
                const weekNum = Math.ceil(date.getDate() / 7);
                key = `${date.getFullYear()}-${date.getMonth() + 1} Week ${weekNum}`;
                break;
            case 'month':
                key = `${date.getFullYear()}-${date.getMonth() + 1}`;
                break;
            case 'year':
                key = `${date.getFullYear()}`;
                break;
            default:
                key = date.toISOString().split('T')[0];
        }
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(t);
    });
    return groups;
};
const uploadAvatar = async (file, userId)=>{
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
        if (uploadError) {
            throw uploadError;
        }
        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
        return publicUrl;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};
const __TURBOPACK__default__export__ = {
    uploadAvatar,
    calculateRewardPoints,
    getRewardBadge,
    formatRupiah,
    calculateDriverEarnings,
    calculateEnhancedStats,
    exportToExcel,
    sendNotification,
    validateNIK,
    validatePhone,
    getStatusColor,
    calculateDistance,
    estimateETA,
    generateChartColors,
    filterByDateRange,
    groupByPeriod,
    uploadAvatar
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
;
var _s = __turbopack_context__.k.signature();
// src/components/shared/ChatModal.js
// Shared chat component for User <-> Driver communication
'use client';
;
;
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://bvigrmajwdfpavxmxefl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aWdybWFqd2RmcGF2eG14ZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTE2MzAsImV4cCI6MjA4MzIyNzYzMH0.Qii8jaaMgtH5Sq-C7YfpQ26AmGnMmh3aEbsTX8Ciyg0"));
function ChatModal({ isOpen, onClose, transactionId, currentUserId, currentUserName, otherUserName, isDriver = false }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Fetch messages
    const fetchMessages = async ()=>{
        if (!transactionId) return;
        const { data } = await supabase.from('chat_messages').select('*').eq('transaction_id', transactionId).order('created_at', {
            ascending: true
        });
        setMessages(data || []);
    };
    // Subscribe to realtime messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatModal.useEffect": ()=>{
            if (!isOpen || !transactionId) return;
            fetchMessages();
            const channel = supabase.channel(`chat-${transactionId}`).on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'chat_messages',
                filter: `transaction_id=eq.${transactionId}`
            }, {
                "ChatModal.useEffect.channel": (payload)=>{
                    setMessages({
                        "ChatModal.useEffect.channel": (prev)=>[
                                ...prev,
                                payload.new
                            ]
                    }["ChatModal.useEffect.channel"]);
                }
            }["ChatModal.useEffect.channel"]).subscribe();
            return ({
                "ChatModal.useEffect": ()=>{
                    supabase.removeChannel(channel);
                }
            })["ChatModal.useEffect"];
        }
    }["ChatModal.useEffect"], [
        isOpen,
        transactionId
    ]);
    // Auto-scroll to bottom
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatModal.useEffect": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatModal.useEffect"], [
        messages
    ]);
    // Send message
    const handleSend = async (e)=>{
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
        } finally{
            setLoading(false);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl w-full max-w-md h-[500px] flex flex-col shadow-2xl animate-in zoom-in-95",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-2xl flex items-center justify-between text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                        lineNumber: 86,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                    lineNumber: 85,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold",
                                            children: [
                                                "Chat dengan ",
                                                otherUserName
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                            lineNumber: 89,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs opacity-80",
                                            children: [
                                                "Order #",
                                                transactionId?.slice(0, 8)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                            lineNumber: 90,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                    lineNumber: 88,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 hover:bg-white/20 rounded-full transition",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                    lineNumber: 83,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50",
                    children: [
                        messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-gray-400 py-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    size: 40,
                                    className: "mx-auto mb-2 opacity-30"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                    lineNumber: 101,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Belum ada pesan"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                    lineNumber: 102,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs",
                                    children: "Mulai percakapan sekarang"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                    lineNumber: 103,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                            lineNumber: 100,
                            columnNumber: 46
                        }, this) : messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `max-w-[75%] rounded-2xl px-4 py-2 ${msg.sender_id === currentUserId ? 'bg-green-600 text-white rounded-br-md' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-xs font-bold mb-0.5 ${msg.sender_id === currentUserId ? 'text-green-100' : 'text-gray-500'}`,
                                            children: msg.sender_name
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                            lineNumber: 106,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: msg.message
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                            lineNumber: 109,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: `text-[10px] mt-1 ${msg.sender_id === currentUserId ? 'text-green-200' : 'text-gray-400'}`,
                                            children: new Date(msg.created_at).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                            lineNumber: 110,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                    lineNumber: 105,
                                    columnNumber: 33
                                }, this)
                            }, msg.id || i, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                lineNumber: 104,
                                columnNumber: 59
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: messagesEndRef
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                            lineNumber: 118,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                    lineNumber: 99,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSend,
                    className: "p-4 border-t border-gray-200 bg-white rounded-b-2xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: newMessage,
                                onChange: (e_0)=>setNewMessage(e_0.target.value),
                                placeholder: "Ketik pesan...",
                                className: "flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 ring-green-500 outline-none text-gray-800",
                                disabled: loading
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                lineNumber: 124,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading || !newMessage.trim(),
                                className: "bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                    lineNumber: 126,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                                lineNumber: 125,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                        lineNumber: 123,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
                    lineNumber: 122,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
            lineNumber: 81,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js",
        lineNumber: 80,
        columnNumber: 10
    }, this);
}
_s(ChatModal, "QrINKm3h5iDz29VCX52yZH28Vis=");
_c = ChatModal;
var _c;
__turbopack_context__.k.register(_c, "ChatModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DriverDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-client] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/sweetalert2/dist/sweetalert2.all.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/utils/enhancedHelpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$components$2f$shared$2f$ChatModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/components/shared/ChatModal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/Map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$View$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/View.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$layer$2f$Tile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/layer/Tile.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$OSM$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/OSM.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$layer$2f$Vector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/layer/Vector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Vector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/source/Vector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/Feature.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$Point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/geom/Point.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$LineString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/geom/LineString.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/proj.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Icon$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/style/Icon.js [app-client] (ecmascript) <export default as Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Style$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/style/Style.js [app-client] (ecmascript) <export default as Style>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Stroke$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stroke$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/style/Stroke.js [app-client] (ecmascript) <export default as Stroke>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/style/Circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Fill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Fill$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/ol/style/Fill.js [app-client] (ecmascript) <export default as Fill>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// --- INISIALISASI SUPABASE ---
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://bvigrmajwdfpavxmxefl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aWdybWFqd2RmcGF2eG14ZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTE2MzAsImV4cCI6MjA4MzIyNzYzMH0.Qii8jaaMgtH5Sq-C7YfpQ26AmGnMmh3aEbsTX8Ciyg0"));
// Koordinat Default (Bandung) [Lon, Lat]
const CENTER_COORDS = [
    107.6191,
    -6.9175
];
function DriverDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // --- 1. STATE MANAGEMENT ---
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // GPS & Maps State
    const [myLocation, setMyLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(CENTER_COORDS);
    const [isGpsActive, setIsGpsActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // UI States
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activePage, setActivePage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    // Data States
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tasks, setTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [driverProfile, setDriverProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [totalIncome, setTotalIncome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [taskFilter, setTaskFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pending'); // 'pending' or 'process'
    const [isChatOpen, setIsChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedChatTask, setSelectedChatTask] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // OpenLayers Refs
    const mapElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vectorSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Vector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]());
    const SIDEBAR_MENUS = [
        {
            id: 'dashboard',
            label: 'Ringkasan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        {
            id: 'tasks',
            label: 'Tugas Jemput',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
        },
        {
            id: 'map',
            label: 'Peta Lokasi',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        },
        {
            id: 'history',
            label: 'Riwayat',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
        },
        {
            id: 'earnings',
            label: 'Pendapatan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
        }
    ];
    // --- 2. CORE LOGIC ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverDashboard.useEffect": ()=>{
            setMounted(true);
            const timer = setInterval({
                "DriverDashboard.useEffect.timer": ()=>{
                    setCurrentTime(new Date().toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }));
                }
            }["DriverDashboard.useEffect.timer"], 1000);
            fetchData();
            startGpsTracking();
            const channel = supabase.channel('driver-dashboard').on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'transactions'
            }, {
                "DriverDashboard.useEffect.channel": (payload)=>{
                    // Play notification sound for new orders
                    try {
                        const audio = new Audio('/sounds/notification.mp3');
                        audio.volume = 0.5;
                        audio.play().catch({
                            "DriverDashboard.useEffect.channel": ()=>{}
                        }["DriverDashboard.useEffect.channel"]);
                    } catch (e) {}
                    // Show toast notification
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                        title: '🚛 Order Baru!',
                        text: 'Ada permintaan pickup baru menunggu Anda.',
                        icon: 'info',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        background: '#ecfdf5',
                        color: '#065f46'
                    });
                    fetchData();
                }
            }["DriverDashboard.useEffect.channel"]).on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'transactions'
            }, {
                "DriverDashboard.useEffect.channel": ()=>{
                    fetchData();
                }
            }["DriverDashboard.useEffect.channel"]).subscribe();
            const handleResize = {
                "DriverDashboard.useEffect.handleResize": ()=>{
                    if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
                }
            }["DriverDashboard.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "DriverDashboard.useEffect": ()=>{
                    clearInterval(timer);
                    window.removeEventListener('resize', handleResize);
                    supabase.removeChannel(channel);
                }
            })["DriverDashboard.useEffect"];
        }
    }["DriverDashboard.useEffect"], []);
    // --- 3. GPS LOGIC (WATCH POSITION) ---
    const [myHeading, setMyHeading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const startGpsTracking = ()=>{
        if (!navigator.geolocation) return;
        // Menggunakan watchPosition agar lokasi terus terupdate realtime
        navigator.geolocation.watchPosition(async (position)=>{
            const { latitude, longitude, heading } = position.coords;
            // OpenLayers menggunakan [Lon, Lat]
            const newLoc = [
                longitude,
                latitude
            ];
            setMyLocation(newLoc);
            if (heading !== null && !isNaN(heading)) {
                setMyHeading(heading * (Math.PI / 180)); // Convert to radians
            }
            setIsGpsActive(true);
            // --- REALTIME UPDATE TO DB ---
            // Broadcast lokasi driver ke tabel 'drivers'
            if (driverProfile?.id) {
                try {
                    await supabase.from('drivers').update({
                        current_latitude: latitude,
                        current_longitude: longitude,
                        last_location_update: new Date()
                    }).eq('id', driverProfile.id);
                } catch (err) {
                    console.error("Gagal update lokasi driver:", err);
                }
            }
        }, (err_0)=>{
            console.warn("GPS Error:", err_0.message);
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        });
    };
    const centerToMyLocation = ()=>{
        if (mapRef.current && isGpsActive) {
            mapRef.current.getView().animate({
                center: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(myLocation),
                zoom: 17,
                duration: 1000
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('GPS Mencari...', 'Pastikan izin lokasi aktif dan tunggu sinyal.', 'info');
        }
    };
    // --- 4. MAP INITIALIZATION ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverDashboard.useEffect": ()=>{
            if (activePage === 'map' && mapElement.current && !mapRef.current) {
                const vectorLayer = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$layer$2f$Vector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                    source: vectorSourceRef.current,
                    zIndex: 100
                });
                const initialMap = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                    target: mapElement.current,
                    layers: [
                        new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$layer$2f$Tile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                            source: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$OSM$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]()
                        }),
                        vectorLayer
                    ],
                    view: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$View$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                        center: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(CENTER_COORDS),
                        zoom: 13
                    }),
                    controls: []
                });
                mapRef.current = initialMap;
                updateMapMarkers();
            }
            return ({
                "DriverDashboard.useEffect": ()=>{
                    if (activePage !== 'map' && mapRef.current) {
                        mapRef.current.setTarget(null);
                        mapRef.current = null;
                    }
                }
            })["DriverDashboard.useEffect"];
        }
    }["DriverDashboard.useEffect"], [
        activePage,
        mounted
    ]);
    // --- 5. UPDATE MAP MARKERS ---
    const updateMapMarkers = ()=>{
        if (!mapRef.current) return;
        vectorSourceRef.current.clear();
        // A. Marker Saya (Driver)
        if (isGpsActive) {
            // Marker Titik Biru (Akurasi)
            const accuracyFeature = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                geometry: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$Point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(myLocation))
            });
            accuracyFeature.setStyle(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Style$3e$__["Style"]({
                image: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"]({
                    radius: 8,
                    fill: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Fill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Fill$3e$__["Fill"]({
                        color: '#3b82f6'
                    }),
                    stroke: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Stroke$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stroke$3e$__["Stroke"]({
                        color: '#fff',
                        width: 2
                    })
                })
            }));
            vectorSourceRef.current.addFeature(accuracyFeature);
            // Marker Truk
            const driverFeature = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                geometry: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$Point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(myLocation))
            });
            driverFeature.setStyle(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Style$3e$__["Style"]({
                image: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Icon$3e$__["Icon"]({
                    src: 'https://cdn-icons-png.flaticon.com/512/3096/3096673.png',
                    scale: 0.08,
                    anchor: [
                        0.5,
                        1
                    ]
                })
            }));
            vectorSourceRef.current.addFeature(driverFeature);
        }
        // B. Rute (Garis Hijau)
        // Note: Icon Sampah sudah DIHAPUS sesuai permintaan
        tasks.filter((t)=>t.status === 'Pending' || t.status === 'Process' && t.driver_id === currentUser?.id).forEach((t_0)=>{
            if (t_0.lng && t_0.lat) {
                const taskLoc = [
                    t_0.lng,
                    t_0.lat
                ];
                // HAPUS ICON SAMPAH (Tidak ada kode Feature Point untuk Task)
                // Garis Rute (Hanya muncul jika sedang proses jemput & GPS aktif)
                if (t_0.status === 'Process' && isGpsActive) {
                    const routeFeature = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                        geometry: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$LineString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(myLocation),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(taskLoc)
                        ])
                    });
                    routeFeature.setStyle(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Style$3e$__["Style"]({
                        stroke: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Stroke$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stroke$3e$__["Stroke"]({
                            color: '#10B981',
                            width: 4,
                            lineDash: [
                                10,
                                10
                            ]
                        })
                    }));
                    vectorSourceRef.current.addFeature(routeFeature);
                }
            }
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverDashboard.useEffect": ()=>{
            updateMapMarkers();
        }
    }["DriverDashboard.useEffect"], [
        tasks,
        myLocation,
        isGpsActive,
        currentUser,
        activePage
    ]);
    // --- 4. DATA FETCHING ---
    const fetchData = async ()=>{
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setCurrentUser({
                ...user,
                ...profile
            });
            const { data: dProfile } = await supabase.from('drivers').select('*').eq('id', user.id).single();
            if (dProfile) setDriverProfile(dProfile);
            // 1. Ambil Wilayah Kerja Driver (Assigned Areas)
            const { data: myAreas } = await supabase.from('areas').select('*').eq('driver_id', user.id);
            // 2. Ambil Task Aktif (Pending & Process)
            // Fix: Gunakan relasi standar `profiles(...)` bukan alias `profiles:profile_id(...)` yang mungkin error jika tidak didefinisikan
            const { data: activeTasks } = await supabase.from('transactions').select(`*, profiles(full_name, address, rt, rw, phone), waste_types(name, price_per_kg)`).neq('status', 'Done').order('created_at', {
                ascending: true
            });
            // 3. Filter Task Berdasarkan Wilayah Kerja
            // Tampilkan task jika:
            // a. Status 'Process' DAN diambil oleh driver ini (prioritas tertinggi, abaikan wilayah)
            // b. Status 'Pending' DAN lokasi user (RT/RW) cocok dengan salah satu wilayah kerja driver
            const filteredTasks = (activeTasks || []).filter((t_1)=>{
                const isMyProcess = t_1.status === 'Process' && t_1.driver_id === user.id;
                // Jika sedang diproses saya, pasti muncul
                if (isMyProcess) return true;
                // Jika status Pending, cek wilayah
                if (t_1.status === 'Pending') {
                    // Jika driver tidak punya wilayah, tampilkan SEMUA task pending (Mode Global/Demo)
                    if (!myAreas || myAreas.length === 0) return true;
                    const userRT = t_1.profiles?.rt;
                    const userRW = t_1.profiles?.rw;
                    // Cek apakah RT/RW user ada di list wilayah driver
                    return myAreas.some((area)=>area.rw == userRW && (area.rt == userRT || !area.rt) // !area.rt berarti mencakup satu RW full
                    );
                }
                return false;
            });
            // Generate Koordinat untuk Visualisasi Map
            const tasksWithCoords = filteredTasks.map((t_2)=>{
                // PRIORITAS: Gunakan Data Real dari Database
                let finalLat = t_2.latitude;
                let finalLng = t_2.longitude;
                // FALLBACK: Jika Data Lama (latitude/longitude null), generate dummy di sekitar driver
                // agar tidak error di map.
                if (!finalLat || !finalLng) {
                    finalLat = myLocation[1] + (Math.random() * 0.015 - 0.0075);
                    finalLng = myLocation[0] + (Math.random() * 0.015 - 0.0075);
                }
                return {
                    ...t_2,
                    lat: finalLat,
                    lng: finalLng
                };
            });
            setTasks(tasksWithCoords);
            // Hitung Pendapatan
            const { data: historyData } = await supabase.from('transactions').select('*, profiles(full_name, address), waste_types(name)').eq('status', 'Done').eq('driver_id', user.id).order('updated_at', {
                ascending: false
            });
            setHistory(historyData || []);
            const income = (historyData || []).reduce((acc, curr)=>acc + (curr.total_price || 0), 0);
            setTotalIncome(income);
        } catch (err_1) {
            console.error("Error data:", err_1);
        } finally{
            setLoading(false);
        }
    };
    const navigateTo = (pageId)=>{
        setActivePage(pageId);
        setIsMobileMenuOpen(false);
    };
    const handleLogout = async ()=>{
        await supabase.auth.signOut();
        router.push('/login');
    };
    const contactUser = (type, phoneNumber, name)=>{
        if (!phoneNumber) return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Gagal', 'Nomor HP tidak tersedia.', 'error');
        let formatted = phoneNumber.replace(/\D/g, '');
        if (formatted.startsWith('0')) formatted = '62' + formatted.slice(1);
        if (type === 'whatsapp') {
            const msg = `Halo Kak ${name}, saya Driver RecycleYuk sedang menuju lokasi.`;
            window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(msg)}`, '_blank');
        } else {
            window.open(`tel:${phoneNumber}`, '_self');
        }
    };
    const handleTaskAction = async (taskId, action)=>{
        const myActiveTask = tasks.find((t_3)=>t_3.status === 'Process' && t_3.driver_id === currentUser.id);
        // A. Jika Action = Process (Ambil Tugas)
        if (action === 'Process') {
            if (myActiveTask) return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Fokus!', 'Selesaikan tugas aktif dulu.', 'warning');
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                title: 'Ambil Tugas?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya, Jemput!',
                confirmButtonColor: '#10B981'
            });
            if (result.isConfirmed) {
                try {
                    await supabase.from('transactions').update({
                        status: 'Process',
                        driver_id: currentUser.id
                    }).eq('id', taskId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Berhasil!', 'Segera menuju lokasi!', 'success');
                    fetchData();
                } catch (err_2) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Gagal', err_2.message, 'error');
                }
            }
        } else if (action === 'Done') {
            const taskToFinish = tasks.find((t_4)=>t_4.id === taskId);
            const pricePerKg = taskToFinish?.waste_types?.price_per_kg || 0;
            const wasteName = taskToFinish?.waste_types?.name || 'Sampah';
            // Modal Input Berat Akhir
            const { value: finalWeight } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                title: 'Selesaikan Tugas',
                html: `
                    <div style="text-align: left">
                        <p class="mb-2">Jenis: <b>${wasteName}</b></p>
                        <p class="mb-2">Harga: <b>Rp ${pricePerKg.toLocaleString()}/kg</b></p>
                        <label class="block text-sm font-bold mb-1">Berat Aktual (Kg):</label>
                    </div>
                `,
                input: 'number',
                inputAttributes: {
                    min: '0.1',
                    step: '0.1',
                    placeholder: 'Contoh: 5.5'
                },
                inputValue: taskToFinish?.weight || '',
                showCancelButton: true,
                confirmButtonText: 'Hitung & Selesai',
                confirmButtonColor: '#3b82f6',
                preConfirm: (weight)=>{
                    if (!weight || weight <= 0) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showValidationMessage('Masukkan berat yang valid!');
                    }
                    return weight;
                }
            });
            if (finalWeight) {
                const totalPrice = Math.round(parseFloat(finalWeight) * pricePerKg);
                // Konfirmasi Akhir dengan Harga
                const confirmResult = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                    title: 'Konfirmasi Akhir',
                    html: `
                        <div class="text-center">
                            <p>Berat: <b>${finalWeight} Kg</b></p>
                            <p class="text-xl font-bold text-green-600 mt-2">Total: Rp ${totalPrice.toLocaleString()}</p>
                        </div>
                    `,
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Simpan & Selesai'
                });
                if (confirmResult.isConfirmed) {
                    try {
                        await supabase.from('transactions').update({
                            status: 'Done',
                            final_weight: parseFloat(finalWeight),
                            total_price: totalPrice,
                            weight: parseFloat(finalWeight) // Update estimasi weight jadi real weight juga
                        }).eq('id', taskId);
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Tugas Selesai!', `Saldo Rp ${totalPrice.toLocaleString()} dicatat.`, 'success');
                        fetchData();
                    } catch (err_3) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Gagal', err_3.message, 'error');
                    }
                }
            }
        }
    };
    const handleDriverStatusToggle = async ()=>{
        if (!driverProfile) return;
        // --- CEK VERIFIKASI ---
        if (driverProfile.verification_status !== 'verified') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                title: 'Akun Belum Terverifikasi',
                text: 'Harap hubungi Admin untuk verifikasi akun sebelum mulai bekerja.',
                icon: 'warning',
                confirmButtonColor: '#F59E0B'
            });
        }
        const newStatus = driverProfile.status === 'On Duty' ? 'Off Duty' : 'On Duty';
        try {
            await supabase.from('drivers').update({
                status: newStatus
            }).eq('id', driverProfile.id);
            setDriverProfile({
                ...driverProfile,
                status: newStatus
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Status', `Anda sekarang ${newStatus}`, 'success');
        } catch (err_4) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Error', 'Gagal update status', 'error');
        }
    };
    const handleUpdateProfile = async (e_0)=>{
        e_0.preventDefault();
        try {
            await supabase.from('profiles').update({
                full_name: currentUser.full_name,
                address: currentUser.address
            }).eq('id', currentUser.id);
            if (driverProfile) await supabase.from('drivers').update({
                name: currentUser.full_name,
                vehicle: driverProfile.vehicle
            }).eq('id', driverProfile.id);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Profil berhasil disimpan!', 'success');
            fetchData();
        } catch (err_5) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Gagal', err_5.message, 'error');
        }
    };
    const handleAvatarChange = async (e_1)=>{
        const file = e_1.target.files[0];
        if (!file) return;
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                title: 'Mengupload...',
                text: 'Mohon tunggu sebentar',
                allowOutsideClick: false,
                didOpen: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].showLoading()
            });
            const publicUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadAvatar"])(file, currentUser.id);
            if (!publicUrl) throw new Error('Gagal mendapatkan URL gambar.');
            // Update profile in DB
            const { error } = await supabase.from('profiles').update({
                avatar_url: publicUrl
            }).eq('id', currentUser.id);
            if (error) throw error;
            setCurrentUser((prev)=>({
                    ...prev,
                    avatar_url: publicUrl
                }));
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Foto profil berhasil diperbarui!', 'success');
        } catch (err_6) {
            console.error(err_6);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Error', 'Gagal upload foto: ' + err_6.message, 'error');
        }
    };
    // --- RENDERERS ---
    const renderDashboard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in fade-in pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl md:text-3xl font-bold mb-2",
                                    children: [
                                        "Halo, ",
                                        currentUser?.full_name?.split(' ')[0],
                                        "! 🚛"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 580,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "opacity-90",
                                    children: "Siap menjemput rezeki dan menjaga lingkungan hari ini?"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 581,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex flex-wrap items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `w-3 h-3 rounded-full mr-2 ${driverProfile?.status === 'On Duty' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 584,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-sm",
                                                    children: [
                                                        "Status: ",
                                                        driverProfile ? driverProfile.status || 'Off Duty' : loading ? 'Loading...' : 'Tidak Terdaftar'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 585,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 583,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `inline-flex items-center px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm ${driverProfile?.verification_status === 'verified' ? 'bg-green-500/20 text-white' : 'bg-yellow-500/20 text-yellow-100'}`,
                                            children: [
                                                driverProfile?.verification_status === 'verified' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    size: 16,
                                                    className: "mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 590,
                                                    columnNumber: 82
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 16,
                                                    className: "mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 590,
                                                    columnNumber: 128
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-sm uppercase",
                                                    children: driverProfile?.verification_status || 'Pending'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 591,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 589,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleDriverStatusToggle,
                                            disabled: !driverProfile && !loading,
                                            className: `text-xs px-3 py-2 rounded-lg font-bold transition shadow-md ${!driverProfile && !loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-green-700 hover:bg-green-50'}`,
                                            children: loading ? '...' : !driverProfile ? 'Hubungi Admin' : driverProfile.status === 'On Duty' ? 'Matikan' : 'Aktifkan'
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 593,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 582,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 579,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                            className: "absolute right-[-10px] bottom-[-10px] opacity-10 w-32 h-32 md:w-40 md:h-40 transform -rotate-12"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 598,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 578,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-xs font-bold uppercase tracking-wide",
                                            children: "Order Masuk"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 605,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-3xl font-bold text-gray-800 mt-1",
                                            children: tasks.filter((t_5)=>t_5.status === 'Pending').length
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 606,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 604,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-yellow-50 p-3 rounded-xl text-yellow-600 border border-yellow-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 608,
                                        columnNumber: 107
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 608,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 603,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md border-l-4 border-l-green-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-xs font-bold uppercase tracking-wide",
                                            children: "Total Pendapatan"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 613,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold text-green-700 mt-1",
                                            children: [
                                                "Rp ",
                                                totalIncome.toLocaleString('id-ID')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 614,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 612,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-green-50 p-3 rounded-xl text-green-600 border border-green-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 616,
                                        columnNumber: 104
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 616,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 611,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition hover:shadow-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-xs font-bold uppercase tracking-wide",
                                            children: "Tugas Selesai"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 621,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-3xl font-bold text-blue-600 mt-1",
                                            children: history.length
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 622,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 620,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 p-3 rounded-xl text-blue-600 border border-blue-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 624,
                                        columnNumber: 101
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 624,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 619,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 602,
                    columnNumber: 13
                }, this),
                tasks.filter((t_6)=>t_6.status === 'Process' && t_6.driver_id === currentUser?.id).map((task)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-50 animate-in slide-in-from-bottom duration-500 relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 w-2 h-full bg-blue-500"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 630,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-6 border-b border-gray-100 pb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-xl text-gray-800 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                        className: "text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 633,
                                                        columnNumber: 101
                                                    }, this),
                                                    " Sedang Dijemput"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 633,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500 mt-1",
                                                children: [
                                                    "Order ID: #",
                                                    String(task.id).slice(0, 8)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 634,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 632,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm",
                                        children: "PROCESS"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 636,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 631,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-blue-50 p-2 rounded-lg text-blue-600",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                            lineNumber: 642,
                                                            columnNumber: 90
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 642,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 font-bold uppercase",
                                                                children: "Nama Warga"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 644,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-800 font-bold text-lg",
                                                                children: task.profiles?.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 645,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 643,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 641,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-red-50 p-2 rounded-lg text-red-600",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                            lineNumber: 649,
                                                            columnNumber: 88
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 649,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 font-bold uppercase",
                                                                children: "Alamat"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 651,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-800 font-medium leading-relaxed",
                                                                children: task.profiles?.address
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 652,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 650,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 648,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 640,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-orange-50 p-2 rounded-lg text-orange-600",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                            lineNumber: 658,
                                                            columnNumber: 94
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 658,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500 font-bold uppercase",
                                                                children: "Detail Sampah"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 660,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-800 font-medium",
                                                                children: [
                                                                    task.waste_types?.name,
                                                                    " • ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: [
                                                                            task.weight,
                                                                            " Kg"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 661,
                                                                        columnNumber: 105
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 661,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-green-600 font-bold mt-1",
                                                                children: [
                                                                    "Rp ",
                                                                    task.total_price?.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 662,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 659,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 657,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        size: 16,
                                                        className: "mt-0.5 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 666,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "Catatan:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 667,
                                                                columnNumber: 36
                                                            }, this),
                                                            ' "',
                                                            task.notes || 'Tidak ada catatan',
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 667,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 665,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 656,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 639,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>contactUser('whatsapp', task.profiles?.phone, task.profiles?.full_name),
                                        className: "flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 673,
                                                columnNumber: 262
                                            }, this),
                                            " Chat WA"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 673,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>contactUser('call', task.profiles?.phone),
                                        className: "flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 674,
                                                columnNumber: 230
                                            }, this),
                                            " Telepon"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 674,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 672,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 pt-2 border-t border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.profiles?.address)}`,
                                        target: "_blank",
                                        className: "flex justify-center items-center gap-2 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 678,
                                                columnNumber: 322
                                            }, this),
                                            " Buka Maps"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 678,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleTaskAction(task.id, 'Done'),
                                        className: "flex justify-center items-center gap-2 bg-blue-800 text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg shadow-blue-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 679,
                                                columnNumber: 238
                                            }, this),
                                            " Selesai Tugas"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 679,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 677,
                                columnNumber: 21
                            }, this)
                        ]
                    }, task.id, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 629,
                        columnNumber: 109
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
            lineNumber: 576,
            columnNumber: 33
        }, this);
    const renderTasks = ()=>{
        // Filter tasks based on selected tab
        const pendingTasks = tasks.filter((t_7)=>t_7.status === 'Pending' && (t_7.profiles?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()));
        const processTasks = tasks.filter((t_8)=>t_8.status === 'Process' && t_8.driver_id === currentUser?.id);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg text-gray-800 ml-2",
                            children: "Daftar Tugas"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 690,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full md:w-80",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 692,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Cari lokasi atau nama warga...",
                                    className: "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl outline-none focus:ring-2 ring-green-500 transition",
                                    value: searchQuery,
                                    onChange: (e_2)=>setSearchQuery(e_2.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 693,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 691,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 689,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 overflow-x-auto pb-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setTaskFilter('pending'),
                            className: `flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${taskFilter === 'pending' ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 700,
                                    columnNumber: 25
                                }, this),
                                "Pending",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `ml-1 px-2 py-0.5 rounded-full text-xs ${taskFilter === 'pending' ? 'bg-yellow-600' : 'bg-gray-200 text-gray-600'}`,
                                    children: pendingTasks.length
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 702,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 699,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setTaskFilter('process'),
                            className: `flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition whitespace-nowrap ${taskFilter === 'process' ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 707,
                                    columnNumber: 25
                                }, this),
                                "Proses",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `ml-1 px-2 py-0.5 rounded-full text-xs ${taskFilter === 'process' ? 'bg-blue-600' : 'bg-gray-200 text-gray-600'}`,
                                    children: processTasks.length
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 709,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 706,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 698,
                    columnNumber: 17
                }, this),
                taskFilter === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                        pendingTasks.map((task_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition duration-300 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-bold text-gray-800 text-lg group-hover:text-green-600 transition",
                                                        children: task_0.profiles?.full_name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 720,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-400 mt-1 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded w-fit",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 721,
                                                                columnNumber: 142
                                                            }, this),
                                                            " ",
                                                            new Date(task_0.created_at).toLocaleString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 721,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 719,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 shadow-sm",
                                                children: "PENDING"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 723,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 718,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-600 space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 18,
                                                        className: "text-red-500 flex-shrink-0 mt-0.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 728,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "line-clamp-2 font-medium",
                                                        children: task_0.profiles?.address
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 729,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 727,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                        size: 18,
                                                        className: "text-blue-500 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 732,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            task_0.waste_types?.name,
                                                            " • ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-gray-800",
                                                                children: [
                                                                    task_0.weight,
                                                                    " Kg"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 733,
                                                                columnNumber: 76
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 733,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 731,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3 items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        size: 18,
                                                        className: "text-orange-500 flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 736,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Jadwal: ",
                                                            task_0.pickup_time
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 737,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 735,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 726,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleTaskAction(task_0.id, 'Process'),
                                        className: "w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-md shadow-green-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                size: 20
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 742,
                                                columnNumber: 37
                                            }, this),
                                            " Ambil Tugas Ini"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 741,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, task_0.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 717,
                                columnNumber: 53
                            }, this)),
                        pendingTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-full py-16 text-center text-gray-400 bg-white border-2 border-dashed border-gray-200 rounded-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        size: 40,
                                        className: "text-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 748,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 747,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-medium text-gray-600",
                                    children: "Tidak ada order pending saat ini."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 750,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400",
                                    children: "Silakan tunggu notifikasi order baru."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 751,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 746,
                            columnNumber: 55
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 716,
                    columnNumber: 46
                }, this),
                taskFilter === 'process' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        processTasks.map((task_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-blue-200 rounded-2xl p-6 shadow-lg shadow-blue-50 animate-in slide-in-from-bottom duration-500 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 left-0 w-2 h-full bg-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 758,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-6 border-b border-gray-100 pb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-xl text-gray-800 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                                className: "text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 761,
                                                                columnNumber: 113
                                                            }, this),
                                                            " Sedang Dijemput"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 761,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 mt-1",
                                                        children: [
                                                            "Order ID: #",
                                                            String(task_1.id).slice(0, 8)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 762,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 760,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm",
                                                children: "PROCESS"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 764,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 759,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-blue-50 p-2 rounded-lg text-blue-600",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                    lineNumber: 770,
                                                                    columnNumber: 102
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 770,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500 font-bold uppercase",
                                                                        children: "Nama Warga"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 772,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-800 font-bold text-lg",
                                                                        children: task_1.profiles?.full_name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 773,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 771,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 769,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-red-50 p-2 rounded-lg text-red-600",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                    lineNumber: 777,
                                                                    columnNumber: 100
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 777,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500 font-bold uppercase",
                                                                        children: "Alamat"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 779,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-800 font-medium leading-relaxed",
                                                                        children: task_1.profiles?.address
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 780,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 778,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 776,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 768,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-orange-50 p-2 rounded-lg text-orange-600",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                    lineNumber: 786,
                                                                    columnNumber: 106
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 786,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500 font-bold uppercase",
                                                                        children: "Detail Sampah"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 788,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-gray-800 font-medium",
                                                                        children: [
                                                                            task_1.waste_types?.name,
                                                                            " • ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-bold",
                                                                                children: [
                                                                                    task_1.weight,
                                                                                    " Kg"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                                lineNumber: 789,
                                                                                columnNumber: 119
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 789,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-green-600 font-bold mt-1",
                                                                        children: [
                                                                            "Rp ",
                                                                            task_1.total_price?.toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 790,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 787,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 785,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-sm text-yellow-800 flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                size: 16,
                                                                className: "mt-0.5 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 794,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "Catatan:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                        lineNumber: 795,
                                                                        columnNumber: 48
                                                                    }, this),
                                                                    ' "',
                                                                    task_1.notes || 'Tidak ada catatan',
                                                                    '"'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 795,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 793,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 784,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 767,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSelectedChatTask(task_1);
                                                    setIsChatOpen(true);
                                                },
                                                className: "flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 804,
                                                        columnNumber: 161
                                                    }, this),
                                                    " Chat App"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 801,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>contactUser('whatsapp', task_1.profiles?.phone, task_1.profiles?.full_name),
                                                className: "flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 805,
                                                        columnNumber: 278
                                                    }, this),
                                                    " WhatsApp"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 805,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>contactUser('call', task_1.profiles?.phone),
                                                className: "flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 806,
                                                        columnNumber: 244
                                                    }, this),
                                                    " Telepon"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 806,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 800,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3 pt-2 border-t border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task_1.profiles?.address)}`,
                                                target: "_blank",
                                                className: "flex justify-center items-center gap-2 py-3 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 810,
                                                        columnNumber: 336
                                                    }, this),
                                                    " Buka Maps"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 810,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleTaskAction(task_1.id, 'Done'),
                                                className: "flex justify-center items-center gap-2 bg-blue-800 text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition shadow-lg shadow-blue-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 811,
                                                        columnNumber: 252
                                                    }, this),
                                                    " Selesai Tugas"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 811,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 809,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, task_1.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 757,
                                columnNumber: 53
                            }, this)),
                        processTasks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-16 text-center text-gray-400 bg-white border-2 border-dashed border-gray-200 rounded-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                        size: 40,
                                        className: "text-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 817,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 816,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-medium text-gray-600",
                                    children: "Tidak ada tugas aktif saat ini."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 819,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400",
                                    children: "Ambil tugas dari tab Pending untuk mulai bekerja."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 820,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 815,
                            columnNumber: 55
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 756,
                    columnNumber: 46
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
            lineNumber: 687,
            columnNumber: 12
        }, this);
    };
    const renderMap = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative animate-in fade-in z-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: mapElement,
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 827,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: centerToMyLocation,
                    className: "absolute bottom-6 right-6 z-[400] bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 border border-gray-200 transition transform hover:scale-110",
                    title: "Lokasi Saya",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                        size: 24
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 833,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 832,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-md text-xs font-bold text-gray-700 border border-gray-200 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 836,
                            columnNumber: 17
                        }, this),
                        tasks.filter((t_9)=>t_9.status === 'Pending').length,
                        " Lokasi Penjemputan"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 835,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
            lineNumber: 825,
            columnNumber: 27
        }, this);
    const renderHistory = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-sm border border-gray-200 animate-in slide-in-from-right overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-gray-100 bg-gray-50/50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg text-gray-800 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                className: "text-gray-500"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 842,
                                columnNumber: 89
                            }, this),
                            " Riwayat Selesai"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 842,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 841,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-gray-100",
                    children: [
                        history.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition duration-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2 md:mb-0 md:justify-start md:gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-gray-800 text-lg",
                                                        children: h.profiles?.full_name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 848,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "md:hidden bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold",
                                                        children: "Done"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 849,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 847,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 text-sm text-gray-500 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1 bg-white border px-2 py-0.5 rounded",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 852,
                                                                columnNumber: 111
                                                            }, this),
                                                            " ",
                                                            new Date(h.updated_at).toLocaleDateString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 852,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1 bg-white border px-2 py-0.5 rounded",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 853,
                                                                columnNumber: 111
                                                            }, this),
                                                            " ",
                                                            new Date(h.updated_at).toLocaleTimeString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 853,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 851,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400 mt-2 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 855,
                                                        columnNumber: 95
                                                    }, this),
                                                    " ",
                                                    h.profiles?.address
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 855,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 846,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right flex flex-col items-end min-w-[120px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden md:flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-green-200 items-center gap-1 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        size: 12
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 859,
                                                        columnNumber: 33
                                                    }, this),
                                                    " Selesai"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 858,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xl font-bold text-green-700",
                                                children: [
                                                    "Rp ",
                                                    h.total_price?.toLocaleString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 861,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400",
                                                children: [
                                                    h.waste_types?.name,
                                                    " (",
                                                    h.weight,
                                                    " Kg)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 862,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 857,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, h.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 845,
                                columnNumber: 35
                            }, this)),
                        history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-16 text-center text-gray-400 flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                        size: 32,
                                        className: "text-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 867,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 866,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-gray-600",
                                    children: "Belum ada riwayat tugas selesai."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 869,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: "Riwayat akan muncul setelah Anda menyelesaikan tugas."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 870,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 865,
                            columnNumber: 42
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 844,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
            lineNumber: 840,
            columnNumber: 31
        }, this);
    // --- EARNINGS PAGE RENDERER ---
    const renderEarnings = ()=>{
        const earnings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateDriverEarnings"])(history.map((h_0)=>({
                ...h_0,
                created_at: h_0.updated_at || new Date().toISOString(),
                total_price: h_0.total_price || 0,
                status: 'done'
            })));
        const handleExport = async ()=>{
            if (!history.length) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Info', 'Tidak ada data untuk diexport', 'info');
                return;
            }
            const exportData = history.map((t_10)=>({
                    'Tanggal': new Date(t_10.updated_at).toLocaleDateString('id-ID'),
                    'Pelanggan': t_10.profiles?.full_name || '-',
                    'Jenis Sampah': t_10.waste_types?.name || '-',
                    'Berat (kg)': t_10.weight,
                    'Total Transaksi': (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(t_10.total_price || 0),
                    'Komisi Driver (15%)': (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])((t_10.total_price || 0) * 0.15),
                    'Status': t_10.status
                }));
            const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportToExcel"])(exportData, 'driver_earnings');
            if (success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Berhasil!', 'Laporan berhasil diexport ke CSV', 'success');
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl md:text-3xl font-bold text-gray-800",
                                    children: "Pendapatan Driver"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 906,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-1",
                                    children: "Tracking komisi dan performa Anda"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 907,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 905,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleExport,
                            className: "bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2 transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 910,
                                    columnNumber: 25
                                }, this),
                                " Export Laporan"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 909,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 904,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "opacity-90 font-medium",
                                            children: "Hari Ini"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 919,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            size: 20,
                                            className: "opacity-80"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 920,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 918,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl md:text-3xl font-bold mb-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(earnings.today)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 922,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm opacity-80",
                                    children: "Komisi hari ini"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 923,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 917,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 font-medium",
                                            children: "Minggu Ini"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 929,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                            size: 20,
                                            className: "text-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 930,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 928,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl md:text-3xl font-bold text-gray-800 mb-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(earnings.thisWeek)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 932,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "7 hari terakhir"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 933,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 927,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 font-medium",
                                            children: "Bulan Ini"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 939,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                            size: 20,
                                            className: "text-purple-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 940,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 938,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl md:text-3xl font-bold text-gray-800 mb-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(earnings.thisMonth)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 942,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "Periode bulan ini"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 943,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 937,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-xl text-white shadow-lg transform hover:scale-105 transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "opacity-90 font-medium",
                                            children: "Total Keseluruhan"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 949,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            size: 20,
                                            className: "opacity-80"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 950,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 948,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl md:text-3xl font-bold mb-1",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(earnings.total)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 952,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm opacity-80",
                                    children: [
                                        earnings.transactionCount,
                                        " transaksi"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 953,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 947,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 915,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-xl border border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-100 p-3 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                            size: 24,
                                            className: "text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 962,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 961,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Total Pickup"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 965,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-gray-800",
                                                children: earnings.transactionCount
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 966,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 964,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 960,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 959,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-xl border border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-green-100 p-3 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                            size: 24,
                                            className: "text-green-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 974,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 973,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Rata-rata Komisi"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 977,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-gray-800",
                                                children: earnings.transactionCount > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(earnings.total / earnings.transactionCount) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(0)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 978,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 976,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 972,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 971,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-xl border border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-purple-100 p-3 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            size: 24,
                                            className: "text-purple-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 988,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 987,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Pickup Hari Ini"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 991,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-gray-800",
                                                children: history.filter((t_11)=>{
                                                    const today = new Date().toDateString();
                                                    return new Date(t_11.updated_at).toDateString() === today;
                                                }).length
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 992,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 990,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 986,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 985,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 958,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 md:p-6 border-b border-gray-100 bg-gray-50/50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold text-gray-800 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        size: 22
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1007,
                                        columnNumber: 29
                                    }, this),
                                    " Riwayat Transaksi & Komisi"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1006,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 1005,
                            columnNumber: 21
                        }, this),
                        history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12 text-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                    size: 48,
                                    className: "mx-auto mb-3 opacity-30"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1012,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Belum ada transaksi selesai"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1013,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 1011,
                            columnNumber: 45
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        className: "bg-gray-50 border-b border-gray-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase",
                                                    children: "Tanggal"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 1018,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase",
                                                    children: "Pelanggan"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 1019,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase",
                                                    children: "Jenis"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 1020,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase",
                                                    children: "Berat"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 1021,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase",
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 1022,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase",
                                                    children: "Komisi (15%)"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 1023,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 1017,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1016,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        className: "divide-y divide-gray-200",
                                        children: history.slice(0, 20).map((t_12)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-gray-50 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-sm text-gray-700",
                                                        children: new Date(t_12.updated_at).toLocaleDateString('id-ID')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1028,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-sm font-medium text-gray-800",
                                                        children: t_12.profiles?.full_name || 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1031,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-sm text-gray-700",
                                                        children: t_12.waste_types?.name || 'N/A'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1034,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-sm text-gray-700",
                                                        children: [
                                                            t_12.weight,
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1037,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-sm text-right font-medium text-gray-800",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(t_12.total_price || 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1040,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "px-4 py-3 text-sm text-right font-bold text-green-600",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])((t_12.total_price || 0) * 0.15)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1043,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, t_12.id, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1027,
                                                columnNumber: 71
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1026,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1015,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 1014,
                            columnNumber: 34
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 1004,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-blue-50 border border-blue-200 rounded-lg p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-blue-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold",
                                children: "ℹ️ Catatan:"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1055,
                                columnNumber: 25
                            }, this),
                            " Komisi driver adalah 15% dari setiap transaksi yang selesai. Pembayaran komisi dilakukan setiap akhir bulan."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1054,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 1053,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
            lineNumber: 902,
            columnNumber: 12
        }, this);
    };
    // --- PROFILE PAGE RENDERER ---
    const renderProfile = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group w-24 h-24 mx-auto mb-4 cursor-pointer",
                                onClick: ()=>document.getElementById('driver-avatar-upload').click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur overflow-hidden border-2 border-white/30",
                                        children: currentUser?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: currentUser.avatar_url,
                                            alt: "Profile",
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 1068,
                                            columnNumber: 56
                                        }, this) : currentUser?.full_name?.charAt(0) || 'D'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1067,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                            className: "text-white",
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 1071,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1070,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1066,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                id: "driver-avatar-upload",
                                className: "hidden",
                                accept: "image/*",
                                onChange: handleAvatarChange
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1074,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold",
                                children: currentUser?.full_name || 'Driver'
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1076,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "opacity-80 mt-1",
                                children: currentUser?.email
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1077,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block mt-3 bg-white/20 px-4 py-1 rounded-full text-sm font-bold backdrop-blur",
                                children: "🚛 Driver Aktif"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1078,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1065,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-4 rounded-xl border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 font-bold uppercase mb-1",
                                                children: "Nama Lengkap"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1086,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-800 font-medium",
                                                children: currentUser?.full_name || '-'
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1087,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1085,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-4 rounded-xl border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 font-bold uppercase mb-1",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1090,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-800 font-medium",
                                                children: currentUser?.email || '-'
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1091,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1089,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-4 rounded-xl border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 font-bold uppercase mb-1",
                                                children: "No. Telepon"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1094,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-800 font-medium",
                                                children: driverProfile?.phone || currentUser?.phone || '-'
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1095,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1093,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 p-4 rounded-xl border border-gray-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500 font-bold uppercase mb-1",
                                                children: "Kendaraan"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1098,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-800 font-medium",
                                                children: driverProfile?.vehicle || 'Pickup Truck'
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1099,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1097,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1084,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center p-4 bg-green-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-green-700",
                                                children: history.length
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1105,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-green-600 font-medium",
                                                children: "Total Selesai"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1106,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1104,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center p-4 bg-blue-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-blue-700",
                                                children: tasks.filter((t_13)=>t_13.status === 'Process' && t_13.driver_id === currentUser?.id).length
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1109,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-blue-600 font-medium",
                                                children: "Tugas Aktif"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1110,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1108,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center p-4 bg-purple-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-purple-700",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRupiah"])(totalIncome)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1113,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-purple-600 font-medium",
                                                children: "Total Komisi"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1114,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1112,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center p-4 bg-orange-50 rounded-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-orange-700",
                                                children: "⭐ 4.8"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1117,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-orange-600 font-medium",
                                                children: "Rating"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1118,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1116,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1103,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1083,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                lineNumber: 1064,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
            lineNumber: 1063,
            columnNumber: 31
        }, this);
    const renderContent = ()=>{
        switch(activePage){
            case 'dashboard':
                return renderDashboard();
            case 'tasks':
                return renderTasks();
            case 'map':
                return renderMap();
            case 'history':
                return renderHistory();
            case 'earnings':
                return renderEarnings();
            case 'profile':
                return renderProfile();
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "Halaman tidak ditemukan"
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                    lineNumber: 1139,
                    columnNumber: 16
                }, this);
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex justify-center items-center text-gray-800 font-bold",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "animate-spin mr-2"
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                lineNumber: 1142,
                columnNumber: 110
            }, this),
            " Memuat..."
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
        lineNumber: 1142,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 flex font-sans text-gray-800 overflow-x-hidden",
        children: [
            isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 md:hidden",
                onClick: ()=>setIsMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                lineNumber: 1144,
                columnNumber: 34
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} ${isSidebarOpen ? 'md:w-64' : 'md:w-20'} flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-20 flex items-center justify-between px-5 border-b border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen ? 'justify-center w-full px-0' : 'px-0'}`,
                                children: isSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col animate-in fade-in slide-in-from-left duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/images/logo.png",
                                        alt: "Logo",
                                        className: "w-36 h-auto object-contain mb-1"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1152,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1151,
                                    columnNumber: 42
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSidebarOpen(true),
                                    className: "mx-auto relative group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/mini-logo.png",
                                            alt: "RecycleYuk",
                                            className: "w-10 h-10 object-contain transition-transform group-hover:scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 1154,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -right-2 -bottom-2 bg-green-100 text-green-600 rounded-full p-0.5 shadow-sm border border-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1156,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                            lineNumber: 1155,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1153,
                                    columnNumber: 38
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1150,
                                columnNumber: 21
                            }, this),
                            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: "hidden md:block p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {}, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1163,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1162,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(false),
                                className: "md:hidden p-2 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1165,
                                    columnNumber: 112
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1165,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1146,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 p-4 space-y-2 overflow-y-auto",
                        children: SIDEBAR_MENUS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigateTo(m.id),
                                className: `w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 font-medium ${activePage === m.id ? 'bg-green-50 text-green-700 shadow-sm ring-1 ring-green-100' : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'} ${!isSidebarOpen && 'justify-center px-0'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(m.icon, {
                                        size: 22,
                                        strokeWidth: activePage === m.id ? 2.5 : 2
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1171,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${!isSidebarOpen ? 'md:hidden' : 'block'}`,
                                        children: m.label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1172,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, m.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1170,
                                columnNumber: 45
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1169,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-t border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: `w-full flex items-center rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all h-12 ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    size: 22,
                                    className: "min-w-[22px]"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1177,
                                    columnNumber: 25
                                }, this),
                                " ",
                                isSidebarOpen && "Keluar"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                            lineNumber: 1176,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1175,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                lineNumber: 1145,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: `flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden flex justify-between items-center mb-6 sticky top-0 bg-slate-50/90 backdrop-blur-md z-30 py-3 px-1 border-b border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(true),
                                className: "p-2 -ml-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {}, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                    lineNumber: 1183,
                                    columnNumber: 93
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1183,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-lg capitalize text-gray-800",
                                children: activePage
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1184,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigateTo('profile'),
                                className: "w-9 h-9 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 border border-green-200",
                                children: currentUser?.full_name?.charAt(0)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1185,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1182,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "hidden md:flex justify-between items-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl font-bold capitalize text-gray-800 tracking-tight",
                                                children: activePage === 'dashboard' ? 'Ringkasan' : activePage === 'history' ? 'Riwayat' : activePage === 'tasks' ? 'Tugas Jemput' : activePage === 'map' ? 'Peta Lokasi' : 'Profil'
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1190,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 mt-1",
                                                children: "Dashboard Operasional Driver"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1193,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1189,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "p-2 rounded-lg hover:bg-gray-100 relative text-gray-600 group transition",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                    size: 20,
                                                    className: "group-hover:text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                    lineNumber: 1197,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1196,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px h-6 bg-gray-200"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1199,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>navigateTo('profile'),
                                                className: "flex items-center gap-3 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-50 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 overflow-hidden",
                                                        children: currentUser?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: currentUser.avatar_url,
                                                            alt: "Profile",
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                            lineNumber: 1202,
                                                            columnNumber: 64
                                                        }, this) : currentUser?.full_name?.charAt(0) || 'D'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1201,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left hidden md:block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-bold text-gray-800 line-clamp-1 max-w-[100px]",
                                                                children: currentUser?.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 1205,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-0 text-gray-500",
                                                                children: "Driver"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                                lineNumber: 1206,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                        lineNumber: 1204,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                                lineNumber: 1200,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                        lineNumber: 1195,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1188,
                                columnNumber: 21
                            }, this),
                            renderContent(),
                            selectedChatTask && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$components$2f$shared$2f$ChatModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                isOpen: isChatOpen,
                                onClose: ()=>setIsChatOpen(false),
                                transactionId: selectedChatTask.id,
                                currentUserId: currentUser?.id,
                                currentUserName: currentUser?.full_name,
                                otherUserName: selectedChatTask.profiles?.full_name || 'User',
                                isDriver: true
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                                lineNumber: 1214,
                                columnNumber: 42
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                        lineNumber: 1187,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
                lineNumber: 1181,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/driver/page.js",
        lineNumber: 1143,
        columnNumber: 10
    }, this);
}
_s(DriverDashboard, "qr426HeorqPDXs7gy2hZjGeIoLM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DriverDashboard;
var _c;
__turbopack_context__.k.register(_c, "DriverDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_RecycleYuk-revision_RecycleYuk_RecycleYuk_src_0be6b9ff._.js.map