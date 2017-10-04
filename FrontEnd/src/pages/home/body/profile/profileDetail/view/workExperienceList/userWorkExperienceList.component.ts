import {Component, Input, OnInit} from '@angular/core';

@Component ({
    selector:'workExperienceList-component',
    templateUrl:'./userWorkExperienceList.component.html',
    styleUrls:['./userWorkExperienceList.component.css']
})

export class UserWorkExperienceListComponent implements OnInit{

    @Input("workExperienceList")
    public workExperienceList;

    constructor() {

        console.log(">>> WorkExperienceList constructor");

    }
    ngOnInit(){
        console.log("Haho, almos vagyok",this.workExperienceList);
    }

}


