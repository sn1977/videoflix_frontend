import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistryComponent } from "./components/registry/registry.component";
import { VideoSelectionComponent } from "./components/video-selection/video-selection.component";
import { ActivateComponent } from "./components/activate/activate.component";

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegistryComponent },
    { path: "video_selection", component: VideoSelectionComponent },
    { path: "activate/:uidb64/:token", component: ActivateComponent },
];
