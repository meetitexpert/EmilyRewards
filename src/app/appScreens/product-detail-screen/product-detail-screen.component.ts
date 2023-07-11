import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/Constants/app.constants';
import { ProductsDetail, productObj } from 'src/app/models/products.model';
import { SingIn } from 'src/app/models/sing-in.model';
import { ApisService } from 'src/app/services/apis.service';

@Component({
	selector: 'app-product-detail-screen',
	templateUrl: './product-detail-screen.component.html',
	styleUrls: ['./product-detail-screen.component.css']
})
export class ProductDetailScreenComponent {
	@ViewChild('carousel', { static: true }) carousel: NgbCarousel | undefined;
	product?: productObj | undefined
	// images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
	paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;
	user?: SingIn //user Object

	constructor(private activateRoute: ActivatedRoute, private apiServices:ApisService, public constants:AppConstants) {
		this.user = JSON.parse(sessionStorage.getItem(this.constants.userObject) ?? "")
		this.product = JSON.parse(this.activateRoute.snapshot.params['selectedProduct']) as productObj
	}

	ngOnInit(){
		this.loadProductDetail()
	}

	loadProductDetail(){
		let params = new Map(Object.entries({
			"memberUserId"   : this.user?.user_id?.toString(),
            "retailerUserId" : this.product?.promotion?.offerId,
            "productId"      : this.product?.productId?.toString(),
            "version"        : "1",
            "clientClass"    : "3",
            "type"           : "C1",
		}))
		this.apiServices.post(this.constants.getProductDetail, params).subscribe((result)=>{
			// console.warn(result)
			let productDetailresult = result as ProductsDetail
			let productDetail = productDetailresult.returnData as productObj
			
			this.product!.images = productDetail.images
			console.warn(this.product?.images)
			this.product!.attributes = productDetail.attributes
			this.product!.variations = productDetail.variations
		});
	}


	//IMAGEs CAROUSAL SEttings
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

}
