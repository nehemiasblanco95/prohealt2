import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, AuthService } from '../../servicios/servicio.index';
import { Usuario } from '../../modelos/usuario.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

    public loading = false;
    public errMsj: string;
    constructor(public router: Router, public _usuarioService: UsuarioService, public _authService: AuthService) { }

    ngOnInit() {

        // tslint:disable-next-line:prefer-const
        let localtoken = this._authService.getToken();

        if (localtoken !== null) {

            this.router.navigate(['/starter']);

        }

    }

    ngAfterViewInit() {
        $(function () {
            $('.preloader').fadeOut();
        });
        $('#to-recover').on('click', function () {
            $('#loginform').slideUp();
            $('#recoverform').fadeIn();
        });
    }

    login(forma: NgForm) {
        this.loading = true;

        if (forma.invalid) {
            this.loading = false;
            return;
        }

        // tslint:disable-next-line:prefer-const
        let usuario = new Usuario(forma.value.correo, forma.value.password);
        this._usuarioService.login(usuario).subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/starter']);
            },
            err => {
                this.errMsj = err.error.mensaje;
                this.loading = false;
            }
        );

        console.log(forma.value.correo, forma.value.password);

    }

}

