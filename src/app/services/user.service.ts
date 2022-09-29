import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import baserUrl from './helper'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { } //Aqui inyectamos por constructor

  public añadirUsuario(user:any){
    return this.httpClient.post(`${baserUrl}/usuarios/`, user)
  }
}
