import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";

@Component({
    selector: "app-password-reset",
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        FooterComponent,
        HeaderComponent,
        TranslateModule,
    ],
    templateUrl: "./password-reset.component.html",
    styleUrls: ["./password-reset.component.scss"],
})
export class PasswordResetComponent implements OnInit {
    password: string = "";
    confirmPassword: string = "";
    message: string = "";
    errorMessage: string = "";
    uidb64!: string;
    token!: string;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router,
        private languageService: LanguageService
    ) {}

    /**
     * Initializes the component by extracting the 'uidb64' and 'token' parameters from the route's snapshot.
     * This method is called once the component has been initialized.
     * 
     * @returns {void}
     */
    ngOnInit(): void {
        this.uidb64 = this.route.snapshot.paramMap.get("uidb64")!;
        this.token = this.route.snapshot.paramMap.get("token")!;
    }

    /**
     * Handles the form submission for password reset.
     * 
     * This method checks if the password and confirm password fields match.
     * If they do not match, it sets an error message and exits.
     * If they match, it calls the resetPassword method of the authService
     * with the provided uidb64, token, and password.
     * 
     * On successful password reset, it sets a success message and optionally
     * redirects the user to the login page after a short delay.
     * 
     * On error, it sets an error message indicating that an error occurred.
     */
    onSubmit() {
        if (this.password !== this.confirmPassword) {
            this.errorMessage = "Passwords do not match.";
            return;
        }
        this.authService
            .resetPassword(this.uidb64, this.token, this.password)
            .subscribe({
                next: (response: any) => {
                    this.message = response.message;
                    setTimeout(() => {
                        this.router.navigate(["/login"]);
                    }, 2000);
                },
                error: (error) => {
                    this.errorMessage = "An error occurred. Please try again.";
                },
            });
    }
}
