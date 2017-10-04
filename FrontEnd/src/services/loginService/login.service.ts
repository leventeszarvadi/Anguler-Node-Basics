import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


const BACK_END_PORT=1702;



@Injectable()
export class LoginService{

    constructor(private http:Http){
        console.log(">>> LoginService constructor");
    }

    public verify(content){
        const url=`http://localhost:`+BACK_END_PORT+`/users/login`;
        return this.http.post(url,content)
            .map((response)=> response.json());
    }

}