import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Author } from '../author.model';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent implements OnInit {
  
  @Input() title: string;
  @Input() author: Author;

  private imageSelected: File = null;

  authorForm: FormGroup = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    bio: new FormControl(""),
    photo: new FormControl(null)
  });

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    this.initializeForm();
  }

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

  initializeForm(){
    this.authorForm.get('firstName').setValue(this.author.firstName);
    this.authorForm.get('lastName').setValue(this.author.lastName);
    this.authorForm.get('bio').setValue(this.author.biography);
  }
}
