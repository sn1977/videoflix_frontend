import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) {}

    /**
     * Intercepts HTTP requests to add an authorization token if available.
     * If the token is present, it clones the request and sets the `Authorization` header.
     * If the request fails with a 401 status, it removes the invalid token and navigates to the login page.
     *
     * @param req - The outgoing HTTP request.
     * @param next - The next interceptor in the chain, or the backend if no other interceptors remain.
     * @returns An observable of the HTTP event.
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if (token) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Token ${token}`,
                },
            });

            return next.handle(clonedReq).pipe(
                catchError((err) => {
                    if (err.status === 401) {
                        console.error("Unauthorized: ", err);
                        this.authService.removeToken(); // Entfernt das ungültige Token
                        this.router.navigateByUrl("/login");
                    }
                    return throwError(() => err);
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
