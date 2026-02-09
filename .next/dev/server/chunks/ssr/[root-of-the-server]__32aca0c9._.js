module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/utils/enhancedHelpers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
// Helper functions untuk enhance existing features di RecycleYuk
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://bvigrmajwdfpavxmxefl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aWdybWFqd2RmcGF2eG14ZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTE2MzAsImV4cCI6MjA4MzIyNzYzMH0.Qii8jaaMgtH5Sq-C7YfpQ26AmGnMmh3aEbsTX8Ciyg0"));
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
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/truck.js [app-ssr] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-ssr] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/utils/enhancedHelpers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/sweetalert2/dist/sweetalert2.esm.all.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
// --- INISIALISASI SUPABASE ---
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://bvigrmajwdfpavxmxefl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aWdybWFqd2RmcGF2eG14ZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTE2MzAsImV4cCI6MjA4MzIyNzYzMH0.Qii8jaaMgtH5Sq-C7YfpQ26AmGnMmh3aEbsTX8Ciyg0"));
function AdminDashboard() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // --- 1. STATE MANAGEMENT ---
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activePage, setActivePage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    // Data States
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [drivers, setDrivers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [areas, setAreas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pickups, setPickups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Filter & UI States
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterCategory, setFilterCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All');
    const [financeStats, setFinanceStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        income: 0,
        expense: 0
    });
    const [reportFilter, setReportFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        date: '',
        status: 'All'
    });
    // Settings State
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        tariff: 15000,
        opStart: '08:00',
        opEnd: '17:00',
        emailNotif: true
    });
    // Modal States
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalType, setModalType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingItem, setEditingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // --- 2. MENU CONFIGURATION ---
    const SIDEBAR_MENUS = [
        {
            id: 'dashboard',
            label: 'Ringkasan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        {
            id: 'users',
            label: 'Manajemen User',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            id: 'drivers',
            label: 'Manajemen Driver',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
        },
        {
            id: 'pickups',
            label: 'Pengangkutan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"]
        },
        {
            id: 'areas',
            label: 'Wilayah',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        },
        {
            id: 'reports',
            label: 'Laporan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
        },
        {
            id: 'finance',
            label: 'Keuangan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
        },
        {
            id: 'settings',
            label: 'Pengaturan Sistem',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
        }
    ];
    // --- 3. CORE LOGIC & EFFECTS ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const timer = setInterval(()=>{
            setCurrentTime(new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            }));
        }, 1000);
        // --- TAMBAHAN: Load Midtrans Snap Script (Sandbox) ---
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = ("TURBOPACK compile-time value", "Mid-client-zVn1_jq4GqVUHzoj") || "SB-Mid-client-XXXXXX"; // Ganti dengan Client Key Anda
        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey);
        script.async = true;
        document.body.appendChild(script);
        fetchAllData();
        return ()=>{
            clearInterval(timer);
            document.body.removeChild(script);
        };
    }, []);
    const fetchAllData = async ()=>{
        setLoading(true);
        try {
            // A. User Profile (Admin)
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setCurrentUser({
                ...user,
                ...profile,
                newPassword: ''
            });
            // B. App Settings
            const { data: settingData } = await supabase.from('app_settings').select('*').single();
            if (settingData) {
                setSettings({
                    tariff: settingData.tariff_per_kg,
                    opStart: settingData.operational_start,
                    opEnd: settingData.operational_end,
                    emailNotif: settingData.email_notification
                });
            }
            // C. Notifications
            const { data: notifData } = await supabase.from('notifications').select('*').order('created_at', {
                ascending: false
            });
            if (notifData) setNotifications(notifData);
            // D. Data Master
            const { data: userData } = await supabase.from('profiles').select('*').order('created_at', {
                ascending: false
            });
            if (userData) setUsers(userData);
            const { data: driverData } = await supabase.from('drivers').select('*').order('created_at', {
                ascending: false
            });
            if (driverData) setDrivers(driverData);
            const { data: areaData } = await supabase.from('areas').select('*, drivers(name)').order('created_at', {
                ascending: false
            });
            if (areaData) setAreas(areaData);
            const { data: trxData } = await supabase.from('transactions').select('*, profiles(full_name, address), waste_types(name)').order('created_at', {
                ascending: false
            });
            if (trxData) {
                setTransactions(trxData);
                const mappedPickups = trxData.map((item)=>({
                        id: item.id,
                        date: new Date(item.created_at).toLocaleDateString('id-ID'),
                        user: item.profiles?.full_name || 'Tanpa Nama',
                        area: item.profiles?.address || 'Belum ada alamat',
                        type: item.waste_types?.name || 'Umum',
                        weight: item.weight,
                        weightLabel: `${item.weight} kg`,
                        status: item.status,
                        driver: item.driver_name || '-',
                        price: item.total_price
                    }));
                setPickups(mappedPickups);
                // Hitung Keuangan
                const totalIncome = trxData.reduce((acc, curr)=>acc + (curr.total_price || 0), 0);
                setFinanceStats({
                    income: totalIncome,
                    expense: totalIncome * 0.3
                });
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally{
            setLoading(false);
        }
    };
    // --- 4. HANDLERS (CRUD & ACTIONS) ---
    const handleLogout = async ()=>{
        await supabase.auth.signOut();
        router.push('/login');
    };
    // --- EXPORT EXCEL HANDLER ---
    const handleExportExcel = async (data)=>{
        if (!data || data.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Info', 'Tidak ada data untuk diexport', 'info');
            return;
        }
        const exportData = data.map((r)=>({
                'Tanggal': r.date || '-',
                'User': r.user || '-',
                'Wilayah': r.area || '-',
                'Berat': r.weightLabel || '-',
                'Driver': r.driver || '-',
                'Status': r.status
            }));
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exportToExcel"])(exportData, 'laporan_admin');
        if (success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Laporan berhasil diexport ke CSV!', 'success');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Gagal', 'Gagal export laporan', 'error');
        }
    };
    // --- TAMBAHAN: Handler Pembayaran Midtrans ---
    const handlePayment = async (pickupItem)=>{
        // Cek apakah Snap sudah terload
        if (!window.snap) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Loading', 'Sistem pembayaran sedang dimuat, coba sesaat lagi.', 'info');
            return;
        }
        // CATATAN PENTING UNTUK DEVELOPER:
        // Di aplikasi nyata, Anda TIDAK BOLEH menaruh Server Key di frontend.
        // Anda harus membuat API route (backend) yang me-request Token ke Midtrans,
        // lalu mengirim Token tersebut ke frontend.
        // Simulasi Logika:
        try {
            // 1. Panggil API Backend Anda untuk mendapatkan SNAP TOKEN
            // const response = await fetch('/api/midtrans/token', { body: JSON.stringify(pickupItem) });
            // const { token } = await response.json();
            // KARENA INI HANYA CONTOH FRONTEND TANPA BACKEND API ROUTE:
            // Kita akan tampilkan alert simulasi.
            const dummyToken = prompt("Masukkan Snap Token (Didapat dari Backend Anda):", "Masukan_Token_Disini");
            if (dummyToken && dummyToken !== "Masukan_Token_Disini") {
                window.snap.pay(dummyToken, {
                    onSuccess: async function(result) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Berhasil', 'Pembayaran Berhasil!', 'success');
                        // Update status di Supabase
                        await supabase.from('transactions').update({
                            status: 'Done'
                        }).eq('id', pickupItem.id);
                        fetchAllData();
                    },
                    onPending: function(result) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Pending', 'Menunggu pembayaran!', 'info');
                    },
                    onError: function(result) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Gagal', 'Pembayaran gagal!', 'error');
                    },
                    onClose: function() {
                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Tutup', 'Anda menutup popup pembayaran.', 'warning');
                    }
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Mode Sandbox', "Fitur Sandbox Aktif!\n\nUntuk memunculkan Popup Pembayaran Asli, Anda perlu:\n1. Membuat API Backend untuk generate 'Snap Token'.\n2. Memasukkan token tersebut ke fungsi window.snap.pay(token).", 'info');
            }
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', 'Gagal memproses pembayaran', 'error');
        }
    };
    const handleSave = async (e)=>{
        e.preventDefault();
        try {
            let error;
            if (modalType === 'driver') {
                const payload = {
                    name: formData.name,
                    vehicle: formData.vehicle,
                    shift: formData.shift,
                    status: formData.status
                };
                // Jika EDIT, update berdasarkan ID driver (editingItem.id)
                // Jika BARU, kita HARUS pakai userId dari dropdown sebagai ID driver agar sinkron dengan auth.users
                let query;
                if (editingItem) {
                    query = supabase.from('drivers').update(payload).eq('id', editingItem.id);
                } else {
                    if (!formData.userId) throw new Error("Pilih user terlebih dahulu!");
                    // Pakai userId sebagai ID di tabel drivers
                    query = supabase.from('drivers').insert([
                        {
                            ...payload,
                            id: formData.userId
                        }
                    ]);
                }
                ({ error } = await query);
            } else if (modalType === 'area') {
                const payload = {
                    kelurahan: formData.kelurahan,
                    rw: formData.rw,
                    rt: formData.rt,
                    driver_id: formData.driverId || null
                };
                const query = editingItem ? supabase.from('areas').update(payload).eq('id', editingItem.id) : supabase.from('areas').insert([
                    payload
                ]);
                ({ error } = await query);
            } else if (modalType === 'user') {
                ({ error } = await supabase.from('profiles').update({
                    full_name: formData.name,
                    role: formData.role,
                    alamat: formData.region,
                    rt: formData.rt,
                    rw: formData.rw
                }).eq('id', editingItem.id));
            } else if (modalType === 'pickup') {
                ({ error } = await supabase.from('transactions').update({
                    status: formData.status,
                    driver_name: formData.driver
                }).eq('id', editingItem.id));
            }
            if (error) throw error;
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Data berhasil disimpan!', 'success');
            setIsModalOpen(false);
            fetchAllData();
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', "Gagal: " + err.message, 'error');
        }
    };
    const handleDelete = async (id, type)=>{
        const result = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
            title: 'Hapus data ini?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus!'
        });
        if (!result.isConfirmed) return;
        try {
            const table = type === 'driver' ? 'drivers' : type === 'area' ? 'areas' : type === 'notif' ? 'notifications' : '';
            if (table) await supabase.from(table).delete().eq('id', id);
            if (type === 'notif') setNotifications((prev)=>prev.filter((n)=>n.id !== id));
            else fetchAllData();
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Terhapus!', 'Data berhasil dihapus.', 'success');
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', err.message, 'error');
        }
    };
    const handleSaveSettings = async ()=>{
        try {
            await supabase.from('app_settings').update({
                tariff_per_kg: settings.tariff,
                operational_start: settings.opStart,
                operational_end: settings.opEnd,
                email_notification: settings.emailNotif
            }).eq('id', 1);
            await supabase.from('notifications').insert([
                {
                    title: 'Pengaturan Diubah',
                    message: `Tarif baru: Rp ${settings.tariff}`,
                    type: 'info'
                }
            ]);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Pengaturan sistem berhasil disimpan!', 'success');
            fetchAllData();
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', err.message, 'error');
        }
    };
    const handleUpdateProfile = async (e)=>{
        e.preventDefault();
        try {
            await supabase.from('profiles').update({
                full_name: currentUser.full_name,
                alamat: currentUser.alamat
            }).eq('id', currentUser.id);
            if (currentUser.newPassword?.length >= 6) {
                await supabase.auth.updateUser({
                    password: currentUser.newPassword
                });
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Profil Admin berhasil diperbarui!', 'success');
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', err.message, 'error');
        }
    };
    const handleAvatarChange = async (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire({
                title: 'Mengupload...',
                text: 'Mohon tunggu sebentar',
                allowOutsideClick: false,
                didOpen: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].showLoading()
            });
            const publicUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadAvatar"])(file, currentUser.id);
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
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Foto profil berhasil diperbarui!', 'success');
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', 'Gagal upload foto: ' + err.message, 'error');
        }
    };
    const handleMarkRead = async (id)=>{
        await supabase.from('notifications').update({
            is_read: true
        }).eq('id', id);
        setNotifications((prev)=>prev.map((n)=>n.id === id ? {
                    ...n,
                    is_read: true
                } : n));
    };
    const handleVerifyDriver = async (driverId, newStatus)=>{
        try {
            const { error } = await supabase.from('drivers').update({
                verification_status: newStatus
            }).eq('id', driverId);
            if (error) throw error;
            setDrivers((prev)=>prev.map((d)=>d.id === driverId ? {
                        ...d,
                        verification_status: newStatus
                    } : d));
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', `Status driver berhasil diubah menjadi ${newStatus}`, 'success');
        // Kirim notifikasi ke driver (bisa via tabel notif, disini simulasi alert sukses saja)
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', 'Gagal update status verifikasi: ' + err.message, 'error');
        }
    };
    // Helper Functions
    const formatRupiah = (num)=>new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num);
    const unreadCount = notifications.filter((n)=>!n.is_read).length;
    const openModal = (type, item = null)=>{
        setModalType(type);
        setEditingItem(item);
        setIsModalOpen(true);
        if (item) {
            if (type === 'area') setFormData({
                ...item,
                driverId: item.driver_id
            });
            else if (type === 'user') setFormData({
                name: item.full_name,
                role: item.role,
                region: item.alamat,
                ...item
            });
            else setFormData({
                ...item
            });
        } else {
            if (type === 'driver') setFormData({
                status: 'Off Duty',
                shift: 'Shift 1 (08:00 - 12:00)'
            });
            else setFormData({});
        }
    };
    // --- 5. RENDERERS (UI COMPONENTS) ---
    const renderDashboard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in fade-in text-gray-800",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-bold mb-2",
                                    children: "Dashboard Admin 👋"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 402,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Ringkasan aktivitas sistem RecycleYuk hari ini."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 403,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 401,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 406,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 400,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-6",
                    children: [
                        {
                            l: 'Total User',
                            v: users.length,
                            i: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                            c: 'blue'
                        },
                        {
                            l: 'Pickup Aktif',
                            v: pickups.filter((p)=>p.status !== 'Done').length,
                            i: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"],
                            c: 'green'
                        },
                        {
                            l: 'Laporan Baru',
                            v: notifications.filter((n)=>!n.is_read).length,
                            i: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
                            c: 'red'
                        },
                        {
                            l: 'Pendapatan',
                            v: formatRupiah(financeStats.income),
                            i: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
                            c: 'purple'
                        }
                    ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-sm font-medium",
                                            children: s.l
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 416,
                                            columnNumber: 30
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold text-gray-800",
                                            children: s.v
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 416,
                                            columnNumber: 88
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 416,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `bg-${s.c}-50 p-3 rounded-lg text-${s.c}-600`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(s.i, {
                                        size: 28
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 417,
                                        columnNumber: 88
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 417,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 415,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 408,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 border-b border-gray-100 flex justify-between items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-gray-800 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 18,
                                                    className: "text-blue-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 427,
                                                    columnNumber: 89
                                                }, this),
                                                " Aktivitas Terbaru"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 427,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActivePage('reports'),
                                            className: "text-sm text-blue-600 hover:underline",
                                            children: "Lihat Semua"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 428,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 426,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "divide-y divide-gray-100",
                                    children: [
                                        transactions.slice(0, 5).map((trx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 hover:bg-gray-50 transition flex items-center gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `p-2 rounded-full ${trx.status === 'Done' ? 'bg-green-100 text-green-600' : trx.status === 'Process' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`,
                                                        children: trx.status === 'Done' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 437,
                                                            columnNumber: 62
                                                        }, this) : trx.status === 'Process' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 438,
                                                            columnNumber: 68
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 439,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 433,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-bold text-gray-800",
                                                                children: trx.status === 'Pending' ? 'Permintaan Pickup Baru' : trx.status === 'Process' ? 'Sedang Dijemput' : 'Pickup Selesai'
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                lineNumber: 442,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: [
                                                                    trx.profiles?.full_name,
                                                                    " • ",
                                                                    trx.waste_types?.name,
                                                                    " (",
                                                                    trx.weight,
                                                                    " kg)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                lineNumber: 446,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 441,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-right",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-medium text-gray-400",
                                                            children: new Date(trx.created_at).toLocaleTimeString('id-ID', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 451,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 450,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, trx.id, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 432,
                                                columnNumber: 29
                                            }, this)),
                                        transactions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-8 text-center text-gray-400",
                                            children: "Belum ada aktivitas"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 458,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 430,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 425,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-gray-800 mb-4 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                            size: 18,
                                            className: "text-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 465,
                                            columnNumber: 90
                                        }, this),
                                        " Quick Actions"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 465,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>openModal('driver'),
                                            className: "w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-green-50 hover:text-green-700 rounded-xl transition border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-green-100 p-2 rounded-lg text-green-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 468,
                                                        columnNumber: 89
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 468,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-sm",
                                                    children: "Tambah Driver Baru"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 469,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 467,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>openModal('area'),
                                            className: "w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-blue-100 p-2 rounded-lg text-blue-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 472,
                                                        columnNumber: 87
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 472,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-sm",
                                                    children: "Tambah Wilayah"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 473,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 471,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActivePage('pickups'),
                                            className: "w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-orange-100 p-2 rounded-lg text-orange-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 476,
                                                        columnNumber: 91
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 476,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-sm",
                                                    children: "Kelola Pickup"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 477,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 475,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActivePage('settings'),
                                            className: "w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-purple-100 p-2 rounded-lg text-purple-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                        size: 18
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 480,
                                                        columnNumber: 91
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 480,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-sm",
                                                    children: "Pengaturan Tarif"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 481,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 479,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 466,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 464,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 423,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg mb-4 text-gray-800 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 489,
                                            columnNumber: 98
                                        }, this),
                                        " Aktivitas Terbaru"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 489,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-sm text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                className: "bg-gray-50 text-gray-500",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-3",
                                                            children: "User"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 492,
                                                            columnNumber: 77
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-3",
                                                            children: "Berat"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 492,
                                                            columnNumber: 106
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "p-3",
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 492,
                                                            columnNumber: 136
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 492,
                                                    columnNumber: 73
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 492,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: pickups.slice(0, 5).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-b hover:bg-gray-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-3 font-medium text-gray-800",
                                                                children: p.user
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                lineNumber: 496,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-3 text-gray-600",
                                                                children: p.weightLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                lineNumber: 497,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "p-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-2 py-1 rounded text-xs font-bold ${p.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`,
                                                                    children: p.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                    lineNumber: 498,
                                                                    columnNumber: 61
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                lineNumber: 498,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 495,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 493,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 491,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 490,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 488,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg mb-4 text-gray-800 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 506,
                                            columnNumber: 98
                                        }, this),
                                        " Status Driver"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 506,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 max-h-[300px] overflow-y-auto pr-2",
                                    children: drivers.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500",
                                                            children: d.name.charAt(0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 511,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-gray-800",
                                                                    children: d.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                    lineNumber: 512,
                                                                    columnNumber: 42
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                    lineNumber: 512,
                                                                    columnNumber: 99
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: d.vehicle
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                    lineNumber: 512,
                                                                    columnNumber: 105
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 512,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 510,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-2 py-1 rounded text-xs font-bold ${d.status === 'On Duty' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`,
                                                    children: d.status
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 514,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, d.id, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 509,
                                            columnNumber: 29
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 507,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 505,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 487,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 399,
            columnNumber: 9
        }, this);
    const renderUsers = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "text-gray-400",
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 527,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Cari user...",
                                className: "w-full outline-none text-sm bg-transparent text-gray-800",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 527,
                                columnNumber: 67
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 526,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 525,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-left text-sm text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-gray-50 text-gray-600 border-b",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-4",
                                            children: "Nama User"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 532,
                                            columnNumber: 78
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-4",
                                            children: "Role"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 532,
                                            columnNumber: 112
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-4",
                                            children: "Alamat"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 532,
                                            columnNumber: 141
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "p-4 text-right",
                                            children: "Aksi"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 532,
                                            columnNumber: 172
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 532,
                                    columnNumber: 74
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 532,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: users.filter((u)=>(u.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-bold",
                                                        children: u.full_name || 'Tanpa Nama'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 536,
                                                        columnNumber: 53
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: u.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 536,
                                                        columnNumber: 115
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 536,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-gray-100 px-2 py-1 rounded uppercase text-xs font-bold text-gray-700",
                                                    children: u.role
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 537,
                                                    columnNumber: 53
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 537,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4 text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: u.alamat || '-'
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 539,
                                                        columnNumber: 37
                                                    }, this),
                                                    (u.rt || u.rw) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-green-600 font-bold mt-1",
                                                        children: [
                                                            "RT ",
                                                            u.rt,
                                                            " / RW ",
                                                            u.rw
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 540,
                                                        columnNumber: 56
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 538,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4 text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>openModal('user', u),
                                                        className: "text-blue-600 hover:bg-blue-50 p-2 rounded transition",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 543,
                                                            columnNumber: 148
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 543,
                                                        columnNumber: 37
                                                    }, this),
                                                    !drivers.some((d)=>d.id === u.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setModalType('driver');
                                                            setEditingItem(null);
                                                            setIsModalOpen(true);
                                                            setFormData({
                                                                userId: u.id,
                                                                name: u.full_name,
                                                                status: 'Off Duty',
                                                                shift: 'Shift 1 (08:00 - 12:00)'
                                                            });
                                                        },
                                                        className: "ml-2 text-green-600 hover:bg-green-50 p-2 rounded transition",
                                                        title: "Promote to Driver",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 555,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 545,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 542,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, u.id, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 535,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 533,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 531,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 530,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 524,
            columnNumber: 9
        }, this);
    const renderDrivers = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg text-gray-800",
                            children: "List Driver"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 570,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>openModal('driver'),
                            className: "bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex gap-2 hover:bg-green-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 571,
                                    columnNumber: 158
                                }, this),
                                " Tambah Driver"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 571,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 569,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: drivers.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group hover:shadow-md transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-4 right-4 flex gap-1 opacity-100 transition-opacity",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>openModal('driver', d),
                                            className: "p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 577,
                                                columnNumber: 146
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 577,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleDelete(d.id, 'driver'),
                                            className: "p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 578,
                                                columnNumber: 149
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 578,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 576,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-500",
                                            children: d.name.charAt(0)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 581,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-bold text-lg text-gray-800",
                                                    children: d.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 583,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500",
                                                    children: d.vehicle
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 584,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `text-xs px-2 py-0.5 rounded-full w-fit mt-1 font-bold ${d.verification_status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`,
                                                    children: d.verification_status === 'verified' ? 'Terverifikasi' : d.verification_status === 'rejected' ? 'Ditolak' : 'Menunggu Verifikasi'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 585,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 582,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 580,
                                    columnNumber: 25
                                }, this),
                                d.verification_status !== 'verified' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleVerifyDriver(d.id, 'verified'),
                                            className: "flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-700",
                                            children: "Verifikasi"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 594,
                                            columnNumber: 33
                                        }, this),
                                        d.verification_status !== 'rejected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleVerifyDriver(d.id, 'rejected'),
                                            className: "flex-1 bg-red-50 text-red-600 border border-red-200 py-2 rounded-lg text-xs font-bold hover:bg-red-100",
                                            children: "Tolak"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 596,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 593,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center text-sm border-t pt-3 border-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium",
                                            children: d.shift
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 602,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `px-3 py-1 rounded-full font-bold ${d.status === 'On Duty' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`,
                                            children: d.status
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 603,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 601,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, d.id, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 575,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 573,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 568,
            columnNumber: 9
        }, this);
    const renderAreas = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg text-gray-800",
                            children: "Data Wilayah"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 614,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>openModal('area'),
                            className: "bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex gap-2 hover:bg-green-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 615,
                                    columnNumber: 156
                                }, this),
                                " Tambah Wilayah"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 615,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 613,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: areas.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative group hover:shadow-md transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-4 right-4 flex gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>openModal('area', a),
                                            className: "p-1.5 text-blue-600 hover:bg-blue-50 rounded",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 621,
                                                columnNumber: 131
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 621,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleDelete(a.id, 'area'),
                                            className: "p-1.5 text-red-600 hover:bg-red-50 rounded",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 622,
                                                columnNumber: 135
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 622,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 620,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold text-xl mb-1 text-gray-800",
                                    children: a.kelurahan
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 624,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 text-sm text-gray-600 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-100 px-2 py-1 rounded",
                                            children: [
                                                "RW: ",
                                                a.rw
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 626,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-gray-100 px-2 py-1 rounded",
                                            children: [
                                                "RT: ",
                                                a.rt
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 627,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 625,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-4 border-t border-gray-100 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 text-xs uppercase font-bold mb-1",
                                            children: "Penanggung Jawab"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 630,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold text-gray-800 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                    size: 16,
                                                    className: "text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 631,
                                                    columnNumber: 92
                                                }, this),
                                                " ",
                                                a.drivers?.name || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500 italic",
                                                    children: "Belum assign"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 631,
                                                    columnNumber: 159
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 631,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 629,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, a.id, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 619,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 617,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 612,
            columnNumber: 9
        }, this);
    const renderPickups = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-lg text-gray-800",
                            children: "Manajemen Pengangkutan"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 642,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "border p-2 rounded-lg text-sm text-gray-800 bg-gray-50 outline-none",
                                onChange: (e)=>setFilterCategory(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "All",
                                        children: "Semua Status"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 645,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Pending",
                                        children: "Pending"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 645,
                                        columnNumber: 66
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "Done",
                                        children: "Selesai"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 645,
                                        columnNumber: 106
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 644,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 643,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 641,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: pickups.filter((p)=>filterCategory === 'All' || p.status === filterCategory).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-lg text-gray-800",
                                                    children: p.area
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 654,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full",
                                                    children: p.date
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 655,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 653,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: [
                                                p.user,
                                                " • ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: p.weightLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 657,
                                                    columnNumber: 77
                                                }, this),
                                                " • ",
                                                formatRupiah(p.price)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 657,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mt-2 text-sm text-green-700 bg-green-50 w-fit px-3 py-1 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 659,
                                                    columnNumber: 33
                                                }, this),
                                                " Driver: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: p.driver
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 659,
                                                    columnNumber: 61
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 658,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 652,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row items-center gap-3 w-full md:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`,
                                            children: p.status
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 663,
                                            columnNumber: 29
                                        }, this),
                                        p.status !== 'Done' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handlePayment(p),
                                            className: "text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold flex items-center gap-2 w-full md:w-auto",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 671,
                                                    columnNumber: 37
                                                }, this),
                                                " Bayar (Midtrans)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 667,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>openModal('pickup', p),
                                            className: "text-sm bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium w-full md:w-auto",
                                            children: "Update Status"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 675,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 662,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, p.id, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 651,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 649,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 640,
            columnNumber: 9
        }, this);
    const renderReports = ()=>{
        const filteredData = pickups.filter((item)=>{
            const matchStatus = reportFilter.status === 'All' ? true : item.status === reportFilter.status;
            const matchDate = reportFilter.date ? item.date.includes(new Date(reportFilter.date).toLocaleDateString('id-ID')) : true;
            return matchStatus && matchDate;
        });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200 gap-4 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 items-center w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 border p-2 rounded-lg bg-gray-50 w-full md:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            size: 18,
                                            className: "text-gray-500"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 695,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            className: "bg-transparent text-sm outline-none text-gray-800 w-full",
                                            value: reportFilter.date,
                                            onChange: (e)=>setReportFilter({
                                                    ...reportFilter,
                                                    date: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 696,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 694,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "bg-gray-50 border p-2 rounded-lg text-sm text-gray-800 outline-none",
                                    value: reportFilter.status,
                                    onChange: (e)=>setReportFilter({
                                            ...reportFilter,
                                            status: e.target.value
                                        }),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "All",
                                            children: "Semua Status"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 699,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Done",
                                            children: "Selesai"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 699,
                                            columnNumber: 70
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Pending",
                                            children: "Pending"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 699,
                                            columnNumber: 107
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 698,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 693,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleExportExcel(filteredData),
                            className: "bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex gap-2 items-center hover:bg-green-700 font-bold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 702,
                                    columnNumber: 195
                                }, this),
                                " Export Excel"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 702,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 692,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b bg-gray-50 font-bold text-gray-700",
                            children: "Laporan Pengangkutan"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 705,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left text-sm text-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4",
                                                children: "Tanggal"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 707,
                                                columnNumber: 57
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4",
                                                children: "User / Wilayah"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 707,
                                                columnNumber: 89
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4",
                                                children: "Berat"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 707,
                                                columnNumber: 128
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4",
                                                children: "Driver"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 707,
                                                columnNumber: 158
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 707,
                                                columnNumber: 189
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 707,
                                        columnNumber: 32
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 707,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: filteredData.length > 0 ? filteredData.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b hover:bg-gray-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4",
                                                    children: r.date
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 711,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 font-medium",
                                                    children: [
                                                        r.user,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 712,
                                                            columnNumber: 77
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500 font-normal",
                                                            children: r.area
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 712,
                                                            columnNumber: 83
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 712,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 font-bold",
                                                    children: r.weightLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 713,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4",
                                                    children: r.driver
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 713,
                                                    columnNumber: 87
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 rounded text-xs font-bold ${r.status === 'Done' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`,
                                                        children: r.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 714,
                                                        columnNumber: 57
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 714,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, r.id, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 710,
                                            columnNumber: 33
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: "5",
                                            className: "p-8 text-center text-gray-400",
                                            children: "Data tidak ditemukan."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 716,
                                            columnNumber: 38
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 716,
                                        columnNumber: 34
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 708,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 706,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 704,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 691,
            columnNumber: 13
        }, this);
    };
    const renderFinance = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-green-800 font-medium mb-1",
                                    children: "Total Pemasukan"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 728,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-3xl font-bold text-green-900",
                                    children: formatRupiah(financeStats.income)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 729,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-green-600 mt-2 flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 730,
                                            columnNumber: 88
                                        }, this),
                                        " Dari transaksi selesai"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 730,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 727,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-red-800 font-medium mb-1",
                                    children: "Estimasi Pengeluaran (30%)"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 733,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-3xl font-bold text-red-900",
                                    children: formatRupiah(financeStats.expense)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 734,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-600 mt-2 flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 735,
                                            columnNumber: 86
                                        }, this),
                                        " Biaya operasional & gaji"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 735,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 732,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 726,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-gray-50 font-bold border-b text-gray-700",
                            children: "Rincian Transaksi"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 739,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left text-sm text-gray-800",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: transactions.slice(0, 10).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b hover:bg-gray-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: "Retribusi Sampah"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 745,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 746,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-500",
                                                        children: new Date(t.created_at).toLocaleDateString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 746,
                                                        columnNumber: 43
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 744,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "p-4 font-bold text-green-600 text-right",
                                                children: [
                                                    "+ ",
                                                    formatRupiah(t.total_price)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 748,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, t.id, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 743,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 741,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 740,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 738,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 725,
            columnNumber: 9
        }, this);
    // --- 7. NEW RENDERS: SETTINGS & PROFILE (SEPARATED) ---
    // Halaman Pengaturan Sistem (General)
    const renderSettings = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right text-gray-800",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-xl shadow-sm border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-xl mb-6 flex items-center gap-2 text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 763,
                                columnNumber: 94
                            }, this),
                            " Konfigurasi Sistem"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 763,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 p-4 rounded-lg border border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold mb-2 text-gray-600",
                                        children: "Tarif Retribusi (Per Kg)"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 766,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-gray-200 border border-r-0 rounded-l px-3 py-2 text-gray-600 font-bold",
                                                children: "Rp"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 767,
                                                columnNumber: 60
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                className: "w-full border p-2 rounded-r text-gray-800 focus:ring-2 ring-green-500 outline-none",
                                                value: settings.tariff,
                                                onChange: (e)=>setSettings({
                                                        ...settings,
                                                        tariff: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 767,
                                                columnNumber: 161
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 767,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 765,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 p-4 rounded-lg border border-gray-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold mb-2 text-gray-600",
                                        children: "Notifikasi Email"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 770,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between bg-white p-2 rounded border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium ml-2",
                                                children: "Aktifkan notifikasi?"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 771,
                                                columnNumber: 104
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSettings({
                                                        ...settings,
                                                        emailNotif: !settings.emailNotif
                                                    }),
                                                className: `w-12 h-6 rounded-full relative transition-colors ${settings.emailNotif ? 'bg-green-500' : 'bg-gray-300'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.emailNotif ? 'right-1' : 'left-1'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 771,
                                                    columnNumber: 380
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 771,
                                                columnNumber: 174
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 771,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 769,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 764,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-6 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold mb-1 text-gray-600",
                                        children: "Jam Buka"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 775,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "time",
                                        className: "w-full border p-2 rounded bg-white text-gray-800",
                                        value: settings.opStart,
                                        onChange: (e)=>setSettings({
                                                ...settings,
                                                opStart: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 775,
                                        columnNumber: 104
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 775,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold mb-1 text-gray-600",
                                        children: "Jam Tutup"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 776,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "time",
                                        className: "w-full border p-2 rounded bg-white text-gray-800",
                                        value: settings.opEnd,
                                        onChange: (e)=>setSettings({
                                                ...settings,
                                                opEnd: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 776,
                                        columnNumber: 105
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 776,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 774,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSaveSettings,
                        className: "w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex justify-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 778,
                                columnNumber: 179
                            }, this),
                            " Simpan Pengaturan Sistem"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 778,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                lineNumber: 762,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 761,
            columnNumber: 9
        }, this);
    // Halaman Profil Admin (Dedicated)
    const renderProfile = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto space-y-6 animate-in slide-in-from-right text-gray-800",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-xl shadow-sm border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-xl mb-6 flex items-center gap-2 text-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 787,
                                columnNumber: 94
                            }, this),
                            " Edit Profil Admin"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 787,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group cursor-pointer",
                                onClick: ()=>document.getElementById('admin-avatar-upload').click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 shadow-sm",
                                        children: currentUser?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: currentUser.avatar_url,
                                            alt: "Profile",
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 793,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-600",
                                            children: currentUser?.full_name?.charAt(0) || 'A'
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 795,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 791,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                            className: "text-white",
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 801,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 800,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 790,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                id: "admin-avatar-upload",
                                className: "hidden",
                                accept: "image/*",
                                onChange: handleAvatarChange
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 804,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 mt-2",
                                children: "Klik foto untuk mengganti"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 805,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 789,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleUpdateProfile,
                        className: "space-y-5 max-w-xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold mb-1 text-gray-600",
                                        children: "Email (Read Only)"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 809,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        disabled: true,
                                        className: "w-full border p-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed",
                                        value: currentUser?.email || ''
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 809,
                                        columnNumber: 113
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 809,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold mb-1 text-gray-600",
                                        children: "Nama Lengkap"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 810,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full border p-2 rounded bg-white text-gray-800",
                                        value: currentUser?.full_name || '',
                                        onChange: (e)=>setCurrentUser({
                                                ...currentUser,
                                                full_name: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 810,
                                        columnNumber: 108
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 810,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold mb-1 text-gray-600",
                                        children: "Alamat"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 811,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "w-full border p-2 rounded bg-white text-gray-800 h-24 resize-none",
                                        value: currentUser?.alamat || '',
                                        onChange: (e)=>setCurrentUser({
                                                ...currentUser,
                                                alamat: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 811,
                                        columnNumber: 102
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 811,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-4 border-t border-gray-100 mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-bold text-sm mb-3 flex items-center gap-2 text-orange-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 812,
                                                columnNumber: 152
                                            }, this),
                                            " Keamanan Akun"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 812,
                                        columnNumber: 73
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        className: "w-full border p-2 rounded bg-white text-gray-800",
                                        placeholder: "Password Baru (Min 6 karakter, Kosongkan jika tidak ubah)",
                                        onChange: (e)=>setCurrentUser({
                                                ...currentUser,
                                                newPassword: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 812,
                                        columnNumber: 191
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 812,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition mt-4 w-full",
                                children: "Simpan Perubahan Profil"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 813,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 808,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                lineNumber: 786,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 785,
            columnNumber: 9
        }, this);
    const renderNotifications = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-in slide-in-from-right max-w-3xl mx-auto text-gray-800",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-xl",
                            children: "Pusat Notifikasi"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 821,
                            columnNumber: 56
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold",
                            children: [
                                unreadCount,
                                " Baru"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 821,
                            columnNumber: 111
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 821,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-gray-400",
                        children: "Tidak ada notifikasi."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 823,
                        columnNumber: 47
                    }, this) : notifications.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>handleMarkRead(n.id),
                            className: `p-4 border-b flex gap-4 cursor-pointer hover:bg-gray-50 transition ${!n.is_read ? 'bg-green-50' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-2 rounded-full h-fit ${n.type === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 825,
                                        columnNumber: 152
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 825,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: `font-bold text-sm ${!n.is_read ? 'text-green-800' : 'text-gray-700'}`,
                                                    children: n.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 827,
                                                    columnNumber: 67
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-400",
                                                    children: new Date(n.created_at).toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 827,
                                                    columnNumber: 168
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 827,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600 mt-1",
                                            children: n.message
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 828,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 826,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handleDelete(n.id, 'notif');
                                    },
                                    className: "text-gray-400 hover:text-red-500",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 830,
                                        columnNumber: 148
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 830,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, n.id, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 824,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 822,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
            lineNumber: 820,
            columnNumber: 9
        }, this);
    // --- 8. MAIN RENDER SWITCH ---
    const renderContent = ()=>{
        switch(activePage){
            case 'dashboard':
                return renderDashboard();
            case 'users':
                return renderUsers();
            case 'drivers':
                return renderDrivers();
            case 'pickups':
                return renderPickups();
            case 'areas':
                return renderAreas();
            case 'reports':
                return renderReports();
            case 'finance':
                return renderFinance();
            case 'settings':
                return renderSettings(); // Settings hanya untuk sistem
            case 'profile':
                return renderProfile(); // Profile halaman terpisah
            case 'notifikasi':
                return renderNotifications();
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "Halaman tidak ditemukan"
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 850,
                    columnNumber: 29
                }, this);
        }
    };
    if (loading && !mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex justify-center items-center text-gray-800 font-bold bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "animate-spin mr-2"
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                lineNumber: 854,
                columnNumber: 135
            }, this),
            " Memuat Sistem Admin..."
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
        lineNumber: 854,
        columnNumber: 37
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 flex font-sans text-gray-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `hidden md:flex flex-col bg-white border-r border-gray-200 fixed h-full z-20 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-20 flex items-center justify-between px-4 border-b border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen ? 'justify-center w-full px-0' : 'px-0'}`,
                                children: isSidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col animate-in fade-in slide-in-from-left duration-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/logo.png",
                                            alt: "RecycleYuk",
                                            className: "w-36 h-auto object-contain mb-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 865,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold text-green-600 tracking-[0.2em] uppercase pl-1",
                                            children: "Admin Panel"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 866,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 864,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSidebarOpen(true),
                                    className: "mx-auto relative group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/images/mini-logo.png",
                                            alt: "RecycleYuk",
                                            className: "w-10 h-10 object-contain transition-transform group-hover:scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 872,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -right-2 -bottom-2 bg-green-100 text-green-600 rounded-full p-0.5 shadow-sm border border-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                lineNumber: 874,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 873,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 871,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 862,
                                columnNumber: 21
                            }, this),
                            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: `p-2 rounded-lg hover:bg-gray-100 text-gray-500`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 879,
                                    columnNumber: 148
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 879,
                                columnNumber: 39
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 860,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden",
                        children: SIDEBAR_MENUS.map((menu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActivePage(menu.id),
                                className: `w-full flex items-center rounded-xl font-medium transition-all duration-200 h-12 ${activePage === menu.id ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'} ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(menu.icon, {
                                        size: 22,
                                        className: `min-w-[22px] ${activePage === menu.id ? 'text-green-600' : 'text-gray-400'}`
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 884,
                                        columnNumber: 29
                                    }, this),
                                    " ",
                                    isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "whitespace-nowrap overflow-hidden",
                                        children: menu.label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 884,
                                        columnNumber: 161
                                    }, this)
                                ]
                            }, menu.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                lineNumber: 883,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 881,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-t border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: `w-full flex items-center rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all h-12 ${isSidebarOpen ? 'px-4 gap-3 justify-start' : 'justify-center px-0'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    size: 22,
                                    className: "min-w-[22px]"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 890,
                                    columnNumber: 25
                                }, this),
                                " ",
                                isSidebarOpen && "Keluar"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 889,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                        lineNumber: 888,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                lineNumber: 859,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: `flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold capitalize text-gray-800",
                                            children: activePage === 'dashboard' ? 'Ringkasan' : activePage.replace('-', ' ')
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 901,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-sm",
                                            children: "Panel Kontrol Administrator"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 902,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 900,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden md:flex text-sm font-medium text-gray-500 bg-white px-3 py-2 rounded-lg border border-gray-200 items-center gap-2 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 16,
                                                    className: "text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 906,
                                                    columnNumber: 33
                                                }, this),
                                                " ",
                                                mounted ? currentTime : '...'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 905,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setActivePage('notifikasi'),
                                                    className: "p-2 rounded-lg hover:bg-gray-100 relative text-gray-600 group transition",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                            size: 20,
                                                            className: "group-hover:text-green-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 913,
                                                            columnNumber: 37
                                                        }, this),
                                                        unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 914,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 912,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-px h-6 bg-gray-200"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 917,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setActivePage('profile'),
                                                    className: "flex items-center gap-3 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-50 transition",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 overflow-hidden",
                                                            children: currentUser?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: currentUser.avatar_url,
                                                                alt: "Profile",
                                                                className: "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                lineNumber: 923,
                                                                columnNumber: 45
                                                            }, this) : currentUser?.full_name?.charAt(0) || 'A'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 921,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-left hidden md:block",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs font-bold text-gray-800 line-clamp-1 max-w-[100px]",
                                                                    children: currentUser?.full_name || 'Admin'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                    lineNumber: 929,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-0 text-gray-500",
                                                                    children: "Administrator"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                                    lineNumber: 930,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                            lineNumber: 928,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 920,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 910,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 904,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 899,
                            columnNumber: 21
                        }, this),
                        renderContent()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 897,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                lineNumber: 896,
                columnNumber: 13
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-6 border-b pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-800",
                                    children: editingItem ? `Edit ${modalType}` : `Tambah ${modalType}`
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 947,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsModalOpen(false),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "text-gray-400 hover:text-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                        lineNumber: 948,
                                        columnNumber: 75
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 948,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 946,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSave,
                            className: "space-y-4",
                            children: [
                                modalType === 'driver' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        editingItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full border p-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed",
                                            value: formData.name || '',
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 954,
                                            columnNumber: 37
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            value: formData.userId || '',
                                            onChange: (e)=>{
                                                const selectedUser = users.find((u)=>u.id === e.target.value);
                                                setFormData({
                                                    ...formData,
                                                    userId: e.target.value,
                                                    name: selectedUser ? selectedUser.full_name : ''
                                                });
                                            },
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "-- Pilih User untuk dijadikan Driver --"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 965,
                                                    columnNumber: 41
                                                }, this),
                                                users.filter((u)=>!drivers.some((d)=>d.id === u.id)).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: u.id,
                                                        children: [
                                                            u.full_name,
                                                            " (",
                                                            u.email,
                                                            ")"
                                                        ]
                                                    }, u.id, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 967,
                                                        columnNumber: 45
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 956,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            placeholder: "Kendaraan",
                                            value: formData.vehicle || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    vehicle: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 972,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            value: formData.shift || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    shift: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Shift 1 (08:00 - 12:00)",
                                                    children: "Shift 1"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 973,
                                                    columnNumber: 199
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Shift 2 (13:00 - 17:00)",
                                                    children: "Shift 2"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 973,
                                                    columnNumber: 255
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 973,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            value: formData.status || 'Off Duty',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    status: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "On Duty",
                                                    children: "On Duty"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 974,
                                                    columnNumber: 209
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Off Duty",
                                                    children: "Off Duty"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 974,
                                                    columnNumber: 249
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 974,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true),
                                modalType === 'area' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            placeholder: "Kelurahan",
                                            value: formData.kelurahan || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    kelurahan: e.target.value
                                                }),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 977,
                                            columnNumber: 56
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "border p-2 rounded bg-white text-gray-800",
                                                    placeholder: "RW",
                                                    value: formData.rw || '',
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            rw: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 977,
                                                    columnNumber: 304
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "border p-2 rounded bg-white text-gray-800",
                                                    placeholder: "RT",
                                                    value: formData.rt || '',
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            rt: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 977,
                                                    columnNumber: 475
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 977,
                                            columnNumber: 264
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            value: formData.driverId || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    driverId: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Pilih Driver"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 977,
                                                    columnNumber: 824
                                                }, this),
                                                drivers.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: d.id,
                                                        children: d.name
                                                    }, d.id, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 977,
                                                        columnNumber: 880
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 977,
                                            columnNumber: 652
                                        }, this)
                                    ]
                                }, void 0, true),
                                modalType === 'pickup' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-100 p-3 rounded text-sm text-gray-800 font-medium",
                                            children: [
                                                "User: ",
                                                formData.user,
                                                " (",
                                                formData.weightLabel,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 979,
                                            columnNumber: 58
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            value: formData.status || 'Pending',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    status: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Pending",
                                                    children: "Pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 979,
                                                    columnNumber: 360
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "In Progress",
                                                    children: "Proses"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 979,
                                                    columnNumber: 400
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Done",
                                                    children: "Selesai"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 979,
                                                    columnNumber: 443
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Canceled",
                                                    children: "Dibatalkan"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 979,
                                                    columnNumber: 480
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 979,
                                            columnNumber: 185
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            value: formData.driver || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    driver: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "Assign Driver"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 979,
                                                    columnNumber: 701
                                                }, this),
                                                drivers.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: d.name,
                                                        children: d.name
                                                    }, d.id, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                        lineNumber: 979,
                                                        columnNumber: 758
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 979,
                                            columnNumber: 533
                                        }, this)
                                    ]
                                }, void 0, true),
                                modalType === 'user' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            placeholder: "Nama",
                                            value: formData.name || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    name: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 982,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            value: formData.role || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    role: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "user",
                                                    children: "User"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 983,
                                                    columnNumber: 197
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "admin",
                                                    children: "Admin"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 983,
                                                    columnNumber: 231
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "driver",
                                                    children: "Driver (Via Menu Driver)"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 983,
                                                    columnNumber: 267
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "rt",
                                                    children: "Ketua RT"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 983,
                                                    columnNumber: 323
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "rw",
                                                    children: "Ketua RW"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 983,
                                                    columnNumber: 359
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 983,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "w-full border p-2 rounded bg-white text-gray-800",
                                            placeholder: "Alamat",
                                            value: formData.region || '',
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    region: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 984,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "border p-2 rounded bg-white text-gray-800",
                                                    placeholder: "RT",
                                                    value: formData.rt || '',
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            rt: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 986,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "border p-2 rounded bg-white text-gray-800",
                                                    placeholder: "RW",
                                                    value: formData.rw || '',
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            rw: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                                    lineNumber: 987,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                            lineNumber: 985,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition mt-4",
                                    children: loading ? 'Menyimpan...' : 'Simpan'
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                                    lineNumber: 991,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                            lineNumber: 950,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                    lineNumber: 945,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
                lineNumber: 944,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/admin/page.js",
        lineNumber: 857,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__32aca0c9._.js.map