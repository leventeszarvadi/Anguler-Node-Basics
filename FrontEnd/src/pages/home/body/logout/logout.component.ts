import {Component} from '@angular/core'
import { Router } from "@angular/router"

@Component ({
    selector:'logout-component',
   templateUrl:'logout.component.html',
    /* styleUrls:['logout.component.css']*/
})

export class LogoutComponent{

    constructor( private router:Router ){
        console.log(">>> LogoutComponent constructor");
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        this.router.navigate(['Login']);
    }
}