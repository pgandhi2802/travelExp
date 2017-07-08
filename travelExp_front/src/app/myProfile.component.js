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
var MyProfileComponent = (function () {
    function MyProfileComponent(httpService) {
        this.httpService = httpService;
        this.error_wishListEle = "";
        this.error_showProfileError = "";
        this.addWishUrl = "wishList/addWish/";
        this.fetchWishListURL = "wishList/fetchWishList/";
        this.editWishURL = "wishList/editWish/";
        this.showProfileURL = "userAuth/showProfile/";
        this.fetchWishList();
        this.showProfiles();
    }
    MyProfileComponent.prototype.addVisitedWish = function (id) {
        var _this = this;
        var formData = new FormData();
        formData.append("wishId", id);
        this.httpService.postRequest(this.editWishURL, formData).subscribe(function (resBook) {
            _this.editWishResponse = resBook;
            if (_this.editWishResponse[0].status == 1)
                _this.fetchWishList();
            else
                _this.error_wishListEle = "Something Went Wrong";
        });
    };
    MyProfileComponent.prototype.addWish = function () {
        var _this = this;
        if (this.wishListEle.trim() !== "") {
            var formData = new FormData();
            formData.append("authToken", localStorage.getItem("authToken"));
            formData.append("wish", this.wishListEle);
            this.httpService.postRequest(this.addWishUrl, formData).subscribe(function (resBook) {
                _this.wishListAddResponse = resBook;
                if (_this.wishListAddResponse[0].status == 1) {
                    console.log("wishAdded");
                }
                else {
                    _this.error_wishListEle = "SomeThing Went Wrong";
                }
            });
            this.fetchWishList();
        }
    };
    MyProfileComponent.prototype.fetchWishList = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", localStorage.getItem("authToken"));
        this.httpService.postRequest(this.fetchWishListURL, formData).subscribe(function (resBook) {
            _this.wishListFetchResponse = resBook;
            console.log(_this.wishListFetchResponse[0].status);
            if (_this.wishListFetchResponse[0].status == 1) {
                _this.wishList = _this.wishListFetchResponse[0].wishList;
                _this.visitedList = _this.wishListFetchResponse[0].visitedList;
            }
            else {
                _this.error_wishListEle = "SomeThing Went Wrong";
            }
        });
    };
    MyProfileComponent.prototype.showProfiles = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", localStorage.getItem("authToken"));
        this.httpService.postRequest(this.showProfileURL, formData).subscribe(function (resBook) {
            _this.showProfileResponse = resBook;
            console.log("jo bhi" + _this.showProfileResponse[0].status);
            if (_this.showProfileResponse[0].status == 1) {
                _this.showProfile = _this.showProfileResponse;
            }
            else {
                _this.error_showProfileError = "SomeThing Went Wrong";
            }
        });
    };
    MyProfileComponent = __decorate([
        core_1.Component({
            selector: 'my-profile',
            template: "<div class=\"profile-header\">\n              <div class=\"container\">\n                <div class=\"row\">\n                  <div class=\"jumbotron text-center\" *ngFor=\"let profile of showProfile\">\n                    <img [src]=\"profile.profilePictureURL\" class=\"img-responsive\" width=\"240px\" style=\"margin:0 auto;\" alt=\"Responsive image\" />\n                    <h2>{{ profile.firstName }} {{profile.lastName}}</h2>\n                    <p class=\"text-center\">{{ profile.tagLine}}</p>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"profile-body\">\n              <div id=\"authForms\" class=\"container\">\n                <div class=\"row\">\n                  <div class=\"col-md-12\" style=\"padding:0px;\">\n                    <ul class=\"nav nav-tabs nav-justified\" style=\"padding:20px;padding-bottom:0px;\">\n                      <li class=\"active\"><a  href=\"#my-experience\" data-toggle=\"tab\">My Experience</a></li>\n                      <li><a href=\"#wishList\" data-toggle=\"tab\">My WishList</a></li>\n                    </ul>\n                    <div class=\"tab-content\" style=\"padding:0\">\n                      <div class=\"tab-pane active\" id=\"my-experience\">\n                        <home style=\"margin:0 auto;\"></home>\n                      </div>\n                      <div class=\"tab-pane\" id=\"wishList\" style=\"padding:15px;padding-top:0px;\">\n                      <div class=\"jumbotron\">\n                        <div class=\"row\">\n                          <div class=\"col-md-4\">\n                            <h3>To Visit</h3>\n                            <ul class=\"list-group\" >\n                              <li class=\"list-group-item\" *ngFor=\"let wish of wishList\" (click)=\"addVisitedWish(wish.id)\" style=\"cursor:pointer\"><span class=\"badge\"><span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span></span>{{ wish.place }}</li>\n                            </ul>\n                          </div>\n                          <div class=\"col-md-4\">\n                            <h3>Already Visited</h3>\n                            <ul class=\"list-group\">\n                              <li class=\"list-group-item\" *ngFor=\"let visitedPlace of visitedList\" >{{ visitedPlace.place }}</li>\n                            </ul>\n                          </div>\n                          <div class=\"col-md-4\">\n                            <h2>Add Your Wish here</h2>\n                            <form>\n                            <div class=\"form-group\">\n                              <label for=\"signIn_password\">Wish</label>\n                              <input type=\"text\" class=\"form-control\" id=\"wishListEle\" [(ngModel)]=\"wishListEle\" name=\"wishListEle\" />\n                              {{ error_wishListEle }}\n                            </div>\n                            <button type=\"submit\" class=\"form-control btn btn-default\" (click)=\"addWish()\">Add Wish</button>\n                            </form>\n                          </div>\n                        </div>\n                      </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>"
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService])
    ], MyProfileComponent);
    return MyProfileComponent;
}());
exports.MyProfileComponent = MyProfileComponent;
//# sourceMappingURL=myProfile.component.js.map