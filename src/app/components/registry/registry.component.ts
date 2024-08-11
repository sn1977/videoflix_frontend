import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-registry",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
    templateUrl: "./registry.component.html",
    styleUrl: "./registry.component.scss",
})
export class RegistryComponent {
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    // passwordsEqual: boolean = false;

    get passwordsEqual(): boolean {
      return this.password === this.confirmPassword;
    }

    onSubmit() {
      if (this.passwordsEqual) {
        console.log(this.email, this.password, this.confirmPassword);
      } else {
        console.log("passwords not equal");
      }
    }
}
