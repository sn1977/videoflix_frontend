import { Component, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../services/language.service";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
import { Location } from "@angular/common";
@Component({
    selector: "app-privacy-policy",
    standalone: true,
    imports: [TranslateModule, FooterComponent, HeaderComponent],
    templateUrl: "./privacy-policy.component.html",
    styleUrl: "./privacy-policy.component.scss",
})
export class PrivacyPolicyComponent implements OnInit {
    constructor(
        private languageService: LanguageService,
        private location: Location
    ) {}

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     * This method scrolls the window to the top of the page when the component is initialized.
     *
     * @memberof PrivacyPolicyComponent
     */
    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    /**
     * Navigates the user to the previous location in the browser's history.
     * Utilizes the Location service to perform the navigation.
     *
     * @returns {void}
     */
    goBack(): void {
        this.location.back();
    }
}
