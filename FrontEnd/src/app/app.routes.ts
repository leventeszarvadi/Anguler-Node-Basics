import {Routes} from "@angular/router";
import {ProfileComponent} from "../pages/home/body/profile/profile.component"
import {JobsComponent} from "../pages/home/body/jobs/jobs.component"
import {JobDetailComponent} from "../pages/home/body/jobs/jobDetail/jobDetail.component"
import {LoginComponent} from "../pages/login/login.component";
import {PlatformComponent} from "./platform.component";
import { ProfileDetailComponent} from "../pages/home/body/profile/profileDetail/profileDetail.component";
import {AuthGuard} from "../services/guardService/authguard";
import {UserManagmentComponent} from "../pages/home/body/userManagment/userManagment.component"
import {RoleGuard} from "../services/guardService/roleGuard"
import {SkillManagmentComponent} from "../pages/home/body/skillManagment/skillManagment.component"
import {LogoutComponent} from "../pages/home/body/logout/logout.component"
import {ProfilGuard} from "../services/guardService/profilGuard";

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'Login',
        pathMatch: 'full'
    },
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'Platform',
        component: PlatformComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path:'Profile',
                component:ProfileComponent
            },
            {
                path:'Profile/:id',
                component:ProfileDetailComponent,
                canActivate:[ProfilGuard],

            },
            {
                path:'Jobs',
                component:JobsComponent
            },
            {
                path:'Jobs/:id',
                component:JobDetailComponent
            },
            {
                path:'Logout',
                component:LogoutComponent
            },
            {
                path:'UserManagment',
                component:UserManagmentComponent,
                canActivate:[RoleGuard]
            },
            {
                path:'SkillManagment',
                component:SkillManagmentComponent,
                canActivate:[RoleGuard]
            }
        ]
    },
    {
      path: '**', redirectTo: 'Login'
    }
];