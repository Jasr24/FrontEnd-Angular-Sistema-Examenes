import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient) { }

  public listarCuestionarios (){
    return this.http.get(`${baserUrl}/examen/`);
  }

  public agregarExamen(examen:any){
    return this.http.post(`${baserUrl}/examen/`,examen)
  }

  public eliminarExamen(examenId:any){
    return this.http.delete(`${baserUrl}/examen/${examenId}`)
  }
}
