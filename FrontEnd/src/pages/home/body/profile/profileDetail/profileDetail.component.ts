import {Component, OnInit} from '@angular/core';
import { ProfileServices} from "../../../../../services/profileService/profile.services"
import {Router, ActivatedRoute} from "@angular/router";

@Component ({
    selector:'profileDetail-component',
    templateUrl:'profileDetail.component.html',
    styleUrls:['./profileDetail.component.css']
})

export class ProfileDetailComponent implements OnInit{

    public inEdit:boolean;
    public profile;
    public user:boolean;
    public userProfile:boolean;
    public admin:boolean;

    constructor(private profileService:ProfileServices, private router:Router, private route:ActivatedRoute){
        console.log(">>> ProfileDetailComponent constructor");
    }

    ngOnInit(){
        this.user=true;
        this.inEdit=false;
        this.userProfile=false;
        this.admin=(Number(localStorage.getItem("role"))==3);



        let id:number;
        this.route.params.subscribe(
            params => {
                id = +params['id'];
            });

        this.profileService.getAProfile(id).subscribe(
            (response:Response) => {this.profile=response,
                console.log("Kapott profile",this.profile);
                this.userProfile=(Number(localStorage.getItem("id"))==this.profile.data.USERS_ID)

            },
            (error)=>{console.log(error)},
            ()=>{}
        );

    }
    public edit(){
        this.inEdit=true;
    }


}


