import { Component, OnInit } from '@angular/core';
import { Publisher } from './publisher.model';
import { PublishersService } from './publishers.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.page.html',
  styleUrls: ['./publishers.page.scss'],
})
export class PublishersPage implements OnInit {
  publishers: Publisher[];
  isLoading: boolean;
  cp:number = 1;
  seachText:string = '';
  
  constructor(private publishersService:PublishersService) { }

  ngOnInit() {
    this.isLoading = true;
    this.publishersService.publishers.subscribe(res=>{
      this.publishers = res;
      this.isLoading = false;
    })
  }

  ionViewWillEnter(){
    this.publishersService.getPublishers().subscribe();
    console.log('ionViewWillEnter')
    console.log(this.publishers)
  }

}
