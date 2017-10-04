import {Component, OnInit, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Router,ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../../../../services/jobsService/jobs.service"

@Component ({
    selector:'job-edit-component',
    templateUrl:'job.edit.component.html',
    styleUrls:['./job.edit.component.css']
})

export class JobEditComponent implements OnInit {

    @Input("job")
    public job;
    public editJob:FormGroup;
    public skillList;

    constructor(private jobService:JobsService, private router:Router, private route:ActivatedRoute){
        console.log(">>> JobEditComponent constructor");
    }

    ngOnInit(){
        this.jobService.getSkillList().subscribe(
            (response:Response) => {
                this.skillList=response
            },
            (error)=>{console.log(error)},
            ()=>{}
        );
        this.initForm();
    }

    private initForm(){
        this.editJob=new FormGroup({
            'name':new FormControl(this.job.name,Validators.required,null),
            'description':new FormControl(this.job.description,Validators.required,null),
            'short_description':new FormControl(this.job.short_description,Validators.required,null),
            'benefits':new FormControl(this.job.benefits,Validators.required,null),
            'requirements':new FormArray([]),
        });

        let jobSkillList=this.job.SKILLs;

        for (var i=0; i<jobSkillList.length; ++i){
            let actualSkill=jobSkillList[i];
            let requirement = {
                "skillSelect": new FormControl(actualSkill.id, Validators.required, null),
            };
            this.requirementsConstructor(requirement);
        };
    }

    private requirementsConstructor(requirement){
        const requirementsArray=this.editJob.get('requirements') as FormArray;
        requirementsArray.push(new FormGroup(requirement));
    }

    public removeSkill(skill, id:number){
        const requirementsArray=this.editJob.get('requirements') as FormArray;
        requirementsArray.removeAt(id);
    }

    public add(){
        const requirementsArray=this.editJob.get('requirements') as FormArray;
        let requirement = {
            "skillSelect": new FormControl(this.skillList.data[0].id, Validators.required, null),
        };
        requirementsArray.push(new FormGroup(requirement));
    }

    public saveJob(){

        console.log("Form value:",this.editJob.value);
        this.jobService.updateAJob(this.job.id,this.editJob.value).subscribe(
            (response:Response) => {console.log("Job updated");
            },
            (error)=>{console.log(error)},
            ()=>{}
        );
    }
}

