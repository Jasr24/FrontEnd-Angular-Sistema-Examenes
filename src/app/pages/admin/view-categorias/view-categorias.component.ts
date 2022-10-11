import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../../services/categoria.service';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit {

  categorias:any = [

  ]

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data:any) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Error al cargar las categorías', 'error')
      }
    )
  }

}
