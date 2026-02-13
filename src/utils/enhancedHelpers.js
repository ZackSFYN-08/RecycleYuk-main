// Helper functions untuk enhance existing features di RecycleYuk

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Enhanced Reward Points Calculation
export const calculateRewardPoints = (totalWeight) => {
    const basePoints = Math.floor(totalWeight * 10); // 10 poin per kg

    // Bonus untuk milestone
    let bonus = 0;
    if (totalWeight >= 100) bonus += 500; // Bonus 500 poin untuk 100kg+
    if (totalWeight >= 50) bonus += 200;  // Bonus 200 poin untuk 50kg+
    if (totalWeight >= 20) bonus += 50;   // Bonus 50 poin untuk 20kg+

    return basePoints + bonus;
};

// Get Reward Badge based on points
export const getRewardBadge = (points) => {
    if (points >= 5000) return { level: 'Diamond', color: 'bg-purple-500', icon: '💎' };
    if (points >= 2000) return { level: 'Gold', color: 'bg-yellow-500', icon: '🥇' };
    if (points >= 1000) return { level: 'Silver', color: 'bg-gray-400', icon: '🥈' };
    if (points >= 500) return { level: 'Bronze', color: 'bg-orange-600', icon: '🥉' };
    return { level: 'Starter', color: 'bg-green-500', icon: '🌱' };
};

// Format Rupiah Currency
export const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

// Calculate Driver Earnings
export const calculateDriverEarnings = (transactions) => {
    const completedTransactions = transactions.filter(t => t.status === 'done');

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

    completedTransactions.forEach(t => {
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

// Enhanced Statistics Calculation
export const calculateEnhancedStats = (transactions, userRole) => {
    const stats = {
        total: transactions.length,
        pending: transactions.filter(t => t.status === 'Pending').length,
        inProgress: transactions.filter(t => t.status === 'In Progress').length,
        completed: transactions.filter(t => t.status === 'done').length,
        totalWeight: transactions.reduce((sum, t) => sum + (Number(t.weight) || 0), 0),
        totalRevenue: transactions.reduce((sum, t) => sum + (t.total_price || 0), 0)
    };

    // Calculate trend (last 7 days vs previous 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const recentTransactions = transactions.filter(t => new Date(t.created_at) >= sevenDaysAgo);
    const previousTransactions = transactions.filter(t => {
        const date = new Date(t.created_at);
        return date >= fourteenDaysAgo && date < sevenDaysAgo;
    });

    stats.trend = {
        transactions: recentTransactions.length - previousTransactions.length,
        weight: recentTransactions.reduce((sum, t) => sum + (Number(t.weight) || 0), 0) -
            previousTransactions.reduce((sum, t) => sum + (Number(t.weight) || 0), 0)
    };

    return stats;
};

// Export Report Data
export const exportToExcel = async (data, filename) => {
    try {
        // Convert data to CSV format
        const headers = Object.keys(data[0] || {});
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
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

// Real-time Notification Helper
export const sendNotification = async (userId, title, message, type = 'info') => {
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

// Validate NIK (Indonesian ID Number)
export const validateNIK = (nik) => {
    return /^\d{16}$/.test(nik);
};

// Validate Phone Number (Indonesian)
export const validatePhone = (phone) => {
    return /^(\+62|62|0)[0-9]{9,12}$/.test(phone);
};

// Get Status Color Class
export const getStatusColor = (status) => {
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

// Calculate Distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance.toFixed(2);
};

// Estimate Time of Arrival based on distance
export const estimateETA = (distanceInKm) => {
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

// Generate Random Color for Charts
export const generateChartColors = (count) => {
    const colors = [
        '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
        '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
    ];

    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

// Filter Transactions by Date Range
export const filterByDateRange = (transactions, startDate, endDate) => {
    if (!startDate || !endDate) return transactions;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include entire end day

    return transactions.filter(t => {
        const transactionDate = new Date(t.created_at);
        return transactionDate >= start && transactionDate <= end;
    });
};

// Group Transactions by Period
export const groupByPeriod = (transactions, period = 'day') => {
    const groups = {};

    transactions.forEach(t => {
        const date = new Date(t.created_at);
        let key;

        switch (period) {
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

// Upload Avatar Helper
export const uploadAvatar = async (file, userId) => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};

const enhancedHelpers = {
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
    groupByPeriod
};

export default enhancedHelpers;
