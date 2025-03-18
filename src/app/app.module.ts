import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnnoncesListComponent } from './components/annonces-list/annonces-list.component';
import { AnnonceDetailComponent } from './components/annonce-detail/annonce-detail.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ExpertFormComponent } from './components/expert-form/expert-form.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateAnnonceComponent } from './components/create-annonce/create-annonce.component';

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AnnoncesListComponent,
    AnnonceDetailComponent,
    ExpertFormComponent,
    UpdateProfileComponent,
    ProfileComponent,
    CreateAnnonceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
