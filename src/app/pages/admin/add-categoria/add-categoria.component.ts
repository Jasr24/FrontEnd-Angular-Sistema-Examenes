import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../../services/categoria.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

  categoria = {
    titulo : '',
    descripcion : ''
  }

  constructor(private categoriaService: CategoriaService, private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.categoria.titulo == null || this.categoria.titulo.trim() == ''){
      this.snack.open("El titulo es requerido !!", '', {
        duration:3000
      })
      return ;
    }

    this.categoriaService.agregarCategoria(this.categoria).subscribe(
      (dato:any) => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire('Categoria agregada', 'La categoria ha sido agregada con exito', 'success');
        this.router.navigate(['/admin/categorias']);
      },
      (error) =>{
        console.log(error);
        Swal.fire('Error !!','Error al guardar la categoria','error')
      }
    );
  }

}
