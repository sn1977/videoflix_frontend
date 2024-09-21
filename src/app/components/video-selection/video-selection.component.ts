import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { VideoService } from "../../services/video.service";
import { Video } from "../../models/video-model";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: "app-video-selection",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FooterComponent],
    templateUrl: "./video-selection.component.html",
    styleUrl: "./video-selection.component.scss",
})
export class VideoSelectionComponent {
    allVideos: Video[] = [];
    error = "";
    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        public videoService: VideoService
    ) {}

    async ngOnInit() {
        await this.loadVideos();
    }

    async loadVideos() {
      try {
          this.videoService.getVideos().subscribe({
              next: (videos: Video[]) => {
                  this.allVideos = videos;
                  console.log("All Videos:", this.allVideos);
              },
              error: (error) => {
                  console.error("Error:", error);
                  this.error = "Error loading videos";
              }
          });
      } catch (error) {
          console.error("Error:", error);
          this.error = "Error loading videos";
      }
  }
}
