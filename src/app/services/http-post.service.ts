import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class MyHttpPostService {
  // private serverUrl = "http://localhost:4000/users/authenticate";   // Pointing to localhost  10.0.2.2
  private serverUrl = "http://10.0.2.2:4000/users/authenticate";   // Pointing to localhost  
  //private serverUrl = "https://edusync.azurewebsites.net/users/authenticate";

  constructor(private http: HttpClient) { }

  postData(data: any) {
    let options = this.createRequestOptions();
    return this.http.post(this.serverUrl, data, { headers: options });
  }

  private createRequestOptions() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return headers;
  }
}