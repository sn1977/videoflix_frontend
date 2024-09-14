import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    public loginWithUsernameAndPassword(username: string, password: string) {
        // const url = `${environment.apiUrl}/login?username=${username}&password=${password}`;
        const url = environment.apiUrl + "/login/";
        const body = {
            username: username,
            password: password,
        };
        return lastValueFrom(this.http.post(url, body));
    }

    public register(username: string, email: string, password: string) {
        const url = environment.apiUrl + "/register/";
        const body = {
            username: username,
            email: email,
            password: password,
        };
        return lastValueFrom(this.http.post(url, body));
    }
}
