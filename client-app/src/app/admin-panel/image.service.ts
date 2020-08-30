import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append("image", image);

    return this.http.post<{imageUrl:string, imagePath:string}>(
      "https://us-central1-mobilno-slike.cloudfunctions.net/storeImage",
      uploadData
    );
  }
}
