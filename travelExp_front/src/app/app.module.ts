import { HttpService } from './http.service';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home.module'

import { AppComponent }  from './app.component';
import { HeaderComponent } from './header.component';
import { UserAuthComponent } from './userAuth.component';
import { HomeComponent } from './home.component'
import { CreateProfileComponent } from './createProfile.component'
import { ExperienceComponent } from './experience.component'
import { MyProfileComponent } from './myProfile.component'
@NgModule({
  imports:      [ HomeModule, BrowserModule, FormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'userAuth',
        component:UserAuthComponent
      },
      {
        path:'createProfile',
        component:CreateProfileComponent
      },
      {
        path:'my-profile',
        component:MyProfileComponent
      }
    ])
  ],
  declarations: [ AppComponent, HeaderComponent, UserAuthComponent, CreateProfileComponent, MyProfileComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ HttpService ]
})
export class AppModule { }
