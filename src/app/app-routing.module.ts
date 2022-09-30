import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
