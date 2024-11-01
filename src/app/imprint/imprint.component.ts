import { Component, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../services/language.service";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

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
        // private router: Router
    ) {}

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    // goBack() {
    //     this.router.navigate(["../"]); // Navigiert eine Ebene zurück im Routing
    // }

    goBack(): void {
      this.location.back();
    }
}
