import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { CommonModule } from "@angular/common";
import { ChangeDetectorRef } from "@angular/core";

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

    // ngOnInit(): void {
    //   this.router.events.subscribe(() => {
    //     console.log(this.router.url); // Debug-Ausgabe zur Überprüfung der aktuellen URL
    //     this.showSignupButton = !this.router.url.includes('login');
    //   });
    // }

    ngOnInit(): void {
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              // Überprüfen Sie die aktuelle URL auf das Vorkommen von 'login'
              this.showSignupButton = !event.url.includes('login');
              console.log(`Current URL: ${event.url}, Show Signup Button: ${this.showSignupButton}`);
              this.cdr.detectChanges(); // Manuelle Aufforderung zur Aktualisierung der Ansicht
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
