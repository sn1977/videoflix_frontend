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