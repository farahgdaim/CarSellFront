import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarCarouselComponent } from './components/car-carousel/car-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ExpertFormComponent } from './components/expert-form/expert-form.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateAnnonceComponent } from './components/create-annonce/create-annonce.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminExpertRequestsComponent } from './components/admin-expert-requests/admin-expert-requests.component';
import { AdminExpertRequestDetailComponent } from './components/admin-expert-request-detail/admin-expert-request-detail.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationDetailComponent } from './components/conversation-detail/conversation-detail.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { AnnoncesDetailsComponent } from './components/annonces-details/annonces-details.component';
import { ExpertsListComponent } from './components/experts-list/experts-list.component';
import { ExpertProfileComponent } from './components/expert-profile/expert-profile.component';


const routes: Routes = [

  { path: '', component: AnnoncesComponent },
  { path: 'annonce/:id', component: AnnoncesDetailsComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'devenir-expert', component: ExpertFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
  { path: 'creerAnnonce', component: CreateAnnonceComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationListComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: PublicProfileComponent, canActivate: [AuthGuard] },
  { path: 'conversations', component: ConversationListComponent, canActivate: [AuthGuard] },
  { path: 'conversation/:userId1/:userId2', component: ConversationDetailComponent, canActivate: [AuthGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/register', component: AdminRegisterComponent },
  { path: 'admin/profile', component: AdminProfileComponent, canActivate: [AdminGuard] },
  { path: 'admin/expert-requests', component: AdminExpertRequestsComponent, canActivate: [AdminGuard] },
  { path: 'admin/expert-request/:id', component: AdminExpertRequestDetailComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'experts', component: ExpertsListComponent, canActivate: [AuthGuard] },
  { path: 'expert-profile/:id', component: ExpertProfileComponent, canActivate: [AuthGuard] },
  
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // restaure la position à 0,0 lors de la navigation
      anchorScrolling: 'enabled',            // active le scroll vers l'ancre
      scrollOffset: [0, 64]                  // optionnel : ajuste le décalage en cas de navbar fixe, par exemple
    })
  ],
  
  
  exports: [RouterModule],
})
export class AppRoutingModule {}