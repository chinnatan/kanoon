export default class NumberUtil {
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(value);
  }

  static formatNumber(value: number): string {
    return new Intl.NumberFormat("th-TH").format(value);
  }
  
}
