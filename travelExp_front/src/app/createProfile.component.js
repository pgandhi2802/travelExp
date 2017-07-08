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
var CreateProfileComponent = (function () {
    function CreateProfileComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.loggedIn_urlTag = "userAuth/isAuthenticated/";
        this.MALE = 0;
        this.FEMALE = 1;
        this.createProfileUrlTag = "userAuth/createProfile/";
        this.tagLineValue = "";
        this.userAge = 0;
        this.userGender = this.MALE;
        this.error_tagLine = "";
        this.error_Age = "";
        this.erroProfilePictureFlag = 0;
        this.error_ProfilePicture = "";
        this.formData = new FormData();
        this.multiple = false;
    }
    CreateProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", this.httpService.getAuthCookie());
        this.httpService.postRequest(this.loggedIn_urlTag, formData).subscribe(function (resBook) {
            _this.loggedin_recieved_packet = resBook;
            console.log(_this.loggedin_recieved_packet[0].status);
            if (_this.loggedin_recieved_packet[0].status == 1)
                _this.router.navigate(['home']);
            else {
                console.log("Home sweet home");
            }
        });
    };
    CreateProfileComponent.prototype.assignTagLine = function (ev) {
        try {
            this.tagLineValue = ev.target.value;
        }
        catch (e) {
            console.info('could not set tagLine');
        }
    };
    CreateProfileComponent.prototype.validateProfile = function () {
        var isFormValid = true;
        //checkTagLine
        if (this.tagLineValue === "") {
            this.error_tagLine = "Please provide a TagLine";
            isFormValid = false;
        }
        else {
            this.error_tagLine = "";
        }
        //checkAge
        if (this.userAge === 0) {
            this.error_Age = "Please provide your Age";
            isFormValid = false;
        }
        else {
        }
        if (this.erroProfilePictureFlag === 0)
            this.error_ProfilePicture = "Please provide your profile picture";
        else
            this.error_ProfilePicture = "";
        return isFormValid;
    };
    CreateProfileComponent.prototype.fileChange = function () {
        var inputEl = this.inputEl.nativeElement;
        var fileCount = inputEl.files.length;
        console.log(fileCount);
        if (fileCount > 0) {
            for (var i = 0; i < fileCount; i++) {
                this.erroProfilePictureFlag = 1;
                this.formData.append('file', inputEl.files.item(i));
            }
        }
    };
    CreateProfileComponent.prototype.createProfile = function () {
        var _this = this;
        if (this.validateProfile()) {
            this.formData.append("userName", localStorage.getItem("userName"));
            console.log(localStorage.getItem("userName"));
            this.formData.append("tagLine", this.tagLineValue);
            this.formData.append("userAge", this.userAge);
            this.formData.append("userGender", this.userGender);
            this.httpService.postRequest(this.createProfileUrlTag, this.formData).subscribe(function (resBook) {
                _this.recieved_packet = resBook;
                console.log("yuhu" + _this.recieved_packet[0].status);
                if (_this.recieved_packet[0].status == 1)
                    _this.router.navigate(['userAuth']);
            });
        }
        console.log(this.tagLineValue);
        console.log(this.userAge);
        console.log(this.userGender);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CreateProfileComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.ViewChild('fileInput'), 
        __metadata('design:type', core_1.ElementRef)
    ], CreateProfileComponent.prototype, "inputEl", void 0);
    CreateProfileComponent = __decorate([
        core_1.Component({
            selector: 'createProfile',
            template: "<div id=\"createProfileForm\" class=\"container\">\n              <div class=\"row\">\n                <div class=\"col-md-8 col-md-offset-2\">\n                  <div class=\"jumbotron\">\n                    <form>\n                      <div class=\"form-group\">\n                        <label for=\"tagLine\">TagLine:</label>\n                        <textarea form=\"tagLine\" name=\"tagLine\" id=\"tagLine\" (change)=\"assignTagLine($event)\" class=\"form-control\"></textarea>\n                        {{ error_tagLine}}\n                      </div>\n                      <div class=\"form-group\">\n                        <label>Profile Picture:</label>\n                        <label class=\"btn btn-default form-control\">\n                          Browse Image <input type=\"file\" (change)=\"fileChange()\" placeholder=\"Upload file\" accept=\".jpg,.jpeg,.png\"  class=\"form-control\" #fileInput hidden/>\n                        </label>\n                      </div>\n                      <!--<div class=\"form-group\">\n                        <label for=\"profilePicture\">ProfilePicture</label>\n                        <input type=\"file\" (change)=\"fileChange()\" placeholder=\"Upload file\" accept=\".jpg,.jpeg,.png\"  class=\"form-control\" multiple #fileInput/>\n                      </div>-->\n                      <div class=\"row\">\n                        <div class=\"col-sm-6\">\n                          <div class=\"form-group\">\n                            <label for=\"age\">Age</label>\n                            <input type=\"number\" class=\"form-control\" id=\"age\" [(ngModel)]=\"userAge\" name=\"age\" placeholder=\"0\" />\n                            {{ error_Age }}\n                          </div>\n                        </div>\n                        <div class=\"col-sm-6\">\n                          <div class=\"form-group\">\n                            <label for=\"gender\">Gender</label>\n                            <div class=\"row\">\n                              <div class=\"col-xs-6\">\n                                <span class=\"input-group-addon\">\n                                  <label for=\"male\" >Male</label>\n                                  <input type=\"radio\" name=\"gender\" id=\"male\" value=\"0\" [(ngModel)]=\"userGender\" checked/>\n                                </span>\n                              </div>\n                              <div class=\"col-xs-6\">\n                                <span class=\"input-group-addon\">\n                                  <label for=\"male\" >Female</label>\n                                  <input type=\"radio\" name=\"gender\" id=\"female\" value=\"1\" [(ngModel)]=\"userGender\"/>\n                                </span>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                      <button type=\"submit\" class=\"form-control btn btn-default\" (click)=\"createProfile()\">Sign Up</button>\n                    </form>\n                  </div>\n                </div>\n              </div>\n            </div>",
            styles: ["[hidden] {\n              display: none !important;\n            }"]
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
    ], CreateProfileComponent);
    return CreateProfileComponent;
}());
exports.CreateProfileComponent = CreateProfileComponent;
//# sourceMappingURL=createProfile.component.js.map