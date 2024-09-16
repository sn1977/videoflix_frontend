import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-registry",
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        FormsModule,
        CommonModule,
        TranslateModule,
    ],
    templateUrl: "./registry.component.html",
    styleUrl: "./registry.component.scss",
})
export class RegistryComponent {
    firstname: string = "";
    lastname: string = "";
    username: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    // passwordsEqual: boolean = false;
    currentLanguage: string;

    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    get passwordsEqual(): boolean {
        return this.password === this.confirmPassword;
    }

    onSubmit() {
        if (this.passwordsEqual) {
            console.log(this.email, this.password, this.confirmPassword);
        } else {
            console.log("passwords not equal");
        }
        try {
            const resp = this.authService.register(
                this.username,
                this.email,
                this.password
            );
            console.log("Response!!!!!:", resp);
            alert("Registration successful");
            this.router.navigate(["/login/"]);
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed");
        }
    }
}
