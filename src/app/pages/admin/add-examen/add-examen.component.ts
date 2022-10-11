import { Router } from '@angular/router';
import { ExamenService } from '../../../services/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {

  categorias:any = [

  ]

  examenData = {
    titulo : '',
    descripcion : '',
    puntosMaximos : '',
    numeroPreguntas : '',
    activo: true,
    categoria: {
      categoriaId: ''
    }
  }

  constructor(private categoriaService:CategoriaService,
              private snack:MatSnackBar,
              private examenService: ExamenService,
              private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato:any) => {
        this.categorias = dato;
        console.log(this.categorias);
      }, (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al cargar los datos','error')
      }
    )
  }

  guardarCuestionario(){
    console.log(this.examenData);
    if(this.examenData.titulo == null || this.examenData.titulo.trim() == ''){
      this.snack.open('El titulo es requerido','',{
        duration: 3000
      })
      return ;
    }

    this.examenService.agregarExamen(this.examenData).subscribe(
      (data:any) => {
        console.log(data);
        Swal.fire('Examen guardado','El examen ha sido guardado con exito','success');
        this.examenData = {
          titulo : '',
          descripcion : '',
          puntosMaximos : '',
          numeroPreguntas : '',
          activo: true,
          categoria: {
            categoriaId: ''
          }
        }
        this.router.navigate(['/admin/examenes'])
      },
      (error) => {
        Swal.fire('Error','Error al guardar el examen','error')
      }
    )
  }

}
