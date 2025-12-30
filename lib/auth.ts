import { compare } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

// Verify password against hash
export async function verifyPassword(password: string): Promise<boolean> {
  // Password: Studio123
  // Hardcoded hash to avoid $ symbol issues in .env files
  const hash = '$2b$12$rEVIzy3svYDE5tHrjCxWGO96eiOe5P9Y03.v/BS85eARPAD4L1UOu';

  try {
    const result = await compare(password, hash);
    return result;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

// Create JWT token
export async function createToken(payload: { admin: boolean } = { admin: true }): Promise<string> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET not configured in .env.local');
  }

  const secretKey = new TextEncoder().encode(secret);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Token expires in 24 hours
    .sign(secretKey);

  return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<boolean> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET not configured in .env.local');
  }

  try {
    const secretKey = new TextEncoder().encode(secret);
    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    // Token is invalid or expired
    return false;
  }
}

// Get token payload
export async function getTokenPayload(token: string): Promise<{ admin: boolean } | null> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return null;
  }

  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { admin: boolean };
  } catch (error) {
    return null;
  }
}
