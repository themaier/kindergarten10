import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './dashboard/data/data.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './dashboard/button/button.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ButtonComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AddDataComponent,
    DataComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  // providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de' }],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
