import { Component,ElementRef,Input,ViewChild, OnInit } from '@angular/core';
import { HttpService } from './http.service'
import { Router } from '@angular/router'
@Component({
  selector:'createProfile',
  template:`<div id="createProfileForm" class="container">
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <div class="jumbotron">
                    <form>
                      <div class="form-group">
                        <label for="tagLine">TagLine:</label>
                        <textarea form="tagLine" name="tagLine" id="tagLine" (change)="assignTagLine($event)" class="form-control"></textarea>
                        {{ error_tagLine}}
                      </div>
                      <div class="form-group">
                        <label>Profile Picture:</label>
                        <label class="btn btn-default form-control">
                          Browse Image <input type="file" (change)="fileChange()" placeholder="Upload file" accept=".jpg,.jpeg,.png"  class="form-control" #fileInput hidden/>
                        </label>
                      </div>
                      <!--<div class="form-group">
                        <label for="profilePicture">ProfilePicture</label>
                        <input type="file" (change)="fileChange()" placeholder="Upload file" accept=".jpg,.jpeg,.png"  class="form-control" multiple #fileInput/>
                      </div>-->
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="age">Age</label>
                            <input type="number" class="form-control" id="age" [(ngModel)]="userAge" name="age" placeholder="0" />
                            {{ error_Age }}
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label for="gender">Gender</label>
                            <div class="row">
                              <div class="col-xs-6">
                                <span class="input-group-addon">
                                  <label for="male" >Male</label>
                                  <input type="radio" name="gender" id="male" value="0" [(ngModel)]="userGender" checked/>
                                </span>
                              </div>
                              <div class="col-xs-6">
                                <span class="input-group-addon">
                                  <label for="male" >Female</label>
                                  <input type="radio" name="gender" id="female" value="1" [(ngModel)]="userGender"/>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" class="form-control btn btn-default" (click)="createProfile()">Sign Up</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>`,
            styles:[`\[hidden\] {
              display: none !important;
            }`]
})
export class CreateProfileComponent implements OnInit{
  loggedin_recieved_packet:any
  private loggedIn_urlTag="userAuth/isAuthenticated/"
  private MALE:number=0;
  private FEMALE:number=1;
  private createProfileUrlTag:string="userAuth/createProfile/"
  tagLineValue:string="";
  userAge:number=0;
  userGender:number=this.MALE;
  error_tagLine:string="";
  error_Age:string="";
  erroProfilePictureFlag:number=0;
  error_ProfilePicture:string="";
  formData:FormData=new FormData();
  private recieved_packet:any;
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  constructor(private httpService:HttpService,private router: Router){
  }
  ngOnInit(){
    let formData:FormData= new FormData();
    formData.append("authToken",this.httpService.getAuthCookie());
    this.httpService.postRequest(this.loggedIn_urlTag,formData).subscribe( resBook => {
      this.loggedin_recieved_packet = resBook;
      console.log(this.loggedin_recieved_packet[0].status);
      if (this.loggedin_recieved_packet[0].status==1)
        this.router.navigate(['home'])
      else{
        console.log("Home sweet home")
      }
    });
  }
  assignTagLine(ev:any){
    try {
      this.tagLineValue = ev.target.value;
    } catch(e) {
      console.info('could not set tagLine');
    }
  }

  validateProfile(){
    let isFormValid:boolean=true;
    //checkTagLine
    if (this.tagLineValue===""){
      this.error_tagLine="Please provide a TagLine"
      isFormValid=false;
    }else{
      this.error_tagLine="";
    }
    //checkAge
    if (this.userAge===0){
      this.error_Age="Please provide your Age"
      isFormValid=false;
    }else{
    }
    if (this.erroProfilePictureFlag===0)
      this.error_ProfilePicture="Please provide your profile picture"
    else
      this.error_ProfilePicture="";
    return isFormValid
  }


  fileChange() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    console.log(fileCount)
    if (fileCount > 0){
      for(let i= 0; i < fileCount; i++) {
        this.erroProfilePictureFlag=1;
        this.formData.append('file', inputEl.files.item(i));
      }
    }
  }

  createProfile(){
    if (this.validateProfile()){
      this.formData.append("userName",localStorage.getItem("userName"))
      console.log(localStorage.getItem("userName"))
      this.formData.append("tagLine",this.tagLineValue)
      this.formData.append("userAge",this.userAge)
      this.formData.append("userGender",this.userGender)
      this.httpService.postRequest(this.createProfileUrlTag,this.formData).subscribe( resBook => {
        this.recieved_packet = resBook;
        console.log("yuhu"+this.recieved_packet[0].status)
        if (this.recieved_packet[0].status==1)
          this.router.navigate(['userAuth'])
      });
    }
    console.log(this.tagLineValue)
    console.log(this.userAge)
    console.log(this.userGender)
  }
}
