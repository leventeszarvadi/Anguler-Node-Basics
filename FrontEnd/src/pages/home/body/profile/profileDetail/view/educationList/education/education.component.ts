import {Component, Input, OnInit} from '@angular/core';

@Component ({
    selector:'education-component',
    templateUrl:'education.component.html',
    styleUrls:['./education.component.css']
})

export class EducationComponent implements OnInit{
    @Input("value")
    public education:object;

    constructor(){
        console.log(">>> EducationComponent constructor");
    }

    ngOnInit(){
        console.log( "Edddd",this.education);
    }

}




