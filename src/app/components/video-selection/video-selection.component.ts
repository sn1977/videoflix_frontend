// import { Component } from "@angular/core";
// import { HeaderComponent } from "../header/header.component";
// import { LanguageService } from "../../services/language.service";
// import { AuthService } from "../../services/auth.service";
// import { VideoService } from "../../services/video.service";
// import { Video } from "../../models/video-model";
// import { CommonModule } from "@angular/common";
// import { FooterComponent } from "../footer/footer.component";

// @Component({
//     selector: "app-video-selection",
//     standalone: true,
//     imports: [HeaderComponent, CommonModule, FooterComponent],
//     templateUrl: "./video-selection.component.html",
//     styleUrl: "./video-selection.component.scss",
// })
// export class VideoSelectionComponent {
//     allVideos: Video[] = [];
//     error = "";
//     constructor(
//         private languageService: LanguageService,
//         private authService: AuthService,
//         public videoService: VideoService
//     ) {}

//     async ngOnInit() {
//         await this.loadVideos();
//     }

//     async loadVideos() {
//       try {
//           this.videoService.getVideos().subscribe({
//               next: (videos: Video[]) => {
//                   this.allVideos = videos;
//                   console.log("All Videos:", this.allVideos);
//               },
//               error: (error) => {
//                   console.error("Error:", error);
//                   this.error = "Error loading videos";
//               }
//           });
//       } catch (error) {
//           console.error("Error:", error);
//           this.error = "Error loading videos";
//       }
//   }
// }

// src/app/components/video-selection/video-selection.component.ts

import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ChangeDetectorRef } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { VideoService } from "../../services/video.service";
import { Video } from "../../models/video-model";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import Hls from 'hls.js';
import { environment } from "../../../environments/environment"; // Importiere environment

@Component({
    selector: "app-video-selection",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FooterComponent],
    templateUrl: "./video-selection.component.html",
    styleUrls: ["./video-selection.component.scss"], 
})
export class VideoSelectionComponent implements OnInit, AfterViewInit {
    allVideos: Video[] = [];
    error = "";

    @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>; // Hinzugefügt

    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        public videoService: VideoService,
        private cdr: ChangeDetectorRef // Hinzugefügt
    ) {}

    ngOnInit(): void {
        this.loadVideos();
    }

    loadVideos(): void {
        this.videoService.getVideos().subscribe({
            next: (videos: Video[]) => {
                this.allVideos = videos;
                console.log("All Videos:", this.allVideos);
                this.cdr.detectChanges(); // Änderungen erkennen
                this.initializePlayers(); // Player initialisieren
            },
            error: (error) => {
                console.error("Error:", error);
                this.error = "Error loading videos";
            }
        });
    }

    ngAfterViewInit(): void {
        // Die Initialisierung der Player erfolgt nach dem Laden der Videos in loadVideos()
    }

    initializePlayers(): void {
        this.videoPlayers.forEach((videoElementRef: ElementRef<HTMLVideoElement>, index: number) => {
            const videoElement = videoElementRef.nativeElement;
            const video = this.allVideos[index];

            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(video.hls_url);
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoElement.play();
                });
                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.error('Network error encountered, trying to recover');
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.error('Media error encountered, trying to recover');
                                hls.recoverMediaError();
                                break;
                            default:
                                hls.destroy();
                                break;
                        }
                    }
                });
            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                videoElement.src = video.hls_url;
                videoElement.addEventListener('loadedmetadata', () => {
                    videoElement.play();
                });
            } else {
                console.error('HLS not supported in this browser');
            }
        });
    }
}

