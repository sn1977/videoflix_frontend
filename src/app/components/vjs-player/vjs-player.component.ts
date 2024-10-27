// import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import videojs from 'video.js';

// @Component({
//   selector: 'app-vjs-player',
//   template: `
//     <video #target class="video-js" controls muted playsinline preload="none"></video>
//   `,
//   styleUrls: [
//     './vjs-player.component.scss'
//   ],
//   encapsulation: ViewEncapsulation.None,
//   standalone: true,
// })
// export class VjsPlayerComponent implements OnInit, OnDestroy {
//   @ViewChild('target', { static: true }) target!: ElementRef;

//   // See options: https://videojs.com/guides/options
//   @Input() options!: {
//     fluid: boolean,
//     aspectRatio: string,
//     autoplay: boolean,
//     sources: {
//       src: string,
//       type: string,
//     }[],
//   };
//   player: any;

//   // player!: videojs.Player;

//   constructor(
//     private elementRef: ElementRef,
//   ) { }

//   // Instantiate a Video.js player OnInit
//   ngOnInit() {
//     this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
//       console.log('onPlayerReady', this);
//     });
//   }

//   // Dispose the player OnDestroy
//   ngOnDestroy() {
//     if (this.player) {
//       this.player.dispose();
//     }
//   }

//   // toggleSound(): void {
//   //   if (this.player) {
//   //     const isMuted = this.player.muted();
//   //     this.player.muted(!isMuted);
//   //     console.log(`Sound toggled to: ${!isMuted ? 'Muted' : 'Unmuted'}`);
//   //   }
//   // }
// }


import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  template: `
    <video #target class="video-js" controls muted playsinline preload="none"></video>
  `,
  styleUrls: [
    './vjs-player.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;

  @Input() options!: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    muted: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };

  player: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    console.log('Initializing Video.js Player with options:', this.options);
    this.player = videojs(this.target.nativeElement, this.options, () => {
      console.log('Video.js player is ready');
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  toggleSound(): void {
    if (this.player) {
      const isMuted = this.player.muted();
      this.player.muted(!isMuted);
      console.log(`Sound toggled to: ${!isMuted ? 'Muted' : 'Unmuted'}`);
    }
  }
}