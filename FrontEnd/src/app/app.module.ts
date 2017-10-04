import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import {HeaderContent} from "../pages/home/headerContent/header.component";
import {ProfileComponent} from "../pages/home/body/profile/profile.component";
import {JobsComponent} from "../pages/home/body/jobs/jobs.component";
import {EducationComponent} from "../pages/home/body/profile/profileDetail/view/educationList/education/education.component";
import {EducationListComponent} from "../pages/home/body/profile/profileDetail/view/educationList/educationList.component";
import {JobsService} from "../services/jobsService/jobs.service";
import {JobDetailComponent} from "../pages/home/body/jobs/jobDetail/jobDetail.component";
import {HttpModule} from "@angular/http";
import {ProfileServices} from "../services/profileService/profile.services";
import {ProfileEditComponent} from "../pages/home/body/profile/profileDetail/edit/profile.edit.component";
import {ProfileViewComponent} from "../pages/home/body/profile/profileDetail/view/profile.view.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "../pages/login/login.component";
import {PlatformComponent} from "./platform.component";
import {ProfileDetailComponent} from "../pages/home/body/profile/profileDetail/profileDetail.component";
import {LoginService} from "../services/loginService/login.service";
import {AuthGuard} from "../services/guardService/authguard";
import {UserManagmentComponent} from "../pages/home/body/userManagment/userManagment.component";
import {RoleGuard} from "../services/guardService/roleGuard";
import {JobEditComponent} from "../pages/home/body/jobs/jobDetail/edit/job.edit.component";
import {JobViewComponent} from "../pages/home/body/jobs/jobDetail/view/job.view.component";
import {SkillManagmentComponent} from "../pages/home/body/skillManagment/skillManagment.component";
import {LogoutComponent} from "../pages/home/body/logout/logout.component";
import {ProfilGuard} from "../services/guardService/profilGuard";
import {UserWorkExperienceListComponent} from "../pages/home/body/profile/profileDetail/view/workExperienceList/userWorkExperienceList.component";
import {WorkExperience} from "../pages/home/body/profile/profileDetail/view/workExperienceList/userWorkExperience/userWorkExperience.component";

@NgModule({
    declarations: [ 
        AppComponent,
        EducationComponent,
        EducationListComponent,
        HeaderContent,
        JobDetailComponent,
        JobsComponent,
        LoginComponent,
        ProfileComponent,
        ProfileDetailComponent,
        ProfileEditComponent,
        ProfileViewComponent,
        PlatformComponent,
        UserManagmentComponent,
        UserWorkExperienceListComponent,
        JobEditComponent,
        JobViewComponent,
        SkillManagmentComponent,
        LogoutComponent,
        WorkExperience
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        JobsService,
        ProfileServices,
        LoginService,
        AuthGuard,
        ProfilGuard,
        RoleGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}