import {Component, OnInit, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ProfileServices} from "../../../../../../services/profileService/profile.services"
import {Router,ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../../../../services/jobsService/jobs.service";

@Component ({
    selector:'profile-edit-component',
    templateUrl:'profile.edit.component.html',
    styleUrls:['./profile.edit.component.css']
})

export class ProfileEditComponent implements OnInit {

    public editeProfileForm:FormGroup;

    @Input("profile")
    public profile;
    public skillList;

    constructor(private profileService:ProfileServices,
                private jobService:JobsService,
                private route:ActivatedRoute){

        console.log(">>> ProfileEditComponent constructor");
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
        this.editeProfileForm=new FormGroup({
            'firstname':new FormControl(this.profile.firstname,Validators.required,null),
            'lastname':new FormControl(this.profile.lastname, Validators.required,null),
            'phone':new FormControl(this.profile.phone,Validators.required,null),
            'email':new FormControl(this.profile.email,Validators.required,null),
            'country':new FormControl(this.profile.country,Validators.required,null),
            'city':new FormControl(this.profile.city,Validators.required,null),
            'address':new FormControl(this.profile.address,Validators.required,null),
            'website':new FormControl(this.profile.website,Validators.required,null),
            'github_ID':new FormControl(this.profile.githubID,Validators.required,null),
            'educations':new FormArray([]),
            'workExperience':new FormArray([]),
            'skills':new FormArray([])
        });

        for( let i=0; i < this.profile.USER_EDUCATIONs.length; ++i) {
            let actualEducation=this.profile.USER_EDUCATIONs[i];
            let education = {
                "institution": new FormControl(actualEducation.institution, Validators.required, null),
                "specialization": new FormControl(actualEducation.specialization, Validators.required, null),
                "city": new FormControl(actualEducation.city, Validators.required, null),
                "country": new FormControl(actualEducation.country, Validators.required, null),
                "description":new FormControl(actualEducation.description, Validators.required, null),
                "graduated_year":new FormControl(actualEducation.graduated_year, Validators.required, null),
               /* "curses": new FormArray([])*/
            };
/*
            for (var j = 0; j < actualEducation.curses.length; ++j) {
                this.constructorForCurse(education, this.profile.educations[i].curses[j]);
            }*/
            this.constructorForEducation(education);
        }

        for(var i=0; i < this.profile.USER_WORK_EXPERIENCEs.length; ++i) {
            let actualWork=this.profile.USER_WORK_EXPERIENCEs[i];
            let work = {
                "company_name": new FormControl(actualWork.company_name, Validators.required, null),
                "position": new FormControl(actualWork.position, Validators.required, null),
                "start_date": new FormControl(actualWork.start_date, Validators.required, null),
                "end_date": new FormControl(actualWork.end_date, Validators.required, null),
            };
            this.constructorForWorkExperience(work);
        }

        for(var i=0; i < this.profile.SKILLs.length; ++i) {
            let actualSkill=this.profile.SKILLs[i];
            console.log("ActualSkill", actualSkill);
            let skill={
                "skillSelect":new FormControl(actualSkill.id, Validators.required, null)
            }
            this.constructorForSkill(skill);
        }
    }


    public deleteSkill(id:number){
        const skillArray=this.editeProfileForm.get('skills') as FormArray;
        skillArray.removeAt(id);
    }

    public addASkill(){
        console.log("skilllist", this.skillList);
        const skillArray=this.editeProfileForm.get('skills') as FormArray;
        let skill = {
            "skillSelect": new FormControl(this.skillList.data[0].id, Validators.required, null),
        };
        skillArray.push(new FormGroup(skill));
    }

    public constructorForSkill(skill){
        const skillArray=this.editeProfileForm.get('skills') as FormArray;
        skillArray.push(new FormGroup(skill));
    }

    public constructorForWorkExperience(work){
        const workExperienceArray=this.editeProfileForm.get('workExperience') as FormArray;
        workExperienceArray.push(new FormGroup(work));
    }

    public constructorForEducation(education){
        const educationArray=this.editeProfileForm.get('educations') as FormArray;
        educationArray.push(new FormGroup(education));
    }

    public constructorForCurse(education, curs:string){
        const curseArray=education.curses as FormArray;
        curseArray.push(new FormControl(curs,Validators.required,null));
    }

    public addEducation(){
        const educationArray=this.editeProfileForm.get('educations') as FormArray;
        let education={
            "institution": new FormControl(null, Validators.required, null),
            "specialization": new FormControl(null, Validators.required, null),
            "city": new FormControl(null, Validators.required, null),
            "country": new FormControl(null, Validators.required, null),
            "description":new FormControl(null, Validators.required, null),
            "graduated_year":new FormControl(null, Validators.required, null),
           /* "curses":new FormArray([])*/
        };
        educationArray.push(new FormGroup(education));
    }

/*
    public addCurse(education){
        const curseArray=education.controls.curses as FormArray;
        curseArray.push(new FormControl(null, Validators.required,null));
    }
*/


    public deleteEducation(id:number){
        const educationArray=this.editeProfileForm.get('educations') as FormArray;
        educationArray.removeAt(id);
    }

   /* public deleteCurse(educationId:number, curseId:number){
        console.log("??? Deleting curse",educationId,curseId);
    }*/

    public addWorkExperince(){
        const workExperienceArray=this.editeProfileForm.get('workExperience') as FormArray;
        let work = {
            "company_name": new FormControl(null, Validators.required, null),
            "position": new FormControl(null, Validators.required, null),
            "start_date": new FormControl(null, Validators.required, null),
            "end_date": new FormControl(null, Validators.required, null),
        };
        workExperienceArray.push(new FormGroup(work));
    }

    public deleteWorkExperince(id:number){
        const workExperienceArray=this.editeProfileForm.get('workExperience') as FormArray;
        workExperienceArray.removeAt(id);
    }

    public saveModifiedProfile(){
        let id;
        this.route.params.subscribe(
            params => {
                id = +params['id'];
            });

        this.profileService.editProfile(this.editeProfileForm.value,id)
             .subscribe(
                 (response)=> {this.ngOnInit()},
                 (error)=> console.log(error)
             );
    }
}

