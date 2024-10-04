
export interface ProductReportManagement {
  sno: number;
  productCode: string;
  productType: string;
  productGroup: string;
  season: string;
  productName: string;
  unitQuantity: number;
  totalQuantity: number;
  units: string;
  soldUnits: number;

}

export const ProductReportManagementData: ProductReportManagement[] = [
  {
    sno: 1,
    productCode: 'PRD01',
    productType: 'Staples',
    productGroup: 'Staples',
    season: 'All',
    productName: 'Rice (Basmati)',
    unitQuantity: 1000,
    totalQuantity: 5000,
    units: 'Gram',
    soldUnits:2000,
  },
  {
    sno: 2,
    productCode: 'PRD02',
    productType: 'Staples',
    productGroup: 'Staples',
    season: 'All',
    productName: 'Wheat (Whole)',
    unitQuantity: 1000,
    totalQuantity: 4800,
    units: 'Gram',
    soldUnits:3000,
  },
  {
    sno: 3,
    productCode: 'PRD03',
    productType: 'Staples',
    productGroup: 'Staples',
    season: 'All',
    productName: 'Lentils (Masoor)',
    unitQuantity: 1000,
    totalQuantity: 3200,
    units: 'Gram',
    soldUnits:2000,
  }
];
