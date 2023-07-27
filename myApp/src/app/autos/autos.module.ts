import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CarRoutingModule } from './autos-routing.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, CarRoutingModule],
  exports: [CatalogComponent],
})
export class AutosModule {}
