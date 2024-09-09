import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class VideoService {
    constructor(private http: HttpClient) {}

    getVideos() {
      const url = environment.apiUrl + "/video_selection/";
      return lastValueFrom(this.http.get(url));
  }
}
