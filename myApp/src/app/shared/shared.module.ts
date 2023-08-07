import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { LikeBtnComponent } from './like-btn/like-btn.component';

@NgModule({
  declarations: [LoaderComponent, EmailDirective, LikeBtnComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, EmailDirective,LikeBtnComponent],
})
export class SharedModule {}
