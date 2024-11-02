import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-registry",
    standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        FormsModule,
        CommonModule,
        TranslateModule,
    ],
    templateUrl: "./registry.component.html",
    styleUrl: "./registry.component.scss",
})
export class RegistryComponent {
    firstname: string = "";
    lastname: string = "";
    username: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    // passwordsEqual: boolean = false;
    currentLanguage: string;
    message: string = "";
    errorMessage: string = "";

    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    /**
     * Checks if the password and confirmPassword fields are equal.
     * 
     * @returns {boolean} - Returns true if the password and confirmPassword are equal, otherwise false.
     */
    get passwordsEqual(): boolean {
        return this.password === this.confirmPassword;
    }

    /**
     * Handles the form submission for user registration.
     * 
     * This method checks if the passwords entered by the user match. If they do, it attempts to register the user
     * by calling the `authService.register` method with the provided user details. If the registration is successful,
     * it sets a success message and resets the form. If an error occurs during registration, it logs the error and sets
     * an error message. If the passwords do not match, it sets an error message indicating the mismatch.
     * 
     * @async
     * @returns {Promise<void>} A promise that resolves when the registration process is complete.
     */
    async onSubmit() {
      if (this.passwordsEqual) {
          try {
              const resp: any = await this.authService.register(
                  this.firstname,
                  this.lastname,
                  this.username,
                  this.email,
                  this.password
              );
                this.message = resp.message; // Setze die Nachricht vom Backend
                this.resetForm();
            } catch (error) {
                console.error("Error:", error);
                this.errorMessage = "Registration failed";
            }
        } else {
            console.log("Passwords do not match");
            this.errorMessage = "Passwords do not match";
        }
    }

    /**
     * Resets the form fields to their default empty values.
     * This method clears the values of firstname, lastname, username, email, password, and confirmPassword.
     */
    resetForm() {
      this.firstname = '';
      this.lastname = '';
      this.username = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
  }
}
