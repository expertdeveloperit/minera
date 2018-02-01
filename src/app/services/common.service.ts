import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {

  constructor(public http:Http, public httpClient: HttpClient) {
  }
//--Common Get request function
    get(url:string){
     
    	return this.http.get(this.getFullUrl(url),{withCredentials: true}).map((response:Response) => {
    		return response.json();
    	}).catch((error:Response) => {
    		return Observable.throw(error);
    	})

    }
//--Common External Get request
    getExternalData(url:string){
      return this.http.get(url).map((response:Response) => {
        return response.json();
      }).catch((error:Response) => {
        return Observable.throw(error);
      })
    }

    getExternalDataWithHeader(url:string,header){
      return this.http.get(url).map((response:Response) => {
        return response.json();
      }).catch((error:Response) => {
        return Observable.throw(error);
      })
    }
//--Common Post request function
    post(url:string,data:any){
    	return this.http.post(this.getFullUrl(url), data,{withCredentials: true}).map((response:Response) => {
    		return response.json();
    	}).catch((error:Response) => {
    		return Observable.throw(error);
    	})

    }

//sending requests using HTTP client
    httpClientGet(url:string){
      var sid = JSON.parse(localStorage.getItem('user')).id 
      return this.httpClient.get(this.getFullUrl(url),{headers:{"Content-Type": "application/x-www-form-urlencoded","Access-Control-Allow-Origin": "*" ,'sid':sid}}).map((response) => {
        return response;
      }).catch((error:Response) => {
        return Observable.throw(error);
      })

    }

    httpClientPost(url:string, data:any){
      return this.httpClient.post(this.getFullUrl(url), data, {withCredentials:true}).map((response: Response) => {
        console.log(response);
      })
   }
    
    getFullUrl(url: string): string {
       return environment.apiEndPoint + url;
    }
 //--Profile Component--
  public profileData(formdata: any){    
      let _url:string = 'http://localhost:4000/api/';
          return this.http.post(_url,formdata)
          .map((response: Response) => {
          return response.json();
        });
    }

    //forgot password
    forgotPassword(url){
         return this.http.get(url).map((response:Response) => {
            // check if any response is coming then return it in json
            return response.text();

        }).catch((error:Response) => {
            return Observable.throw(error);
        })   
    }

    //logout
    logout(url:string){
      return this.http.post(this.getFullUrl(url),'').map((response: Response) => {
      }).catch((error: Response) => {
        return Observable.throw(error);
      })
    }
}


