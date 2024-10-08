import { Component, ChangeDetectorRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [TranslateModule, CommonModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    currentLanguage: string;
    showSignupButton: boolean = true;

    constructor(
        private router: Router,
        private languageService: LanguageService,
        private cdr: ChangeDetectorRef
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    ngOnInit(): void {
        // Setze den initialen Wert von showSignupButton basierend auf der aktuellen URL
        const currentUrl = this.router.url;
        const pathsToHideButton = [
            "register",
            "video_selection",
            "reset-password",
            "password-reset-request",
        ];
        this.showSignupButton = !pathsToHideButton.some((path) =>
            currentUrl.includes(path)
        );
        console.log(
            `Initial URL: ${currentUrl}, Show Signup Button: ${this.showSignupButton}`
        );

        // Abonniere Router-Ereignisse, um auf Navigationsänderungen zu reagieren
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Verwende event.urlAfterRedirects für die tatsächliche URL nach Weiterleitungen
                const url = event.urlAfterRedirects;
                this.showSignupButton = !url.includes("register");
                console.log(
                    `Current URL: ${url}, Show Signup Button: ${this.showSignupButton}`
                );
            }
        });
    }

    switchLanguage(language: string) {
        this.languageService.switchLanguage(language);
    }

    register() {
        this.router.navigate(["/register"]);
    }
}
