import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  fetchPosts() {
    return this.http
      .get(
        'https://ng-http-project-62b2c-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'custom-header': 'hello' }),
          params: new HttpParams().set('print', 'pretty'),
        }
      )
      .pipe(
        map((responseData) => {
          let postsArray = [];
          for (const key in responseData) {
            postsArray.push({ ...responseData[key], id: key });
          }
          return postsArray;
        })
      );
  }
  sendPost(formData: any) {
    return this.http.post(
      'https://ng-http-project-62b2c-default-rtdb.firebaseio.com/posts.json',
      formData
    );
  }

  deletePost() {
    return this.http
      .delete(
        'https://ng-http-project-62b2c-default-rtdb.firebaseio.com/posts.json',
        { observe: 'events' }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            console.log(event.type);
          }
        })
      );
  }
}
