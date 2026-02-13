import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// --- AUTH & PROFILE ---

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return { ...user, ...profile };
};

export const getDriverProfile = async (userId) => {
    const { data } = await supabase.from('drivers').select('*').eq('id', userId).single();
    return data;
};

// --- TRANSACTIONS (USER) ---

export const fetchUserTransactions = async (userId) => {
    const { data, error } = await supabase
        .from('transactions')
        .select(`
            *,
            waste_types(name, price_per_kg),
            drivers:driver_id(name:full_name)
        `)
        .eq('profile_id', userId)
        .order('created_at', { ascending: false })
        .limit(200);

    if (error) throw error;
    return data;
};

export const createTransaction = async (userId, payload) => {
    // Payload: { waste_type_id, weight, latitude, longitude, address, total_price }
    const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...payload, profile_id: userId, status: 'Pending' }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// --- TASKS (DRIVER) ---

export const fetchGlobalTasks = async () => {
    // Fetch ALL pending tasks (Global Access) + My Process Tasks
    const { data, error } = await supabase
        .from('transactions')
        .select(`
            *,
            profiles(full_name, address),
            waste_types(name, price_per_kg)
        `)
        .or('status.eq.Pending,status.eq.Process,status.eq.In Progress')
        .order('created_at', { ascending: false })
        .limit(200);

    if (error) throw error;
    return data;
};

export const acceptTask = async (taskId, driverId, driverName) => {
    const { error } = await supabase
        .from('transactions')
        .update({
            status: 'Process',
            driver_id: driverId,
            driver_name: driverName
        })
        .eq('id', taskId);

    if (error) throw error;
};

export const finishTask = async (taskId, finalWeight, finalPrice) => {
    const { error } = await supabase
        .from('transactions')
        .update({
            status: 'Done',
            weight: finalWeight,
            total_price: finalPrice
        })
        .eq('id', taskId);

    if (error) throw error;
};

// --- REALTIME LOCATION ---

export const updateDriverLocation = async (driverId, lat, lng) => {
    const { error } = await supabase
        .from('drivers')
        .update({
            current_latitude: lat,
            current_longitude: lng,
            last_location_update: new Date()
        })
        .eq('id', driverId);

    // Note: We don't throw properly here to avoid blocking UI on minor loc updates
    if (error) console.error("Loc update failed:", error);
};

export const subscribeToDriverLocation = (driverId, callback) => {
    const channel = supabase
        .channel(`driver-loc-${driverId}`)
        .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'drivers',
            filter: `id=eq.${driverId}`
        }, (payload) => {
            const { current_latitude: lat, current_longitude: lng } = payload.new;
            if (lat && lng) callback({ lat, lng });
        })
        .subscribe();

    return () => supabase.removeChannel(channel);
};

// --- ADMIN / RTRW Data ---

export const fetchAdminData = async () => {
    // Parallel fetching for performance
    const [users, drivers, areas, transactions, complaints, notifications] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('drivers').select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('areas').select('*, drivers(name)').order('created_at', { ascending: false }).limit(500),
        supabase.from('transactions').select('*, profiles(full_name, address), waste_types(name), drivers:driver_id(name:full_name)').order('created_at', { ascending: false }).limit(500),
        supabase.from('complaints').select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(500)
    ]);

    return {
        users: users.data || [],
        drivers: drivers.data || [],
        areas: areas.data || [],
        transactions: transactions.data || [],
        complaints: complaints.data || [],
        notifications: notifications.data || []
    };
};

export const fetchAppSettings = async () => {
    const { data, error } = await supabase.from('app_settings').select('*').single();
    if (error && error.code !== 'PGRST116') throw error; // Handle "no rows" if needed
    return data;
};

export const updateAppSettings = async (settings) => {
    const { error } = await supabase.from('app_settings').update(settings).eq('id', 1);
    if (error) throw error;
};

export const updateProfile = async (userId, payload) => {
    const { error } = await supabase.from('profiles').update(payload).eq('id', userId);
    if (error) throw error;
};

export const upsertDriver = async (payload, driverId = null) => {
    let query;
    if (driverId) {
        query = supabase.from('drivers').update(payload).eq('id', driverId);
    } else {
        query = supabase.from('drivers').insert([payload]);
    }
    const { error } = await query;
    if (error) throw error;
};

export const deleteRecord = async (table, id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
};

export const upsertArea = async (payload, areaId = null) => {
    let query;
    if (areaId) {
        query = supabase.from('areas').update(payload).eq('id', areaId);
    } else {
        query = supabase.from('areas').insert([payload]);
    }
    const { error } = await query;
    if (error) throw error;
};

export const updateTransaction = async (transactionId, payload) => {
    const { error } = await supabase.from('transactions').update(payload).eq('id', transactionId);
    if (error) throw error;
};

export const updateDriverVerification = async (driverId, status) => {
    const { error } = await supabase.from('drivers').update({ verification_status: status }).eq('id', driverId);
    if (error) throw error;
};

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

export const addNotification = async (payload) => {
    const { error } = await supabase.from('notifications').insert([payload]);
    if (error) throw error;
};

export const markNotificationRead = async (notificationId) => {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
    if (error) throw error;
};

export const fetchRTRWData = async (rt, rw) => {
    // Parallel fetching for performance
    const [transactions, complaints, userCount] = await Promise.all([
        supabase
            .from('transactions')
            .select(`
                *,
                profiles!inner(full_name, address, rt, rw),
                waste_types(name),
                drivers:driver_id(name:full_name)
            `)
            .eq('profiles.rt', rt)
            .eq('profiles.rw', rw)
            .order('created_at', { ascending: false })
            .limit(500),
        supabase
            .from('complaints')
            .select('*, profiles!inner(full_name, rt, rw)')
            .eq('profiles.rt', rt)
            .eq('profiles.rw', rw)
            .order('created_at', { ascending: false })
            .limit(500),
        supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'user')
            .eq('rt', rt)
            .eq('rw', rw)
    ]);

    return {
        transactions: transactions.data || [],
        complaints: complaints.data || [],
        userCount: userCount.count || 0
    };
};

export const respondToComplaint = async (complaintId, response) => {
    const { error } = await supabase
        .from('complaints')
        .update({
            response: response,
            status: 'Resolved'
        })
        .eq('id', complaintId);

    if (error) throw error;
};



