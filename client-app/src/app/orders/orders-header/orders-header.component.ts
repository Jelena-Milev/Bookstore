import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-orders-header',
  templateUrl: './orders-header.component.html',
  styleUrls: ['./orders-header.component.scss'],
})
export class OrdersHeaderComponent implements OnInit {

  cartItemsCount: number = 0;
  
  constructor(private authService:AuthService) { }

  ngOnInit() {}

  onLogout(){
    this.authService.logout();
  }
}
