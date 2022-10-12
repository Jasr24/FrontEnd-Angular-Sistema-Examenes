import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { ProfileComponent} from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriasComponent } from './pages/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './pages/admin/add-examen/add-examen.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full' //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404 pero ojo no FUnciona los hijos
  },
  {
    path:'signup',
    component: SignupComponent,
    pathMatch:'full' //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404 pero ojo no FUnciona los hijos
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch:'full' //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404 pero ojo no FUnciona los hijos
  },
  {
    path:'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard], //Aqui se poone este guard. para que se ejecute antes de la vista o ruta
    children:[
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        component : WelcomeComponent
      },
      {
        path: 'categorias',
        component: ViewCategoriasComponent //Este componente mostrar todas la categorias.
      },
      {
        path : 'add-categoria',
        component : AddCategoriaComponent
      },
      {
        path : 'examenes',
        component : ViewExamenesComponent
      },
      {
        path : 'add-examen',
        component : AddExamenComponent
      },
      {
        path : 'examen/:examenId',
        component : ActualizarExamenComponent
      }
    ]
  },
  {
    path:'user-dashboard',
    component: UserDashboardComponent,
    pathMatch:'full', //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404 pero ojo no FUnciona los hijos
    canActivate: [NormalGuard]  //Aqui se poone este guard. para que se ejecute antes de la vista o ruta
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
