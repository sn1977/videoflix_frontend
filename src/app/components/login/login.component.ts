import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { log } from "console";

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
        private http: HttpClient
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
            let resp = await this.loginWithUsernameAndPassword(this.username, this.password);
            console.log("Response:", resp);
            //TODO - redirect
        } catch (error) {
            console.error("Error:", error);
        }
    }

    loginWithUsernameAndPassword(username: string, password: string) {
      // const url = `${environment.apiUrl}/login?username=${username}&password=${password}`;
      const url = environment.apiUrl + "/login/";
      const body = {
        username: this.username,
        password: this.password,
      };
      return lastValueFrom(this.http.post(url, body));
    }
}
