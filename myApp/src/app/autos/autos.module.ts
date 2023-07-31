import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CarRoutingModule } from './autos-routing.module';
import { FormsModule } from '@angular/forms';
import { CreateAutoComponent } from './create-auto/create-auto.component';
import { DetailsComponent } from './details/details.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CatalogComponent, CreateAutoComponent, DetailsComponent],
  imports: [CommonModule, CarRoutingModule, FormsModule,SharedModule],
  exports: [CatalogComponent, CreateAutoComponent],
})
export class AutosModule {}
