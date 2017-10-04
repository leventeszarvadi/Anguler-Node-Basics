import {Component, Input, OnInit} from '@angular/core';
import {JobsService} from "../../../../../../services/jobsService/jobs.service"
import {Router} from "@angular/router";

@Component ({
    selector:'job-view-component',
    templateUrl:'job.view.component.html',
    styleUrls:['./job.view.component.css']
})

export class JobViewComponent implements OnInit {

    @Input("job")
    public job;
    public user:boolean;
    constructor(private jobService:JobsService,
                private router:Router){
        console.log(">>> JobViewComponent constructor");
    }
    ngOnInit(){
        this.user=Number(localStorage.getItem("role"))==1;
    }

    public userDetail(id:number){
        this.router.navigate(['Platform/Profile',id]);
    }

    public accept(id:number){
        let body={
            accepted:true
        }
        this.jobService.acceptOrDeclineUser(id,body).subscribe(
            (response:Response)=>{this.ngOnInit()},
            (error)=>{console.log(error);},
            ()=>{}
        )
    }

    public decline(id:number){
        let body={
            accepted:false
        }
        this.jobService.acceptOrDeclineUser(id,body).subscribe(
            (response:Response)=>{this.ngOnInit();},
            (error)=>{console.log(error);},
            ()=>{}
        )
    }
}


