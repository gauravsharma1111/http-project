import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('form') postForm: NgForm;
  title = 'http-project';
  loadedPosts = [];
  isFetching = false;
  isSending: boolean = false;
  errorMessage: string;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.onFetchPosts();
  }
  onFetchPosts() {
    this.isFetching = true;
    this.errorMessage = null;
    this.postsService.fetchPosts().subscribe(
      (response: any) => {
        this.isFetching = false;
        this.loadedPosts = response;
      },
      (error) => {
        this.isFetching = false;
        this.errorMessage = error.error.error;
        console.log({ ...error }.error.error);
      }
    );
  }
  onCreatePost() {
    this.isSending = true;
    this.postsService.sendPost(this.postForm.value).subscribe((response) => {
      console.log(response);
      this.isSending = false;
      this.postForm.resetForm();
      this.onFetchPosts();
    });
  }

  onDeletPosts() {
    this.postsService.deletePost().subscribe((response) => {
      this.loadedPosts = [];
    });
  }
}
