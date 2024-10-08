import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent {
  message: string = 'Activating your account...';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uidb64 = this.route.snapshot.paramMap.get('uidb64');
    const token = this.route.snapshot.paramMap.get('token');
    if (uidb64 && token) {
      this.authService.activateAccount(uidb64, token).subscribe({
        next: (response: any) => {
          // Weiterleitung zur Login-Seite mit Query-Parameter
          this.router.navigate(['/login'], { queryParams: { activated: true } });
        },
        error: (error) => {
          this.message = 'Activation failed: ' + (error.error?.error || 'Unknown error');
        }
      });
    } else {
      this.message = 'Invalid activation link.';
    }
  }
}
