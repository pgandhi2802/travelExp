import { Injectable } from '@angular/core'
import { Http, Response, Headers, BaseRequestOptions, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService{
  private urlRestAPI:string ='http://localhost:8000/'
  private userAuthPath:string ="isUserLoggedIn"
  constructor(private http:Http){}
  setAuthCookie(token:string){
    return localStorage.setItem('authToken',token)
  }
  getAuthCookie(){
    return localStorage.getItem("authToken")
  }
  getCSRFCookie(){
    return (document.cookie.split(";")[0]).split("=")[1];
  }
  errorHandler(error: Response){
    console.error(error);
    return Observable.throw(error || "Server Error");
  }
  getRequest(path:string){
    return this.http.get(this.urlRestAPI+path).map((response: Response) => response.json()).catch(this.errorHandler);
  }
  postRequest(path:string,formData:FormData){
    let headers = new Headers({ 'Content-Type':'application/json' });
        headers.append('Accept', 'application/json');
        headers.append('X-CSRFToken', this.getCSRFCookie());
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.urlRestAPI+path, formData).map((res: Response) => res.json());
    // let headers = new Headers({ 'Content-Type':'application/json' });
    // headers.append('X-CSRFToken', this.getCSRFCookie());
    // let options = new RequestOptions({ headers:headers });
    // return this.http.post(this.urlRestAPI+path, JSON.stringify(formData), options ).map((res: Response) => res.json()).catch(this.errorHandler);
  }
  uploadImage(path:string,formData:FormData)  {
    let upheaders = new Headers();
    upheaders.append('Content-Type', 'multipart/form-data');
    upheaders.append('Accept', 'application/json');
    upheaders.append('X-CSRFToken', this.getCSRFCookie());
    let upoptions = new RequestOptions({ headers: upheaders });
    return this.http.post(this.urlRestAPI+path,formData).map((res: Response) => res.json()).catch(this.errorHandler);
  }
  // isAuthenticated(){
  //   let headers = new Headers({ 'Content-Type':'application/json' });
  //   headers.append('X-CSRFToken', this.getCSRFCookie());
  //   let options = new RequestOptions({ headers:headers });
  //   return this.http.post(this.urlRestAPI+this.userAuthPath, JSON.stringify(formData), options ).map((res: Response) => res.json()).catch(this.errorHandler);
  // }
}
