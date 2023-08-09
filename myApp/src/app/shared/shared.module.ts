import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { ElapsedTimePipe } from './elapsed-time.pipe';

@NgModule({
  declarations: [LoaderComponent, EmailDirective, ElapsedTimePipe],
  imports: [CommonModule],
  exports: [LoaderComponent, EmailDirective, ElapsedTimePipe],
})
export class SharedModule {}
