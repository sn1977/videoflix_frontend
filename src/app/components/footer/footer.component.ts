import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from "../../services/language.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentLanguage: string;

  constructor(private languageService: LanguageService
  ) {
      this.currentLanguage = this.languageService.getCurrentLanguage();
  }

}
