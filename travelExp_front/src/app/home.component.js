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
var HomeComponent = (function () {
    function HomeComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.urlTag = "userAuth/isAuthenticated/";
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var formData = new FormData();
        formData.append("authToken", this.httpService.getAuthCookie());
        this.httpService.postRequest(this.urlTag, formData).subscribe(function (resBook) {
            _this.recieved_packet = resBook;
            if (_this.recieved_packet[0].status == 0)
                _this.router.navigate(['userAuth']);
            else {
                console.log("Home sweet home");
            }
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: '<experience></experience>',
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpService, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map