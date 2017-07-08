"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_service_1 = require('./http.service');
var router_1 = require('@angular/router');
var UserAuthComponent = (function () {
    function UserAuthComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.loggedIn_urlTag = "userAuth/isAuthenticated/";
        this.createUrlTag = "userAuth/register/";
        this.urlTag = 'userAuth/logIn/';
        this.signUp_firstName = "";
        this.signUp_lastName = "";
        this.signUp_email = "";
        this.signUp_userName = "";
        this.signUp_password = "";
        this.signUp_confirm_password = "";
        this.signIn_email_userName = "";
        this.signIn_password = "";
        this.error_signUpfirstName = "";
        this.error_signUplastName = "";
        this.error_signUpemail = "";
        this.error_signUpUserName = "";
        this.error_signUpPassword = "";
        this.error_signUpConfirmPassword = "";
        this.error_signIn_UserName_Email = "";
        this.error_signInPassword = "";
        this.error_SignInString = "";
        this.error_signUpString = "";
    }
    UserAuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", this.httpService.getAuthCookie());
        this.httpService.postRequest(this.loggedIn_urlTag, formData).subscribe(function (resBook) {
            _this.loggedin_recieved_packet = resBook;
            console.log(_this.loggedin_recieved_packet[0].status);
            if (_this.loggedin_recieved_packet[0].status == 1)
                _this.router.navigate(['home']);
            else {
                console.log("not authenticated");
            }
        });
    };
    UserAuthComponent.prototype.valiDateLogInForm = function () {
        var isFormValid = true;
        if (this.signIn_email_userName === "") {
            this.error_signIn_UserName_Email = "Please provide Email or UserName";
            isFormValid = false;
        }
        else {
            if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.signIn_email_userName) && /[^a-zA-Z0-9]/.test(this.signIn_email_userName)) {
                this.error_signIn_UserName_Email = "Please Enter valid Email or Username";
                isFormValid = false;
            }
            else {
                this.error_signIn_UserName_Email = "";
            }
        }
        //checkPassword
        if (this.signIn_password === "") {
            this.error_signInPassword = "Please Enter your password";
            isFormValid = false;
        }
        else
            this.error_signInPassword = "";
        console.log("yahan tak aa gaya");
        return isFormValid;
    };
    UserAuthComponent.prototype.logIn = function () {
        var _this = this;
        console.log(this.valiDateLogInForm());
        if (this.valiDateLogInForm()) {
            var formData = new FormData();
            formData.append("userNameEmail", this.signIn_email_userName);
            formData.append("password", this.signIn_password);
            this.httpService.postRequest(this.urlTag, formData).subscribe(function (resBook) {
                _this.recieved_packet = resBook;
                console.log(_this.recieved_packet[0].status);
                if (_this.recieved_packet[0].status == 1) {
                    localStorage.setItem("authToken", _this.signIn_email_userName);
                    _this.router.navigate(['home']);
                }
                else {
                    _this.error_SignInString = _this.recieved_packet[0].error_string;
                }
            });
        }
    };
    UserAuthComponent.prototype.validateSignUpForm = function () {
        var isFormValid = true;
        // checkSignUPFirstName
        if (this.signUp_firstName === "") {
            this.error_signUpfirstName = "Please provide First Name";
            isFormValid = false;
        }
        else {
            if (/[^a-zA-Z]/.test(this.signUp_firstName)) {
                this.error_signUpfirstName = "First Name can have only Characaters";
                isFormValid = false;
            }
            else
                this.error_signUpfirstName = "";
        }
        //checkSignUpLastName
        if (this.signUp_lastName === "") {
            this.error_signUplastName = "Please provide Last Name";
            isFormValid = false;
        }
        else {
            if (/[^a-zA-Z]/.test(this.signUp_lastName)) {
                this.error_signUplastName = "Last Name can have only Characaters";
                isFormValid = false;
            }
            else
                this.error_signUplastName = "";
        }
        //checkSignUpEmail
        if (this.signUp_email === "") {
            this.error_signUpemail = "Please provide Email";
            isFormValid = false;
        }
        else {
            if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.signUp_email)) {
                this.error_signUpemail = "Please Enter Valid Email Address";
                isFormValid = false;
            }
            else
                this.error_signUpemail = "";
        }
        //checkSignUpUserName
        if (this.signUp_userName === "") {
            this.error_signUpUserName = "Please provide Username";
            isFormValid = false;
        }
        else {
            if (/[^a-zA-Z0-9]/.test(this.signUp_userName)) {
                this.error_signUpUserName = "UserName Can have only Character and Numbers";
                isFormValid = false;
            }
            else {
                if (this.signUp_userName.length > 32) {
                    this.error_signUpUserName = "UserName can have maximum length of 32";
                    isFormValid = false;
                }
                else
                    this.error_signUpUserName = "";
            }
        }
        //checkPassword
        if (this.signUp_password === "") {
            this.error_signUpPassword = "Please Enter your password";
            isFormValid = false;
        }
        else
            this.error_signUpPassword = "";
        //checkPassword
        if (this.signUp_confirm_password === "") {
            this.error_signUpConfirmPassword = "Please confirm your password";
            isFormValid = false;
        }
        else {
            if (this.signUp_password !== this.signUp_confirm_password) {
                this.error_signUpConfirmPassword = "Your Passwords do not match";
                isFormValid = false;
            }
            else
                this.error_signUpConfirmPassword = "";
        }
        return isFormValid;
    };
    UserAuthComponent.prototype.signUp = function () {
        var _this = this;
        if (this.validateSignUpForm()) {
            var formData = new FormData();
            formData.append("firstName", this.signUp_firstName);
            formData.append("lastName", this.signUp_lastName);
            formData.append("userEmail", this.signUp_email);
            formData.append("userName", this.signUp_userName);
            formData.append("userPassword", this.signUp_confirm_password);
            this.httpService.postRequest(this.createUrlTag, formData).subscribe(function (resBook) {
                _this.recieved_packet = resBook;
                if (_this.recieved_packet[0].status == 1) {
                    localStorage.setItem("userName", _this.signUp_userName);
                    console.log(localStorage.getItem("userName"));
                    _this.router.navigate(['createProfile']);
                }
                else {
                    _this.error_signUpString = _this.recieved_packet[0].error_string;
                }
            });
        }
    };
    UserAuthComponent = __decorate([
        core_1.Component({
            selector: 'user',
            template: "<div id=\"authForms\" class=\"container\">\n              <div class=\"row\">\n                <div class=\"col-md-8 col-md-offset-2\">\n                  <ul class=\"nav nav-tabs nav-justified\">\n      \t\t\t        <li class=\"active\"><a  href=\"#SignIn\" data-toggle=\"tab\">SignIn</a></li>\n                    <li><a href=\"#SignUp\" data-toggle=\"tab\">SignUp</a></li>\n                  </ul>\n                  <div class=\"tab-content \">\n                    <div class=\"tab-pane active\" id=\"SignIn\">\n                      <div class=\"jumbotron\">\n                        <form>\n                          <h4>{{ error_SignInString }}</h4>\n                          <div class=\"form-group\">\n                            <label for=\"signIn_email_userName\">Email address/ User Name:</label>\n                            <input type=\"text\" class=\"form-control\" id=\"signIn_email_userName\" [(ngModel)]=\"signIn_email_userName\" name=\"signIn_email_userName\" />\n                            {{ error_signIn_UserName_Email }}\n                          </div>\n                          <div class=\"form-group\">\n                            <label for=\"signIn_password\">Password:</label>\n                            <input type=\"password\" class=\"form-control\" id=\"signIn_password\" [(ngModel)]=\"signIn_password\" name=\"signIn_password\" />\n                            {{ error_signInPassword }}\n                          </div>\n                          <button type=\"submit\" class=\"form-control btn btn-default\" (click)=\"logIn()\">Sign In</button>\n                        </form>\n                      </div>\n                    </div>\n                    <div class=\"tab-pane\" id=\"SignUp\">\n                      <div class=\"jumbotron\">\n                        <form>\n                          <h4>{{ error_signUpString }}</h4>\n                          <div class=\"form-group\">\n                            <label for=\"signUp_firstName\">First Name:</label>\n                            <input type=\"text\" class=\"form-control\" id=\"signUp_firstName\" [(ngModel)]=\"signUp_firstName\" name=\"signUp_firstName\" />\n                            {{ error_signUpfirstName }}\n                          </div>\n                          <div class=\"form-group\">\n                            <label for=\"signUp_lastName\">Last Name:</label>\n                            <input type=\"text\" class=\"form-control\" id=\"signUp_lastName\" [(ngModel)]=\"signUp_lastName\" name=\"signUp_lastName\" />\n                            {{ error_signUplastName }}\n                          </div>\n                          <div class=\"form-group\">\n                            <label for=\"signUp_email\">Email address:</label>\n                            <input type=\"email\" class=\"form-control\" id=\"signUp_email\" [(ngModel)]=\"signUp_email\" name=\"signUp_email\" />\n                            {{ error_signUpemail }}\n                          </div>\n                          <div class=\"form-group\">\n                            <label for=\"signUp_userName\">userName:</label>\n                            <input type=\"text\" class=\"form-control\" id=\"signUp_userName\" [(ngModel)]=\"signUp_userName\" name=\"signUp_userName\" />\n                            {{ error_signUpUserName }}\n                          </div>\n                          <div class=\"form-group\">\n                            <label for=\"signUp_password\">Password:</label>\n                            <input type=\"password\" class=\"form-control\" id=\"signUp_password\" [(ngModel)]=\"signUp_password\" name=\"signUp_password\" />\n                            {{ error_signUpPassword }}\n                          </div>\n                          <div class=\"form-group\">\n                            <label for=\"signUp_confirm_password\">Confirm Password:</label>\n                            <input type=\"password\" class=\"form-control\" id=\"signUp_confirm_password\" [(ngModel)]=\"signUp_confirm_password\" name=\"signUp_password\" />\n                            {{ error_signUpConfirmPassword }}\n                          </div>\n                          <button type=\"submit\" class=\"form-control btn btn-default\" (click)=\"signUp()\">Sign Up</button>\n                        </form>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>",
            providers: [http_service_1.HttpService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
    ], UserAuthComponent);
    return UserAuthComponent;
}());
exports.UserAuthComponent = UserAuthComponent;
//# sourceMappingURL=userAuth.component.js.map