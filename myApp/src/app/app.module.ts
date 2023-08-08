import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AutosModule } from './autos/autos.module';
import { AppInterceptorProovider } from './app.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { ERRORComponent } from './error/error.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    AuthenticatedComponent,
    ERRORComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AutosModule,
    FormsModule,
  ],
  providers: [AppInterceptorProovider, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
