import { Component, ChangeDetectorRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

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
    showLogoutButton: boolean = true;

    constructor(
        private router: Router,
        private authService: AuthService,
        private languageService: LanguageService,
        private cdr: ChangeDetectorRef
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    /**
     * Initializes the component by setting the initial values for `showSignupButton` and `showLogoutButton`
     * based on the current URL. Subscribes to router events to update the visibility of the signup button
     * on navigation changes.
     *
     * @returns {void}
     */
    ngOnInit(): void {
        // Setze den initialen Wert von showSignupButton basierend auf der aktuellen URL
        const currentUrl = this.router.url;
        const pathsToHideSignUpButton = [
            "register",
            "video_selection",
            "reset-password",
            "password-reset-request",
            "imprint",
            "privacy-policy",
        ];
        this.showSignupButton = !pathsToHideSignUpButton.some((path) =>
            currentUrl.includes(path)
        );

        const pathsToHideLogoutButton = ["login", "register", "imprint", "privacy-policy", "home", "password-reset-request", "reset-password"];
        this.showLogoutButton = !pathsToHideLogoutButton.some((path) =>
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

    /**
     * Switches the application's language to the specified language.
     * 
     * @param language - The language code to switch to (e.g., 'en', 'de').
     */
    switchLanguage(language: string) {
        this.languageService.switchLanguage(language);
    }

    /**
     * Navigates the user to the registration page.
     * This method uses the router to change the current route to "/register".
     */
    register() {
        this.router.navigate(["/register"]);
    }

    /**
     * Logs out the current user by removing the authentication token and navigating to the login page.
     * 
     * @remarks
     * This method calls the `removeToken` method of the `authService` to clear the user's authentication token.
     * After the token is removed, it navigates the user to the login page using the `router`.
     */
    logout() {
        this.authService.removeToken();
        this.router.navigate(["/login"]);
    }
}
