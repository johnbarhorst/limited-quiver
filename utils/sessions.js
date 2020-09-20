import { verify, sign } from 'jsonwebtoken';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookie';

const TOKEN_SECRET = process.env.GUID;

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = sign(obj, TOKEN_SECRET, { expiresIn: "8h" });

  setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = verify(token, TOKEN_SECRET);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() < expiresAt) {
    return session;
  }
}