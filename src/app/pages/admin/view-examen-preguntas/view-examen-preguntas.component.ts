import { MatSnackBar } from '@angular/material/snack-bar';
import { PreguntaService } from './../../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent implements OnInit {

  examenId:any;
  titulo:any;
  preguntas:any = [];

  constructor(private route:ActivatedRoute,
              private preguntaService:PreguntaService) { }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(
      (data:any) => {
        console.log(data);
        this.preguntas = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
