import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../Constants/app.constants';
import { Observable, catchError, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient, private constants: AppConstants) { }

  get(apiName: string) {
    let url = this.constants.baseUrl + this.getResources(1) + apiName;
    return this.http
      .get<any>(url).pipe(catchError(this.handleError));
  }

  post(apiName: string) {
    let url = this.constants.baseUrl + this.getResources(1) + apiName;
    let params = this.objToString(this.getParams(apiName))
    return this.http.post(url, params, {
      headers: this.getHeaders(apiName),
    }).pipe(catchError(this.handleError))
  }

  getResources(version: number) {
    var resource = ""

    switch (version) {
      case 1:
        resource = "Resource/"
        break
      case 2:
        resource = "ResourceV2/"
        break
      case 3:
        resource = "ResourceV3/"
        break
      case 4:
        resource = "ResourceV4/"
        break
      default:

        break
    }

    return resource
  }

  /* API's Params handling */

  getParams(apiName: string) {
    let paramsDict = new Map<string, any>
    paramsDict.set("access_token", this.constants.accessToken);
    switch (apiName) {
      case this.constants.getAppInfo:
        paramsDict.set("version", '1');
        paramsDict.set("apiKey", this.constants.API_Key);
        paramsDict.set("taxRate", '1');
        break;
      case this.constants.getTrackingId:
        paramsDict.set('device_type', 'Android');
        paramsDict.set('app_version', this.constants.appVersion);
        paramsDict.set('device_pin', '123');
        paramsDict.set('device_os', 'Android');
        paramsDict.set('device_os_version', '321');
        paramsDict.set('device_model', 'Android');
        paramsDict.set('device_make', '123');
        break;
      default:
        break;
    }
    return paramsDict;
  }

  objToString(obj: Map<String, any>) {
    let str = '';
    for (let [key, value] of obj) {
      str += `${key}=${value}&`;
    }
    return str;
  }
  
  /*API's Headers settings */

  getHeaders(apiName: string) {

    let headers = new HttpHeaders()
    .set('platform', 'Android')
    .set('make', 'Android')
    .set('model', 'Android')
    .set('os_version', '1')
    .set('serial_number', '123456')
    .set('app_version', this.constants.appVersion,)
    .set('Connection', 'keep-alive')
    .set('Accept-Encoding', 'gzip, deflate')
    .set('client_class', '1') //Emily Reward : 1, Emily Gift:4
    let trackinId = localStorage.getItem(this.constants.trackingIdVal)
    if(trackinId){//if trackingId not empty then add
      headers = headers.set('tracking_id',trackinId ?? "")
    }
    switch (apiName) {
      case this.constants.getAppInfo:
        headers= headers.set("Content-Type", "application/json");
        headers= headers.set('Content-length', '207')
        break;

      case this.constants.getTrackingId:
        headers= headers.set('Content-Type', 'application/x-www-form-urlencoded');
        break;
      default:
        break;
    }
     console.warn(headers)
    return headers
  }

  /*
    Error Handling for API's
   */
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}