// import { Component} from "@angular/core";
// import { HeaderComponent } from "../header/header.component";
// import { FooterComponent } from "../footer/footer.component";
// import { ActivatedRoute, Router, RouterModule } from "@angular/router";
// import { FormsModule } from "@angular/forms";
// import { TranslateModule } from "@ngx-translate/core";
// import { LanguageService } from "../../services/language.service";
// import { AuthService } from "../../services/auth.service";
// import { CommonModule } from "@angular/common";

// @Component({
//     selector: "app-login",
//     standalone: true,
//     imports: [HeaderComponent, FooterComponent, FormsModule, TranslateModule, CommonModule, RouterModule],
//     templateUrl: "./login.component.html",
//     styleUrl: "./login.component.scss",
// })
// export class LoginComponent {
//     isCheckboxChecked = false;
//     currentLanguage: string;
//     emailOrUsername: string = '';
//     password: string = "";
//     errorMessage: string = '';

//     toggleSubmitButton(event: Event) {
//         this.isCheckboxChecked = (event.target as HTMLInputElement).checked;
//     }

//     constructor(
//         private route: ActivatedRoute,
//         private languageService: LanguageService,
//         private authService: AuthService,
//         private router: Router
//     ) {
//         this.currentLanguage = this.languageService.getCurrentLanguage();
//     }

//     ngOnInit(): void {
//         this.route.queryParams.subscribe((params) => {
//             this.emailOrUsername = params["email"];
//         });
//     }

//     async login() {
//         try {
//             let resp: any = await this.authService.loginWithEmailOrUsernameAndPassword(
//                 this.emailOrUsername,
//                 this.password
//             );
//             localStorage.setItem("token", resp.token);
//             console.log("Response:", resp);
//             console.log("Token gespeichert:", localStorage.getItem("token")); 
//             this.router.navigate(["/video_selection/"]);
//         } catch (error) {
//             console.error("Error:", error);
//             const err = error as any;
//             this.errorMessage = 'Login failed: ' + (err.error?.error || 'Unknown error');
//         }
//     }
// }


import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, TranslateModule, CommonModule, RouterModule],
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
    currentLanguage: string;
    emailOrUsername: string = '';
    password: string = "";
    rememberMe: boolean = false;
    errorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private languageService: LanguageService,
        private authService: AuthService,
        private router: Router
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.emailOrUsername = params["email"] || '';
        });
    }

    // get isFormValid(): boolean {
    //     return this.emailOrUsername.trim() !== '' && this.password.trim().length >= 6;
    // }

    get isFormValid(): boolean {
      const email = this.emailOrUsername || '';
      const pass = this.password || '';
      return email.trim() !== '' && pass.trim().length >= 6;
  }

    async login() {
        try {
            let resp: any = await this.authService.loginWithEmailOrUsernameAndPassword(
                this.emailOrUsername,
                this.password
            );
            this.authService.storeToken(resp.token, this.rememberMe);
            console.log("Response:", resp);
            console.log("Token gespeichert:", this.authService.getToken()); 
            this.router.navigate(["/video_selection/"]);
        } catch (error) {
            console.error("Error:", error);
            const err = error as any;
            this.errorMessage = 'Login failed: ' + (err.error?.error || 'Unknown error');
        }
    }
}