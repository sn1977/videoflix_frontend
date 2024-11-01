import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { LanguageService } from "../services/language.service";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
import { Location } from "@angular/common";
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule, FooterComponent, HeaderComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit{
    constructor(private languageService: LanguageService, private location: Location) {
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

  goBack(): void {
    this.location.back();
  }
}