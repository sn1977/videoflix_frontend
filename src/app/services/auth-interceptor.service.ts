import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router) {}

    // intercept(
    //     req: HttpRequest<any>,
    //     next: HttpHandler
    // ): Observable<HttpEvent<any>> {
    //     const token = localStorage.getItem("token");

    //     // Debug-Ausgabe, um sicherzustellen, dass der Interceptor aufgerufen wird
    //     console.log("AuthInterceptor: Interceptor aufgerufen");

    //     if (token) {
    //         console.log("AuthInterceptor: Token gefunden, füge Header hinzu");
    //         const cloned = req.clone({
    //             setHeaders: {
    //                 Authorization: `Token ${token}`,
    //             },
    //         });
    //         return next.handle(cloned).pipe(
    //             catchError((err) => {
    //                 if (err.status === 401) {
    //                     this.router.navigateByUrl("/login");
    //                 }
    //                 return throwError(() => err);
    //             })
    //         );
    //     } else {
    //         console.log("AuthInterceptor: Kein Token gefunden");
    //         return next.handle(req);
    //     }
    // }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        console.log("Token im Interceptor gefunden:", token); // Debugging

        if (token) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Token ${token}`,
                },
            });
            console.log("Request mit Token:", clonedReq); // Debugging

            return next.handle(clonedReq).pipe(
                catchError((err) => {
                    if (err.status === 401) {
                        console.error("Unauthorized: ", err);
                        this.router.navigateByUrl("/login");
                    }
                    return throwError(() => err);
                })
            );
        } else {
            console.log("Kein Token im Interceptor gefunden");
            return next.handle(req);
        }
    }
}
