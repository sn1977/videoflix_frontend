import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, TranslateModule, CommonModule, RouterModule],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    currentLanguage: string;
    emailOrUsername: string = '';
    password: string = "";
    rememberMe: boolean = false;
    errorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private languageService: LanguageService,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Subscribes to query parameters from the route and assigns the 'emailOrUsername' property
     * based on the 'email' parameter if it exists, otherwise assigns an empty string.
     */
    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.emailOrUsername = params["email"] || '';
        });
    }

    /**
     * Checks if the login form is valid.
     * 
     * The form is considered valid if the email or username is not empty
     * and the password has a minimum length of 6 characters.
     * 
     * @returns {boolean} True if the form is valid, otherwise false.
     */
    get isFormValid(): boolean {
      const email = this.emailOrUsername || '';
      const pass = this.password || '';
      return email.trim() !== '' && pass.trim().length >= 6;
  }

    /**
     * Attempts to log in the user using the provided email or username and password.
     * If successful, stores the authentication token and navigates to the video selection page.
     * If an error occurs, logs the error to the console and sets an error message.
     *
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     * @throws Will throw an error if the login process fails.
     */
    async login() {
        try {
            let resp: any = await this.authService.loginWithEmailOrUsernameAndPassword(
                this.emailOrUsername,
                this.password
            );
            this.authService.storeToken(resp.token, this.rememberMe);
            this.router.navigate(["/video_selection/"]);
        } catch (error) {
            console.error("Error:", error);
            const err = error as any;
            this.errorMessage = 'Login failed: ' + (err.error?.error || 'Unknown error');
        }
    }
}