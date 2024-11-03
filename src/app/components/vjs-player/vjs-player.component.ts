import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import videojs from "video.js";

@Component({
    selector: "app-vjs-player",
    template: `
        <video
            #target
            class="video-js"
            controls
            muted
            playsinline
            preload="none"></video>
    `,
    styleUrls: ["./vjs-player.component.scss"],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
    @ViewChild("target", { static: true }) target!: ElementRef;

    /**
     * Input property that defines the configuration options for the video player.
     * 
     * @property {boolean} fluid - Determines if the player should resize automatically.
     * @property {string} aspectRatio - Specifies the aspect ratio of the player (e.g., '16:9').
     * @property {boolean} autoplay - Indicates whether the video should start playing automatically.
     * @property {boolean} muted - Indicates whether the video should be muted by default.
     * @property {Array<{src: string, type: string}>} sources - An array of source objects, each containing the source URL and type of the video.
     */
    @Input() options!: {
        fluid: boolean;
        aspectRatio: string;
        autoplay: boolean;
        muted: boolean;
        sources: {
            src: string;
            type: string;
        }[];
    };

    player: any;

    constructor(private elementRef: ElementRef) {}

    /**
     * Initializes the video.js player instance when the component is initialized.
     * This method is called once, after the first ngOnChanges.
     * 
     * @memberof VjsPlayerComponent
     */
    ngOnInit() {
        this.player = videojs(
            this.target.nativeElement,
            this.options,
            () => {}
        );
    }

    /**
     * Lifecycle hook that is called when the component is destroyed.
     * Disposes of the video player instance to clean up resources and avoid memory leaks.
     */
    ngOnDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    }
}
