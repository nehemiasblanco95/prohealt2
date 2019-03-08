import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN } from '../../config/config';


@Injectable()
export class AuthService {
    jwtHelper: JwtHelperService = new JwtHelperService();
    constructor() { }

    public isAuthenticated(): boolean {
        if (localStorage.getItem(TOKEN)) {
            const token = localStorage.getItem(TOKEN);
            return !this.jwtHelper.isTokenExpired(token);
        } else {
            return false;
        }
    }

    public deleteToken() {
        localStorage.removeItem(TOKEN);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN);
    }

    public getPlayLoad() {
        // tslint:disable-next-line:prefer-const
        let token = localStorage.getItem(TOKEN);
        // tslint:disable-next-line:prefer-const
        let decodeToken = this.jwtHelper.decodeToken(token);
        return decodeToken;
    }


}
