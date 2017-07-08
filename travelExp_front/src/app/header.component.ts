import { Component, OnInit } from '@angular/core'
import { HttpService } from './http.service'
import { Router, RouterLink } from '@angular/router'
@Component({
  selector: 'header',
  template: `<nav class="navbar ">
              <div class="container">
                <div class="navbar-header">
                  <a class="navbar-brand" href="#">travelExp</a>
                </div>
                <div id="navbar" class="navbar-collapse">
                  <div class="navbar-form navbar-right">
                    <a *ngIf="userFirstName" routerLink="/my-profile" routerLinkActive="active" >{{ userFirstName }} </a>
                    <a *ngIf="userFirstName" routerLink="/logout" routerLink="active">SignOut</a>
                  </div>
                </div>
              </div>
            </nav>`,
  providers:  [HttpService]
})
export class HeaderComponent implements OnInit{
  loggedin_recieved_packet:any
  private loggedIn_urlTag:string="userAuth/isAuthenticated/"
  private fetchDataUrl:string="userAuth/fetchData/"
  authentication:any
  userFirstName:string="";
  constructor(private httpService:HttpService, private router:Router){}
  ngOnInit(){
    let formData:FormData= new FormData();
    formData.append("authToken",this.httpService.getAuthCookie());
    this.httpService.postRequest(this.loggedIn_urlTag,formData).subscribe( resBook => {
      this.loggedin_recieved_packet = resBook;
      console.log(this.loggedin_recieved_packet[0].status);
      if (this.loggedin_recieved_packet[0].status==1)
      {
        this.fetchLittleDetailForHeader();
      }
    });
  }
  fetchLittleDetailForHeader(){
    let formData:FormData= new FormData();
    formData.append("authToken",this.httpService.getAuthCookie());
    this.httpService.postRequest(this.fetchDataUrl,formData).subscribe( resBook => {
      this.loggedin_recieved_packet = resBook;
      console.log(this.loggedin_recieved_packet[0].status);
      if (this.loggedin_recieved_packet[0].status==1)
      {
        this.userFirstName=this.loggedin_recieved_packet[0].firstName
        this.userFirstName=this.userFirstName.charAt(0).toUpperCase()+this.userFirstName.slice(1)
      }
    });
  }
}
