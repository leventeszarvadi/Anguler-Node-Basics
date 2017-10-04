import {Component, Input, OnInit} from '@angular/core';

@Component ({
    selector:'workExperience-component',
    templateUrl:'userWorkExperience.component.html',
    styleUrls:['./userWorkExperience.component.css']
})

export class WorkExperience implements OnInit{
    @Input("value")
    public workExperience:object;

    constructor(){
        console.log(">>> WorkExperience constructor");
    }

    ngOnInit(){
        console.log("Ez a munka", this.workExperience);
    }

}




