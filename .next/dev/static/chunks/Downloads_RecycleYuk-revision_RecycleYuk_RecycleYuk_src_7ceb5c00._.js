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
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-client] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/check-check.js [app-client] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
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
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://bvigrmajwdfpavxmxefl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aWdybWFqd2RmcGF2eG14ZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTE2MzAsImV4cCI6MjA4MzIyNzYzMH0.Qii8jaaMgtH5Sq-C7YfpQ26AmGnMmh3aEbsTX8Ciyg0"));
// Koordinat Default [Lon, Lat]
const DEFAULT_COORDS = [
    107.6191,
    -6.9175
];
const DRIVER_START = [
    107.6250,
    -6.9250
];
const WEIGHT_OPTIONS = [
    {
        label: 'Ringan (0 - 5 KG)',
        value: 5
    },
    {
        label: 'Sedang (5 - 10 KG)',
        value: 10
    },
    {
        label: 'Berat (10 - 20 KG)',
        value: 20
    },
    {
        label: 'Sangat Berat (> 20 KG)',
        value: 30
    }
];
const TIME_OPTIONS = [
    {
        label: 'Pagi (08:00 - 11:00)',
        value: '09:00'
    },
    {
        label: 'Sore (15:00 - 18:00)',
        value: '16:00'
    }
];
const COMPLAINT_CATEGORIES = [
    'Sampah Menumpuk',
    'Jadwal Terlewat',
    'Fasilitas Rusak',
    'Pelayanan Petugas',
    'Lainnya'
];
function UserDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // --- STATE MANAGEMENT ---
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activePage, setActivePage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // --- GPS STATE ---
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_COORDS);
    const [isGpsActive, setIsGpsActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // UI States
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Data States
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        totalWaste: 0,
        lastPickup: '-',
        points: 0
    });
    const [wasteTypes, setWasteTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pickupHistory, setPickupHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activePickup, setActivePickup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [driverLocation, setDriverLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DRIVER_START);
    const [complaints, setComplaints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isChatOpen, setIsChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Forms
    const [complaintForm, setComplaintForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        category: '',
        content: ''
    });
    const [formRequest, setFormRequest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        wasteTypeId: '',
        weight: 5,
        date: '',
        time: '09:00',
        notes: ''
    });
    // Payment & Modals
    const [paymentModal, setPaymentModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        bill: null,
        step: 'method'
    });
    const [bills, setBills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 101,
            title: 'Iuran Kebersihan - Feb 2026',
            amount: 25000,
            status: 'Unpaid',
            due_date: '2026-02-10'
        }
    ]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Semua');
    const [selectedArticle, setSelectedArticle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedHistory, setSelectedHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditProfile, setIsEditProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // --- OPENLAYERS REFS ---
    const mapElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vectorSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$source$2f$Vector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]());
    const SIDEBAR_MENUS = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"]
        },
        {
            id: 'request',
            label: 'Request Pickup',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
        },
        {
            id: 'history',
            label: 'Riwayat',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
        },
        {
            id: 'pengaduan',
            label: 'Pengaduan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"]
        },
        {
            id: 'iuran',
            label: 'Bayar Iuran',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
        },
        {
            id: 'tracking',
            label: 'Tracking',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        },
        {
            id: 'edukasi',
            label: 'Edukasi',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
        }
    ];
    const EDUCATION_DATA = [
        {
            id: 1,
            type: 'article',
            category: 'Tips',
            title: 'Cara Memilah Sampah',
            desc: 'Panduan dasar.',
            content: '...',
            readTime: '3 min'
        },
        {
            id: 2,
            type: 'video',
            category: 'Tutorial',
            title: 'Membuat Kompos',
            desc: 'Video tutorial.',
            content: 'Video Placeholder',
            readTime: '5 min'
        },
        {
            id: 3,
            type: 'article',
            category: 'Info',
            title: 'Bahaya B3',
            desc: 'Kenapa baterai berbahaya?',
            content: '...',
            readTime: '4 min'
        }
    ];
    // --- 1. SETUP MIDTRANS ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserDashboard.useEffect": ()=>{
            const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
            const clientKey = ("TURBOPACK compile-time value", "Mid-client-zVn1_jq4GqVUHzoj"); // Pastikan ada di .env.local
            const script = document.createElement('script');
            script.src = snapScript;
            script.setAttribute('data-client-key', clientKey);
            script.async = true;
            document.body.appendChild(script);
            return ({
                "UserDashboard.useEffect": ()=>{
                    if (document.body.contains(script)) document.body.removeChild(script);
                }
            })["UserDashboard.useEffect"];
        }
    }["UserDashboard.useEffect"], []);
    // --- 2. LOGIC & EFFECTS ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserDashboard.useEffect": ()=>{
            const timer = setInterval({
                "UserDashboard.useEffect.timer": ()=>{
                    setCurrentTime(new Date().toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }));
                }
            }["UserDashboard.useEffect.timer"], 1000);
            fetchData();
            startGpsTracking();
            // Realtime Listener
            const channel = supabase.channel('user-dashboard-realtime').on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'transactions'
            }, {
                "UserDashboard.useEffect.channel": (payload)=>{
                    fetchData();
                    if (payload.eventType === 'UPDATE' && payload.new.status === 'Process') {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
                            title: 'Pengangkutan Aktif!',
                            text: 'Driver sedang menuju lokasi Anda.',
                            icon: 'info',
                            timer: 3000,
                            showConfirmButton: false,
                            toast: true,
                            position: 'top-end',
                            background: '#d1fae5',
                            color: '#065f46'
                        });
                        setActivePage('tracking');
                    }
                }
            }["UserDashboard.useEffect.channel"]).subscribe();
            const handleResize = {
                "UserDashboard.useEffect.handleResize": ()=>{
                    if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
                }
            }["UserDashboard.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "UserDashboard.useEffect": ()=>{
                    clearInterval(timer);
                    window.removeEventListener('resize', handleResize);
                    supabase.removeChannel(channel);
                }
            })["UserDashboard.useEffect"];
        }
    }["UserDashboard.useEffect"], []);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserDashboard.useEffect": ()=>{
            setMounted(true);
        }
    }["UserDashboard.useEffect"], []);
    // --- 3. GPS LOGIC (WATCH POSITION) ---
    const startGpsTracking = ()=>{
        if (!navigator.geolocation) {
            console.warn("Geolocation is not supported by this browser.");
            return;
        }
        navigator.geolocation.watchPosition((position)=>{
            const { latitude, longitude } = position.coords;
            const newLoc = [
                longitude,
                latitude
            ];
            setUserLocation(newLoc);
            setIsGpsActive(true);
        }, (error)=>{
            // Handle GPS errors gracefully - don't show in console for common permission issues
            if (error.code === 1) {
                console.warn("GPS permission denied by user");
            } else if (error.code === 2) {
                console.warn("GPS position unavailable");
            } else if (error.code === 3) {
                console.warn("GPS timeout");
            }
        // Keep default coordinates when GPS fails
        }, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        });
    };
    const centerToUserLocation = ()=>{
        if (mapRef.current && isGpsActive) {
            mapRef.current.getView().animate({
                center: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(userLocation),
                zoom: 17,
                duration: 1000
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('GPS Mencari...', 'Pastikan izin lokasi aktif.', 'info');
        }
    };
    // Simulasi Pergerakan Driver
    // Simulasi Pergerakan Driver & Heading
    const [driverHeading, setDriverHeading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserDashboard.useEffect": ()=>{
            if (activePage === 'tracking' && activePickup && activePickup.rawStatus === 'Process') {
                const interval = setInterval({
                    "UserDashboard.useEffect.interval": ()=>{
                        setDriverLocation({
                            "UserDashboard.useEffect.interval": (prev)=>{
                                const lonDiff = (userLocation[0] - prev[0]) * 0.05;
                                const latDiff = (userLocation[1] - prev[1]) * 0.05;
                                // Jika dekat, stop
                                if (Math.abs(lonDiff) < 0.00001 && Math.abs(latDiff) < 0.00001) return prev;
                                // Calculate Bearing (Angle)
                                // Math.atan2(y, x). We want 0 at North? OpenLayers rotation 0 is UP? No, usually 0 is UP for Icons if image is facing UP.
                                // If image faces UP (North), standard math angle (0 at East) needs correction.
                                // Let's assume positive Y is North.
                                // Bearing = Math.atan2(dx, dy) -> returns angle from Y axis (North) in radians? No.
                                // Let's use standard Math.atan2(dy, dx) which is angle from X (East).
                                // And correct for OpenLayers rotation.
                                // Ideally: calculate rotation needed.
                                // Simple approach: Point towards target.
                                // Angle from North (Clockwise) is commonly used for headings.
                                // theta = atan2(dx, dy) (swapped).
                                const angle = Math.atan2(lonDiff, latDiff); // Angle from North, clockwise?
                                // Let's test. If dy is pos (North), dx 0 -> atan2(0, 1) = 0. Correct.
                                // If dx is pos (East), dy 0 -> atan2(1, 0) = PI/2. Correct (90 deg).
                                setDriverHeading(angle);
                                return [
                                    prev[0] + lonDiff,
                                    prev[1] + latDiff
                                ];
                            }
                        }["UserDashboard.useEffect.interval"]);
                    }
                }["UserDashboard.useEffect.interval"], 1000);
                return ({
                    "UserDashboard.useEffect": ()=>clearInterval(interval)
                })["UserDashboard.useEffect"];
            } else {
                setDriverLocation(DRIVER_START);
            }
        }
    }["UserDashboard.useEffect"], [
        activePage,
        activePickup,
        userLocation
    ]);
    // --- 4. MAP INITIALIZATION ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserDashboard.useEffect": ()=>{
            if (activePage === 'tracking' && mapElement.current && !mapRef.current) {
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
                        center: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(DEFAULT_COORDS),
                        zoom: 13
                    }),
                    controls: []
                });
                mapRef.current = initialMap;
                updateMapMarkers();
            }
            return ({
                "UserDashboard.useEffect": ()=>{
                    if (activePage !== 'tracking' && mapRef.current) {
                        mapRef.current.setTarget(null);
                        mapRef.current = null;
                    }
                }
            })["UserDashboard.useEffect"];
        }
    }["UserDashboard.useEffect"], [
        activePage
    ]);
    // --- 5. UPDATE MARKER & RUTE ---
    const updateMapMarkers = ()=>{
        if (!mapRef.current) return;
        vectorSourceRef.current.clear();
        // A. Marker Rumah User (DIHAPUS dan Diganti Dot Biru Akurasi Saja)
        if (isGpsActive) {
            const accuracyFeature = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                geometry: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$Point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(userLocation))
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
        }
        // Home Icon removed as per request
        // B. Marker Driver
        if (activePickup?.rawStatus === 'Process') {
            const driverFeature = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                geometry: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$Point$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(driverLocation))
            });
            driverFeature.setStyle(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Style$3e$__["Style"]({
                image: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$style$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Icon$3e$__["Icon"]({
                    src: 'https://cdn-icons-png.flaticon.com/512/4047/4047448.png',
                    // Green truck icon
                    scale: 0.10,
                    anchor: [
                        0.5,
                        1
                    ]
                })
            }));
            vectorSourceRef.current.addFeature(driverFeature);
            // C. Garis Rute
            const routeFeature = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$Feature$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                geometry: new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$geom$2f$LineString$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(driverLocation),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$ol$2f$proj$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromLonLat"])(userLocation)
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
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserDashboard.useEffect": ()=>{
            updateMapMarkers();
        }
    }["UserDashboard.useEffect"], [
        userLocation,
        driverLocation,
        activePickup,
        activePage,
        driverHeading
    ]);
    // --- DATA FETCHING ---
    const fetchData = async ()=>{
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(profileData);
            const { data: wastes } = await supabase.from('waste_types').select('*');
            if (wastes) setWasteTypes(wastes);
            if (profileData?.rt) {
                const { data: notifData } = await supabase.from('notifications').select('*').or(`rt.eq.${profileData.rt},rt.is.null`).order('created_at', {
                    ascending: false
                });
                setNotifications(notifData || []);
            }
            const { data: transactions } = await supabase.from('transactions').select(`*, waste_types(name, price_per_kg), drivers:driver_id(full_name)`).eq('profile_id', user.id).order('created_at', {
                ascending: false
            });
            if (transactions) {
                setPickupHistory(transactions.map((t)=>({
                        id: `#REQ-${String(t.id).slice(0, 6)}`,
                        type: t.waste_types?.name,
                        weight: t.weight,
                        date: new Date(t.created_at).toLocaleDateString('id-ID'),
                        time: new Date(t.created_at).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        status: t.status,
                        fee: t.total_price || 0
                    })));
                const totalW = transactions.reduce((acc, curr)=>acc + (Number(curr.weight) || 0), 0);
                setStats({
                    totalWaste: totalW,
                    lastPickup: transactions[0] ? new Date(transactions[0].created_at).toLocaleDateString('id-ID') : '-',
                    points: Math.floor(totalW * 10)
                });
                const active = transactions.find((t_0)=>t_0.status === 'Pending' || t_0.status === 'Process');
                if (active) {
                    setActivePickup({
                        id: active.id,
                        driverId: active.driver_id,
                        // Simpan Driver ID untuk tracking
                        status: active.status === 'Process' ? 'Pengangkutan Aktif' : 'Menunggu Konfirmasi',
                        rawStatus: active.status,
                        driver: active.drivers?.full_name || 'Mencari Driver...',
                        vehicle: 'Pickup Layanan',
                        rating: 4.8,
                        eta: active.status === 'Process' ? 'Sedang Jalan' : 'Menunggu'
                    });
                } else {
                    setActivePickup(null);
                }
            }
            const { data: complaintsData } = await supabase.from('complaints').select('*').eq('user_id', user.id).order('created_at', {
                ascending: false
            });
            setComplaints(complaintsData || []);
        } catch (error_0) {
            console.error("Error data:", error_0);
        } finally{
            setLoading(false);
        }
    };
    // --- REALTIME DRIVER TRACKING ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserDashboard.useEffect": ()=>{
            let channel_0;
            if (activePage === 'tracking' && activePickup?.driverId && activePickup?.rawStatus === 'Process') {
                console.log("Subscribing to driver location:", activePickup.driverId);
                // Subscribe ke tabel drivers untuk update lokasi
                channel_0 = supabase.channel(`driver-tracking-${activePickup.driverId}`).on('postgres_changes', {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'drivers',
                    filter: `id=eq.${activePickup.driverId}`
                }, {
                    "UserDashboard.useEffect": (payload_0)=>{
                        const { current_latitude, current_longitude } = payload_0.new;
                        if (current_latitude && current_longitude) {
                            setDriverLocation([
                                current_longitude,
                                current_latitude
                            ]);
                        // Opsional: Hitung bearing/heading real jika data tersedia, atau biarkan 0
                        }
                    }
                }["UserDashboard.useEffect"]).subscribe();
            }
            return ({
                "UserDashboard.useEffect": ()=>{
                    if (channel_0) supabase.removeChannel(channel_0);
                }
            })["UserDashboard.useEffect"];
        }
    }["UserDashboard.useEffect"], [
        activePage,
        activePickup
    ]);
    /* 
  // OLD SIMULATION REMOVED
  // Simulasi Pergerakan Driver & Heading
  // const [driverHeading, setDriverHeading] = useState(0);
  // useEffect(() => { ... }) 
  */ const navigateTo = (pageId)=>{
        setActivePage(pageId);
        setIsMobileMenuOpen(false);
    };
    const handleLogout = async ()=>{
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire({
            title: 'Keluar?',
            text: "Sesi Anda akan berakhir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ya'
        });
        if (result.isConfirmed) {
            await supabase.auth.signOut();
            router.push('/login');
        }
    };
    const handleUpdateProfile = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            full_name: formData.get('fullName'),
            email: formData.get('email'),
            address: formData.get('address'),
            rt: formData.get('rt'),
            rw: formData.get('rw')
        };
        try {
            await supabase.from('profiles').update(updatedData).eq('id', profile.id);
            setProfile({
                ...profile,
                ...updatedData
            });
            setIsEditProfile(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Profil disimpan', 'success');
            fetchData();
        } catch (e_0) {}
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
            const publicUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadAvatar"])(file, profile.id);
            if (!publicUrl) throw new Error('Gagal mendapatkan URL gambar.');
            // Update profile in DB
            const { error: error_1 } = await supabase.from('profiles').update({
                avatar_url: publicUrl
            }).eq('id', profile.id);
            if (error_1) throw error_1;
            setProfile((prev_0)=>({
                    ...prev_0,
                    avatar_url: publicUrl
                }));
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Foto profil berhasil diperbarui!', 'success');
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Error', 'Gagal upload foto: ' + err.message, 'error');
        }
    };
    const handleRequestSubmit = async (e_2)=>{
        e_2.preventDefault();
        if (!formRequest.wasteTypeId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Gagal', 'Pilih sampah', 'error');
            return;
        }
        // Cek apakah GPS aktif (opsional: bisa dipaksa harus aktif)
        // if (!isGpsActive) { Swal.fire('Lokasi Diperlukan', 'Aktifkan GPS untuk request pickup.', 'warning'); return; }
        try {
            const payload_1 = {
                profile_id: profile.id,
                waste_type_id: formRequest.wasteTypeId,
                weight: formRequest.weight,
                status: 'Pending',
                pickup_time: formRequest.time,
                notes: formRequest.notes,
                // KIRIM KOORDINAT userLocation [Lon, Lat]
                latitude: userLocation[1],
                longitude: userLocation[0]
            };
            const { error: error_2 } = await supabase.from('transactions').insert(payload_1);
            if (error_2) throw error_2;
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Berhasil', 'Request terkirim', 'success');
            setFormRequest({
                wasteTypeId: '',
                weight: 5,
                date: '',
                time: '09:00',
                notes: ''
            });
            setActivePage('tracking');
        } catch (err_0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Gagal', err_0.message, 'error');
        }
    };
    const handleComplaintSubmit = async (e_3)=>{
        e_3.preventDefault();
        try {
            await supabase.from('complaints').insert({
                user_id: profile.id,
                subject: complaintForm.title,
                category: complaintForm.category,
                content: complaintForm.content,
                status: 'Pending',
                created_at: new Date()
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Terkirim', 'Aduan dikirim', 'success');
            setComplaintForm({
                title: '',
                category: '',
                content: ''
            });
            fetchData();
        } catch (e_4) {}
    };
    const handlePayClick = (b)=>setPaymentModal({
            open: true,
            bill: b,
            step: 'method'
        });
    // --- PEMBAYARAN IURAN (REAL MIDTRANS) ---
    const processPayment = async ()=>{
        // 1. Validasi Snap
        if (!window.snap) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Error', 'Sistem pembayaran sedang memuat, mohon tunggu.', 'error');
            return;
        }
        const currentBill = paymentModal.bill;
        // Ubah status modal jadi loading
        setPaymentModal((p)=>({
                ...p,
                step: 'processing'
            }));
        try {
            // 2. Request Token dari Backend
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: currentBill.id,
                    amount: currentBill.amount,
                    firstName: profile?.full_name || "Warga",
                    email: profile?.email || "warga@example.com",
                    title: currentBill.title
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Gagal membuat transaksi");
            // 3. Munculkan Popup Midtrans
            window.snap.pay(data.token, {
                onSuccess: async function(result_0) {
                    // Update State Lokal
                    setBills((prev_1)=>prev_1.map((b_0)=>b_0.id === currentBill.id ? {
                                ...b_0,
                                status: 'Paid'
                            } : b_0));
                    setPaymentModal((p_1)=>({
                            ...p_1,
                            step: 'success'
                        }));
                // (Opsional) Update ke Supabase jika tabel bills ada di DB
                // await supabase.from('bills').update({ status: 'Paid' }).eq('id', currentBill.id);
                },
                onPending: function(result_1) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Pending', 'Menunggu pembayaran diselesaikan', 'info');
                    setPaymentModal((p_2)=>({
                            ...p_2,
                            open: false
                        }));
                },
                onError: function(result_2) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Gagal', 'Pembayaran gagal atau dibatalkan', 'error');
                    setPaymentModal((p_3)=>({
                            ...p_3,
                            open: false
                        }));
                },
                onClose: function() {
                    setPaymentModal((p_4)=>({
                            ...p_4,
                            step: 'method'
                        }));
                }
            });
        } catch (error_3) {
            console.error(error_3);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$all$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fire('Error', error_3.message, 'error');
            setPaymentModal((p_0)=>({
                    ...p_0,
                    step: 'method'
                }));
        }
    };
    const markAllRead = ()=>setNotifications(notifications.map((n)=>({
                ...n,
                read: true
            })));
    const markAsRead = (id)=>setNotifications(notifications.map((n_0)=>n_0.id === id ? {
                ...n_0,
                read: true
            } : n_0));
    const deleteNotification = (id_0)=>setNotifications(notifications.filter((n_1)=>n_1.id !== id_0));
    const unreadCount = notifications.filter((n_2)=>!n_2.read).length;
    const getStatusColor = (s)=>s === 'Done' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
    // --- RENDERERS ---
    const rewardBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRewardBadge"])(stats.points);
    const renderDashboard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in fade-in text-gray-800 pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 md:p-8 text-white relative overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl md:text-3xl font-bold",
                                            children: [
                                                "Halo, ",
                                                profile?.full_name?.split(' ')[0],
                                                "! 👋"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 753,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${rewardBadge.color} px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white font-bold text-sm shadow-md`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg",
                                                    children: rewardBadge.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 755,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: rewardBadge.level
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 756,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 754,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 752,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "opacity-90",
                                    children: profile?.rt ? `Warga RT ${profile.rt} / RW ${profile.rw}` : 'Lengkapi data RT/RW di profil.'
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 759,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs mt-2 opacity-75",
                                    children: [
                                        "Kumpulkan poin untuk naik level! (",
                                        stats.points,
                                        " poin)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 760,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 751,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                            className: "absolute right-[-20px] bottom-[-20px] opacity-10 w-40 h-40 transform rotate-12"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 762,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 750,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6",
                    children: [
                        {
                            l: 'Total Sampah',
                            v: `${stats.totalWaste} kg`,
                            i: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"]
                        },
                        {
                            l: 'Poin',
                            v: stats.points,
                            i: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"]
                        },
                        {
                            l: 'Pickup Terakhir',
                            v: stats.lastPickup,
                            i: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"]
                        }
                    ].map((s_0, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-xs md:text-sm font-medium",
                                            children: s_0.l
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 778,
                                            columnNumber: 30
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl md:text-2xl font-bold text-gray-800",
                                            children: s_0.v
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 778,
                                            columnNumber: 101
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 778,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-100 p-3 rounded-lg text-gray-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(s_0.i, {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 779,
                                        columnNumber: 83
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 779,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 777,
                            columnNumber: 26
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 764,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-gray-800",
                                    children: "Status Pickup Terbaru"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 783,
                                    columnNumber: 73
                                }, this),
                                activePickup ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(activePickup.status)}`,
                                    children: activePickup.status
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 783,
                                    columnNumber: 163
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold",
                                    children: "Standby"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 783,
                                    columnNumber: 294
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 783,
                            columnNumber: 17
                        }, this),
                        activePickup ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 w-full md:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-600 text-white p-3 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 786,
                                                columnNumber: 84
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 786,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-gray-900 text-lg",
                                                    children: activePickup.status
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 787,
                                                    columnNumber: 34
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-700",
                                                    children: [
                                                        "Driver: ",
                                                        activePickup.driver
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 787,
                                                    columnNumber: 106
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 787,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 785,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>navigateTo('tracking'),
                                    className: "w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 font-medium",
                                    children: "Lacak"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 789,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 784,
                            columnNumber: 33
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-gray-400 border-2 border-dashed rounded-lg bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                    size: 32,
                                    className: "mx-auto mb-2 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 790,
                                    columnNumber: 123
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Belum ada request pickup aktif."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 790,
                                    columnNumber: 178
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>navigateTo('request'),
                                    className: "mt-2 text-green-600 font-bold hover:underline",
                                    children: "Buat Request Baru"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 790,
                                    columnNumber: 216
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 790,
                            columnNumber: 30
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 782,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 749,
            columnNumber: 33
        }, this);
    const renderRequest = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-200 animate-in slide-in-from-right text-gray-800 pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold mb-6 flex items-center gap-2 text-gray-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {}, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 794,
                            columnNumber: 90
                        }, this),
                        " Form Request"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 794,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleRequestSubmit,
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1 text-gray-600",
                                            children: "Jenis Sampah"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 797,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none",
                                            value: formRequest.wasteTypeId,
                                            onChange: (e_5)=>setFormRequest({
                                                    ...formRequest,
                                                    wasteTypeId: e_5.target.value
                                                }),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Pilih Sampah"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 800,
                                                    columnNumber: 24
                                                }, this),
                                                wasteTypes.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: w.id,
                                                        children: w.name
                                                    }, w.id, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 800,
                                                        columnNumber: 83
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 797,
                                            columnNumber: 110
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 797,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1 text-gray-600",
                                            children: "Klasifikasi Berat"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 801,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none",
                                            value: formRequest.weight,
                                            onChange: (e_6)=>setFormRequest({
                                                    ...formRequest,
                                                    weight: e_6.target.value
                                                }),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Pilih Kategori..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 804,
                                                    columnNumber: 24
                                                }, this),
                                                WEIGHT_OPTIONS.map((opt, i_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: opt.value,
                                                        children: opt.label
                                                    }, i_0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 804,
                                                        columnNumber: 101
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 801,
                                            columnNumber: 115
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 801,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 796,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1 text-gray-600",
                                            children: "Tanggal"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 807,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            className: "w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none",
                                            value: formRequest.date,
                                            onChange: (e_7)=>setFormRequest({
                                                    ...formRequest,
                                                    date: e_7.target.value
                                                }),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 807,
                                            columnNumber: 105
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 807,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium mb-1 text-gray-600",
                                            children: "Waktu Pengangkutan"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 811,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none",
                                            value: formRequest.time,
                                            onChange: (e_8)=>setFormRequest({
                                                    ...formRequest,
                                                    time: e_8.target.value
                                                }),
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Pilih Waktu..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 814,
                                                    columnNumber: 24
                                                }, this),
                                                TIME_OPTIONS.map((opt_0, i_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: opt_0.value,
                                                        children: opt_0.label
                                                    }, i_1, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 814,
                                                        columnNumber: 98
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 811,
                                            columnNumber: 116
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 811,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 806,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium mb-1 text-gray-600",
                                    children: "Catatan"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 816,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    className: "w-full border p-3 rounded-lg h-24 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none",
                                    placeholder: "Lokasi detail...",
                                    value: formRequest.notes,
                                    onChange: (e_9)=>setFormRequest({
                                            ...formRequest,
                                            notes: e_9.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 816,
                                    columnNumber: 101
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 816,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition",
                            children: "Kirim Request"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 820,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 795,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 793,
            columnNumber: 31
        }, this);
    const renderPengaduan = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-5 md:p-6 border border-gray-200 text-gray-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold mb-6 flex items-center gap-2 text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {}, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 825,
                                columnNumber: 94
                            }, this),
                            " Layanan Pengaduan"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 825,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleComplaintSubmit,
                        className: "space-y-4 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-1 text-gray-600",
                                                children: "Judul"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 828,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none",
                                                placeholder: "Judul Masalah",
                                                value: complaintForm.title,
                                                onChange: (e_10)=>setComplaintForm({
                                                        ...complaintForm,
                                                        title: e_10.target.value
                                                    }),
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 828,
                                                columnNumber: 107
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 828,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium mb-1 text-gray-600",
                                                children: "Kategori"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 832,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "w-full border p-3 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none",
                                                value: complaintForm.category,
                                                onChange: (e_11)=>setComplaintForm({
                                                        ...complaintForm,
                                                        category: e_11.target.value
                                                    }),
                                                required: true,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Pilih..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 835,
                                                        columnNumber: 26
                                                    }, this),
                                                    COMPLAINT_CATEGORIES.map((cat, i_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: cat,
                                                            children: cat
                                                        }, i_2, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                            lineNumber: 835,
                                                            columnNumber: 100
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 832,
                                                columnNumber: 110
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 832,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 827,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium mb-1 text-gray-600",
                                        children: "Deskripsi"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 837,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "w-full border p-3 rounded-lg h-24 bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none resize-none",
                                        placeholder: "Jelaskan detail...",
                                        value: complaintForm.content,
                                        onChange: (e_12)=>setComplaintForm({
                                                ...complaintForm,
                                                content: e_12.target.value
                                            }),
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 837,
                                        columnNumber: 107
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 837,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 841,
                                        columnNumber: 177
                                    }, this),
                                    " Kirim Pengaduan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 841,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 826,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-bold text-gray-700 mb-3 border-b pb-2",
                        children: "Riwayat Pengaduan"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 843,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: complaints.length > 0 ? complaints.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border p-4 rounded-xl hover:bg-gray-50 transition bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-bold text-gray-800",
                                                        children: c.subject
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 844,
                                                        columnNumber: 236
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: [
                                                            new Date(c.created_at).toLocaleDateString('id-ID'),
                                                            " • ",
                                                            c.category
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 844,
                                                        columnNumber: 290
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 844,
                                                columnNumber: 231
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2 py-1 text-xs font-bold rounded ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`,
                                                children: c.status
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 844,
                                                columnNumber: 404
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 844,
                                        columnNumber: 176
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-700 bg-gray-50 p-2 rounded mb-2 italic",
                                        children: [
                                            '"',
                                            c.content,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 844,
                                        columnNumber: 576
                                    }, this),
                                    c.response && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 pl-3 border-l-4 border-green-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-green-700",
                                                children: "Tanggapan RT/RW:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 844,
                                                columnNumber: 735
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-700",
                                                children: c.response
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 844,
                                                columnNumber: 803
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 844,
                                        columnNumber: 680
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 844,
                                columnNumber: 89
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-6 text-gray-400 border border-dashed rounded-lg",
                            children: "Belum ada riwayat."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 844,
                            columnNumber: 873
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 844,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 824,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 823,
            columnNumber: 33
        }, this);
    const renderTracking = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lg:col-span-2 bg-gray-200 rounded-xl h-64 md:h-[450px] relative overflow-hidden border shadow-inner z-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: mapElement,
                            style: {
                                width: '100%',
                                height: '100%'
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 850,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: centerToUserLocation,
                            className: "absolute bottom-16 right-4 z-[400] bg-white p-2 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition border border-gray-200",
                            title: "Lokasi Saya",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                size: 24
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 857,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 856,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce w-max border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-green-600 text-white p-1 rounded-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 861,
                                        columnNumber: 79
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 861,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-gray-500",
                                            children: "Estimasi"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 862,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold text-green-700 text-sm",
                                            children: activePickup?.eta || 'Menunggu'
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 862,
                                            columnNumber: 85
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 862,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 860,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 848,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-xl border border-gray-200 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg mb-4 text-gray-800",
                            children: "Info Pengangkutan"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 866,
                            columnNumber: 17
                        }, this),
                        activePickup ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500",
                                            children: "BS"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 868,
                                            columnNumber: 66
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-gray-800",
                                                    children: activePickup.driver
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 868,
                                                    columnNumber: 196
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500",
                                                    children: activePickup.vehicle
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 868,
                                                    columnNumber: 262
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 868,
                                            columnNumber: 191
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 868,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 bg-yellow-50 text-yellow-800 rounded text-sm border border-yellow-200",
                                    children: "Mohon bersiap, driver sedang menuju titik lokasi Anda."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 869,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "py-2 bg-green-50 text-green-700 rounded font-bold text-sm flex justify-center gap-1 hover:bg-green-100 transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 870,
                                                    columnNumber: 199
                                                }, this),
                                                " Chat"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 870,
                                            columnNumber: 65
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "py-2 bg-blue-50 text-blue-700 rounded font-bold text-sm flex justify-center gap-1 hover:bg-blue-100 transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 870,
                                                    columnNumber: 371
                                                }, this),
                                                " Call"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 870,
                                            columnNumber: 240
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 870,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 867,
                            columnNumber: 33
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-center py-4",
                            children: "Belum ada pickup aktif."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 871,
                            columnNumber: 30
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 865,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 847,
            columnNumber: 32
        }, this);
    const renderIuran = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl shadow-sm p-6 border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-purple-100 p-3 rounded-lg text-purple-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 876,
                                    columnNumber: 125
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 876,
                                columnNumber: 63
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-gray-800",
                                        children: "Tagihan Iuran"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 876,
                                        columnNumber: 156
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: "Kelola pembayaran bulanan Anda."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 876,
                                        columnNumber: 222
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 876,
                                columnNumber: 151
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 876,
                        columnNumber: 17
                    }, this),
                    bills.map((bill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border p-4 rounded-xl flex justify-between items-center mb-3 hover:bg-gray-50 transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-100 p-2 rounded-lg text-gray-600",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 878,
                                                columnNumber: 124
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 878,
                                            columnNumber: 66
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-gray-800",
                                                    children: bill.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 878,
                                                    columnNumber: 157
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: [
                                                        "Status: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: bill.status === 'Paid' ? 'text-green-600 font-bold' : 'text-red-600 font-bold',
                                                            children: bill.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                            lineNumber: 878,
                                                            columnNumber: 257
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 878,
                                                    columnNumber: 212
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 878,
                                            columnNumber: 152
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 878,
                                    columnNumber: 25
                                }, this),
                                bill.status === 'Unpaid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handlePayClick(bill),
                                    className: "w-full md:w-auto bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition",
                                    children: "Bayar"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 879,
                                    columnNumber: 53
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-full md:w-auto text-green-600 font-bold flex items-center justify-center md:justify-end gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 879,
                                            columnNumber: 339
                                        }, this),
                                        " Lunas"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 879,
                                    columnNumber: 225
                                }, this)
                            ]
                        }, bill.id, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 877,
                            columnNumber: 36
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 875,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 874,
            columnNumber: 29
        }, this);
    const renderEdukasi = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide",
                            children: [
                                'Semua',
                                'Tips',
                                'Tutorial',
                                'Info'
                            ].map((cat_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedCategory(cat_0),
                                    className: `px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition ${selectedCategory === cat_0 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`,
                                    children: cat_0
                                }, cat_0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 885,
                                    columnNumber: 158
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 885,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 w-full md:w-64 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "text-gray-400",
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 886,
                                    columnNumber: 128
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Cari artikel...",
                                    className: "w-full outline-none text-sm bg-transparent text-gray-800",
                                    value: searchTerm,
                                    onChange: (e_13)=>setSearchTerm(e_13.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 886,
                                    columnNumber: 174
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 886,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 884,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: EDUCATION_DATA.filter((i_3)=>(selectedCategory === 'Semua' || i_3.category === selectedCategory) && i_3.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer",
                            onClick: ()=>setSelectedArticle(item),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-40 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-green-50 transition",
                                    children: item.type === 'video' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                        size: 40,
                                        className: "group-hover:text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 888,
                                        columnNumber: 586
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                        size: 40,
                                        className: "group-hover:text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 888,
                                        columnNumber: 652
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 888,
                                    columnNumber: 445
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded",
                                            children: item.category
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 888,
                                            columnNumber: 741
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-lg mt-2 mb-2 text-gray-800 group-hover:text-green-600",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 888,
                                            columnNumber: 844
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500 mb-4 line-clamp-2",
                                            children: item.desc
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 888,
                                            columnNumber: 946
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-green-600 font-bold text-sm flex items-center gap-1",
                                            children: [
                                                "Baca ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 888,
                                                    columnNumber: 1098
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 888,
                                            columnNumber: 1016
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 888,
                                    columnNumber: 720
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 888,
                            columnNumber: 256
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 888,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 883,
            columnNumber: 31
        }, this);
    const renderNotifikasi = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in slide-in-from-right pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-xl text-gray-800",
                            children: "Notifikasi"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 891,
                            columnNumber: 56
                        }, this),
                        unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: markAllRead,
                            className: "text-green-600 text-sm font-bold hover:underline",
                            children: "Tandai dibaca"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 891,
                            columnNumber: 139
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 891,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: notifications.length > 0 ? notifications.map((n_3)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>markAsRead(n_3.id),
                            className: `p-4 border-b flex gap-4 cursor-pointer hover:bg-gray-50 transition rounded-lg ${!n_3.read && 'bg-green-50'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-2 rounded-full h-fit flex-shrink-0 ${n_3.type === 'payment' ? 'bg-green-100 text-green-600' : n_3.type === 'pickup' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`,
                                    children: n_3.type === 'payment' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 892,
                                        columnNumber: 492
                                    }, this) : n_3.type === 'pickup' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 892,
                                        columnNumber: 539
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 892,
                                        columnNumber: 561
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 892,
                                    columnNumber: 268
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: `font-bold text-sm ${n_3.read ? 'text-gray-600' : 'text-black'}`,
                                                    children: n_3.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 892,
                                                    columnNumber: 660
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-400 whitespace-nowrap ml-2",
                                                    children: n_3.time
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 892,
                                                    columnNumber: 757
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 892,
                                            columnNumber: 610
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600 mt-1",
                                            children: n_3.message
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 892,
                                            columnNumber: 843
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 892,
                                    columnNumber: 586
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e_14)=>{
                                        e_14.stopPropagation();
                                        deleteNotification(n_3.id);
                                    },
                                    className: "text-gray-400 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 895,
                                        columnNumber: 57
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 892,
                                    columnNumber: 908
                                }, this)
                            ]
                        }, n_3.id, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 892,
                            columnNumber: 93
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-gray-400",
                        children: "Belum ada notifikasi."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 895,
                        columnNumber: 95
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 892,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 890,
            columnNumber: 34
        }, this);
    const renderProfile = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-sm p-6 border border-gray-200 animate-in slide-in-from-right pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold flex items-center gap-2 text-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {}, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 898,
                                    columnNumber: 141
                                }, this),
                                " Profil Saya"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 898,
                            columnNumber: 69
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsEditProfile(true),
                            className: "text-sm font-bold text-green-600 flex items-center gap-1 hover:underline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 898,
                                    columnNumber: 298
                                }, this),
                                " Edit"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 898,
                            columnNumber: 166
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 898,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group cursor-pointer",
                            onClick: ()=>document.getElementById('avatar-upload').click(),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 shadow-sm",
                                    children: profile?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: profile.avatar_url,
                                        alt: "Profile",
                                        className: "w-full h-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 903,
                                        columnNumber: 48
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-600",
                                        children: profile?.full_name?.charAt(0) || 'U'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 903,
                                        columnNumber: 136
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 902,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                        className: "text-white",
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 908,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 907,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 901,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            id: "avatar-upload",
                            className: "hidden",
                            accept: "image/*",
                            onChange: handleAvatarChange
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 911,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-400 mt-2",
                            children: "Klik foto untuk mengganti"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 912,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 900,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 text-gray-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-gray-50 rounded-lg border border-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-bold text-gray-500 uppercase",
                                            children: "Nama Lengkap"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 917,
                                            columnNumber: 87
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-lg text-gray-900",
                                            children: profile?.full_name
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 917,
                                            columnNumber: 168
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 917,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-gray-50 rounded-lg border border-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-bold text-gray-500 uppercase",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 918,
                                            columnNumber: 87
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-lg text-gray-900",
                                            children: profile?.email
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 918,
                                            columnNumber: 161
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 918,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-gray-50 rounded-lg border border-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-bold text-gray-500 uppercase",
                                            children: "NIK"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 919,
                                            columnNumber: 87
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-lg text-gray-900",
                                            children: profile?.nik || '-'
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 919,
                                            columnNumber: 159
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 919,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 bg-green-50 rounded-lg border border-green-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-bold text-green-700 uppercase",
                                            children: "RT / RW"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 920,
                                            columnNumber: 89
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-lg text-green-900",
                                            children: profile?.rt ? `${profile.rt} / ${profile.rw}` : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500 text-sm italic",
                                                children: "Belum diisi"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 920,
                                                columnNumber: 265
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 920,
                                            columnNumber: 166
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 920,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 916,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-gray-50 rounded-lg border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-xs font-bold text-gray-500 uppercase",
                                    children: "Alamat"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 922,
                                    columnNumber: 83
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-lg text-gray-900",
                                    children: profile?.address
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 922,
                                    columnNumber: 158
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 922,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 915,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 897,
            columnNumber: 31
        }, this);
    const renderHistory = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-sm p-6 border border-gray-200 animate-in slide-in-from-right pb-20 md:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-bold mb-6 flex items-center gap-2 text-gray-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {}, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 926,
                            columnNumber: 90
                        }, this),
                        " Riwayat Transaksi"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 926,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: pickupHistory.length > 0 ? pickupHistory.map((pickup, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center mb-3 hover:bg-gray-50 cursor-pointer transition gap-2",
                            onClick: ()=>setSelectedHistory(pickup),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-green-100 p-3 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 24,
                                                className: "text-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 927,
                                                columnNumber: 405
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 927,
                                            columnNumber: 360
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-bold text-gray-800",
                                                    children: pickup.type
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 927,
                                                    columnNumber: 463
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: [
                                                        pickup.date,
                                                        " • ",
                                                        pickup.time
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                    lineNumber: 927,
                                                    columnNumber: 519
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 927,
                                            columnNumber: 458
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 927,
                                    columnNumber: 319
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold text-lg text-gray-800",
                                    children: [
                                        "Rp ",
                                        pickup.fee.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 927,
                                    columnNumber: 601
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 927,
                            columnNumber: 103
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 text-gray-400",
                        children: "Belum ada riwayat."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 927,
                        columnNumber: 694
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 927,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
            lineNumber: 925,
            columnNumber: 31
        }, this);
    const renderContent = ()=>{
        switch(activePage){
            case 'dashboard':
                return renderDashboard();
            case 'request':
                return renderRequest();
            case 'history':
                return renderHistory();
            case 'pengaduan':
                return renderPengaduan();
            case 'iuran':
                return renderIuran();
            case 'tracking':
                return renderTracking();
            case 'edukasi':
                return renderEdukasi();
            case 'profile':
                return renderProfile();
            case 'notifikasi':
                return renderNotifikasi();
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "Halaman tidak ditemukan"
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 950,
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
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 953,
                columnNumber: 110
            }, this),
            " Memuat Data..."
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
        lineNumber: 953,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 flex font-sans text-gray-800 overflow-x-hidden",
        children: [
            isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40 md:hidden",
                onClick: ()=>setIsMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 955,
                columnNumber: 34
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} ${isSidebarOpen ? 'md:w-64' : 'md:w-20'} flex flex-col`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-16 md:h-20 flex items-center justify-between px-4 border-b border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen ? 'justify-center w-full px-0' : 'px-0'}`,
                                children: isSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col animate-in fade-in slide-in-from-left duration-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/logo.png",
                                            alt: "RecycleYuk",
                                            className: "w-36 h-auto object-contain mb-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 961,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold text-green-600 tracking-[0.2em] uppercase pl-1",
                                            children: "User App"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 962,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 960,
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
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 966,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -right-2 -bottom-2 bg-green-100 text-green-600 rounded-full p-0.5 shadow-sm border border-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 968,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 967,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 965,
                                    columnNumber: 38
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 959,
                                columnNumber: 21
                            }, this),
                            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: "hidden md:block p-2 rounded-lg hover:bg-gray-100 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 972,
                                    columnNumber: 162
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 972,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(false),
                                className: "md:hidden p-2 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 973,
                                    columnNumber: 112
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 973,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 957,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden",
                        children: SIDEBAR_MENUS.map((menu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigateTo(menu.id),
                                className: `w-full flex items-center rounded-xl font-medium transition-all duration-200 h-12 ${activePage === menu.id ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'} ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0 md:justify-center'} ${!isSidebarOpen && 'md:px-0'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(menu.icon, {
                                        size: 22,
                                        className: `min-w-[22px] ${activePage === menu.id ? 'text-green-600' : 'text-gray-400'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 975,
                                        columnNumber: 535
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${!isSidebarOpen ? 'md:hidden' : 'block'}`,
                                        children: menu.label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 975,
                                        columnNumber: 649
                                    }, this)
                                ]
                            }, menu.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 975,
                                columnNumber: 116
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 975,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-t border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: `w-full flex items-center rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all h-12 ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0 md:justify-center'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    size: 22,
                                    className: "min-w-[22px]"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 978,
                                    columnNumber: 25
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `${!isSidebarOpen ? 'md:hidden' : 'block'}`,
                                    children: "Keluar"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 978,
                                    columnNumber: 71
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 977,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 976,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 956,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: `flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300 w-full ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:hidden flex justify-between items-center mb-6 sticky top-0 bg-gray-50 z-30 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMobileMenuOpen(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    size: 28
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 983,
                                    columnNumber: 167
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 983,
                                columnNumber: 117
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-lg capitalize",
                                children: activePage
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 983,
                                columnNumber: 194
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold",
                                children: profile?.full_name?.charAt(0)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 983,
                                columnNumber: 260
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 983,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-5xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "hidden md:flex justify-between items-center mb-8 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-2xl font-bold capitalize text-gray-800",
                                                children: activePage === 'dashboard' ? 'Overview' : activePage.replace('-', ' ')
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 986,
                                                columnNumber: 30
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-500 text-sm",
                                                children: "Pantau aktivitas lingkunganmu."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 986,
                                                columnNumber: 167
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 986,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActivePage('notifikasi'),
                                                className: "p-2 rounded-lg hover:bg-gray-100 relative text-gray-600 group transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                        size: 20,
                                                        className: "group-hover:text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 989,
                                                        columnNumber: 33
                                                    }, this),
                                                    notifications.filter((n_4)=>!n_4.read).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 990,
                                                        columnNumber: 87
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 988,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-px h-6 bg-gray-200"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 992,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActivePage('profile'),
                                                className: "flex items-center gap-3 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-50 transition",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 overflow-hidden",
                                                        children: profile?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: profile.avatar_url,
                                                            alt: "Profile",
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                            lineNumber: 995,
                                                            columnNumber: 60
                                                        }, this) : profile?.full_name?.charAt(0) || 'U'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 994,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-left hidden md:block",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-bold text-gray-800 line-clamp-1 max-w-[100px]",
                                                                children: profile?.full_name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                                lineNumber: 998,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-0 text-gray-500",
                                                                children: "Warga"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                                lineNumber: 999,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                        lineNumber: 997,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                                lineNumber: 993,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 987,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                lineNumber: 985,
                                columnNumber: 21
                            }, this),
                            renderContent()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                        lineNumber: 984,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 982,
                columnNumber: 13
            }, this),
            isEditProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl p-6 w-full max-w-md shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg mb-4 text-gray-800",
                            children: "Edit Profil"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1011,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleUpdateProfile,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    name: "fullName",
                                    defaultValue: profile?.full_name,
                                    className: "w-full border p-2 rounded text-gray-800"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1013,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "rt",
                                            defaultValue: profile?.rt,
                                            className: "w-full border p-2 rounded text-gray-800",
                                            placeholder: "RT"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 1014,
                                            columnNumber: 69
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "rw",
                                            defaultValue: profile?.rw,
                                            className: "w-full border p-2 rounded text-gray-800",
                                            placeholder: "RW"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 1014,
                                            columnNumber: 184
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1014,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    name: "email",
                                    defaultValue: profile?.email,
                                    className: "w-full border p-2 rounded text-gray-800"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1015,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    name: "address",
                                    defaultValue: profile?.address,
                                    className: "w-full border p-2 rounded text-gray-800 h-24"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1016,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsEditProfile(false),
                                            className: "flex-1 py-2 border rounded",
                                            children: "Batal"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 1017,
                                            columnNumber: 57
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "flex-1 py-2 bg-green-600 text-white rounded",
                                            children: "Simpan"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                            lineNumber: 1017,
                                            columnNumber: 172
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1017,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1012,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 1010,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 1009,
                columnNumber: 31
            }, this),
            (selectedHistory || selectedArticle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl p-6 w-full max-w-md shadow-2xl max-h-[85vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between mb-4 border-b pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg text-gray-800",
                                    children: "Detail"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1025,
                                    columnNumber: 82
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setSelectedHistory(null);
                                        setSelectedArticle(null);
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 1028,
                                        columnNumber: 14
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1025,
                                    columnNumber: 141
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1025,
                            columnNumber: 25
                        }, this),
                        selectedHistory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 text-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "ID: ",
                                        selectedHistory.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1029,
                                    columnNumber: 86
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Status: ",
                                        selectedHistory.status
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1029,
                                    columnNumber: 117
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold text-green-600",
                                    children: [
                                        "Total: Rp ",
                                        selectedHistory.fee.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1029,
                                    columnNumber: 156
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1029,
                            columnNumber: 45
                        }, this),
                        selectedArticle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 text-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold",
                                    children: selectedArticle.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1030,
                                    columnNumber: 86
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: selectedArticle.desc
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1030,
                                    columnNumber: 140
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1030,
                            columnNumber: 45
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 1024,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 1023,
                columnNumber: 54
            }, this),
            paymentModal.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl w-full max-w-md p-6 text-center shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg text-gray-800",
                                    children: "Pembayaran"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1037,
                                    columnNumber: 68
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setPaymentModal({
                                            ...paymentModal,
                                            open: false
                                        }),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                        lineNumber: 1040,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1037,
                                    columnNumber: 131
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1037,
                            columnNumber: 25
                        }, this),
                        paymentModal.step === 'method' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-4 text-gray-800",
                                    children: [
                                        "Rp ",
                                        paymentModal.bill.amount.toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1041,
                                    columnNumber: 65
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: processPayment,
                                    className: "w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700",
                                    children: "Bayar Sekarang"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1041,
                                    columnNumber: 170
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1041,
                            columnNumber: 60
                        }, this),
                        paymentModal.step === 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "animate-spin mx-auto mb-2 text-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1042,
                                    columnNumber: 69
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Memproses pembayaran..."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1042,
                                    columnNumber: 133
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1042,
                            columnNumber: 64
                        }, this),
                        paymentModal.step === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                    className: "mx-auto mb-2 text-green-600",
                                    size: 40
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1043,
                                    columnNumber: 66
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-xl text-gray-800",
                                    children: "Berhasil!"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                                    lineNumber: 1043,
                                    columnNumber: 130
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                            lineNumber: 1043,
                            columnNumber: 61
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 1036,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 1035,
                columnNumber: 35
            }, this),
            activePickup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$components$2f$shared$2f$ChatModal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isChatOpen,
                onClose: ()=>setIsChatOpen(false),
                transactionId: activePickup.rawId,
                currentUserId: profile?.id,
                currentUserName: profile?.full_name,
                otherUserName: activePickup.driverName || 'Driver',
                isDriver: false
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 1048,
                columnNumber: 30
            }, this),
            activePickup?.rawStatus === 'Process' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsChatOpen(true),
                className: "fixed bottom-24 right-6 md:bottom-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition z-40 animate-bounce",
                title: "Chat dengan Driver",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    size: 24
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                    lineNumber: 1052,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
                lineNumber: 1051,
                columnNumber: 55
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/user/page.js",
        lineNumber: 954,
        columnNumber: 10
    }, this);
}
_s(UserDashboard, "qWZUHqgM3vNNjHUqdO03MH3KNbo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UserDashboard;
var _c;
__turbopack_context__.k.register(_c, "UserDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_RecycleYuk-revision_RecycleYuk_RecycleYuk_src_7ceb5c00._.js.map