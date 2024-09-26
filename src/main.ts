import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// import { enableProdMode } from "@angular/core";
// import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import * as Sentry from "@sentry/angular";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import { AppModule } from "./app/app.module";

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, provideAnimationsAsync()
  ]
})
.catch(err => console.error(err));

Sentry.init({
  dsn: "https://44b4d21598085109e9d8ef49ee94bc35@o4507877077024768.ingest.de.sentry.io/4507877207441488",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
