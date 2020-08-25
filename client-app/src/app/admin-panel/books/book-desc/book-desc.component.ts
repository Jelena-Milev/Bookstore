import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-desc',
  templateUrl: './book-desc.component.html',
  styleUrls: ['./book-desc.component.scss'],
})
export class BookDescComponent implements OnInit {

  @Input() title: string;
  @Input() authors: string;
  @Input() description: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss();
  }

}
