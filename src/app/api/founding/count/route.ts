import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { systemMessages } from '@/lib/copy/system-messages';

function unavailable() {
  return NextResponse.json(
    { error: systemMessages.errors.generic },
    { status: 503, headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' } },
  );
}

export async function GET() {
  try {
    if (!supabaseAdmin) return unavailable();

    const { count, error } = await supabaseAdmin
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error || count === null) {
      console.error('[FoundingCount] Count query unavailable');
      return unavailable();
    }

    return NextResponse.json(
      { count },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        },
      },
    );
  } catch {
    return unavailable();
  }
}
