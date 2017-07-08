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
var ExperienceComponent = (function () {
    function ExperienceComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.pageNumber = 0;
        this.profileView = false;
        this.placeName = "";
        this.galleryName = "";
        this.experienceDescription = "";
        this.formData = new FormData();
        this.multiple = false;
        this.errorDescriptionPictureFlag = 0;
        this.error_addExperience = "";
        this.error_placeName = "";
        this.addExperienceURL = "experience/addExperience/";
        this.fetchExperience = "experience/fetchExperience/";
        this.alterExperienceURLTag = "experience/alterExperience/";
    }
    ExperienceComponent.prototype.ngOnInit = function () {
        this.fetchExperince();
    };
    ExperienceComponent.prototype.addDescription = function (ev) {
        try {
            this.experienceDescription = ev.target.value;
        }
        catch (e) {
            console.info('could not set experience');
        }
    };
    ExperienceComponent.prototype.fileChange = function () {
        var inputEl = this.inputEl.nativeElement;
        var fileCount = inputEl.files.length;
        console.log(fileCount);
        if (fileCount > 0) {
            for (var i = 0; i < fileCount; i++) {
                this.errorDescriptionPictureFlag = 1;
                this.formData.append('file', inputEl.files.item(i));
            }
        }
    };
    ExperienceComponent.prototype.validateExperience = function () {
        var isFormValid = true;
        if (this.errorDescriptionPictureFlag == 0 && this.experienceDescription === "") {
            this.error_addExperience = "Please provide something to share as experience";
            isFormValid = false;
        }
        else {
            this.error_addExperience = "";
        }
        if (this.placeName === "") {
            this.error_placeName = "Please provide Place Name";
            isFormValid = false;
        }
        else {
            if (/[^a-zA-Z]/.test(this.placeName)) {
                this.error_placeName = "First Name can have only Characaters";
                isFormValid = false;
            }
            else
                this.error_placeName = "";
        }
        return isFormValid;
    };
    ExperienceComponent.prototype.addExperience = function () {
        var _this = this;
        if (this.validateExperience()) {
            this.formData.append("authToken", localStorage.getItem("authToken"));
            this.formData.append("description", this.experienceDescription);
            this.formData.append("placeName", this.placeName);
            this.formData.append("galleryName", this.galleryName);
            this.httpService.uploadImage(this.addExperienceURL, this.formData).subscribe(function (resBook) {
                _this.recieveAddExperienceResponse = resBook;
                if (_this.recieveAddExperienceResponse[0].status == 1) {
                    if (window.location.href.search("my-profile"))
                        _this.router.navigate(['home']);
                    else
                        _this.router.navigate(['my-profile']);
                }
                else {
                    console.log("Something went wrong");
                }
            });
        }
    };
    ExperienceComponent.prototype.fetchExperince = function () {
        var _this = this;
        var fetchExperienceFormData = new FormData();
        fetchExperienceFormData.append("authToken", localStorage.getItem("authToken"));
        fetchExperienceFormData.append("pageNumber", this.pageNumber);
        if (window.location.href.search("my-profile"))
            fetchExperienceFormData.append("myProfileFlag", "1");
        else
            fetchExperienceFormData.append("myProfileFlag", "0");
        this.httpService.postRequest(this.fetchExperience, fetchExperienceFormData).subscribe(function (resBook) {
            _this.experiencesResponses = resBook;
            if (_this.experiencesResponses[0].status == 1) {
                _this.experiences = _this.experiencesResponses[0].experiences;
            }
            else {
                console.log("something went wrong");
            }
        });
    };
    ExperienceComponent.prototype.alterLikeExperience = function (expID) {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", localStorage.getItem("authToken"));
        formData.append("expID", expID);
        this.httpService.postRequest(this.alterExperienceURLTag, formData).subscribe(function (resBook) {
            _this.alterExperiencesResponses = resBook;
            if (_this.alterExperiencesResponses[0].status == 1) {
                _this.fetchExperince();
            }
            else {
                console.log("something went wrong");
            }
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ExperienceComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.ViewChild('fileInput'), 
        __metadata('design:type', core_1.ElementRef)
    ], ExperienceComponent.prototype, "inputEl", void 0);
    ExperienceComponent = __decorate([
        core_1.Component({
            selector: 'experience',
            template: "<div class=\"container\">\n              <div class=\"jumbotron\">\n                <div class=\"add_experience\" >\n                  <button type=\"button\" class=\"btn btn-default right\" data-toggle=\"modal\" data-target=\"#addExperienceModal\" style=\"margin:0 auto;\">\n                    Add Experience\n                  </button>\n                  <div class=\"modal fade\" id=\"addExperienceModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addExperienceModal\">\n                    <div class=\"modal-dialog\" role=\"document\">\n                      <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                          <h4 class=\"modal-title\" id=\"myModalLabel\">Add Your Experience</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                          <form>\n                            <span>{{ error_addExperience }}</span>\n                            <div class=\"form-group\">\n                              <label for=\"descriptionExperience\">Say Something About Your Experience</label>\n                              <textarea form=\"descExp\" name=\"descriptionExperience\" id=\"descriptionExperience\" (change)=\"addDescription($event)\" class=\"form-control\"></textarea>\n                            </div>\n                            <div class=\"form-group\">\n                              <label>Profile Picture:</label>\n                              <label class=\"btn btn-default form-control\">\n                                Browse Image <input type=\"file\" (change)=\"fileChange()\" placeholder=\"Upload file\" accept=\".jpg,.jpeg,.png\"  class=\"form-control\" #fileInput multiple hidden/>\n                              </label>\n                            </div>\n                            <div class=\"form-group\">\n                              <label for=\"placeName\">Name of the place you visited</label>\n                              <input type=\"text\" class=\"form-control\" id=\"placeName\" [(ngModel)]=\"placeName\" name=\"placeName\" placeholder=\"bengaluru\" />\n                              {{ error_placeName }}\n                            </div>\n                            <div class=\"form-group\">\n                              <label for=\"galleryName\">GalleryName</label>\n                              <input type=\"text\" class=\"form-control\" id=\"galleryName\" [(ngModel)]=\"galleryName\" name=\"galleryName\" />\n                              {{ error_placeName }}\n                            </div>\n                          </form>\n                        </div>\n                        <div class=\"modal-footer\">\n                          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n                          <button type=\"button\" class=\"btn btn-primary\" (click)=\"addExperience()\">Add Experience</button>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div *ngFor=\"let experience of experiences;let i=index\" class=\"yuhu\">\n                  <div class=\"experience-block row\" style=\"background:white; padding:20px\">\n                    <div class=\"expereince-header\">\n                      <div class=\"media\">\n                        <div class=\"media-left media-middle\">\n                          <a href=\"#\">\n                            <img class=\"media-object\" [src]=\"experience.userImageURL\" height=\"64px\" height=\"64px\" />\n                          </a>\n                        </div>\n                        <div class=\"media-body\">\n                          <h3 class=\"media-heading\">{{ experience.userFirstName }} {{ experience.userLastName }}</h3>\n                          <span>{{ experience.expriencePlace }}</span>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"experience-body\">\n                      <div class=\"row\">\n                        <div class=\"imageGallery-body text-justify\" style=\"padding:20px;\">\n                          <div [attr.id]=\"experience.exprienceID\" class=\"carousel slide\" data-ride=\"carousel\">\n                            <ol class=\"carousel-indicators\" *ngFor=\"let imgUrl of experience.imageUrls\">\n                              <li [attr.data-target]=\"experience.hashexprienceID\" [attr.data-slide-to]=\"index\" [class.active]=\"!index\"></li>\n                            </ol>\n                            <div class=\"carousel-inner text-center\" role=\"listbox\">\n                              <div class=\"item active\" *ngFor=\"let imgUrl of experience.imageUrls;\">\n                                <img [src]=\"imgUrl.imageUrl\" class=\"img-responsive\" style=\"margin:0 auto;\" [class.selector]=\"!index\"/>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        <div class=\"blog-body text-justify\" style=\"padding:20px;\">\n                            {{experience.experienceDescription}}\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"experience-like\">\n                      <span><span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\" [class.liked]=\"experience.isUserLiked\" (click)=\"alterLikeExperience(experience.exprienceID)\"></span> <span [hidden]=\"!experience.isUserLiked\">You and</span> {{ experience.experiencesLikeCount }} persons liked</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n            ",
            styles: [".experiences{\n            background:white;\n  }\n  .media-body{\n    padding:1em;\n  }\n  .blog-img{\n    margin:0 auto;\n    text-align:center;\n  }\n  .blog-img .img-repsonsive{\n    margin: 0 auto;\n    text-align:center;\n  }\n  .experiences-body{\n    text-align:center;\n    padding:10px;\n  }\n  [hidden] {\n    display: none !important;\n  "
            ]
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
    ], ExperienceComponent);
    return ExperienceComponent;
}());
exports.ExperienceComponent = ExperienceComponent;
//# sourceMappingURL=experience.component.js.map