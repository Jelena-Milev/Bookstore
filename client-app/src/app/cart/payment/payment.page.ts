import { Component, OnInit } from "@angular/core";
declare var Stripe;
import { HttpClient } from "@angular/common/http";
import { PaymentService } from "../payment.service";
import {
  ToastController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { PaymentIntent } from '../payment-intent.model';
@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"],
})
export class PaymentPage implements OnInit {
  stripe = Stripe(
    "pk_test_51HBnSpFfAgyso30JeLk6z1IYhSUTXk7RnDVA4znyCyyaDsr4CF1qzNlzzGuT5g24LD1dcfR6ZV7MIhS7USKXbJXH00HOze4wMC"
  );
  card: any;

  constructor(
    private http: HttpClient,
    private paymentService: PaymentService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.setupStripe();
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: "#32325d",
        lineHeight: "24px",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };

    this.card = elements.create("card", {
      style: style,
    });
    // console.log(this.card);
    this.card.mount("#card-element");

    this.card.addEventListener("change", (event) => {
      var displayError = document.getElementById("card-errors");
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
    });

    var form = document.getElementById("payment-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // console.log(event);

      this.stripe.createSource(this.card).then((result) => {
        if (result.error) {
          var errorElement = document.getElementById("card-errors");
          errorElement.textContent = result.error.message;
        } else {
          // console.log('token')
          // console.log(result);
          // console.log(result.source.id)
          const paymentIntent: PaymentIntent = {
            token: result.source.id,
            description: 'opis',
            amount: 5650,
            currency: 'EUR'
          };
          this.paymentService.pay(paymentIntent).subscribe(
            data => {
              console.log('initial payment intent')
              console.log(data);
              this.showConfirmCancelDialog(data[`id`]);
            }
          ) 
          // this.makePayment(result.id);
        }
      });
    });
  }

  private confirmPaymentTransaction(paymentTransactionId: string) {
    this.loadingCtrl
      .create({
        message: "Potvrda placanja...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.paymentService.confirm(paymentTransactionId).subscribe(
          (data) => {
            console.log('confirm payment result data')
            console.log(data)
            loadingEl.dismiss();
            this.showToastMessage(
              `Uspesno potvrdjena transakcija ${data[`id`]}`
            );
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
        message: "Otkazivanje placanja...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.paymentService.cancel(paymentTransactionId).subscribe(
          (data) => {
            loadingEl.dismiss();
            this.showToastMessage(`Uspesno otkazana transakcija ${data[`id`]}`);
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

  private showConfirmCancelDialog(paymentTransactionId: string) {
    this.alertCtrl
      .create({
        header: "Potvrda placanja",
        message: "Da li zelite da platite",
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
}
