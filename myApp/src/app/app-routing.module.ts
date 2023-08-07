import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAutoComponent } from './autos/create-auto/create-auto.component';
import { SearchComponent } from './search/search.component';
import { AuthActivate } from './core/guards/auth-activate';
import { ERRORComponent } from './error/error.component';

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
    path: '404',
    component: ERRORComponent
  },
  // {
  //   path: 'autos',
  //   loadChildren: () =>
  //     import('./autos/autos.module').then((m) => m.AutosModule),
  // },
  {
    //leazy-loading
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: '**', component: ERRORComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
