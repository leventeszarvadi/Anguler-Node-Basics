
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import {ProfileServices} from "../profileService/profile.services";

@Injectable()
export class ProfilGuard implements CanActivate {

    constructor(
                 private profileService: ProfileServices,
                 private router: Router,
                 private route: ActivatedRoute) {
        console.log(">>> ProfilGuard constructor");
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> | boolean{

        let access:boolean;
        if (Number(localStorage.getItem('role')) > 1)
            return true;

        let actualUrl = state.url.split('/');
        let profileId = Number(actualUrl[actualUrl.length - 1]);

        return new Promise <boolean>((resolve)=>{
            let userProfileId;
            console.log("Proba here");
            this.profileService.getUserProfileId(Number(localStorage.getItem("id"))).subscribe(
                (response:Response)=>{
                    userProfileId=response;
                    if (userProfileId.data.id == profileId)
                        resolve(true);
                    else{
                        this.router.navigate(['Login']);
                        resolve(false);
                    }
                },
                (error)=>console.log(error),
                ()=>{}
            )
        });
    }

}