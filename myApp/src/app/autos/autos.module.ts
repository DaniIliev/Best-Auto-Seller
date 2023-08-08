import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CarRoutingModule } from './autos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAutoComponent } from './create-auto/create-auto.component';
import { DetailsComponent } from './details/details.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [CatalogComponent, CreateAutoComponent, DetailsComponent, EditComponent, ContactsComponent],
  imports: [CommonModule, CarRoutingModule, FormsModule,ReactiveFormsModule,SharedModule, DatePipe],
  exports: [CatalogComponent, CreateAutoComponent],
})
export class AutosModule {}
