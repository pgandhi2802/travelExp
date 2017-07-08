import { Component, OnInit } from '@angular/core'
import { HttpService } from './http.service'
import { Router } from '@angular/router'
import { ExperienceComponent } from './experience.component'
@Component({
  selector:'home',
  template:'<experience></experience>',
})
export class HomeComponent implements OnInit{
  recieved_packet:any
  private urlTag="userAuth/isAuthenticated/"
  constructor(private httpService:HttpService,private router: Router){}
  ngOnInit(){
    let formData:FormData= new FormData();
    formData.append("authToken",this.httpService.getAuthCookie());
    this.httpService.postRequest(this.urlTag,formData).subscribe( resBook => {
      this.recieved_packet = resBook;
      if (this.recieved_packet[0].status==0)
        this.router.navigate(['userAuth'])
      else{
        console.log("Home sweet home")
      }
    });
  }
}
