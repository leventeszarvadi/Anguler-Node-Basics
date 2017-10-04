import {Component, Input, OnInit} from '@angular/core';
import {ProfileServices} from "../../../../../../../services/profileService/profile.services"
@Component ({
    selector:'educationList-component',
    templateUrl:'./educationList.component.html',
    styleUrls:['./educationList.component.css']
})

export class EducationListComponent implements OnInit{

    @Input("educationList")
    public educationList;

    constructor(private profileService: ProfileServices) {
        console.log(">>> EducationListComponent constructor");

    }
    ngOnInit(){
        console.log("Ed List", this.educationList);
    }
}


