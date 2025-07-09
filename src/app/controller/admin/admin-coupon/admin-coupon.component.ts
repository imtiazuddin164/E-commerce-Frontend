import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/model/Coupon.model';
import { CouponService } from 'src/app/service/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css']
})
export class AdminCouponComponent implements OnInit {

  coupons: Coupon[] = [];
  newCoupon: Coupon = {
    couponCode: '',
    discountAmount: 0,
    type: 'FIXED',
    active: true,
    startDate: '',
    endDate: ''
  };
  isEditing = false;
  editingId: number | null = null;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.couponService.getAllCoupons().subscribe((data) => {
      this.coupons = data;
    });
  }

  saveCoupon(): void {
    if (this.isEditing && this.editingId !== null) {
      this.couponService.updateCoupon(this.editingId, this.newCoupon).subscribe(() => {
        Swal.fire('Updated!', 'Coupon updated successfully', 'success');
        this.resetForm();
        this.loadCoupons();
      });
    } else {
      this.couponService.addCoupon(this.newCoupon).subscribe(() => {
        Swal.fire('Created!', 'Coupon added successfully', 'success');
        this.resetForm();
        this.loadCoupons();
      });
    }
  }

  editCoupon(coupon: Coupon): void {
    this.newCoupon = { ...coupon };
    this.isEditing = true;
    this.editingId = coupon.id!;
  }

  deleteCoupon(id: number): void {
    this.couponService.deleteCoupon(id).subscribe(() => {
      Swal.fire('Deleted!', 'Coupon removed', 'success');
      this.loadCoupons();
    });
  }

  resetForm(): void {
    this.newCoupon = {
      couponCode: '',
      discountAmount: 0,
      type: 'FIXED',
      active: true,
      startDate: '',
      endDate: ''
    };
    this.isEditing = false;
    this.editingId = null;
  }

}
