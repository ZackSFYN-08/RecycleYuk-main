import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Client untuk digunakan di browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Role constants
export const ROLES = {
    ADMIN: 'admin',
    DRIVER: 'driver',
    RTRW: 'rtrw',
    RT: 'rt',
    USER: 'user'
}

// Dashboard paths berdasarkan role
export const DASHBOARD_PATHS = {
    [ROLES.ADMIN]: '/dashboard/admin',
    [ROLES.DRIVER]: '/dashboard/driver',
    [ROLES.RTRW]: '/dashboard/rtrw',
    [ROLES.RT]: '/dashboard/rtrw',
    [ROLES.USER]: '/dashboard/user'
}

// Helper untuk mendapatkan path dashboard berdasarkan role
export const getDashboardPath = (role) => {
    const normalizedRole = (role || '').toLowerCase();
    console.log("Redirecting for role:", normalizedRole);
    return DASHBOARD_PATHS[normalizedRole] || DASHBOARD_PATHS[ROLES.USER]
}

// Helper untuk cek apakah user memiliki akses ke halaman tertentu
export const hasAccess = (userRole, requiredRole) => {
    if (userRole === ROLES.ADMIN) return true // Admin punya akses ke semua
    if (Array.isArray(requiredRole)) return requiredRole.includes(userRole)
    return userRole === requiredRole
}

// Table names (sesuai dengan database)
export const TABLES = {
    PROFILES: 'profiles',
    TRANSACTIONS: 'transactions',
    DRIVERS: 'drivers',
    WASTE_TYPES: 'waste_types',
    AREAS: 'areas',
    COMPLAINTS: 'complaints',
    NOTIFICATIONS: 'notifications',
    APP_SETTINGS: 'app_settings'
}

// Transaction status
export const TRANSACTION_STATUS = {
    PENDING: 'Pending',
    PROCESS: 'Process',
    DONE: 'Done',
    CANCELLED: 'Cancelled'
}

// Driver status
export const DRIVER_STATUS = {
    ON_DUTY: 'On Duty',
    OFF_DUTY: 'Off Duty'
}

// Verification status
export const VERIFICATION_STATUS = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected'
}
