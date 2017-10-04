import {Component, OnInit} from '@angular/core'
import {JobsService} from "../../../../../services/jobsService/jobs.service";
import {Router, ActivatedRoute} from "@angular/router"

interface Job{
    "id":number,
    "name":string,
    "shortDescription":string,
    "description":string
}


@Component ({
    selector:'jobDetail-component',
    templateUrl:'jobDetail.component.html',
    styleUrls:['./jobDetail.component.css']
})

export class JobDetailComponent implements OnInit{
    public job;
    public inEdit:boolean;
    public user:boolean;

    constructor(private jobsService:JobsService, private router:Router, private route:ActivatedRoute) {
        console.log(">>> JobDetailComponent constructor");
    }

    ngOnInit(){

        this.inEdit=false;
        this.user=(Number(localStorage.getItem('role'))==1);
        let id:number;
        this.route.params.subscribe(
            params => {
                id = +params['id'];
            });


        this.jobsService.getAJob(id).subscribe(
            (response:Response) => {this.job=response; console.log(this.job)},
            (error)=>{console.log(error)},
            ()=>{}
        );
    }

    public editJob(){
        this.inEdit=true;
    }

    public cancel(){
        this.inEdit=false;
    }
}