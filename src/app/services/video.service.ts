import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class VideoService {
    constructor(private http: HttpClient) {}

    // private getHeaders(): HttpHeaders {
    //   const token = localStorage.getItem('token');
    //   return new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Token ${token}`
    //   });
    // }

    // getVideos() {
    //     const url = environment.apiUrl + "/video_selection/";
    //     let headers = new HttpHeaders();
    //     headers = headers.set(
    //         "Authorization",
    //         "Token" + localStorage.getItem("token")
    //     );
    //     return lastValueFrom(this.http.get(url, { headers: headers }));
    // }

    getVideos() {
      const url = environment.apiUrl + "/video_selection/";
      let headers = new HttpHeaders();

      if (typeof window !== "undefined" && localStorage.getItem("token")) {
          headers = headers.set(
              "Authorization",
              "Token " + localStorage.getItem("token")
          );
      } else {
          console.error("localStorage is not available or token is missing");
          return Promise.reject("localStorage is not available or token is missing");
      }

      return lastValueFrom(this.http.get(url, { headers: headers }));
  }
}
