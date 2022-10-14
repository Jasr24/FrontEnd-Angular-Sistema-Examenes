import { PreguntaService } from '../../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  examenId:any;
  preguntas:any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos =0;

  esEnviado = false;
  timer:any;

  constructor(private locationSt: LocationStrategy,
              private route:ActivatedRoute,
              private preguntaService:PreguntaService) { }

  ngOnInit(): void {
    this.prevenirBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(
      (data:any) => {
        console.log(data);
        this.preguntas = data;

        this.timer = this.preguntas.length * 2 * 60;

        this.preguntas.forEach((p:any) => {
          p['respuestaDada'] = ''; //Apenas se llame al componentes esto es vacio, pero cuando enviamos el formulario ya vendra llena con la respuesta.. esta en el html con el [ngModel]
        })
        console.log(this.preguntas);
        this.iniciarTemporizador();
      },
      (error)=> {
        console.log(error);
        Swal.fire('Error','Error al cargar las preguntas de la prueba','error');
      }
    )
  }

  iniciarTemporizador(){
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.evaluarExamen();
        clearInterval(t);
      }else {
        this.timer --;
      }
    },1000);
  }

  prevenirBotonDeRetroceso(){
    history.pushState(null,null!,location.href); //location.href es la ruta actual
    this.locationSt.onPopState(() => {
      history.pushState(null,null!,location.href); //location.href es la ruta actual
    })
  }

  enviarCuestionario(){
    Swal.fire({
      title: 'Quieres enviar el examen',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon : 'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this.evaluarExamen();
      }
    })
    this.puntosConseguidos = 0;
    this.respuestasCorrectas = 0;
  }

  evaluarExamen(){
      this.esEnviado = true;
      this.preguntas.forEach((p:any) => {
        if(p.respuestaDada == p.respuesta){
          this.respuestasCorrectas ++;
          let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
          this.puntosConseguidos += puntos;
        }
      });

      this.intentos ++;

      console.log("Respuestas correctas: " + this.respuestasCorrectas);
      console.log("Puntos conseguidos: " + this.puntosConseguidos);
      console.log("Intentos: " + this.intentos);
      console.log(this.preguntas);
  }

  obtenerHoraFormateada(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} : min : ${ss} : seg`;
  }

}
