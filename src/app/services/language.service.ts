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

  /**
   * Switches the current language of the application.
   * 
   * @param language - The language code to switch to (e.g., 'en', 'fr', 'es').
   * @returns void
   */
  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.translateService.use(language);
  }

  /**
   * Retrieves the current language setting.
   * 
   * @returns {string} The current language.
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}