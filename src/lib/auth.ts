import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByEmail, verifyPassword } from './mock-users';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'メールアドレス',
      credentials: {
        email: { label: 'メールアドレス', type: 'email' },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;

        const user = findUserByEmail(email);
        if (!user) return null;
        if (!verifyPassword(user.password, password)) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.plan = (user as { plan?: string }).plan ?? 'free';
        token.userId = (user as { id?: string }).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { plan?: string }).plan = token.plan as string;
        (session.user as { id?: string }).id = token.userId as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
