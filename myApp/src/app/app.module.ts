import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CreateAutoComponent } from './autos/create-auto/create-auto.component';
import { AutosModule } from './autos/autos.module';
import { AppInterceptorProovider } from './app.interceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AutosModule
  ],
  providers: [AppInterceptorProovider],
  bootstrap: [AppComponent]
})
export class AppModule { }
