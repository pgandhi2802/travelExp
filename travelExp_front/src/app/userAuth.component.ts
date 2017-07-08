import { Component, OnInit } from '@angular/core'
import { HttpService } from './http.service'
import { HeaderComponent } from './header.component'
import { Router } from '@angular/router'
@Component({
  selector:'user',
  template:`<div id="authForms" class="container">
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <ul class="nav nav-tabs nav-justified">
      			        <li class="active"><a  href="#SignIn" data-toggle="tab">SignIn</a></li>
                    <li><a href="#SignUp" data-toggle="tab">SignUp</a></li>
                  </ul>
                  <div class="tab-content ">
                    <div class="tab-pane active" id="SignIn">
                      <div class="jumbotron">
                        <form>
                          <h4>{{ error_SignInString }}</h4>
                          <div class="form-group">
                            <label for="signIn_email_userName">Email address/ User Name:</label>
                            <input type="text" class="form-control" id="signIn_email_userName" [(ngModel)]="signIn_email_userName" name="signIn_email_userName" />
                            {{ error_signIn_UserName_Email }}
                          </div>
                          <div class="form-group">
                            <label for="signIn_password">Password:</label>
                            <input type="password" class="form-control" id="signIn_password" [(ngModel)]="signIn_password" name="signIn_password" />
                            {{ error_signInPassword }}
                          </div>
                          <button type="submit" class="form-control btn btn-default" (click)="logIn()">Sign In</button>
                        </form>
                      </div>
                    </div>
                    <div class="tab-pane" id="SignUp">
                      <div class="jumbotron">
                        <form>
                          <h4>{{ error_signUpString }}</h4>
                          <div class="form-group">
                            <label for="signUp_firstName">First Name:</label>
                            <input type="text" class="form-control" id="signUp_firstName" [(ngModel)]="signUp_firstName" name="signUp_firstName" />
                            {{ error_signUpfirstName }}
                          </div>
                          <div class="form-group">
                            <label for="signUp_lastName">Last Name:</label>
                            <input type="text" class="form-control" id="signUp_lastName" [(ngModel)]="signUp_lastName" name="signUp_lastName" />
                            {{ error_signUplastName }}
                          </div>
                          <div class="form-group">
                            <label for="signUp_email">Email address:</label>
                            <input type="email" class="form-control" id="signUp_email" [(ngModel)]="signUp_email" name="signUp_email" />
                            {{ error_signUpemail }}
                          </div>
                          <div class="form-group">
                            <label for="signUp_userName">userName:</label>
                            <input type="text" class="form-control" id="signUp_userName" [(ngModel)]="signUp_userName" name="signUp_userName" />
                            {{ error_signUpUserName }}
                          </div>
                          <div class="form-group">
                            <label for="signUp_password">Password:</label>
                            <input type="password" class="form-control" id="signUp_password" [(ngModel)]="signUp_password" name="signUp_password" />
                            {{ error_signUpPassword }}
                          </div>
                          <div class="form-group">
                            <label for="signUp_confirm_password">Confirm Password:</label>
                            <input type="password" class="form-control" id="signUp_confirm_password" [(ngModel)]="signUp_confirm_password" name="signUp_password" />
                            {{ error_signUpConfirmPassword }}
                          </div>
                          <button type="submit" class="form-control btn btn-default" (click)="signUp()">Sign Up</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`,
  providers:  [ HttpService ]
})
export class UserAuthComponent implements OnInit{
  loggedin_recieved_packet:any
  private loggedIn_urlTag="userAuth/isAuthenticated/"
  private createUrlTag:string="userAuth/register/"
  private urlTag:string = 'userAuth/logIn/'
  private recieved_packet:any;
  signUp_firstName:string="";
  signUp_lastName:string="";
  signUp_email="";
  signUp_userName="";
  signUp_password="";
  signUp_confirm_password="";
  signIn_email_userName:string="";
  signIn_password:string="";
  error_signUpfirstName:string="";
  error_signUplastName:string="";
  error_signUpemail:string="";
  error_signUpUserName:string="";
  error_signUpPassword:string="";
  error_signUpConfirmPassword:string="";
  error_signIn_UserName_Email:string="";
  error_signInPassword:string="";
  error_SignInString:string="";
  error_signUpString:string="";

  constructor(private httpService:HttpService,private router: Router){
  }
  ngOnInit(){
    let formData:FormData= new FormData();
    formData.append("authToken",this.httpService.getAuthCookie());
    this.httpService.postRequest(this.loggedIn_urlTag,formData).subscribe( resBook => {
      this.loggedin_recieved_packet = resBook;
      console.log(this.loggedin_recieved_packet[0].status);
      if (this.loggedin_recieved_packet[0].status==1)
        this.router.navigate(['home'])
      else{
        console.log("not authenticated")
      }
    });
  }
  valiDateLogInForm(){
    let isFormValid:boolean=true;
    if (this.signIn_email_userName===""){
      this.error_signIn_UserName_Email="Please provide Email or UserName"
      isFormValid=false;
    }else{
      if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.signIn_email_userName) && /[^a-zA-Z0-9]/.test(this.signIn_email_userName)){
        this.error_signIn_UserName_Email="Please Enter valid Email or Username"
        isFormValid=false;
      }else{
          this.error_signIn_UserName_Email="";
      }
    }
    //checkPassword
    if (this.signIn_password===""){
      this.error_signInPassword="Please Enter your password"
      isFormValid=false;
    }else
      this.error_signInPassword="";
    console.log("yahan tak aa gaya")
    return isFormValid
  }
  logIn(){
    console.log(this.valiDateLogInForm())
    if(this.valiDateLogInForm()){

      let formData:FormData= new FormData();
      formData.append("userNameEmail",this.signIn_email_userName);
      formData.append("password",this.signIn_password);
      this.httpService.postRequest(this.urlTag,formData).subscribe( resBook => {
        this.recieved_packet = resBook;
        console.log(this.recieved_packet[0].status)
        if (this.recieved_packet[0].status==1){
          localStorage.setItem("authToken",this.signIn_email_userName)
          this.router.navigate(['home'])
        }
        else{
          this.error_SignInString=this.recieved_packet[0].error_string;
        }
      });
    }
  }
  private validateSignUpForm(){
    let isFormValid:boolean=true;
    // checkSignUPFirstName
    if (this.signUp_firstName===""){
      this.error_signUpfirstName="Please provide First Name"
      isFormValid=false;
    }else{
      if (/[^a-zA-Z]/.test(this.signUp_firstName)){
        this.error_signUpfirstName="First Name can have only Characaters"
        isFormValid=false;
      }else
        this.error_signUpfirstName=""
    }
    //checkSignUpLastName
    if (this.signUp_lastName===""){
      this.error_signUplastName="Please provide Last Name"
      isFormValid=false;
    }else{
      if (/[^a-zA-Z]/.test(this.signUp_lastName)){
        this.error_signUplastName="Last Name can have only Characaters"
        isFormValid=false;
      }else
        this.error_signUplastName="";
    }
    //checkSignUpEmail
    if (this.signUp_email===""){
      this.error_signUpemail="Please provide Email"
      isFormValid=false;
    }else{
      if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.signUp_email)){
        this.error_signUpemail="Please Enter Valid Email Address"
        isFormValid=false;
      }else
        this.error_signUpemail="";
    }
    //checkSignUpUserName
    if (this.signUp_userName===""){
      this.error_signUpUserName="Please provide Username"
      isFormValid=false;
    }else{
      if (/[^a-zA-Z0-9]/.test(this.signUp_userName)){
        this.error_signUpUserName="UserName Can have only Character and Numbers"
        isFormValid=false;
      }else{
        if (this.signUp_userName.length>32){
          this.error_signUpUserName="UserName can have maximum length of 32"
          isFormValid=false;
        }else
          this.error_signUpUserName="";
      }
    }
    //checkPassword
    if (this.signUp_password===""){
      this.error_signUpPassword="Please Enter your password"
      isFormValid=false;
    }else
      this.error_signUpPassword="";
    //checkPassword
    if (this.signUp_confirm_password===""){
      this.error_signUpConfirmPassword="Please confirm your password"
      isFormValid=false;
    }else{
      if (this.signUp_password!==this.signUp_confirm_password){
        this.error_signUpConfirmPassword="Your Passwords do not match"
        isFormValid=false;
      }else
        this.error_signUpConfirmPassword="";
    }
    return isFormValid
  }
  signUp(){
    if (this.validateSignUpForm()){
      let formData:FormData= new FormData();
      formData.append("firstName",this.signUp_firstName);
      formData.append("lastName",this.signUp_lastName);
      formData.append("userEmail",this.signUp_email);
      formData.append("userName",this.signUp_userName);
      formData.append("userPassword",this.signUp_confirm_password);
      this.httpService.postRequest(this.createUrlTag,formData).subscribe( resBook => {
        this.recieved_packet = resBook;
        if (this.recieved_packet[0].status==1){
          localStorage.setItem("userName",this.signUp_userName)
          console.log(localStorage.getItem("userName"))
          this.router.navigate(['createProfile'])
        }
        else{
          this.error_signUpString=this.recieved_packet[0].error_string
        }
      });
    }
  }
}
