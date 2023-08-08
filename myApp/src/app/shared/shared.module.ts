import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { LikeBtnComponent } from './like-btn/like-btn.component';
import { ElapsedTimePipe } from './elapsed-time.pipe';

@NgModule({
  declarations: [LoaderComponent, EmailDirective, LikeBtnComponent, ElapsedTimePipe],
  imports: [CommonModule],
  exports: [LoaderComponent, EmailDirective,LikeBtnComponent, ElapsedTimePipe],
})
export class SharedModule {}
