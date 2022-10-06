import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import baseUrl from './helper'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //Generamos el token, mejor dicho llama un metodo al servidor (sprinboot) que genera el token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData); //este loginData actua como el reques body
  }

  //Iniciamos sesión y establecemos el token en el localStorage, osea guarderemos el token en el localStorage en el navegador para que este hay por sierto tiempo.
  public loginUser(token:any){
    localStorage.setItem('token',token)
  }

  //Este metodo nos sirve para comprobar si esta loggedo o no.
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == null || tokenStr == undefined || tokenStr == ''){
      return false;
    }else{
      return true;
    }
  }

  //Cerramos cession y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //Pbtener el tokenStr
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user)); //De JSON a String
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr); //De String a JSON
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`); //Ese actual-usuario esta en el backend.
  }
}
