import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { productObj } from 'src/app/models/products.model';

@Component({
  selector: 'app-product-detail-screen',
  templateUrl: './product-detail-screen.component.html',
  styleUrls: ['./product-detail-screen.component.css']
})
export class ProductDetailScreenComponent {
  product? : productObj | undefined
  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

  constructor(private activateRoute:ActivatedRoute){
    this.product = JSON.parse(this.activateRoute.snapshot.params['selectedProduct']) as productObj
  }

	@ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;

	togglePaused() {
		if (this.paused) {
			this.carousel!.cycle();
		} else {
			this.carousel!.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

  btn_addQty_Action() {
    this.product!.offerQuantity += 1
  }

  btn_subtractQty_Action() {
    if(this.product!.offerQuantity > 0){
      this.product!.offerQuantity -= 1
    }
  }
}
