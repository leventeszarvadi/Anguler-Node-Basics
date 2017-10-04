import {Component, OnInit} from '@angular/core'
import {JobsService} from "../../../../services/jobsService/jobs.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";
import {FormGroup, FormControl, FormArray} from "@angular/forms";
import {Validators} from "@angular/forms"
interface Job{
    "id":number,
    "name":string
    "shortDescription":string,
    "description":string
}


@Component ({
    selector:'jobs-component',
    templateUrl:'jobs.component.html',
    styleUrls:['./jobs.component.css']
})

export class JobsComponent implements OnInit{

    public jobsList;
    public addAJob:boolean;
    public jobForm:FormGroup;
    public addSkill:boolean;
    public skillList;
    public user:boolean;
    public applied:boolean;

    constructor(private jobsService:JobsService, private router:Router) {
        console.log(">>> JobsComponent constructor");

    }

    ngOnInit(){
        this.addSkill=false;
        this.addAJob=false;

        this.user=(Number(localStorage.getItem('role'))==1);

        this.jobsService.getSkillList().subscribe(
            (response : Response) => {this.skillList = response},
            (error) => {console.log(error)},
            ()=> {/*finally*/}
        );

        this.jobsService.getJobsList().subscribe(
            (response : Response) => {this.jobsList = response},
            (error) => {console.log(error)},
            ()=> {/*finally*/}
        );
        this.initJobForm();

    }

    public userApplied(job){
        for (let i=0; i<job.USERs.length;++i){
            if (job.USERs[i].id==Number(localStorage.getItem('id')))
                return true;
        }
        return false;
    }
    private initJobForm(){
        this.jobForm=new FormGroup({
            'name':new FormControl(null,Validators.required,null),
            'description':new FormControl(null,Validators.required,null),
            'short_description':new FormControl(null,Validators.required,null),
            'benefits':new FormControl(null,Validators.required,null),
            'requirements':new FormArray([])
        })

    }

    public apply(job){
        let jobApplied={
            users_id:Number(localStorage.getItem('id')),
            jobs_id:job.id
        }

        this.jobsService.applyAJob(jobApplied).subscribe(
            (response:Response)=>{
                this.ngOnInit();
            },
            (error)=>console.log(error),
            ()=>{}
        );
    }

    public removeSkill(skill, id:number){
        const requirementsArray=this.jobForm.get('requirements') as FormArray;
        requirementsArray.removeAt(id);
    }

    public add(){
        const requirementsArray=this.jobForm.get('requirements') as FormArray;
        let requirement = {
            "skillSelect": new FormControl(this.skillList.data[0].id, Validators.required, null),
        };
        requirementsArray.push(new FormGroup(requirement));
    }

    public jobClicked(job:Job){
        this.router.navigate(['Platform/Jobs',job.id])
    }

    public deleteJob(job){
        console.log("Job Delete");
        this.jobsService.deleteAJob(job.id).subscribe(
            (response:Response) => {
                this.ngOnInit();
            },
            (error)=>{console.log(error)},
            ()=>{}
        );
    }

    public addJob(){
        this.addAJob=true;
    }

    public saveJob(){
        console.log("In Jobs component meg kell ellenorizni, hogy kulonbozo skillek legyenek hozzaadva");
        this.addAJob=false;
        console.log("Form value:", this.jobForm.value);
        this.jobsService.insertAJob(this.jobForm.value).subscribe(
            (response:Response) => {
                this.ngOnInit();
            },
            (error)=>{console.log(error)},
            ()=>{}
        );
    }

    public cancel(){
        this.addAJob=false;
    }
}