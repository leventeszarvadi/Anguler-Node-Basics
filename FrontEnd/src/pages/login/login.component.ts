import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms"
import {Validators} from "@angular/forms"
import {LoginService} from "../../services/loginService/login.service";
import {Router} from "@angular/router";
import {Md5} from 'ts-md5/dist/md5';
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit{

    public loginForm:FormGroup;

    constructor(private loginService:LoginService, private router:Router ){
        if(localStorage.getItem("id")){
            this.router.navigate(['Platform/Profile']);
        }
    }
    ngOnInit(){
        this.initForm();
    }

    private initForm(){
        this.loginForm=new FormGroup({
            'username':new FormControl(null,Validators.required,null),
            'password':new FormControl(null, Validators.required,null),
        })
    }

    public loginButton() {

        var logMess=this.loginForm.value;
        logMess.password=Md5.hashStr(this.loginForm.value.password)
        this.loginService.verify(logMess).subscribe(
            (resp) => {
                if (resp.data.length>0) {
                    let user=resp.data[0];

                    localStorage.setItem("id",user.id);
                    localStorage.setItem("role", user.USER_ROLES_ID);

                    this.router.navigate(['Platform/Profile']);
                }else{
                    //none
                }
            }, (err) => {
                console.log(err);
            }, () => {

            }
        );


    }

}