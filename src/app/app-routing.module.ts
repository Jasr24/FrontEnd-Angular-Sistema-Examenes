import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full' //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404
  },
  {
    path:'signup',
    component: SignupComponent,
    pathMatch:'full' //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch:'full' //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404
  },
  {
    path:'admin',
    component: DashboardComponent,
    pathMatch:'full', //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404
    canActivate: [AdminGuard] //Aqui se poone este guard. para que se ejecute antes de la vista o ruta
  },
  {
    path:'user-dashboard',
    component: UserDashboardComponent,
    pathMatch:'full', //Si escribes mal una ruta te llevara a esta... creo que asi no mostrara el 404
    canActivate: [NormalGuard]  //Aqui se poone este guard. para que se ejecute antes de la vista o ruta
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
