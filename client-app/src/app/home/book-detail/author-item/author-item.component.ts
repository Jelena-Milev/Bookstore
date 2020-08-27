import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/admin-panel/authors/author.model';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss'],
})
export class AuthorItemComponent implements OnInit {
  @Input() author:Author;
  constructor() { }

  ngOnInit() {}

}
