import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    email: string = "";

    constructor(private router: Router) {}

    onSubmit() {
        this.router.navigate(["/login"], {
            queryParams: { email: this.email },
        });
    }
}
