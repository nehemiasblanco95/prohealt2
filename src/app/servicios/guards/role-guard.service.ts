import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
// import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class RoleGuardService implements CanActivate {
    jwtHelper: JwtHelperService = new JwtHelperService();
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.expectedRole;
        const token = this.auth.getToken();
        // decode the token to get its payload
        const tokenDecoded = this.jwtHelper.decodeToken(token);
        const rolService = tokenDecoded.data.role;
        let validRole: boolean;

        if (expectedRole.indexOf(rolService) >= 0) {
            // Encontrado en arreglo
            validRole = true;
        } else {
            validRole = false;
        }

        if (!this.auth.isAuthenticated() || !validRole) {
            this.router.navigate(['/starter']);
            return false;
        }
        return true;
    }
}