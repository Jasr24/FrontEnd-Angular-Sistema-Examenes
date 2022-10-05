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
}
