import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistryComponent } from "./components/registry/registry.component";
import { VideoSelectionComponent } from "./components/video-selection/video-selection.component";
import { ActivateComponent } from "./components/activate/activate.component";
import { PasswordResetRequestComponent } from "./components/password-reset-request/password-reset-request.component";
import { PasswordResetComponent } from "./components/password-reset/password-reset.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistryComponent },
    { path: "video_selection", component: VideoSelectionComponent },
    { path: 'play-video/:id', component: VideoPlayerComponent },  
    { path: "activate/:uidb64/:token", component: ActivateComponent },
    { path: 'password-reset-request', component: PasswordResetRequestComponent },
    { path: 'reset-password/:uidb64/:token', component: PasswordResetComponent },
];
