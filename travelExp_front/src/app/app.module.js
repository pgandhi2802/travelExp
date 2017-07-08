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
var http_service_1 = require('./http.service');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var home_module_1 = require('./home.module');
var app_component_1 = require('./app.component');
var header_component_1 = require('./header.component');
var userAuth_component_1 = require('./userAuth.component');
var home_component_1 = require('./home.component');
var createProfile_component_1 = require('./createProfile.component');
var myProfile_component_1 = require('./myProfile.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [home_module_1.HomeModule, platform_browser_1.BrowserModule, forms_1.FormsModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        component: home_component_1.HomeComponent
                    },
                    {
                        path: 'home',
                        component: home_component_1.HomeComponent
                    },
                    {
                        path: 'userAuth',
                        component: userAuth_component_1.UserAuthComponent
                    },
                    {
                        path: 'createProfile',
                        component: createProfile_component_1.CreateProfileComponent
                    },
                    {
                        path: 'my-profile',
                        component: myProfile_component_1.MyProfileComponent
                    }
                ])
            ],
            declarations: [app_component_1.AppComponent, header_component_1.HeaderComponent, userAuth_component_1.UserAuthComponent, createProfile_component_1.CreateProfileComponent, myProfile_component_1.MyProfileComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [http_service_1.HttpService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map