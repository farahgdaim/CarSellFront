import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service'; // Add this import
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-videoconference',
  templateUrl: './videoconference.component.html',
  styleUrls: ['./videoconference.component.css']
})
export class VideoconferenceComponent implements OnInit {
  domain: string = "meet.jit.si";
  roomName: string = "reunion-" + Math.random().toString(36).substring(2, 15);
  api: any;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start

    const options = {
      roomName: this.roomName,
      width: "100%",
      height: 600,
      parentNode: document.getElementById('jitsi-container'),
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false
      },
      configOverwrite: {
        disableDeepLinking: true
      }
    };

    this.api = new JitsiMeetExternalAPI(this.domain, options);

    // Hide loader when Jitsi is ready (using the API event)
    this.api.addEventListener('videoConferenceJoined', () => {
      this.loadingService.hide();
    });

    // Optionally, hide loader after a timeout in case the event doesn't fire
    setTimeout(() => {
      this.loadingService.hide();
    }, 5000);
  }
}