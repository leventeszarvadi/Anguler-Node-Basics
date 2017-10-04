import {Component, OnInit} from '@angular/core';
import {JobsService} from "../../../../services/jobsService/jobs.service"
import {FormGroup, FormControl} from "@angular/forms";
import {Validators} from "@angular/forms"

@Component ({
    selector:'skill-managment',
    templateUrl:'./skillManagment.component.html',
    styleUrls:['./skillManagment.component.css']
})

export class SkillManagmentComponent implements OnInit {

    public skillList;
    public addSkill:boolean;
    public skillForm:FormGroup;

    constructor(private jobService:JobsService) {
        console.log(">>> Skill Managment constructor");
    }

    ngOnInit() {
        this.addSkill=false;
        this.jobService.getSkillList().subscribe(
            (response : Response) => {this.skillList = response},
            (error) => {console.log(error)},
            ()=> {/*finally*/}
        );
        this.initForm();
    }

    private initForm(){
        this.skillForm=new FormGroup({
            'name':new FormControl(null,Validators.required,null),
            'description':new FormControl(null,Validators.required,null),
        });
    }

    public addASkill(){
        this.addSkill=true;
    }

    public saveSkill(){
        this.addSkill=false;
        this.jobService.insertASkill(this.skillForm.value).subscribe(
            (response : Response) => {this.ngOnInit();},
            (error) => {console.log(error)},
            ()=> {/*finally*/}
        );
    }

    public cancel(){
        this.addSkill=false;
    }

    public deleteSkill(skill){
        this.jobService.deleteASkill(skill.id).subscribe(
            (response : Response) => {this.ngOnInit();},
            (error) => {console.log(error)},
            ()=> {/*finally*/}
        );
    }
}