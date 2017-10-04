import {Component} from '@angular/core'

@Component ({
    selector:'headerContent-component',
    templateUrl:'header.component.html',
    styleUrls:['header.component.css']
})

export class HeaderContent{
    public navigationList:Array<object> = [];
    public myRoleId: number;

    constructor(){
        console.log(">>> HeaderContent constructor");

        this.myRoleId = Number(localStorage.getItem('role'));


        this.navigationList.push({url:"Platform/Profile", name:"Profile"});
        this.navigationList.push({url:"Platform/Jobs", name:"Jobs"});
        if (this.myRoleId>1){
            this.navigationList.push({url:"Platform/UserManagment", name:"User Managment"});
            this.navigationList.push({url:"Platform/SkillManagment", name:"Skill Managment"});
        }
        this.navigationList.push({url:"Platform/Logout", name:"Logout"});





    }
}

