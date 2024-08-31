import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string;

  constructor(private translateService: TranslateService) {
    this.currentLanguage = this.translateService.currentLang || 'en';
    this.translateService.use(this.currentLanguage);
  }

  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.translateService.use(language);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}