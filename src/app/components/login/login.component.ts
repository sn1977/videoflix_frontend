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

     toggleSubmitButton(event: Event) {
       this.isCheckboxChecked = (event.target as HTMLInputElement).checked;
     }

    email: string = "";

    constructor(private route: ActivatedRoute, private languageService: LanguageService
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.email = params["email"] || "";
        });
    }
}
