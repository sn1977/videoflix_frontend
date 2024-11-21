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

    /**
     * Fetches a list of videos from the server.
     * 
     * This method checks if the `window` object is defined and if a token is present in `localStorage`.
     * If both conditions are met, it constructs the API URL and makes an HTTP GET request to fetch the videos.
     * If either condition is not met, it logs an error message and returns an observable that throws an error.
     * 
     * @returns {Observable<Video[]>} An observable that emits an array of `Video` objects.
     * @throws {Error} If `localStorage` is not available or the token is missing.
     */
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

    /**
     * Fetches the list of categories from the API.
     *
     * @returns {Observable<Category[]>} An observable that emits the list of categories.
     * @throws Will throw an error if fetching categories fails or if localStorage is not available or the token is missing.
     */
    getCategories(): Observable<Category[]> {
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
            const url = environment.apiUrl + "categories/";
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

    /**
     * Fetches a video by its ID.
     * 
     * @param id - The ID of the video to fetch.
     * @returns An Observable that emits the fetched Video object.
     * 
     * @throws Will throw an error if localStorage is not available or the token is missing.
     * @throws Will throw an error if there is an issue with the HTTP request.
     */
    getVideoById(id: number): Observable<Video> {
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
