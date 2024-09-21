import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    public loginWithEmailOrUsernameAndPassword(emailOrUsername: string, password: string) {
      const url = environment.apiUrl + '/login/';
      const body = {
          email_or_username: emailOrUsername,
          password: password,
      };
      return lastValueFrom(this.http.post(url, body));
  }

    public register(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string
    ) {
        const url = environment.apiUrl + "/register/";
        const body = {
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: email,
            password: password,
        };
        // return lastValueFrom(this.http.post(url, body));
        return lastValueFrom(this.http.post(url, body, { withCredentials: true }));
    }

    public activateAccount(uidb64: string, token: string) {
      const url = `${environment.apiUrl}/activate/${uidb64}/${token}/`;
      return this.http.get(url);
    }

    public requestPasswordReset(email: string) {
      const url = `${environment.apiUrl}/password-reset/`;
      const body = { email: email };
      return this.http.post(url, body);
    }
    
    public resetPassword(uidb64: string, token: string, password: string) {
      const url = `${environment.apiUrl}/password-reset-confirm/${uidb64}/${token}/`;
      const body = { password: password };
      return this.http.post(url, body);
    }
}
