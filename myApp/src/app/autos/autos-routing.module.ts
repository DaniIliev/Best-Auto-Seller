import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthActivate } from '../core/guards/auth-activate';
import { isOwner } from '../core/guards/isOwner';

const routes: Routes = [
  {
    path: 'autos',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CatalogComponent,
      },
      {
        path: ':autoId',
        children:[
          {
            path: '',
            pathMatch: 'full',
            component: DetailsComponent
          },
          {
            path: 'edit',
            component: EditComponent,
            canActivate: [AuthActivate, isOwner],
          },
        ],
      },
      {
        path: 'contacts/:id',
        component: ContactsComponent
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRoutingModule {}
