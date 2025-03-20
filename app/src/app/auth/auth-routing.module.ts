import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'

  },
  { path: '', 
    component: AuthComponent, //Root of auth module, where the children pages are builded
    children:[
      {path: 'login', component: LoginComponent},
      {path:'register', component: RegisterComponent},
      {path:'forgot-password', component: ForgotPasswordComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
