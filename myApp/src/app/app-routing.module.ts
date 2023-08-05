import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAutoComponent } from './autos/create-auto/create-auto.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'add-auto',
    component: CreateAutoComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    //leazy-loading
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

