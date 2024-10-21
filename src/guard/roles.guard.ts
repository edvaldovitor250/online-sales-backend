/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { LoginPayload } from "src/auth/dtos/loginPayload.dto";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { UserType } from "src/user/enum/user-type.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return true; 
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return true; 
    }
    try {
      const loginPayLoad: LoginPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return requiredRoles.some((role) => role === loginPayLoad.typeUser);
    } catch {
      return true; 
    }
  }
}