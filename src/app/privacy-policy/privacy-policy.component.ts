import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { LanguageService } from "../services/language.service";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit{
    constructor(private languageService: LanguageService) {
    }
    
    ngOnInit(): void {
        window.scrollTo(0, 0);
    }
}