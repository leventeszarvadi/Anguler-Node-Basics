import {Component, Input, OnInit} from '@angular/core';
import {ProfileServices} from "../../../../../../services/profileService/profile.services"
@Component ({
    selector:'profile-view-component',
    templateUrl:'profile.view.component.html',
    styleUrls:['profile.view.component.css']
})

export class ProfileViewComponent implements OnInit {

    @Input("profile")
    public profile;
    constructor(private profileService:ProfileServices){
        console.log(">>> ProfileViewComponent constructor");
    }

    ngOnInit(){
        console.log("Profile",this.profile);
    }
}


