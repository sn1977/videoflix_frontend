import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { LanguageService } from "../../services/language.service";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";
import { lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http"; // Import the HttpClient module

@Component({
    selector: "app-video-selection",
    standalone: true,
    imports: [HeaderComponent],
    templateUrl: "./video-selection.component.html",
    styleUrl: "./video-selection.component.scss",
})
export class VideoSelectionComponent {
    videos: any[] = [];
    constructor(
        private languageService: LanguageService,
        private authService: AuthService,
        private http: HttpClient // Inject the HttpClient module
    ) {}

    async ngOnInit() {
      this.videos = await this.loadVideos();
      console.log("Videos:", this.videos);
    }

    loadVideos(): Promise<any[]> {
      const url = environment.apiUrl + "/video_selection/";
      return lastValueFrom(this.http.get<any[]>(url)); // Specify the type of the response as any[]
    }
}
