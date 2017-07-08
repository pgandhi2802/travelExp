import { Component } from '@angular/core'
import { HomeComponent } from './home.component'
import { HttpService } from './http.service'
@Component({
  selector:'my-profile',
  template:`<div class="profile-header">
              <div class="container">
                <div class="row">
                  <div class="jumbotron text-center" *ngFor="let profile of showProfile">
                    <img [src]="profile.profilePictureURL" class="img-responsive" width="240px" style="margin:0 auto;" alt="Responsive image" />
                    <h2>{{ profile.firstName }} {{profile.lastName}}</h2>
                    <p class="text-center">{{ profile.tagLine}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-body">
              <div id="authForms" class="container">
                <div class="row">
                  <div class="col-md-12" style="padding:0px;">
                    <ul class="nav nav-tabs nav-justified" style="padding:20px;padding-bottom:0px;">
                      <li class="active"><a  href="#my-experience" data-toggle="tab">My Experience</a></li>
                      <li><a href="#wishList" data-toggle="tab">My WishList</a></li>
                    </ul>
                    <div class="tab-content" style="padding:0">
                      <div class="tab-pane active" id="my-experience">
                        <home style="margin:0 auto;"></home>
                      </div>
                      <div class="tab-pane" id="wishList" style="padding:15px;padding-top:0px;">
                      <div class="jumbotron">
                        <div class="row">
                          <div class="col-md-4">
                            <h3>To Visit</h3>
                            <ul class="list-group" >
                              <li class="list-group-item" *ngFor="let wish of wishList" (click)="addVisitedWish(wish.id)" style="cursor:pointer"><span class="badge"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span>{{ wish.place }}</li>
                            </ul>
                          </div>
                          <div class="col-md-4">
                            <h3>Already Visited</h3>
                            <ul class="list-group">
                              <li class="list-group-item" *ngFor="let visitedPlace of visitedList" >{{ visitedPlace.place }}</li>
                            </ul>
                          </div>
                          <div class="col-md-4">
                            <h2>Add Your Wish here</h2>
                            <form>
                            <div class="form-group">
                              <label for="signIn_password">Wish</label>
                              <input type="text" class="form-control" id="wishListEle" [(ngModel)]="wishListEle" name="wishListEle" />
                              {{ error_wishListEle }}
                            </div>
                            <button type="submit" class="form-control btn btn-default" (click)="addWish()">Add Wish</button>
                            </form>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
})
export class MyProfileComponent{
  wishListEle:string
  wishList:any
  visitedList:any
  showProfile:any
  wishListAddResponse:any
  wishListFetchResponse:any
  editWishResponse:any
  showProfileResponse:any
  imageGalleryFetchResponse:any
  error_wishListEle:string=""
  error_showProfileError=""
  private addWishUrl:string="wishList/addWish/"
  private fetchWishListURL:string="wishList/fetchWishList/"
  private editWishURL:string="wishList/editWish/"
  private showProfileURL:string="userAuth/showProfile/"
  imageGalleryList:any
  constructor(private httpService:HttpService){
    this.fetchWishList();
    this.showProfiles();
  }

  addVisitedWish(id:number){
    let formData:FormData= new FormData();
    formData.append("wishId",id)
    this.httpService.postRequest(this.editWishURL,formData).subscribe( resBook =>{
      this.editWishResponse=resBook;
      if(this.editWishResponse[0].status==1)
        this.fetchWishList();
      else
        this.error_wishListEle="Something Went Wrong"
    });
  }

  addWish(){
    if (this.wishListEle.trim()!==""){
      let formData:FormData=new FormData();
      formData.append("authToken",localStorage.getItem("authToken"))
      formData.append("wish",this.wishListEle)
      this.httpService.postRequest(this.addWishUrl,formData).subscribe( resBook => {
        this.wishListAddResponse = resBook;
        if (this.wishListAddResponse[0].status==1){
          console.log("wishAdded")
        }
        else{
          this.error_wishListEle="SomeThing Went Wrong"
        }
      });
      this.fetchWishList();
    }
  }
  fetchWishList(){
    let formData:FormData=new FormData();
    formData.append("authToken",localStorage.getItem("authToken"))
    this.httpService.postRequest(this.fetchWishListURL,formData).subscribe( resBook => {
      this.wishListFetchResponse = resBook;
      console.log(this.wishListFetchResponse[0].status)
      if (this.wishListFetchResponse[0].status==1){
        this.wishList=this.wishListFetchResponse[0].wishList
        this.visitedList=this.wishListFetchResponse[0].visitedList
      }
      else{
        this.error_wishListEle="SomeThing Went Wrong"
      }
    });
  }
  showProfiles(){
    let formData:FormData=new FormData();
    formData.append("authToken",localStorage.getItem("authToken"))
    this.httpService.postRequest(this.showProfileURL,formData).subscribe( resBook => {
      this.showProfileResponse = resBook;
      console.log("jo bhi"+this.showProfileResponse[0].status)
      if (this.showProfileResponse[0].status==1){
        this.showProfile=this.showProfileResponse
      }
      else{
        this.error_showProfileError="SomeThing Went Wrong"
      }
    });
  }
}
