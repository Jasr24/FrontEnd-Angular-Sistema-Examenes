import { PreguntaService } from './../../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit {

  examenId : any;
  titulo:any;
  pregunta:any = {
    examen : {},
    contenido : '',
    opcion1: '',
    opcion2: '',
    opcion3: '',
    opcion4: '',
    respuesta : ''
  };

  constructor(private route:ActivatedRoute,
              private preguntaService:PreguntaService) { }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.pregunta.examen['examenId'] = this.examenId;
  }

  formSubmit(){
    if(this.pregunta.contenido == null || this.pregunta.contenido.trim() == ''){
      return;
    }

    if(this.pregunta.opcion1 == null || this.pregunta.opcion1.trim() == '' ||
        this.pregunta.opcion2 == null || this.pregunta.opcion2.trim() == '' ||
        this.pregunta.opcion3 == null || this.pregunta.opcion3.trim() == '' ||
        this.pregunta.opcion4 == null || this.pregunta.opcion4.trim() == '' ||
        this.pregunta.respuesta == null || this.pregunta.respuesta.trim() == ''){
          return;
        }
    this.preguntaService.guardarPregunta(this.pregunta).subscribe(
      (data:any) => {
        Swal.fire('Pregunta guardada','La pregunta ha sido agregada con extito','success');
        this.pregunta.contenido = '';
        this.pregunta.opcion1 = '';
        this.pregunta.opcion2 = '';
        this.pregunta.opcion3 = '';
        this.pregunta.opcion4 = '';
        this.pregunta.resputa = '';
      },
      (error) => {
        Swal.fire('Error','Error al guardar la pregunta en la base de datos','error');
        console.log(error);
      }
    )
  }

}
