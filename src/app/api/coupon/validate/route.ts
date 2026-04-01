import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { validateCoupon } from '@/lib/coupons';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'ログインが必要です' }, { status: 401 });
  }

  const { code } = await req.json();
  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'クーポンコードを入力してください' }, { status: 400 });
  }

  const result = validateCoupon(code);
  return NextResponse.json(result);
}
