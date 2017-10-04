import {Component, OnInit} from '@angular/core';
import {ProfileServices} from "../../../../services/profileService/profile.services"
import {FormGroup, FormControl} from "@angular/forms";
import {Validators} from "@angular/forms"
import {Md5} from 'ts-md5/dist/md5';

@Component ({
    selector:'user-managment',
    templateUrl:'./userManagment.component.html',
    styleUrls:['./userManagment.component.css']
})

export class UserManagmentComponent implements OnInit {

    public userRoleList ;
    public usersList;
    public addUser:boolean;
    public admin:boolean;
    public inChangeRole:boolean;
    public addUserForm:FormGroup;

    constructor(private profileService:ProfileServices) {
        console.log(">>> UserManagment constructor");
    }

    ngOnInit() {
        this.inChangeRole=false;
        this.addUser=false;

        this.admin=(Number(localStorage.getItem('role'))==3);

        this.profileService.getAllUser().subscribe(
            (response:Response)=>{ this.usersList =response, console.log(response) },
            (error)=>{console.log(error)},
            ()=>{}
        )
        this.profileService.getAllRole().subscribe(
            (response:Response)=>{ this.userRoleList =response, console.log(response)},
            (error)=>{console.log(error)},
            ()=>{}
        )

        this.initForm();
    }

    private initForm(){
        this.addUserForm=new FormGroup({
            'username':new FormControl(null,Validators.required,null),
            'password':new FormControl(null,Validators.required,null),
            'role':new FormControl(1,Validators.required,null),
            'firstname':new FormControl(null,Validators.required,null),
            'lastname':new FormControl(null,Validators.required,null)
        })
    }

    public deleteUser(user){
        console.log("Delete User ", user);
        this.profileService.deleteAUser(user.id).subscribe(
            (response:Response)=>{this.ngOnInit()},
            (error)=>{console.log(error)},
            ()=>{}
        )
    }

    public addAUser(){
        this.addUser=true;

    }

    public saveUser(){
        let userMess=this.addUserForm.value;
        userMess.password=Md5.hashStr(this.addUserForm.value.password)

        let actualYear=(new Date()).getFullYear();
        let actualDay=(new Date()).getDay();
        let actualMonth=(new Date()).getMonth();
        let user_login_date=""+actualYear+"-"+actualMonth+"-"+actualDay;

        let userDetail={
            username:userMess.username,
            password:userMess.password,
            user_login_date:user_login_date,
            user_roles_id:userMess.role
        }
        let personalInfoDetail={
            firstname:userMess.firstname,
            lastname:userMess.lastname
        }

        let create={
            userDetail:userDetail,
            personalInfoDetail:personalInfoDetail
        }
        this.profileService.createAUser(userMess,create).subscribe(
            (response:Response)=>{ this.ngOnInit()},
            (error)=>{console.log(error)},
            ()=>{}
        )
    }
    
    public saveNewRole(user){
        console.log(user);
        this.profileService.modifyRole(user.id,{"USER_ROLES_ID" :user.USER_ROLE.id}).subscribe(
            (response:Response)=>{},
            (error)=>{console.log(error)},
            ()=>{}
        )

    }

    public cancel(){
        this.addUser=false;
    }
}