import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';
import { AuthService } from '../auth/auth.service';



@Injectable()
export class LoginGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): boolean {
        if (this.auth.getToken()) {
            if (!this.auth.isAuthenticated()) {
                this.auth.deleteToken();
                return false;
            }
            return true;

        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}