import Swal from 'sweetalert2';
import { ExamenService } from './../../../services/examen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit {

  examenes : any = [

  ]

  constructor(private examenService: ExamenService) { }

  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe(
      (dato:any) =>{
        this.examenes = dato;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los examenes','error')
      }
    )
  }

  eliminarExamen(examenId:any){
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Estas seguro de eliminar el examen?',
      icon : 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.examenService.eliminarExamen(examenId).subscribe(
          (dato:any) => {
            this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId);
            Swal.fire('Examen eliminado', 'El examen a sido eliminado de la base de datos', 'success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el examen','error');
          }
        )
      }
    })
  }

}
