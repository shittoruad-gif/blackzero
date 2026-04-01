import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/mock-users';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: '全ての項目を入力してください' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'パスワードは6文字以上で入力してください' }, { status: 400 });
  }

  const existing = findUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'このメールアドレスは既に登録されています' }, { status: 409 });
  }

  const user = createUser(name, email, password);
  return NextResponse.json({ user }, { status: 201 });
}
