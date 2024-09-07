import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { VideoService } from "../../services/video.service";
import { Video } from "../../models/video-model";
import { CommonModule } from '@angular/common';

@Component({
    selector: "app-video-selection",
    standalone: true,
    imports: [HeaderComponent, CommonModule],
    templateUrl: "./video-selection.component.html",
    styleUrl: "./video-selection.component.scss",
})
export class VideoSelectionComponent {
    allVideos: Video[] = [];
    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        public videoService: VideoService
    ) {}

    async ngOnInit() {
        this.loadVideos();
    }

    async loadVideos() {
        this.allVideos = await this.videoService.getVideos() as Video[];
        console.log("All Videos:", this.allVideos);
    }
}
