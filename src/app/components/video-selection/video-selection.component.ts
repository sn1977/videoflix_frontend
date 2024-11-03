import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    Renderer2,
    ViewEncapsulation,
    HostListener,
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

    /**
     * A reference to the fullscreen container element in the template.
     * This element is used to display video content in fullscreen mode.
     *
     * @type {ElementRef<HTMLDivElement>}
     */
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

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     * Initializes the component by loading the categories.
     *
     * @see https://angular.io/api/core/OnInit#ngOnInit
     */
    ngOnInit(): void {
        this.loadCategories();
    }

    /**
     * Lifecycle hook that is called after a component's view has been fully initialized.
     * This method is used to set video options if a video has been selected.
     *
     * @remarks
     * This method is part of Angular's component lifecycle hooks.
     *
     * @see {@link https://angular.io/guide/lifecycle-hooks#afterviewinit | ngAfterViewInit}
     */
    ngAfterViewInit(): void {
        if (this.selectedVideo) {
            this.setVideoOptions(this.selectedVideo.video_file);
        }
    }

    /**
     * Generates a translation key for a given category name.
     * The key is formatted as `video_selection.{categoryName}` in lowercase.
     *
     * @param categoryName - The name of the category to generate the translation key for.
     * @returns The formatted translation key.
     */
    getTranslationKey(categoryName: string): string {
        return `video_selection.${categoryName.toLowerCase()}`;
    }

    /**
     * Loads the video categories from the video service and assigns them to the component's categories property.
     * If an error occurs during the loading process, it logs the error to the console and sets an error message.
     *
     * @returns {void}
     */
    loadCategories(): void {
        this.videoService.getCategories().subscribe({
            next: (categories: Category[]) => {
                this.categories = categories;
                this.separatePreviewCategory();
            },
            error: (error) => {
                console.error("Error loading categories:", error);
                this.error = "Error loading categories";
            },
        });
    }

    /**
     * Separates the "PreviewVideo" category from the list of categories.
     *
     * This method finds the category with the name "PreviewVideo" and assigns it to `this.previewCategory`.
     * All other categories are assigned to `this.otherCategories`.
     *
     * @returns {void}
     */
    separatePreviewCategory(): void {
        this.previewCategory =
            this.categories.find(
                (category) => category.name === "PreviewVideo"
            ) || null;

        this.otherCategories = this.categories.filter(
            (category) => category.name !== "PreviewVideo"
        );
    }

    /**
     * Sets the video options for the video player.
     *
     * @param src - The source URL of the video.
     *
     * This method configures the video player with the following options:
     * - `fluid`: Enables responsive layout.
     * - `aspectRatio`: Sets the aspect ratio of the video player.
     * - `autoplay`: Enables automatic playback of the video.
     * - `muted`: Mutes the video to allow autoplay.
     * - `sources`: An array containing the video source object with `src` and `type` properties.
     */
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
    }

    /**
     * Plays the selected video by setting it as the current video and configuring video options.
     * Requests fullscreen mode for the video container with a minimal delay to ensure rendering.
     *
     * @param video - The video object to be played.
     * @returns void
     */
    playVideo(video: Video): void {
        this.selectedVideo = video;
        this.setVideoOptions(video.video_file);

        // Verzögerung einbauen, um sicherzustellen, dass der fullscreenContainer gerendert wurde
        setTimeout(() => {
            if (
                this.fullscreenContainer &&
                this.fullscreenContainer.nativeElement
            ) {
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
    @HostListener("document:fullscreenchange", ["$event"])
    @HostListener("document:webkitfullscreenchange", ["$event"])
    @HostListener("document:mozfullscreenchange", ["$event"])
    @HostListener("document:MSFullscreenChange", ["$event"])
    onFullScreenChange(event: any): void {
        const isFullscreen =
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement;

        if (!isFullscreen) {
            this.closeVideo();
        }
    }

    /**
     * Closes the currently selected video and exits fullscreen mode if active.
     *
     * This method performs the following actions:
     * 1. Exits fullscreen mode if the document is currently in fullscreen.
     * 2. Sets the selected video and video options to null.
     * 3. Removes the "active" class from the fullscreen container element if it exists.
     *
     * @returns {void}
     */
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

    /**
     * Toggles the sound for a given video.
     *
     * @param videoId - The ID of the video for which to toggle the sound.
     * @returns void
     */
    toggleSound(videoId: number): void {
        this.isMuted[videoId] = !this.isMuted[videoId]; // Toggle Stummschaltung
    }

    /**
     * Starts the preview of a video by playing the video element with the given video ID.
     *
     * @param videoId - The ID of the video to start the preview for.
     * @returns void
     */
    startPreview(videoId: number): void {
        const videoElement = document.getElementById(
            `preview-video-${videoId}`
        ) as HTMLVideoElement;
        if (videoElement) {
            videoElement.play();
        }
    }

    /**
     * Stops the preview of a video by pausing it and resetting its current time to 0.
     *
     * @param videoId - The unique identifier of the video to stop the preview for.
     * @returns void
     */
    stopPreview(videoId: number): void {
        const videoElement = document.getElementById(
            `preview-video-${videoId}`
        ) as HTMLVideoElement;
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
    }

    /**
     * Plays the general preview video and attempts to request fullscreen mode.
     *
     * This method selects the video element with the ID "general-preview-video" and plays it.
     * It also attempts to request fullscreen mode using the appropriate method for the browser.
     * If the fullscreen request fails, an error is logged to the console.
     *
     * @returns {void}
     */
    playGeneralVideo(): void {
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

    /**
     * Starts the playback of the general preview video.
     *
     * This method selects the video element with the ID "general-preview-video"
     * and initiates its playback if the element is found.
     *
     * @returns {void}
     */
    startGeneralPreview(): void {
        const generalVideoElement = document.getElementById(
            "general-preview-video"
        ) as HTMLVideoElement;
        if (generalVideoElement) {
            generalVideoElement.play();
        }
    }

    /**
     * Stops the general preview video by pausing it and resetting its current time to 0.
     * This function targets the video element with the ID "general-preview-video".
     * If the video element is found, it will be paused and its playback position will be reset.
     */
    stopGeneralPreview(): void {
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
