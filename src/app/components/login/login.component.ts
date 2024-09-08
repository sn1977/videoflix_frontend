import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, TranslateModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    isCheckboxChecked = false;
    currentLanguage: string;
    // email: string = "";
    password: string = "";
    username: string = "";

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
            // this.email = params["email"] || "";
            this.username = params["username"] || "";
        });
    }

    async login() {
        try {
            let resp: any = await this.authService.loginWithUsernameAndPassword(
                this.username,
                this.password
            );
            console.log("Response:", resp);
            localStorage.setItem("token", resp.token);
            //TODO - redirect
            this.router.navigate(["/video_selection"]);
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
