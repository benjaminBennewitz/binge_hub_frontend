import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../components/overview/video.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:8000/api/bingeHub/videos/';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of videos from the server.
   *
   * This method sends a GET request to the API to retrieve an array of videos.
   * It includes authentication tokens in the request headers for authorization.
   *
   * @returns {Observable<Video[]>} An observable that emits an array of Video objects.
   */
  getVideos(): Observable<Video[]> {
    const token = localStorage.getItem('bh-token') || '';
    const csrfToken = localStorage.getItem('bh-csrf_token') || '';

    const headers = new HttpHeaders({
      Authorization: `Token ${token}`,
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json',
    });

    return this.http.get<Video[]>(this.apiUrl, { headers });
  }
}
