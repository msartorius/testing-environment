import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";

@Injectable()
export class HttpService {

  private serverUrl: string;

  constructor (private http: Http) {
    this.serverUrl = window.location.protocol + "//" + window.location.hostname +
      (window.location.port ? ":" + window.location.port : "") + "/api/";
  }

  get<T>(url: string): Observable<T> {
    return this.http.get(this.serverUrl + url)
      .map((res: Response) => res.json() as T)
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  post<T extends {}>(url: string, data: T): Observable<T> {
    return this.postAndPut<T>(this.http.post(this.serverUrl + url, this.encodeData(data), this.getHeaderOptionsForSendingData()));
  }

  put<T extends {}>(url: string, data: T): Observable<T> {
    return this.postAndPut<T>(this.http.put(this.serverUrl + url, this.encodeData(data), this.getHeaderOptionsForSendingData()));
  }

  delete<T extends {}>(url: string, id: string): Observable<T> {
    return this.http.delete(this.serverUrl + url + "/" + id)
      .map((res: Response) => res.json() as T)
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  private postAndPut<T>(method: Observable<Response>): Observable<T> {
    return method
      .map((res: Response) => res.json() as T)
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  private getHeaderOptionsForSendingData(): RequestOptions {
    let headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  private encodeData<T extends {}>(data: T): URLSearchParams {
    let a = new URLSearchParams();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        a.set(key, data[key]);
      }
    }
    return a;
  }

}
