// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lee los roles requeridos a través de la metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si no se definieron roles en el endpoint, se permite el acceso
    if (!requiredRoles) {
      return true;
    }

    // Obtiene el usuario autenticado desde la request (asumiendo que JwtAuthGuard ya lo añade)
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    // Comprueba que el usuario tenga alguno de los roles requeridos
    return requiredRoles.includes(user.role);
  }
}
