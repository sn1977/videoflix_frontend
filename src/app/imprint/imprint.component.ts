import { Component, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../services/language.service";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { Location } from "@angular/common";

@Component({
    selector: "app-imprint",
    standalone: true,
    imports: [TranslateModule, HeaderComponent, FooterComponent],
    templateUrl: "./imprint.component.html",
    styleUrl: "./imprint.component.scss",
})
export class ImprintComponent implements OnInit {
    constructor(
        private languageService: LanguageService,
        private location: Location
    ) {}

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     * This method is called once, after the first `ngOnChanges`.
     *
     * In this implementation, it scrolls the window to the top of the page when the component is initialized.
     */
    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    /**
     * Navigates back to the previous location in the browser's history.
     * Utilizes the Location service to perform the navigation.
     *
     * @returns {void}
     */
    goBack(): void {
        this.location.back();
    }
}
