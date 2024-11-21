import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private readonly TOKEN_KEY = "token";

    constructor(private http: HttpClient) {}

    /**
     * Logs in a user using either their email or username and password.
     *
     * @param emailOrUsername - The user's email or username.
     * @param password - The user's password.
     * @returns A promise that resolves with the server response.
     */
    public loginWithEmailOrUsernameAndPassword(
        emailOrUsername: string,
        password: string
    ) {
        const url = `${environment.apiUrl}login/`; // Verwenden Sie Template-Strings für Klarheit
        const body = {
            email_or_username: emailOrUsername,
            password: password,
        };
        // return lastValueFrom(this.http.post(url, body));
        return lastValueFrom(this.http.post(url, body, { withCredentials: true }));
    }

    /**
     * Registers a new user with the provided details.
     *
     * @param firstname - The first name of the user.
     * @param lastname - The last name of the user.
     * @param username - The username for the new account.
     * @param email - The email address of the user.
     * @param password - The password for the new account.
     * @returns A promise that resolves when the registration request is complete.
     */
    public register(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string
    ) {
        const url = `${environment.apiUrl}register/`;
        const body = {
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: email,
            password: password,
        };
        return lastValueFrom(
            this.http.post(url, body, { withCredentials: true })
        );
    }

    /**
     * Activates a user account using the provided UID and token.
     *
     * @param uidb64 - The base64 encoded user ID.
     * @param token - The activation token.
     * @returns An Observable of the HTTP GET request.
     */
    public activateAccount(uidb64: string, token: string) {
        const url = `${environment.apiUrl}activate/${uidb64}/${token}/`;
        return this.http.get(url);
    }

    /**
     * Sends a request to reset the password for the given email address.
     *
     * @param email - The email address for which to request a password reset.
     * @returns An Observable of the HTTP response from the password reset request.
     */
    public requestPasswordReset(email: string) {
        const url = `${environment.apiUrl}password-reset/`;
        const body = { email: email };
        return this.http.post(url, body);
    }

    /**
     * Resets the user's password using the provided uidb64 and token.
     *
     * @param uidb64 - The base64 encoded user ID.
     * @param token - The password reset token.
     * @param password - The new password to set.
     * @returns An Observable of the HTTP response.
     */
    public resetPassword(uidb64: string, token: string, password: string) {
        const url = `${environment.apiUrl}password-reset-confirm/${uidb64}/${token}/`;
        const body = { password: password };
        return this.http.post(url, body);
    }

    /**
     * Stores the authentication token in either localStorage or sessionStorage based on the rememberMe flag.
     *
     * @param token - The authentication token to be stored.
     * @param rememberMe - A boolean flag indicating whether to store the token in localStorage (true) or sessionStorage (false).
     */
    public storeToken(token: string, rememberMe: boolean): void {
        if (rememberMe) {
            localStorage.setItem(this.TOKEN_KEY, token);
        } else {
            sessionStorage.setItem(this.TOKEN_KEY, token);
        }
    }

    /**
     * Retrieves the authentication token from localStorage or sessionStorage.
     *
     * @returns The authentication token if it exists, otherwise null.
     */
    public getToken(): string | null {
        return (
            localStorage.getItem(this.TOKEN_KEY) ||
            sessionStorage.getItem(this.TOKEN_KEY)
        );
    }

    // Optional: Methode zum Entfernen des Tokens (Logout)
    public removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
    }
}
