import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    if (!supabaseAdmin) {
      // Dev fallback — return 0 so counter stays hidden
      return NextResponse.json({ count: 0 });
    }

    const { count, error } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('[FoundingCount] Supabase error:', error);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json(
      { count: count ?? 0 },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        },
      }
    );
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
