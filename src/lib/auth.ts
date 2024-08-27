'use server';

// eslint-disable-next-line import/no-extraneous-dependencies
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import type { SessionProps } from '@/types/auth.type';

const secretKey = process.env.NEXT_PUBLIC_AUTH_JWT_SECRET;
const key = new TextEncoder().encode(secretKey);
export async function encrypt(payload: SessionProps) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.tokenExpires)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function createSession(data: SessionProps) {
  const session = data;
  const encryptedSession = await encrypt(session);
  // Save the session in a cookie
  cookies().set('session', encryptedSession, {
    expires: session.tokenExpires,
    httpOnly: true,
  });
}

export async function destroySession() {
  cookies().delete('session');
}
