import { UserRole } from '@prisma/client';

export interface PayloadToken {
  sub: number;
  expiresIn: Date;
  role: UserRole;
}
