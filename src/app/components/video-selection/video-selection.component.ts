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

// import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, ChangeDetectorRef } from "@angular/core";
// import { HeaderComponent } from "../header/header.component";
// import { LanguageService } from "../../services/language.service";
// import { AuthService } from "../../services/auth.service";
// import { VideoService } from "../../services/video.service";
// import { Video } from "../../models/video-model";
// import { CommonModule } from "@angular/common";
// import { FooterComponent } from "../footer/footer.component";
// import Hls from 'hls.js';
// import { environment } from "../../../environments/environment"; // Importiere environment

// @Component({
//     selector: "app-video-selection",
//     standalone: true,
//     imports: [HeaderComponent, CommonModule, FooterComponent],
//     templateUrl: "./video-selection.component.html",
//     styleUrls: ["./video-selection.component.scss"], 
// })
// export class VideoSelectionComponent implements OnInit, AfterViewInit {
//     allVideos: Video[] = [];
//     error = "";

//     @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>; // Hinzugefügt

//     constructor(
//         private languageService: LanguageService,
//         private authService: AuthService,
//         public videoService: VideoService,
//         private cdr: ChangeDetectorRef // Hinzugefügt
//     ) {}

//     ngOnInit(): void {
//         this.loadVideos();
//     }

//     loadVideos(): void {
//         this.videoService.getVideos().subscribe({
//             next: (videos: Video[]) => {
//                 this.allVideos = videos;
//                 console.log("All Videos:", this.allVideos);
//                 this.cdr.detectChanges(); // Änderungen erkennen
//                 this.initializePlayers(); // Player initialisieren
//             },
//             error: (error) => {
//                 console.error("Error:", error);
//                 this.error = "Error loading videos";
//             }
//         });
//     }

//     ngAfterViewInit(): void {
//         // Die Initialisierung der Player erfolgt nach dem Laden der Videos in loadVideos()
//     }

//     initializePlayers(): void {
//         this.videoPlayers.forEach((videoElementRef: ElementRef<HTMLVideoElement>, index: number) => {
//             const videoElement = videoElementRef.nativeElement;
//             const video = this.allVideos[index];

//             if (Hls.isSupported()) {
//                 const hls = new Hls();
//                 hls.loadSource(video.hls_url);
//                 hls.attachMedia(videoElement);
//                 hls.on(Hls.Events.MANIFEST_PARSED, () => {
//                     videoElement.play();
//                 });
//                 hls.on(Hls.Events.ERROR, (event, data) => {
//                     if (data.fatal) {
//                         switch (data.type) {
//                             case Hls.ErrorTypes.NETWORK_ERROR:
//                                 console.error('Network error encountered, trying to recover');
//                                 hls.startLoad();
//                                 break;
//                             case Hls.ErrorTypes.MEDIA_ERROR:
//                                 console.error('Media error encountered, trying to recover');
//                                 hls.recoverMediaError();
//                                 break;
//                             default:
//                                 hls.destroy();
//                                 break;
//                         }
//                     }
//                 });
//             } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
//                 videoElement.src = video.hls_url;
//                 videoElement.addEventListener('loadedmetadata', () => {
//                     videoElement.play();
//                 });
//             } else {
//                 console.error('HLS not supported in this browser');
//             }
//         });
//     }
// }





// import { Component, OnInit } from "@angular/core";
// import { HeaderComponent } from "../header/header.component";
// import { LanguageService } from "../../services/language.service";
// import { AuthService } from "../../services/auth.service";
// import { VideoService } from "../../services/video.service";
// import { Category } from "../../models/video-model";
// import { CommonModule } from "@angular/common";
// import { FooterComponent } from "../footer/footer.component";
// import { Router } from "@angular/router";  // Importiert Router

// @Component({
//     selector: "app-video-selection",
//     standalone: true,
//     imports: [HeaderComponent, CommonModule, FooterComponent],
//     templateUrl: "./video-selection.component.html",
//     styleUrls: ["./video-selection.component.scss"], 
// })
// export class VideoSelectionComponent implements OnInit {
//     categories: Category[] = [];
//     error = "";

//     constructor(
//         private languageService: LanguageService,
//         private authService: AuthService,
//         public videoService: VideoService,
//         private router: Router  // Injektionspunkt für Router
//     ) {}

//     ngOnInit(): void {
//         this.loadCategories();
//     }

//     loadCategories(): void {
//         this.videoService.getCategories().subscribe({
//             next: (categories: Category[]) => {
//                 this.categories = categories;
//                 console.log("Categories:", this.categories);
//             },
//             error: (error) => {
//                 console.error("Error:", error);
//                 this.error = "Error loading categories";
//             }
//         });
//     }

//     playVideo(videoId: number): void {
//         this.router.navigate(['/play-video', videoId]);  // Navigiert zur VideoPlayer-Komponente
//     }

//     toggleSound(videoId: number): void {
//       // Implementiere die Logik zum Stummschalten des Videos
//       // Dies hängt davon ab, wie du den Video-Player implementierst
//       console.log(`Toggle sound for video ID: ${videoId}`);
//   }
// }


// video-selection.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Renderer2, ViewEncapsulation } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { VideoService } from "../../services/video.service";
import { Category, Video } from "../../models/video-model";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { Router } from "@angular/router"; 
import { VjsPlayerComponent } from "../vjs-player/vjs-player.component"; // Importiere VideoPlayer-Komponente

@Component({
    selector: "app-video-selection",
    standalone: true,
    imports: [HeaderComponent, CommonModule, FooterComponent, VjsPlayerComponent],
    templateUrl: "./video-selection.component.html",
    styleUrls: ["./video-selection.component.scss"], 
    encapsulation: ViewEncapsulation.None,
})
export class VideoSelectionComponent implements OnInit, AfterViewInit, OnDestroy {
    categories: Category[] = [];
    error = "";
    selectedVideo: Video | null = null;
    videoOptions: any; // Optionen für die VideoPlayer-Komponente

    @ViewChild('fullscreenContainer') fullscreenContainer!: ElementRef<HTMLDivElement>;

    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        public videoService: VideoService,
        private router: Router, // Injektion des Routers, falls benötigt
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        this.loadCategories();
    }

    ngAfterViewInit(): void {
        // Initialisierung des Players, falls ein Video bereits ausgewählt ist
        if (this.selectedVideo) {
            this.setVideoOptions(this.selectedVideo.video_file);
        }
    }

    loadCategories(): void {
        this.videoService.getCategories().subscribe({
            next: (categories: Category[]) => {
                this.categories = categories;
                console.log("Categories:", this.categories);
            },
            error: (error) => {
                console.error("Error:", error);
                this.error = "Error loading categories";
            }
        });
    }

    playVideo(video: Video): void {
        this.selectedVideo = video;
        this.setVideoOptions(video.video_file);

        // Vollbild-Anfrage synchron im Klick-Handler
        if (this.fullscreenContainer && this.fullscreenContainer.nativeElement) {
            const containerElement = this.fullscreenContainer.nativeElement;

            // Vollbild anfordern
            const promise = containerElement.requestFullscreen?.() ||
                            (containerElement as any).webkitRequestFullscreen?.() ||
                            (containerElement as any).mozRequestFullScreen?.() ||
                            (containerElement as any).msRequestFullscreen?.();

            if (promise) {
                promise.catch(err => {
                    console.error("Fullscreen request failed:", err);
                    // Optional: Feedback an den Benutzer geben, z.B. eine Meldung anzeigen
                });
            }

            // Füge eine Klasse hinzu, um das Overlay sichtbar zu machen
            this.renderer.addClass(containerElement, 'active');
        }
    }

    setVideoOptions(src: string): void {
        this.videoOptions = {
            fluid: true,
            aspectRatio: '16:9',
            autoplay: true,
            sources: [{
                src: src,
                type: 'video/mp4'
            }]
        };
    }

    closeVideo(): void {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => {
                console.error("Exit fullscreen failed:", err);
                // Optional: Feedback an den Benutzer geben
            });
        }
        this.selectedVideo = null;
        this.videoOptions = null;

        if (this.fullscreenContainer && this.fullscreenContainer.nativeElement) {
            const containerElement = this.fullscreenContainer.nativeElement;
            this.renderer.removeClass(containerElement, 'active');
        }
    }

    toggleSound(videoId: number): void {
        // Hier müssten Sie eine Referenz zur VideoPlayer-Komponente haben, um den Ton zu toggeln
        // Dies erfordert zusätzliche Logik, z.B. durch ViewChild oder EventEmitter
        // Für den einfachen Fall könnten Sie die Player-Instanz in der VideoPlayer-Komponente verwalten
    }

    // Methoden zur Steuerung des Video-Previews
    startPreview(videoId: number): void {
        const videoElement = document.getElementById(`preview-video-${videoId}`) as HTMLVideoElement;
        if (videoElement) {
            videoElement.play();
        }
    }

    stopPreview(videoId: number): void {
        const videoElement = document.getElementById(`preview-video-${videoId}`) as HTMLVideoElement;
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
    }

    ngOnDestroy(): void {
        // VideoPlayer-Komponente kümmert sich um die Entsorgung des Players
    }
}