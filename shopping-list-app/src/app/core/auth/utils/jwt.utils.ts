import { AppUser, UserType } from '../models/user.model';

export function decodeJwtPayload(token: string): Record<string, unknown> {
  try {
    const [, payloadBase64] = token.split('.');
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    throw new Error('Token JWT inválido ou malformado.');
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJwtPayload(token);
    const exp = payload['exp'] as number | undefined;
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}
export function extractUserFromToken(token: string): AppUser {
  const payload = decodeJwtPayload(token);

  const sub = (payload['sub'] as string) ?? (payload['id'] as string);
  const email = payload['email'] as string;
  const role = (payload['role'] as string) ?? 'user';

  if (!sub || !email) {
    throw new Error('Token não contém os campos obrigatórios: sub, email.');
  }

  return {
    sub,
    email,
    role: role === 'admin' ? UserType.USER : UserType.USER,
  };
}
