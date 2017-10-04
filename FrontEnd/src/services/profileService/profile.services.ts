import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


const BACK_END_PORT=1702;

@Injectable()
export class ProfileServices{

    constructor(private http:Http){
        console.log(">>> ProfileService constructor");
    }

    public getUserProfileId(id:number){
        const url =`http://localhost:`+BACK_END_PORT+`/personal-info/user/${id}`;
        return this.http.get(url)
            .map((response) => response.json());
    }
    public getAllName(){
        const url ='http://localhost:'+BACK_END_PORT+'/personal-info/getAllName';
        return this.http.get(url)
            .map((response) => response.json());
    }

    public getAllCurseForAnEducation(id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/education/${id}`;
        return this.http.get(url)
            .map((response) => response.json());
    }

    public getAProfile(id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/personal-info/${id}`;
        return this.http.get(url)
            .map((response)=>response.json());
    }

    public editProfile(body,id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/personal-info/${id}`;

        return this.http.put(url,body)
            .map((response)=>response.json());

    }

    public getAllUser(){
        const url=`http://localhost:`+BACK_END_PORT+`/users/`;

        return this.http.get(url)
            .map((response)=>response.json());
    }

    public getAllRole(){
        const url=`http://localhost:`+BACK_END_PORT+`/users-roles`;
        return this.http.get(url)
            .map((response)=>response.json());
    }

    public deleteAUser(id:number){
        const url=`http://localhost:`+BACK_END_PORT+`/users/${id}`;
        return this.http.delete(url)
            .map((response)=>response.json());
    }

    public modifyRole(userId:number, roleId:object){
        const url=`http://localhost:`+BACK_END_PORT+`/users/${userId}`;
        return this.http.put(url,roleId)
            .map((response)=>response.json());
    }

    public createAUser(user, create){



        const url=`http://localhost:`+BACK_END_PORT+`/users`;
        return this.http.post(url,create)
            .map((response)=>response.json());
    }




}