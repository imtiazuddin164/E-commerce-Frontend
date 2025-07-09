export class Coupon {
  id?: number;
  couponCode: string | undefined;
  discountAmount: number | undefined;
  type: 'FIXED' | 'PERCENTAGE' | undefined;
  active: boolean | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
}
