import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, TranslateModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    email: string = "";
    currentLanguage: string;

    constructor(
        private router: Router,
        private languageService: LanguageService
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    /**
     * Navigates to the login page with the current email as a query parameter.
     * 
     * @remarks
     * This method is triggered upon form submission.
     * 
     * @returns void
     */
    onSubmit() {
        this.router.navigate(["/login/"], {
            queryParams: { email: this.email },
        });
    }
}
