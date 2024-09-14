import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";

@Component({
    selector: "app-registry",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, TranslateModule],
    templateUrl: "./registry.component.html",
    styleUrl: "./registry.component.scss",
})
export class RegistryComponent {
    username: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    // passwordsEqual: boolean = false;
    currentLanguage: string;

    constructor(private languageService: LanguageService
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
    }
}
