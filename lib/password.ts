import bcrypt from 'bcryptjs';

const SALT = 10;

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, SALT);
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
}