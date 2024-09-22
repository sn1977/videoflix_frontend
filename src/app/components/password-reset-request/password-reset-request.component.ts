import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { LanguageService } from "../../services/language.service";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "app-password-reset-request",
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        FooterComponent,
        HeaderComponent,
        TranslateModule,
    ],
    templateUrl: "./password-reset-request.component.html",
    styleUrls: ["./password-reset-request.component.scss"],
})
export class PasswordResetRequestComponent {
    email: string = "";
    message: string = "";
    errorMessage: string = "";
    currentLanguage: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private languageService: LanguageService
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    onSubmit() {
        this.authService.requestPasswordReset(this.email).subscribe({
            next: (response: any) => {
                this.message = response.message;
            },
            error: (error) => {
                this.errorMessage = "An error occurred. Please try again.";
            },
        });
    }
}