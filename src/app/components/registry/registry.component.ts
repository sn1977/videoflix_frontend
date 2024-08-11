import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-registry",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule],
    templateUrl: "./registry.component.html",
    styleUrl: "./registry.component.scss",
})
export class RegistryComponent {
    email: string = "";
    password: string = "";
    confirmPassword: string = "";

    onSubmit() {
        console.log(this.email, this.password, this.confirmPassword);
    }
}
