// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { environment } from "../../environments/environment";
// import { lastValueFrom, Observable, throwError } from "rxjs";
// import { Video } from "../models/video-model";

// @Injectable({
//     providedIn: "root",
// })
// export class VideoService {
//     constructor(private http: HttpClient) {}

//     private getHeaders(): HttpHeaders {
//       const token = localStorage.getItem('token');
//       return new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': `Token ${token}`
//       });
//     }

//     // getVideos() {
//     //     const url = environment.apiUrl + "/video_selection/";
//     //     return lastValueFrom(this.http.get(url, { headers: this.getHeaders() }));
//     // }

//     getVideos(): Observable<Video[]> {
//       if (typeof window !== 'undefined' && localStorage.getItem('token')) {
//           // const token = localStorage.getItem('token');
//           // const headers = new HttpHeaders({
//           //     'Authorization': `Token ${token}`
//           // });

//           const url = environment.apiUrl + "/video_selection/";
//           return this.http.get<Video[]>(url, { headers: this.getHeaders() });
//       } else {
//           console.error("localStorage is not available or token is missing");
//           return throwError(() => new Error('localStorage is not available or token is missing'));
//       }
//   }
// }

// src/app/services/video.service.ts

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { Category, Video } from "../models/video-model";

@Injectable({
    providedIn: "root",
})
export class VideoService {
    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem("token");
        return new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        });
    }

    getVideos(): Observable<Video[]> {
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
            const url = environment.apiUrl + "/video_selection/";
            return this.http.get<Video[]>(url, { headers: this.getHeaders() });
        } else {
            console.error("localStorage is not available or token is missing");
            return throwError(
                () =>
                    new Error(
                        "localStorage is not available or token is missing"
                    )
            );
        }
    }

    getCategories(): Observable<Category[]> {
        // Aktualisiert
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
            const url = environment.apiUrl + "/categories/";
            return this.http
                .get<Category[]>(url, { headers: this.getHeaders() })
                .pipe(
                    catchError((err) => {
                        console.error("Error fetching categories:", err);
                        return throwError(
                            () => new Error("Error fetching categories")
                        );
                    })
                );
        } else {
            console.error("localStorage is not available or token is missing");
            return throwError(
                () =>
                    new Error(
                        "localStorage is not available or token is missing"
                    )
            );
        }
    }

    getVideoById(id: number): Observable<Video> {
        // Neue Methode
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
            const url = `${environment.apiUrl}/videos/${id}/`;
            return this.http
                .get<Video>(url, { headers: this.getHeaders() })
                .pipe(
                    catchError((err) => {
                        console.error(
                            `Error fetching video with ID ${id}:`,
                            err
                        );
                        return throwError(
                            () => new Error("Error fetching video")
                        );
                    })
                );
        } else {
            console.error("localStorage is not available or token is missing");
            return throwError(
                () =>
                    new Error(
                        "localStorage is not available or token is missing"
                    )
            );
        }
    }
}
