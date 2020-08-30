import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent implements OnInit {
  
  private imageSelected: File;

  authorForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    bio: new FormControl(null),
    photo: new FormControl(null)
  });

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss();
  }

  onSaveAuthor(){
    if(!this.authorForm.valid){
      return;
    }
    this.modalCtrl.dismiss({
      authorData:{
        firstName: this.authorForm.value['firstName'],
        lastName: this.authorForm.value['lastName'],
        biography: this.authorForm.value['bio'],
        image: this.imageSelected
      }
    },'confirm');
  }

  onImageSelected(event){
    this.imageSelected = <File>event.target.files[0];
  }

}
