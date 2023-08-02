import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CarRoutingModule } from './autos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAutoComponent } from './create-auto/create-auto.component';
import { DetailsComponent } from './details/details.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [CatalogComponent, CreateAutoComponent, DetailsComponent, EditComponent],
  imports: [CommonModule, CarRoutingModule, FormsModule,ReactiveFormsModule,SharedModule],
  exports: [CatalogComponent, CreateAutoComponent],
})
export class AutosModule {}
