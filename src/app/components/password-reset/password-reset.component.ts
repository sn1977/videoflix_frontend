import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  errorMessage: string = '';
  uidb64!: string;
  token!: string;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.uidb64 = this.route.snapshot.paramMap.get('uidb64')!;
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.authService.resetPassword(this.uidb64, this.token, this.password).subscribe({
      next: (response: any) => {
        this.message = response.message;
        // Optional: Weiterleitung zur Login-Seite
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }
}