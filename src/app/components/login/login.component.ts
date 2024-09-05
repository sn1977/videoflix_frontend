import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";

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
        private languageService: LanguageService
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
        console.log("Login button clicked");
        // Add your login logic here
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            username: this.username,
            password: this.password,
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        try {
            let resp = await fetch(
                "http://127.0.0.1:8000/login/",
                requestOptions
            );
            let json = await resp.json();
            localStorage.setItem("token", json.token);
            //TODO - redirect 
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
