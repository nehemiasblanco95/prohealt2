import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UsuarioService, AuthService } from '../../servicios/servicio.index';
declare var $: any;
@Component({
  selector: 'ap-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  name: string;
  correo: string;
  role: string;
  imgperfil: string;
  // This is for Mymessages
  mymessages: Object[] = [{
    useravatar: 'assets/images/users/1.jpg',
    status: 'online',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:30 AM'
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'busy',
    from: 'Sonu Nigam',
    subject: 'I have sung a song! See you at',
    time: '9:10 AM'
  }, {
    useravatar: 'assets/images/users/2.jpg',
    status: 'away',
    from: 'Arijit Sinh',
    subject: 'I am a singer!',
    time: '9:08 AM'
  }, {
    useravatar: 'assets/images/users/4.jpg',
    status: 'offline',
    from: 'Pavan kumar',
    subject: 'Just see the my admin!',
    time: '9:00 AM'
  }];
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private _usuarioService: UsuarioService, private auth: AuthService) {
    let dataUser = this.auth.getPlayLoad();
    this.name = dataUser.data.nombre;
    this.correo = dataUser.data.correo;

    if (dataUser.data.imagen !== '') {
      this.imgperfil = dataUser.data.imagen;
    } else {
      this.imgperfil = 'assets/images/users/1.jpg';
    }

    switch (dataUser.data.role) {
      case '1':
        this.role = 'ADMINISTRADOR';
        break;
      case '2':
        this.role = 'RECEPCION';
        break;
      case '3':
        this.role = 'SISTEMAS';
        break;

      default:
        break;
    }

  }



  ngAfterViewInit() {

    var set = function () {
      var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      var topOffset = 0;
      if (width < 1170) {
        $("#main-wrapper").addClass("mini-sidebar");
      } else {
        $("#main-wrapper").removeClass("mini-sidebar");
      }
    };
    $(window).ready(set);
    $(window).on("resize", set);


    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
      $(".app-search").toggle(200);
    });


    $("body").trigger("resize");
  }

  salir() {
    this._usuarioService.salir();
  }
}
