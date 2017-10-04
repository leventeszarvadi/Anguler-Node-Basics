import {Component, OnInit} from '@angular/core';
import {ProfileServices} from "../../../../services/profileService/profile.services"
import {Router} from "@angular/router";

@Component ({
    selector:'profile-component',
    templateUrl:'profile.component.html',
    styleUrls:['./profile.component.css']
})

export class ProfileComponent implements OnInit{


    public usersNameList;
    public user:boolean;

    constructor(private profileService:ProfileServices, private router:Router){
        console.log(">>> ProfilesComponent constructor");
    }

    ngOnInit(){

        if (Number(localStorage.getItem("role"))==1){
            this.user=true;


            this.profileService.getAllName().subscribe(
                (response : Response) => {this.usersNameList = response},
                (error) => {console.log(error)},
                ()=> {/*finally*/}
            );

            let profileId;
            this.profileService.getUserProfileId(
                Number(localStorage.getItem('id'))
            ).subscribe(
                (response:Response)=>{profileId=response,
                    this.router.navigate(['Platform/Profile',profileId.data.id])},
                (error) => {console.log(error)},
                ()=> {/*finally*/}
            )



        }else{
            this.user=false;
        }


        this.profileService.getAllName().subscribe(
            (response : Response) => {this.usersNameList = response},
            (error) => {console.log(error)},
            ()=> {/*finally*/}
        );

    }

    public profileClicked(user){
        this.router.navigate(['Platform/Profile',user.id])

    }
}

/*

 public activeContent = 'content1';

 public someContent = [{
     name: 'content1',
     content: 'dsadiasuhfui dsadgasiugdasui dashduias'
 }, {
     name: 'content2',
     content: `fsnfsd
     fsafsdnfsd
     fsdfsdfsd
     dsajoln


     sdaasasdasd
     dsadas`
 }];

    public changeContent(value: string) {
        this.activeContent = value;
    }
*/
