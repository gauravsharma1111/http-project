import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('form') postForm: NgForm;
  title = 'http-project';
  loadedPosts = [];
  isFetching = false;
  isSending: boolean = false;
  constructor(private postsService: PostsService) {

  }

  ngOnInit(): void {
    this.onFetchPosts();
  }
  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((response: any) => {
      this.isFetching = false;
      this.loadedPosts = response;
    })
  }
  onCreatePost() {
    this.isSending = true;
    this.postForm.resetForm();
    this.postsService.sendPost(this.postForm.value).subscribe((response) => {
      console.log(response);
      this.isSending = false;

    })
  }

  onDeletPosts() {
    this.postsService.deletePost().subscribe(response => {
      console.log(response);
    })
  }


}
