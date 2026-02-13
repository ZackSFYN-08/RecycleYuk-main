import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    console.log("API /api/driver/tasks Hit");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Debug: Log environment variable presence (don't log the actual keys for security in logs)
    console.log("Env Check:", {
        url_present: !!supabaseUrl,
        key_present: !!serviceKey,
        key_length: serviceKey ? serviceKey.length : 0
    });

    if (!supabaseUrl || !serviceKey) {
        console.error("Missing Environment Variables");
        return NextResponse.json(
            { error: "Server Configuration Error: Missing Supabase Env Vars" },
            { status: 500 }
        );
    }

    try {
        const supabase = createClient(supabaseUrl, serviceKey);

        // 1. Fetch Transactions
        const { data: transactions, error: transError } = await supabase
            .from('transactions')
            .select('*')
            .neq('status', 'Done')
            .order('created_at', { ascending: true });

        if (transError) {
            console.error("Supabase Query Error (Transactions):", JSON.stringify(transError, null, 2));
            throw transError;
        }

        if (!transactions || transactions.length === 0) {
            // Return empty array if no transactions
            return NextResponse.json([]);
        }

        // 2. Fetch Profiles Manually (Manual Join)
        const profileIds = [...new Set(transactions.map(t => t.profile_id).filter(id => id))];

        const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name, address, rt, rw')
            .in('id', profileIds);

        if (profilesError) {
            console.error("Supabase Query Error (Profiles):", JSON.stringify(profilesError, null, 2));
            // Continue but with empty profiles if this fails
        }

        // 3. Fetch Waste Types Manually (Manual Join) - to be safe
        const wasteTypeIds = [...new Set(transactions.map(t => t.waste_type_id).filter(id => id))];
        const { data: wasteTypes, error: wasteError } = await supabase
            .from('waste_types')
            .select('id, name, price_per_kg')
            .in('id', wasteTypeIds);

        if (wasteError) {
            console.error("Supabase Query Error (WasteTypes):", JSON.stringify(wasteError, null, 2));
        }

        // 4. Merge Data
        const enrichedData = transactions.map(t => {
            const profile = profiles?.find(p => p.id === t.profile_id) || {};
            const wasteType = wasteTypes?.find(w => w.id === t.waste_type_id) || {};

            return {
                ...t,
                profiles: profile, // Mimic the structure expected by frontend
                waste_types: wasteType // Mimic the structure expected by frontend
            };
        });

        console.log(`Successfully fetched and enriched ${enrichedData.length} tasks`);
        return NextResponse.json(enrichedData);
    } catch (error) {
        console.error("Internal Server Error Details:", error);
        return NextResponse.json({
            error: error.message,
            details: error.toString(),
            hint: "Check server console for full logs"
        }, { status: 500 });
    }
}
