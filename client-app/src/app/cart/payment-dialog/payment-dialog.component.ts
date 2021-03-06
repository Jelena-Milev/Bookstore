import { Component, OnInit, Input } from '@angular/core';
declare var Stripe;
import { HttpClient } from "@angular/common/http";
import { PaymentIntent } from '../payment-intent.model';
import { PaymentService } from '../payment.service';
import { ToastController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CartItem } from '../cart-item.model';
import { OrdersService } from 'src/app/orders/orders.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit {
  @Input() paymentAmount: number;
  @Input() cartItems: CartItem[]

  stripe = Stripe('pk_test_51HBnSpFfAgyso30JeLk6z1IYhSUTXk7RnDVA4znyCyyaDsr4CF1qzNlzzGuT5g24LD1dcfR6ZV7MIhS7USKXbJXH00HOze4wMC');
  card: any;

  constructor(
    private ordersService: OrdersService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router) { }

  ngOnInit() {
    this.setupStripe();
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style});
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          this.makePayment(result.source.id);     
        }
      });
    });
  }

  private makePayment(id: string){
    const paymentIntent: PaymentIntent = {
      token: id,
      description: `Račun za kupovinu knjiga: ${new Date().toLocaleString('sr-RS')}`,
      amount: this.paymentAmount*100.0,
      currency: 'EUR'
    };
    this.loadingCtrl.create({message: 'Molimo sačekajte...'}).then(
      loadingEl => {
        loadingEl.present();
        this.paymentService.pay(paymentIntent).subscribe(
          data => {
            loadingEl.dismiss();
            this.showConfirmCancelDialog(data[`id`]);
          }
        ) 
      }
    )   
  }

  private showConfirmCancelDialog(paymentTransactionId: string) {
    this.alertCtrl
      .create({
        header: "Potvrda plaćanja",
        message: "Da li želite da platite?",
        buttons: [
          {
            text: "Ne",
            handler: () => this.cancelPaymentTransaction(paymentTransactionId),
          },
          {
            text: "Da",
            handler: () => this.confirmPaymentTransaction(paymentTransactionId),
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  private confirmPaymentTransaction(paymentTransactionId: string) {
    this.loadingCtrl
      .create({
        message: "Potvrda plaćanja...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.paymentService.confirm(paymentTransactionId).subscribe(
          (data) => {
            console.log('confirm payment result data')
            const orderId = data.charges.data[0].id;
            const receipt_url = data.charges.data[0].receipt_url;
            this.ordersService.createOrder(this.cartItems, orderId, receipt_url).subscribe(
              (order)=>{
                // console.log(order);
                this.cartService.resetCartItemsCount();
                this.modalCtrl.dismiss();
                sessionStorage.clear();
                this.router.navigate(["/", "orders"]);
                loadingEl.dismiss();
                this.showToastMessage(`Narudžbenica je uspešno kreirana.`)
              },
              (errorRes)=>{
                loadingEl.dismiss();
                this.showErrorMessage(errorRes.error.message);
              }
            )
          },
          (err) => {
            loadingEl.dismiss();
            console.log(err);
          }
        );
      });
  }

  private cancelPaymentTransaction(paymentTransactionId: string) {
    this.loadingCtrl
      .create({
        message: "Otkazivanje plaćanja...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.paymentService.cancel(paymentTransactionId).subscribe(
          (data) => {
            loadingEl.dismiss();
            this.modalCtrl.dismiss();
            this.showToastMessage(`Uspešno otkazana transakcija ${data[`id`]}`);
          },
          (err) => {
            loadingEl.dismiss();
            console.log(err);
          }
        );
      });
  }

  private showToastMessage(message: string) {
    this.toastCtrl
      .create({
        message: message,
        buttons: [
          {
            text: "OK",
            role: "cancel",
          },
        ],
        animated: true,
        duration: 2000,
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }

  private showErrorMessage(errorMsg: string){
    this.alertCtrl.create({
      header: 'Greška pri naručivanju knjiga',
      message: errorMsg,
      buttons:[
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    }).then(alertEl=>{
      alertEl.present();
    })
  }
}