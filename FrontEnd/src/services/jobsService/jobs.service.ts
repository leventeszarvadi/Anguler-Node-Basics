import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

const BACK_END_PORT=1702;

@Injectable()
export class JobsService{

    constructor(private http:Http){
        console.log(">>> JobService constructor");
    }

    public getJobsList(){
        const url=`http://localhost:`+BACK_END_PORT+`/jobs/`;
        return this.http.get(url)
            .map((response) => response.json());
    }

    public getAJob(id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/jobs/${id}`;
        return this.http.get(url)
            .map((response)=> response.json());
    }

    public insertAJob(job){
        const url=`http://localhost:`+BACK_END_PORT+`/jobs`;
        return this.http.post(url,job)
            .map((response)=> response.json());
    }

    public getSkillList(){
        const url=`http://localhost:`+BACK_END_PORT+`/skills`;
        return this.http.get(url)
            .map((response)=> response.json());
    }

    public deleteASkill(id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/skills/${id}`
        return this.http.delete(url)
            .map((response)=>response.json());
    }

    public insertASkill(body){
        const url=`http://localhost:`+BACK_END_PORT+`/skills`
        return this.http.post(url,body)
            .map((response)=>response.json());
    }

    public deleteAJob(id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/jobs/${id}`
        return this.http.delete(url)
            .map((response)=>response.json());
    }

    public updateAJob(id:number, job){
        const url=`http://localhost:`+BACK_END_PORT+`/jobs/${id}`
        return this.http.put(url, job)
            .map((response)=>response.json());
    }

    public applyAJob(jobApplied){
        const url=`http://localhost:`+BACK_END_PORT+`/job-applies`;
        return this.http.post(url, jobApplied)
            .map((response)=>response.json());
    }

    public getAppliesForAJob(id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/job-applies/${id}`;
        return this.http.get(url)
            .map((response)=>response.json());
    }

    public acceptOrDeclineUser(id:number, body){
        const url=`http://localhost:`+BACK_END_PORT+`/job-applies/${id}`;
        return this.http.put(url,body)
            .map((response)=>response.json());
    }

