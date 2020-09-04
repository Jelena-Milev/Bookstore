import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Publisher } from '../publisher.model';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.scss'],
})
export class PublisherFormComponent implements OnInit {
  @Input() title: string;
  @Input() publisher: Publisher;

  publisherForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    mail: new FormControl(null),
    siteUrl: new FormControl(null)
  });

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    this.initializeForm();
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  onSavePublisher(){
    if(!this.publisherForm.valid){
      return;
    }
    this.modalCtrl.dismiss({
      publisherData:{
        name: this.publisherForm.value['name'],
        address: this.publisherForm.value['address'],
        mail: this.publisherForm.value['mail'],
        siteUrl: this.publisherForm.value['siteUrl']
      }
    },'confirm');
  }

  initializeForm(){
    this.publisherForm.get('name').setValue(this.publisher?.name);
    this.publisherForm.get('address').setValue(this.publisher?.address);
    this.publisherForm.get('mail').setValue(this.publisher?.email);
    this.publisherForm.get('siteUrl').setValue(this.publisher?.siteUrl);
  }
}
