import { Component,ElementRef,Input,ViewChild,OnInit } from '@angular/core'
import { HttpService } from './http.service'
import { Router } from '@angular/router'
@Component({
  selector:'experience',
  template:`<div class="container">
              <div class="jumbotron">
                <div class="add_experience" >
                  <button type="button" class="btn btn-default right" data-toggle="modal" data-target="#addExperienceModal" style="margin:0 auto;">
                    Add Experience
                  </button>
                  <div class="modal fade" id="addExperienceModal" tabindex="-1" role="dialog" aria-labelledby="addExperienceModal">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 class="modal-title" id="myModalLabel">Add Your Experience</h4>
                        </div>
                        <div class="modal-body">
                          <form>
                            <span>{{ error_addExperience }}</span>
                            <div class="form-group">
                              <label for="descriptionExperience">Say Something About Your Experience</label>
                              <textarea form="descExp" name="descriptionExperience" id="descriptionExperience" (change)="addDescription($event)" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                              <label>Profile Picture:</label>
                              <label class="btn btn-default form-control">
                                Browse Image <input type="file" (change)="fileChange()" placeholder="Upload file" accept=".jpg,.jpeg,.png"  class="form-control" #fileInput multiple hidden/>
                              </label>
                            </div>
                            <div class="form-group">
                              <label for="placeName">Name of the place you visited</label>
                              <input type="text" class="form-control" id="placeName" [(ngModel)]="placeName" name="placeName" placeholder="bengaluru" />
                              {{ error_placeName }}
                            </div>
                            <div class="form-group">
                              <label for="galleryName">GalleryName</label>
                              <input type="text" class="form-control" id="galleryName" [(ngModel)]="galleryName" name="galleryName" />
                              {{ error_placeName }}
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-primary" (click)="addExperience()">Add Experience</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div *ngFor="let experience of experiences;let i=index" class="yuhu">
                  <div class="experience-block row" style="background:white; padding:20px">
                    <div class="expereince-header">
                      <div class="media">
                        <div class="media-left media-middle">
                          <a href="#">
                            <img class="media-object" [src]="experience.userImageURL" height="64px" height="64px" />
                          </a>
                        </div>
                        <div class="media-body">
                          <h3 class="media-heading">{{ experience.userFirstName }} {{ experience.userLastName }}</h3>
                          <span>{{ experience.expriencePlace }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="experience-body">
                      <div class="row">
                        <div class="imageGallery-body text-justify" style="padding:20px;">
                          <div [attr.id]="experience.exprienceID" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators" *ngFor="let imgUrl of experience.imageUrls">
                              <li [attr.data-target]="experience.hashexprienceID" [attr.data-slide-to]="index" [class.active]="!index"></li>
                            </ol>
                            <div class="carousel-inner text-center" role="listbox">
                              <div class="item active" *ngFor="let imgUrl of experience.imageUrls;">
                                <img [src]="imgUrl.imageUrl" class="img-responsive" style="margin:0 auto;" [class.selector]="!index"/>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="blog-body text-justify" style="padding:20px;">
                            {{experience.experienceDescription}}
                        </div>
                      </div>
                    </div>
                    <div class="experience-like">
                      <span><span class="glyphicon glyphicon-heart" aria-hidden="true" [class.liked]="experience.isUserLiked" (click)="alterLikeExperience(experience.exprienceID)"></span> <span [hidden]="!experience.isUserLiked">You and</span> {{ experience.experiencesLikeCount }} persons liked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `,
  styles:[`.experiences{
            background:white;
  }
  .media-body{
    padding:1em;
  }
  .blog-img{
    margin:0 auto;
    text-align:center;
  }
  .blog-img .img-repsonsive{
    margin: 0 auto;
    text-align:center;
  }
  .experiences-body{
    text-align:center;
    padding:10px;
  }
  \[hidden\] {
    display: none !important;
  `
  ]
})
export class ExperienceComponent implements OnInit{
  pageNumber:number=0;
  profileView:boolean=false;
  recieveAddExperienceResponse:any
  placeName:string="";
  galleryName:string="";
  experienceDescription:string="";
  experiencesResponses:any;
  alterExperiencesResponses:any
  experiences:any;
  formData:FormData=new FormData();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  errorDescriptionPictureFlag:number=0;
  error_addExperience:string="";
  error_placeName:string="";
  private addExperienceURL:string="experience/addExperience/"
  private fetchExperience:string="experience/fetchExperience/"
  private alterExperienceURLTag:string="experience/alterExperience/"

  constructor(private httpService:HttpService,private router:Router){
  }
  ngOnInit(){
    this.fetchExperince();
  }
  addDescription(ev:any){
    try {
      this.experienceDescription = ev.target.value;
    } catch(e) {
      console.info('could not set experience');
    }
  }
  fileChange() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    console.log(fileCount)
    if (fileCount > 0){
      for(let i= 0; i < fileCount; i++) {
        this.errorDescriptionPictureFlag=1;
        this.formData.append('file', inputEl.files.item(i));
      }
    }
  }
  validateExperience(){
    let isFormValid:boolean=true;
    if ( this.errorDescriptionPictureFlag==0 && this.experienceDescription===""){
      this.error_addExperience="Please provide something to share as experience"
      isFormValid=false;
    }else{
      this.error_addExperience="";
    }
    if (this.placeName===""){
      this.error_placeName="Please provide Place Name"
      isFormValid=false;
    }else{
      if (/[^a-zA-Z]/.test(this.placeName)){
        this.error_placeName="First Name can have only Characaters"
        isFormValid=false;
      }else
        this.error_placeName=""
    }
    return isFormValid
  }
  addExperience(){
    if(this.validateExperience()){
      this.formData.append("authToken",localStorage.getItem("authToken"))
      this.formData.append("description",this.experienceDescription)
      this.formData.append("placeName",this.placeName)
      this.formData.append("galleryName",this.galleryName)
      this.httpService.uploadImage(this.addExperienceURL,this.formData).subscribe( resBook => {
        this.recieveAddExperienceResponse = resBook;
        if (this.recieveAddExperienceResponse[0].status==1){
          if(window.location.href.search("my-profile"))
            this.router.navigate(['home'])
          else
            this.router.navigate(['my-profile'])

        }
        else{
          console.log("Something went wrong")
        }
      });
    }
  }
  fetchExperince(){
    let fetchExperienceFormData:FormData= new FormData();
    fetchExperienceFormData.append("authToken",localStorage.getItem("authToken"))
    fetchExperienceFormData.append("pageNumber",this.pageNumber)
    if(window.location.href.search("my-profile"))
      fetchExperienceFormData.append("myProfileFlag","1")
    else
      fetchExperienceFormData.append("myProfileFlag","0")
    this.httpService.postRequest(this.fetchExperience,fetchExperienceFormData).subscribe(resBook=>{
      this.experiencesResponses=resBook;
      if(this.experiencesResponses[0].status==1){
        this.experiences=this.experiencesResponses[0].experiences
      }
      else{
        console.log("something went wrong")
      }
    });
  }
  alterLikeExperience(expID:any){
    let formData:FormData=new FormData();
    formData.append("authToken",localStorage.getItem("authToken"))
    formData.append("expID",expID)
    this.httpService.postRequest(this.alterExperienceURLTag,formData).subscribe(resBook=>{
      this.alterExperiencesResponses=resBook;
      if(this.alterExperiencesResponses[0].status==1){
        this.fetchExperince();
      }
      else{
        console.log("something went wrong")
      }
    });
  }
}
