import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login : LoginService) { }

  ngOnInit(): void {
  }

  //Metodo para cerrar cession
  public logout(){
    this.login.logout();
    window.location.reload();
  }
}
