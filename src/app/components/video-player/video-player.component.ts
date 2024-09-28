import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { VideoService } from "../../services/video.service";
import { Video } from "../../models/video-model";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { environment } from "../../../environments/environment";

@Component({
    selector: "app-video-player",
    standalone: true,
    imports: [HeaderComponent, FooterComponent, CommonModule, RouterModule],
    templateUrl: "./video-player.component.html",
    styleUrls: ["./video-player.component.scss"], 
})
export class VideoPlayerComponent implements OnInit {
    video: Video | null = null;
    error = "";

    constructor(
        private route: ActivatedRoute,
        private videoService: VideoService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const videoId = this.route.snapshot.paramMap.get('id');
        if (videoId) {
            this.loadVideo(parseInt(videoId, 10));
        } else {
            this.error = "No video ID provided.";
        }
    }

    loadVideo(id: number): void {
        // Annahme: Es gibt einen API-Endpunkt, der ein einzelnes Video zurückgibt
        const url = `${environment.apiUrl}/videos/${id}/`;
        this.videoService.getVideoById(id).subscribe({
            next: (video: Video) => {
                this.video = video;
                console.log("Loaded Video:", this.video);
            },
            error: (error) => {
                console.error("Error loading video:", error);
                this.error = "Error loading video.";
            }
        });
    }
}