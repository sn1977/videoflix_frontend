import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
    ErrorHandler,
    APP_INITIALIZER,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideClientHydration } from "@angular/platform-browser";
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import {
    provideHttpClient,
    HTTP_INTERCEPTORS,
    HttpClient,
} from "@angular/common/http";
import {
    TranslateLoader,
    TranslateService,
    TranslateStore,
    TranslateCompiler,
    TranslateFakeCompiler,
    TranslateModule,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import * as Sentry from "@sentry/angular";

import { routes } from "./app.routes";

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        provideHttpClient(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
                compiler: {
                    provide: TranslateCompiler,
                    useClass: TranslateFakeCompiler,
                },
            })
        ),
        TranslateService,
        TranslateStore,
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: true, // Optional: Zeigt bei Fehlern einen Dialog an
            }),
        },
        Sentry.TraceService,
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [Sentry.TraceService],
            multi: true,
        },
    ],
};
