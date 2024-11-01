import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    ViewEncapsulation,
    HostListener
} from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { VideoService } from "../../services/video.service";
import { Category, Video } from "../../models/video-model";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { Router } from "@angular/router";
import { VjsPlayerComponent } from "../vjs-player/vjs-player.component"; // Importiere VideoPlayer-Komponente
import { log } from "console";

@Component({
    selector: "app-video-selection",
    standalone: true,
    imports: [
        HeaderComponent,
        CommonModule,
        FooterComponent,
        VjsPlayerComponent,
        TranslateModule,
    ],
    templateUrl: "./video-selection.component.html",
    styleUrls: ["./video-selection.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class VideoSelectionComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    currentLanguage: string;
    categories: Category[] = [];
    otherCategories: Category[] = []; // Kategorien ohne PreviewVideo
    previewCategory: Category | null = null; // PreviewVideo Kategorie
    error = "";
    selectedVideo: Video | null = null;
    videoOptions: any; // Optionen für die VideoPlayer-Komponente
    isMuted: { [key: number]: boolean } = {}; // Stummschaltung für jedes Video

    @ViewChild("fullscreenContainer")
    fullscreenContainer!: ElementRef<HTMLDivElement>;
    @ViewChild(VjsPlayerComponent) videoPlayerComponent!: VjsPlayerComponent; // Referenz zur VideoPlayer-Komponente

    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        public videoService: VideoService,
        private router: Router, // Injektion des Routers, falls benötigt
        private renderer: Renderer2
    ) {
        this.currentLanguage = this.languageService.getCurrentLanguage();
    }

    ngOnInit(): void {
        console.log("ngOnInit: Laden der Kategorien...");
        this.loadCategories();
    }

    ngAfterViewInit(): void {
        // Initialisierung des Players, falls ein Video bereits ausgewählt ist
        if (this.selectedVideo) {
            this.setVideoOptions(this.selectedVideo.video_file);
        }
    }

    getTranslationKey(categoryName: string): string {
        return `video_selection.${categoryName.toLowerCase()}`;
    }

    loadCategories(): void {
        this.videoService.getCategories().subscribe({
            next: (categories: Category[]) => {
                console.log("API-Antwort Kategorien:", categories);
                this.categories = categories;
                console.log("Categories:", this.categories);
                this.separatePreviewCategory();
            },
            error: (error) => {
                console.error("Error loading categories:", error);
                this.error = "Error loading categories";
            },
        });
    }

    separatePreviewCategory(): void {
        console.log(
            "separatePreviewCategory: Trennen der PreviewVideo-Kategorie..."
        );
        this.previewCategory =
            this.categories.find(
                (category) => category.name === "PreviewVideo"
            ) || null;

        this.otherCategories = this.categories.filter(
            (category) => category.name !== "PreviewVideo"
        );

        console.log("Preview Category:", this.previewCategory);
        console.log("Other Categories:", this.otherCategories);
    }

    setVideoOptions(src: string): void {
        this.videoOptions = {
            fluid: true,
            aspectRatio: "16:9",
            autoplay: true,
            muted: true, // Ermöglicht Autoplay
            sources: [
                {
                    src: src,
                    type: "video/mp4",
                },
            ],
        };
        console.log("Set Video Options:", this.videoOptions);
    }

  playVideo(video: Video): void {
    console.log("playVideo: Video wird abgespielt:", video.title);
    this.selectedVideo = video;
    this.setVideoOptions(video.video_file);

    // Verzögerung einbauen, um sicherzustellen, dass der fullscreenContainer gerendert wurde
    setTimeout(() => {
        if (this.fullscreenContainer && this.fullscreenContainer.nativeElement) {
            const containerElement = this.fullscreenContainer.nativeElement;

            // Vollbild anfordern
            const promise =
                containerElement.requestFullscreen?.() ||
                (containerElement as any).webkitRequestFullscreen?.() ||
                (containerElement as any).mozRequestFullScreen?.() ||
                (containerElement as any).msRequestFullscreen?.();

            if (promise) {
                promise.catch((err: any) => {
                    console.error("Fullscreen request failed:", err);
                });
            }
        }
    }, 0); // Minimaler Delay
}

// 1. HostListener hinzufügen, um Fullscreen-Änderungen zu überwachen
@HostListener('document:fullscreenchange', ['$event'])
@HostListener('document:webkitfullscreenchange', ['$event'])
@HostListener('document:mozfullscreenchange', ['$event'])
@HostListener('document:MSFullscreenChange', ['$event'])
onFullScreenChange(event: any): void {
    const isFullscreen = document.fullscreenElement ||
                         (document as any).webkitFullscreenElement ||
                         (document as any).mozFullScreenElement ||
                         (document as any).msFullscreenElement;
    
    console.log("onFullScreenChange: Fullscreen-Status geändert. Ist Vollbild:", !!isFullscreen);
    
    if (!isFullscreen) {
        console.log("onFullScreenChange: Vollbildmodus verlassen.");
        this.closeVideo();
    }
}

    closeVideo(): void {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch((err) => {
                console.error("Exit fullscreen failed:", err);
                // Optional: Feedback an den Benutzer geben
            });
        }
        this.selectedVideo = null;
        this.videoOptions = null;

        if (
            this.fullscreenContainer &&
            this.fullscreenContainer.nativeElement
        ) {
            const containerElement = this.fullscreenContainer.nativeElement;
            this.renderer.removeClass(containerElement, "active");
        }
    }

    toggleSound(videoId: number): void {
        if (this.videoPlayerComponent) {
            this.videoPlayerComponent.toggleSound();
        }
        console.log("Toggle sound for video ID:", videoId);
        this.isMuted[videoId] = !this.isMuted[videoId]; // Zustand des Icons umschalten
    }

    

    // Methoden zur Steuerung des Video-Previews
    startPreview(videoId: number): void {
        console.log(`Start Preview for Video ID: ${videoId}`);
        const videoElement = document.getElementById(
            `preview-video-${videoId}`
        ) as HTMLVideoElement;
        if (videoElement) {
            videoElement.play();
        }
    }

    stopPreview(videoId: number): void {
        console.log(`Stop Preview for Video ID: ${videoId}`);
        const videoElement = document.getElementById(
            `preview-video-${videoId}`
        ) as HTMLVideoElement;
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
    }

    playGeneralVideo(): void {
        console.log(`Play General Preview`);
        const generalVideoElement = document.getElementById(
            "general-preview-video"
        ) as HTMLVideoElement;
        if (generalVideoElement) {
            generalVideoElement.play();

            // Vollbild anfordern
            const promise =
                generalVideoElement.requestFullscreen?.() ||
                (generalVideoElement as any).webkitRequestFullscreen?.() ||
                (generalVideoElement as any).mozRequestFullScreen?.() ||
                (generalVideoElement as any).msRequestFullscreen?.();

            if (promise) {
                promise.catch((err) => {
                    console.error("Fullscreen request failed:", err);
                    // Optional: Feedback an den Benutzer geben, z.B. eine Meldung anzeigen
                });
            }
        }
    }

    startGeneralPreview(): void {
        console.log(`Start General Preview`);
        const generalVideoElement = document.getElementById(
            "general-preview-video"
        ) as HTMLVideoElement;
        if (generalVideoElement) {
            generalVideoElement.play();
        }
    }

    stopGeneralPreview(): void {
        console.log(`Stop General Preview`);
        const generalVideoElement = document.getElementById(
            "general-preview-video"
        ) as HTMLVideoElement;
        if (generalVideoElement) {
            generalVideoElement.pause();
            generalVideoElement.currentTime = 0;
        }
    }

    ngOnDestroy(): void {
        // VideoPlayer-Komponente kümmert sich um die Entsorgung des Players
    }
}
