import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {

  selectedSegment:string = 'publishers';
  
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
  }
}
