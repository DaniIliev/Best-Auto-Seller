import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAutoComponent } from './autos/create-auto/create-auto.component';
import { SearchComponent } from './search/search.component';
import { AuthActivate } from './core/guards/auth-activate';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'add-auto',
    component: CreateAutoComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    //leazy-loading
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },

  
  {
    path: '**', component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
