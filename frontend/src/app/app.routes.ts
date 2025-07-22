import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { FindProviderComponent } from './find-provider/find-provider.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GoodbyeComponent } from './goodbye/goodbye.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent },  
     
    { path: 'goodbye', component: GoodbyeComponent },
    
    {
        path: '',
        component: MainLayoutComponent,
        children: [          
            { path: 'login/admin', component: AdminLoginComponent },
            { path: 'login/login', component: LoginComponent },
            { path: 'register', component: ServiceProviderComponent },
            { path: 'find', component: FindProviderComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'admin-dashboard', component: AdminDashboardComponent },
            { path: 'about', component: AboutComponent }
            
        ]
      }
];