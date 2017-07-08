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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.urlRestAPI = 'http://localhost:8000/';
        this.userAuthPath = "isUserLoggedIn";
    }
    HttpService.prototype.setAuthCookie = function (token) {
        return localStorage.setItem('authToken', token);
    };
    HttpService.prototype.getAuthCookie = function () {
        return localStorage.getItem("authToken");
    };
    HttpService.prototype.getCSRFCookie = function () {
        return (document.cookie.split(";")[0]).split("=")[1];
    };
    HttpService.prototype.errorHandler = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || "Server Error");
    };
    HttpService.prototype.getRequest = function (path) {
        return this.http.get(this.urlRestAPI + path).map(function (response) { return response.json(); }).catch(this.errorHandler);
    };
    HttpService.prototype.postRequest = function (path, formData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Accept', 'application/json');
        headers.append('X-CSRFToken', this.getCSRFCookie());
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.urlRestAPI + path, formData).map(function (res) { return res.json(); });
        // let headers = new Headers({ 'Content-Type':'application/json' });
        // headers.append('X-CSRFToken', this.getCSRFCookie());
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.urlRestAPI+path, JSON.stringify(formData), options ).map((res: Response) => res.json()).catch(this.errorHandler);
    };
    HttpService.prototype.uploadImage = function (path, formData) {
        var upheaders = new http_1.Headers();
        upheaders.append('Content-Type', 'multipart/form-data');
        upheaders.append('Accept', 'application/json');
        upheaders.append('X-CSRFToken', this.getCSRFCookie());
        var upoptions = new http_1.RequestOptions({ headers: upheaders });
        return this.http.post(this.urlRestAPI + path, formData).map(function (res) { return res.json(); }).catch(this.errorHandler);
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map