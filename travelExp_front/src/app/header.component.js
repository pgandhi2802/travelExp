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
var HeaderComponent = (function () {
    function HeaderComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.loggedIn_urlTag = "userAuth/isAuthenticated/";
        this.fetchDataUrl = "userAuth/fetchData/";
        this.userFirstName = "";
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", this.httpService.getAuthCookie());
        this.httpService.postRequest(this.loggedIn_urlTag, formData).subscribe(function (resBook) {
            _this.loggedin_recieved_packet = resBook;
            console.log(_this.loggedin_recieved_packet[0].status);
            if (_this.loggedin_recieved_packet[0].status == 1) {
                _this.fetchLittleDetailForHeader();
            }
        });
    };
    HeaderComponent.prototype.fetchLittleDetailForHeader = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", this.httpService.getAuthCookie());
        this.httpService.postRequest(this.fetchDataUrl, formData).subscribe(function (resBook) {
            _this.loggedin_recieved_packet = resBook;
            console.log(_this.loggedin_recieved_packet[0].status);
            if (_this.loggedin_recieved_packet[0].status == 1) {
                _this.userFirstName = _this.loggedin_recieved_packet[0].firstName;
                _this.userFirstName = _this.userFirstName.charAt(0).toUpperCase() + _this.userFirstName.slice(1);
            }
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            template: "<nav class=\"navbar \">\n              <div class=\"container\">\n                <div class=\"navbar-header\">\n                  <a class=\"navbar-brand\" href=\"#\">travelExp</a>\n                </div>\n                <div id=\"navbar\" class=\"navbar-collapse\">\n                  <div class=\"navbar-form navbar-right\">\n                    <a *ngIf=\"userFirstName\" routerLink=\"/my-profile\" routerLinkActive=\"active\" >{{ userFirstName }} </a>\n                    <a *ngIf=\"userFirstName\" routerLink=\"/logout\" routerLink=\"active\">SignOut</a>\n                  </div>\n                </div>\n              </div>\n            </nav>",
            providers: [http_service_1.HttpService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map