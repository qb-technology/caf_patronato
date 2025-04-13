// idGenerator.ts
import { customAlphabet } from 'nanoid';

// you can control the alphabet and length
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

export function generateId(prefix: string) {
  return `${prefix}_${nanoid()}`;
}
