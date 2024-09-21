import { Component} from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, TranslateModule, CommonModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    isCheckboxChecked = false;
    currentLanguage: string;
    emailOrUsername: string = '';
    password: string = "";
    errorMessage: string = '';

    toggleSubmitButton(event: Event) {
        this.isCheckboxChecked = (event.target as HTMLInputElement).checked;
    }

    constructor(
        private route: ActivatedRoute,
        private languageService: LanguageService,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.emailOrUsername = params["email"];
        });
    }

    async login() {
        try {
            let resp: any = await this.authService.loginWithEmailOrUsernameAndPassword(
                this.emailOrUsername,
                this.password
            );
            localStorage.setItem("token", resp.token);
            console.log("Response:", resp);
            console.log("Token gespeichert:", localStorage.getItem("token")); 
            this.router.navigate(["/video_selection/"]);
        } catch (error) {
            console.error("Error:", error);
            const err = error as any;
            this.errorMessage = 'Login failed: ' + (err.error?.error || 'Unknown error');
        }
    }
}
