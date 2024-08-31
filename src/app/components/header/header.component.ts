import { Component} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [TranslateModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    currentLanguage: string;

    constructor(private router: Router, private languageService: LanguageService) {
      this.currentLanguage = this.languageService.getCurrentLanguage();
    }
    
    switchLanguage(language: string) {
      this.languageService.switchLanguage(language);
    }

    register() {
        this.router.navigate(["/register"]);
    }
}
