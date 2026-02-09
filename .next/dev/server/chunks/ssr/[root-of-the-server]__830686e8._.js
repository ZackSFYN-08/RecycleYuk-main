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
const __TURBOPACK__default__export__ = {
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
    groupByPeriod
};
}),
"[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KepalaDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
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
;
// --- INISIALISASI SUPABASE ---
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://bvigrmajwdfpavxmxefl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aWdybWFqd2RmcGF2eG14ZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NTE2MzAsImV4cCI6MjA4MzIyNzYzMH0.Qii8jaaMgtH5Sq-C7YfpQ26AmGnMmh3aEbsTX8Ciyg0"));
function KepalaDashboard() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // --- STATE MANAGEMENT ---
    const [activePage, setActivePage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('dashboard');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Data States
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [complaints, setComplaints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usersCount, setUsersCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // UI States
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterCategory, setFilterCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All');
    const [selectedTransaction, setSelectedTransaction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedComplaint, setSelectedComplaint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [responseMessage, setResponseMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Filter Laporan
    const [reportFilterType, setReportFilterType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('monthly');
    const [reportFilter, setReportFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        date: new Date().toISOString().split('T')[0],
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        startDate: '',
        endDate: '',
        region: 'All'
    });
    // --- MENU CONFIGURATION ---
    const SIDEBAR_MENUS = [
        {
            id: 'dashboard',
            label: 'Ringkasan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
        },
        {
            id: 'monitoring',
            label: 'Monitoring Global',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
        },
        {
            id: 'laporan',
            label: 'Laporan & Analitik',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
        },
        {
            id: 'pengaduan',
            label: 'Pusat Pengaduan',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
        }
    ];
    // --- CORE LOGIC ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const timer = setInterval(()=>{
            setCurrentTime(new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            }));
        }, 1000);
        fetchData();
        return ()=>clearInterval(timer);
    }, []);
    const fetchData = async ()=>{
        setLoading(true);
        try {
            // A. Cek User
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
            // Ensure profile loaded
            if (!profile) return;
            // B. Ambil Transaksi (Filter by RT/RW)
            let trxQuery = supabase.select('*, profiles!inner(full_name, address, rt, rw), waste_types(name)').order('created_at', {
                ascending: false
            });
            // Apply filters if RT/RW exists
            if (profile.rt) trxQuery = trxQuery.eq('profiles.rt', profile.rt);
            if (profile.rw) trxQuery = trxQuery.eq('profiles.rw', profile.rw);
            const { data: trx, error: trxError } = await trxQuery;
            if (trxError) console.error("Error fetching transactions:", trxError);
            setTransactions(trx || []);
            // C. Ambil Pengaduan (Filter by RT/RW)
            let compQuery = supabase.from('complaints').select('*, profiles!inner(full_name, rt, rw)').order('created_at', {
                ascending: false
            });
            if (profile.rt) compQuery = compQuery.eq('profiles.rt', profile.rt);
            if (profile.rw) compQuery = compQuery.eq('profiles.rw', profile.rw);
            const { data: comp, error: compError } = await compQuery;
            if (compError) console.error("Error fetching complaints:", compError);
            setComplaints(comp || []);
            // D. Hitung Total User (Warga di RT/RW tersebut)
            let userCountQuery = supabase.from('profiles').select('*', {
                count: 'exact',
                head: true
            }).eq('role', 'user');
            if (profile.rt) userCountQuery = userCountQuery.eq('rt', profile.rt);
            if (profile.rw) userCountQuery = userCountQuery.eq('rw', profile.rw);
            const { count } = await userCountQuery;
            setUsersCount(count || 0);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally{
            setLoading(false);
        }
    };
    // --- STATISTIK ---
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const totalWeight = transactions.reduce((acc, curr)=>acc + (curr.weight || 0), 0);
        const totalIncome = transactions.reduce((acc, curr)=>acc + (curr.total_price || 0), 0);
        const pendingPickup = transactions.filter((t)=>t.status !== 'done').length;
        const pendingComplaint = complaints.filter((c)=>c.status === 'Pending').length;
        return {
            totalWeight,
            totalIncome,
            pendingPickup,
            pendingComplaint
        };
    }, [
        transactions,
        complaints
    ]);
    // --- HELPERS ---
    const getStatusColor = (status)=>{
        const s = (status || '').toLowerCase();
        if (s === 'done' || s === 'selesai' || s === 'resolved') return 'bg-green-100 text-green-800 border-green-200';
        if (s === 'in progress' || s === 'proses') return 'bg-blue-100 text-blue-800 border-blue-200';
        if (s === 'pending' || s === 'menunggu') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };
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
                'Tanggal': new Date(r.created_at).toLocaleDateString('id-ID'),
                'Warga': r.profiles?.full_name || '-',
                'Alamat': r.profiles?.address || '-',
                'Jenis Sampah': r.waste_types?.name || '-',
                'Berat (kg)': r.weight,
                'Nilai': (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRupiah"])(r.total_price || 0),
                'Status': r.status
            }));
        const success = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$src$2f$utils$2f$enhancedHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exportToExcel"])(exportData, 'laporan_rtrw');
        if (success) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', 'Laporan berhasil diexport ke CSV!', 'success');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Gagal', 'Gagal export laporan', 'error');
        }
    };
    const handleSendResponse = async ()=>{
        if (!responseMessage.trim()) return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', "Respon tidak boleh kosong", 'warning');
        try {
            await supabase.from('complaints').update({
                response: responseMessage,
                status: 'Resolved'
            }).eq('id', selectedComplaint.id);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Terkirim', "Tanggapan berhasil dikirim!", 'success');
            setResponseMessage('');
            setSelectedComplaint(null);
            fetchData();
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
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Sukses', "Profil RT/RW berhasil diperbarui!", 'success');
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$sweetalert2$2f$dist$2f$sweetalert2$2e$esm$2e$all$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].fire('Error', err.message, 'error');
        }
    };
    // --- RENDERERS ---
    const renderDashboard = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in fade-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-6",
                    children: [
                        {
                            label: 'Total Sampah',
                            val: `${stats.totalWeight.toFixed(1)} Kg`,
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"],
                            col: 'emerald'
                        },
                        {
                            label: 'Pendapatan',
                            val: `Rp ${stats.totalIncome.toLocaleString()}`,
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
                            col: 'blue'
                        },
                        {
                            label: 'Warga Terdaftar',
                            val: usersCount,
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                            col: 'purple'
                        },
                        {
                            label: 'Aduan Masuk',
                            val: stats.pendingComplaint,
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
                            col: 'orange'
                        }
                    ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-sm font-medium",
                                            children: s.label
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 218,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: `text-2xl font-bold mt-1 text-${s.col}-700`,
                                            children: s.val
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 219,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 217,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `bg-${s.col}-50 p-3 rounded-full text-${s.col}-600`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(s.icon, {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 222,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 221,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 216,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                    lineNumber: 209,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg text-gray-800 mb-6 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 231,
                                            columnNumber: 98
                                        }, this),
                                        " Grafik Sampah Bulanan"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 231,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-64 flex items-end justify-between gap-2 px-2",
                                    children: [
                                        100,
                                        150,
                                        120,
                                        170,
                                        140,
                                        190,
                                        210,
                                        180,
                                        220,
                                        250,
                                        230,
                                        200
                                    ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex flex-col items-center group cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full bg-emerald-500 rounded-t-sm hover:bg-emerald-600 transition-all relative",
                                                    style: {
                                                        height: `${h / 300 * 100}%`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10",
                                                        children: [
                                                            h,
                                                            " Kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 236,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 235,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-gray-500 mt-2",
                                                    children: i + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 240,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 234,
                                            columnNumber: 29
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 232,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 230,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg text-gray-800 mb-4 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 247,
                                            columnNumber: 98
                                        }, this),
                                        " Perlu Perhatian"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 247,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 bg-orange-50 rounded-lg border border-orange-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-orange-800 font-bold text-sm",
                                                    children: "Pickup Pending"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 250,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-3xl font-bold text-orange-600 mt-1",
                                                    children: stats.pendingPickup
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 251,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-orange-500 mt-1",
                                                    children: "Transaksi belum diselesaikan driver"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 252,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 249,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 bg-red-50 rounded-lg border border-red-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-red-800 font-bold text-sm",
                                                    children: "Komplain Baru"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 255,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-3xl font-bold text-red-600 mt-1",
                                                    children: stats.pendingComplaint
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 256,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-500 mt-1",
                                                    children: "Menunggu tanggapan RT/RW"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 257,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 254,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 248,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 246,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                    lineNumber: 229,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
            lineNumber: 207,
            columnNumber: 9
        }, this);
    const renderMonitoring = ()=>{
        const filtered = transactions.filter((t)=>(filterCategory === 'All' || t.status === filterCategory) && (searchQuery === '' || (t.profiles?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())));
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-bold text-gray-800",
                                children: "Monitoring Transaksi Global"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 275,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-3 top-2.5 text-gray-400",
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 278,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "pl-10 pr-4 py-2 border rounded-lg text-sm bg-gray-50 outline-none text-gray-800",
                                                placeholder: "Cari nama warga...",
                                                value: searchQuery,
                                                onChange: (e)=>setSearchQuery(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 279,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 277,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "border rounded-lg px-3 py-2 text-sm bg-gray-50 outline-none text-gray-800",
                                        value: filterCategory,
                                        onChange: (e)=>setFilterCategory(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "All",
                                                children: "Semua Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 282,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Pending",
                                                children: "Pending"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 283,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "In Progress",
                                                children: "Proses"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 284,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "done",
                                                children: "Selesai"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 285,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 281,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 276,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 274,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-gray-50 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "ID"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 292,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Warga"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 292,
                                                columnNumber: 78
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Lokasi"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 292,
                                                columnNumber: 122
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Driver"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 292,
                                                columnNumber: 167
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Berat"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 292,
                                                columnNumber: 212
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 292,
                                                columnNumber: 256
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Aksi"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 292,
                                                columnNumber: 301
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 292,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 291,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: filtered.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b hover:bg-gray-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-500 font-mono text-xs",
                                                    children: t.id.slice(0, 8)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 297,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 font-bold text-gray-800",
                                                    children: t.profiles?.full_name
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 298,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-600",
                                                    children: t.profiles?.alamat || t.profiles?.address || '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 299,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-800 font-medium",
                                                    children: t.driver_name || '-'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 300,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-800",
                                                    children: [
                                                        t.weight,
                                                        " Kg"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 301,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 rounded text-xs font-bold border ${getStatusColor(t.status)}`,
                                                        children: t.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 302,
                                                        columnNumber: 61
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 302,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setSelectedTransaction(t),
                                                        className: "text-blue-600 bg-blue-50 p-2 rounded hover:bg-blue-100",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                            lineNumber: 303,
                                                            columnNumber: 178
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 303,
                                                        columnNumber: 61
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 303,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, t.id, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 296,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 294,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 290,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 289,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 273,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
            lineNumber: 272,
            columnNumber: 13
        }, this);
    };
    const renderLaporan = ()=>{
        // Filter Laporan Logic (Sama dengan RT/RW tapi scope global)
        const filteredReports = transactions.filter((item)=>{
            const date = new Date(item.created_at);
            const dateStr = date.toISOString().split('T')[0];
            if (reportFilterType === 'daily') return dateStr === reportFilter.date;
            if (reportFilterType === 'monthly') return date.getMonth() + 1 === parseInt(reportFilter.month) && date.getFullYear() === parseInt(reportFilter.year);
            if (reportFilterType === 'yearly') return date.getFullYear() === parseInt(reportFilter.year);
            if (reportFilterType === 'custom') return !reportFilter.startDate || !reportFilter.endDate ? true : dateStr >= reportFilter.startDate && dateStr <= reportFilter.endDate;
            return true;
        });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6 border-b pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg text-gray-800",
                                children: "Laporan & Analitik"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 331,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleExportExcel(filteredReports),
                                        className: "flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-700 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 333,
                                                columnNumber: 203
                                            }, this),
                                            " Excel"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 333,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>window.print(),
                                        className: "flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 font-bold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 334,
                                                columnNumber: 190
                                            }, this),
                                            " PDF"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 334,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 332,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 330,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-bold text-gray-600 mb-1",
                                        children: "Tipe Laporan"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 341,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full border rounded p-2 text-sm bg-gray-50 text-gray-800",
                                        value: reportFilterType,
                                        onChange: (e)=>setReportFilterType(e.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "daily",
                                                children: "Harian"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 343,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "monthly",
                                                children: "Bulanan"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 343,
                                                columnNumber: 70
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "yearly",
                                                children: "Tahunan"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 343,
                                                columnNumber: 110
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "custom",
                                                children: "Range Tanggal"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 343,
                                                columnNumber: 149
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 342,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 340,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-bold text-gray-600 mb-1",
                                        children: "Periode Waktu"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 347,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            reportFilterType === 'daily' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                className: "w-full border rounded p-2 text-sm bg-gray-50 text-gray-800",
                                                value: reportFilter.date,
                                                onChange: (e)=>setReportFilter({
                                                        ...reportFilter,
                                                        date: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 349,
                                                columnNumber: 66
                                            }, this),
                                            reportFilterType === 'monthly' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "w-1/2 border rounded p-2 text-sm bg-gray-50 text-gray-800",
                                                        value: reportFilter.month,
                                                        onChange: (e)=>setReportFilter({
                                                                ...reportFilter,
                                                                month: e.target.value
                                                            }),
                                                        children: [
                                                            ...Array(12)
                                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: i + 1,
                                                                children: new Date(0, i).toLocaleString('id-ID', {
                                                                    month: 'long'
                                                                })
                                                            }, i + 1, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                                lineNumber: 350,
                                                                columnNumber: 316
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 350,
                                                        columnNumber: 103
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        className: "w-1/2 border rounded p-2 text-sm bg-gray-50 text-gray-800",
                                                        value: reportFilter.year,
                                                        onChange: (e)=>setReportFilter({
                                                                ...reportFilter,
                                                                year: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 350,
                                                        columnNumber: 429
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 350,
                                                columnNumber: 68
                                            }, this),
                                            reportFilterType === 'yearly' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                className: "w-full border rounded p-2 text-sm bg-gray-50 text-gray-800",
                                                value: reportFilter.year,
                                                onChange: (e)=>setReportFilter({
                                                        ...reportFilter,
                                                        year: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 351,
                                                columnNumber: 67
                                            }, this),
                                            reportFilterType === 'custom' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 w-full",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        className: "w-1/2 border rounded p-2 text-sm bg-gray-50 text-gray-800",
                                                        value: reportFilter.startDate,
                                                        onChange: (e)=>setReportFilter({
                                                                ...reportFilter,
                                                                startDate: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 352,
                                                        columnNumber: 102
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        className: "w-1/2 border rounded p-2 text-sm bg-gray-50 text-gray-800",
                                                        value: reportFilter.endDate,
                                                        onChange: (e)=>setReportFilter({
                                                                ...reportFilter,
                                                                endDate: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 352,
                                                        columnNumber: 306
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 352,
                                                columnNumber: 67
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 348,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 346,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 339,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto border rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-gray-50 border-b",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Tanggal"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 360,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Warga"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 360,
                                                columnNumber: 83
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Jenis"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 360,
                                                columnNumber: 127
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Berat"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 360,
                                                columnNumber: 171
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Nilai"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 360,
                                                columnNumber: 215
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "p-4 text-gray-600",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 360,
                                                columnNumber: 259
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 360,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 359,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: filteredReports.length > 0 ? filteredReports.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b hover:bg-gray-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-800",
                                                    children: new Date(r.created_at).toLocaleDateString()
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 365,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-800 font-medium",
                                                    children: r.profiles?.full_name
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 366,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-600",
                                                    children: r.waste_types?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 367,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-800 font-bold",
                                                    children: [
                                                        r.weight,
                                                        " kg"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 368,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4 text-gray-800",
                                                    children: [
                                                        "Rp ",
                                                        r.total_price?.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 369,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 rounded text-xs font-bold border ${getStatusColor(r.status)}`,
                                                        children: r.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 370,
                                                        columnNumber: 61
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 370,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 364,
                                            columnNumber: 37
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: "6",
                                            className: "p-8 text-center text-gray-400",
                                            children: "Data tidak ditemukan."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 372,
                                            columnNumber: 42
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 372,
                                        columnNumber: 38
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 362,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 358,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 357,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 329,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
            lineNumber: 328,
            columnNumber: 13
        }, this);
    };
    const renderPengaduan = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in slide-in-from-right",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-6 rounded-xl shadow-sm border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-lg text-gray-800 mb-6",
                        children: "Pusat Pengaduan Masyarakat"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 384,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: complaints.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-gray-400 py-8",
                            children: "Belum ada pengaduan masuk."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 386,
                            columnNumber: 48
                        }, this) : complaints.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border border-gray-200 rounded-xl p-5 hover:shadow-md transition bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-gray-800 text-lg",
                                                                children: c.subject
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                                lineNumber: 391,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-2 py-0.5 rounded text-xs font-bold border ${c.status === 'Resolved' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`,
                                                                children: c.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                                lineNumber: 392,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 390,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500 mt-1",
                                                        children: [
                                                            "Oleh: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold",
                                                                children: c.profiles?.full_name || 'Anonim'
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                                lineNumber: 394,
                                                                columnNumber: 85
                                                            }, this),
                                                            " • ",
                                                            new Date(c.created_at).toLocaleDateString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 394,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 389,
                                                columnNumber: 33
                                            }, this),
                                            c.status === 'Pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedComplaint(c),
                                                className: "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                        lineNumber: 396,
                                                        columnNumber: 224
                                                    }, this),
                                                    " Tanggapi"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 396,
                                                columnNumber: 60
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 388,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm italic",
                                        children: [
                                            '"',
                                            c.content,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 398,
                                        columnNumber: 29
                                    }, this),
                                    c.response && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 pl-4 border-l-4 border-emerald-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-600 font-bold mb-1",
                                                children: "Tanggapan RT/RW:"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 401,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-800",
                                                children: c.response
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 402,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 400,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 387,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 385,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 383,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
            lineNumber: 382,
            columnNumber: 9
        }, this);
    const renderProfile = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto animate-in slide-in-from-right",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-xl shadow-sm border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6 mb-8 pb-8 border-b border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-4xl font-bold text-emerald-600",
                                children: currentUser?.full_name?.charAt(0) || 'K'
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 416,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-gray-800",
                                        children: currentUser?.full_name
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 420,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500",
                                        children: currentUser?.email
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 421,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700",
                                        children: "Kepala RT/RW"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 422,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 419,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 415,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleUpdateProfile,
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold text-gray-700 mb-1",
                                        children: "Nama Lengkap"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 427,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full border p-3 rounded-lg text-gray-800 bg-gray-50 focus:ring-2 ring-emerald-500 outline-none",
                                        value: currentUser?.full_name || '',
                                        onChange: (e)=>setCurrentUser({
                                                ...currentUser,
                                                full_name: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 428,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 426,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-bold text-gray-700 mb-1",
                                        children: "Alamat Kantor"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 431,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "w-full border p-3 rounded-lg text-gray-800 bg-gray-50 focus:ring-2 ring-emerald-500 outline-none h-24 resize-none",
                                        value: currentUser?.alamat || '',
                                        onChange: (e)=>setCurrentUser({
                                                ...currentUser,
                                                alamat: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 432,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 430,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition mt-4",
                                children: "Simpan Perubahan"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 434,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 425,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 414,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
            lineNumber: 413,
            columnNumber: 9
        }, this);
    const renderContent = ()=>{
        switch(activePage){
            case 'dashboard':
                return renderDashboard();
            case 'monitoring':
                return renderMonitoring();
            case 'laporan':
                return renderLaporan();
            case 'pengaduan':
                return renderPengaduan();
            case 'profile':
                return renderProfile();
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: "Halaman tidak ditemukan"
                }, void 0, false, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                    lineNumber: 447,
                    columnNumber: 29
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-50 flex font-sans text-gray-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed z-30 h-full bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-20 flex items-center justify-between px-6 border-b border-gray-100",
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
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 460,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-bold text-green-600 tracking-[0.2em] uppercase pl-1",
                                            children: "RT/RW Panel"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 461,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 459,
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
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 467,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -right-2 -bottom-2 bg-green-100 text-green-600 rounded-full p-0.5 shadow-sm border border-white",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 469,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 468,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 466,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 457,
                                columnNumber: 21
                            }, this),
                            isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsSidebarOpen(false),
                                className: "p-2 hover:bg-gray-100 rounded-lg text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 474,
                                    columnNumber: 146
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 474,
                                columnNumber: 39
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 455,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 p-4 space-y-2 overflow-y-auto",
                        children: SIDEBAR_MENUS.map((menu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActivePage(menu.id),
                                className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activePage === menu.id ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(menu.icon, {
                                        size: 22,
                                        className: activePage === menu.id ? 'text-emerald-600' : 'text-gray-400'
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 479,
                                        columnNumber: 29
                                    }, this),
                                    isSidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: menu.label
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 480,
                                        columnNumber: 47
                                    }, this)
                                ]
                            }, menu.id, true, {
                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                lineNumber: 478,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 476,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-t border-gray-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: "w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition font-bold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    size: 22
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 485,
                                    columnNumber: 166
                                }, this),
                                " ",
                                isSidebarOpen && "Keluar"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 485,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                        lineNumber: 484,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 454,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: `flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-gray-800 capitalize",
                                            children: activePage
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 494,
                                            columnNumber: 30
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-sm",
                                            children: "Panel Kepala RT/RW"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 494,
                                            columnNumber: 107
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 494,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActivePage('pengaduan'),
                                            className: "p-2 rounded-lg hover:bg-gray-100 relative text-gray-600 group transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                    size: 20,
                                                    className: "group-hover:text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 497,
                                                    columnNumber: 33
                                                }, this),
                                                complaints.filter((c)=>c.status === 'Pending').length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 498,
                                                    columnNumber: 95
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 496,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-px h-6 bg-gray-200"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 500,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActivePage('profile'),
                                            className: "flex items-center gap-3 pl-2 pr-3 py-1 rounded-lg hover:bg-gray-50 transition",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200",
                                                    children: currentUser?.full_name?.charAt(0) || 'K'
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 502,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-left hidden md:block",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-bold text-gray-800 line-clamp-1 max-w-[100px]",
                                                            children: currentUser?.full_name || 'Kepala RT/RW'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                            lineNumber: 506,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-0 text-gray-500",
                                                            children: "Administrator Utama"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                            lineNumber: 507,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                    lineNumber: 505,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 501,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 495,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 493,
                            columnNumber: 21
                        }, this),
                        loading && !mounted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-96 flex flex-col items-center justify-center text-gray-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 513,
                                    columnNumber: 122
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Memuat Sistem..."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 513,
                                    columnNumber: 233
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 513,
                            columnNumber: 44
                        }, this) : renderContent()
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                    lineNumber: 491,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 490,
                columnNumber: 13
            }, this),
            selectedComplaint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between mb-4 border-b pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg text-gray-800",
                                    children: "Tanggapi Pengaduan"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 521,
                                    columnNumber: 82
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedComplaint(null),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20,
                                        className: "text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 521,
                                        columnNumber: 204
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 521,
                                    columnNumber: 153
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 521,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 p-3 rounded mb-4 text-sm border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold text-gray-700 mb-1",
                                    children: "Pesan Masuk:"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 522,
                                    columnNumber: 101
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "italic text-gray-600",
                                    children: [
                                        '"',
                                        selectedComplaint.content,
                                        '"'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 522,
                                    columnNumber: 161
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 522,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: "w-full border border-gray-300 rounded-lg p-3 text-sm h-32 outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 bg-white",
                            placeholder: "Tulis instruksi atau tanggapan resmi RT/RW...",
                            value: responseMessage,
                            onChange: (e)=>setResponseMessage(e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 523,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 flex justify-end gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedComplaint(null),
                                    className: "px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50",
                                    children: "Batal"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 524,
                                    columnNumber: 70
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSendResponse,
                                    className: "px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center gap-2 font-bold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 524,
                                            columnNumber: 379
                                        }, this),
                                        " Kirim Tanggapan"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 524,
                                    columnNumber: 231
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 524,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                    lineNumber: 520,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 519,
                columnNumber: 17
            }, this),
            selectedTransaction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl p-6 max-w-md w-full shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between mb-4 border-b pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg text-gray-800",
                                    children: "Detail Transaksi"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 533,
                                    columnNumber: 82
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedTransaction(null),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 20,
                                        className: "text-gray-400 hover:text-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                        lineNumber: 533,
                                        columnNumber: 204
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 533,
                                    columnNumber: 151
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 533,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 text-sm text-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-500",
                                            children: "ID"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 535,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "col-span-2 font-mono text-xs bg-gray-100 p-1 rounded w-fit",
                                            children: selectedTransaction.id
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 535,
                                            columnNumber: 116
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 535,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-500",
                                            children: "Warga"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 536,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "col-span-2 font-bold",
                                            children: selectedTransaction.profiles?.full_name
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 536,
                                            columnNumber: 119
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 536,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-500",
                                            children: "Alamat"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 537,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "col-span-2",
                                            children: selectedTransaction.profiles?.address || selectedTransaction.profiles?.alamat
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 537,
                                            columnNumber: 120
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 537,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-500",
                                            children: "Berat"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 538,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "col-span-2 font-bold",
                                            children: [
                                                selectedTransaction.weight,
                                                " kg"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 538,
                                            columnNumber: 119
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 538,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-500",
                                            children: "Total Biaya"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 539,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "col-span-2 text-emerald-600 font-bold",
                                            children: [
                                                "Rp ",
                                                selectedTransaction.total_price?.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 539,
                                            columnNumber: 125
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 539,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-500",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 540,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "col-span-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$RecycleYuk$2d$revision$2f$RecycleYuk$2f$RecycleYuk$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2 py-0.5 rounded text-xs border font-bold ${getStatusColor(selectedTransaction.status)}`,
                                                children: selectedTransaction.status
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                                lineNumber: 540,
                                                columnNumber: 148
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                            lineNumber: 540,
                                            columnNumber: 120
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                                    lineNumber: 540,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                            lineNumber: 534,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                    lineNumber: 532,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
                lineNumber: 531,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/RecycleYuk-revision/RecycleYuk/RecycleYuk/src/app/dashboard/rtrw/page.js",
        lineNumber: 452,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__830686e8._.js.map