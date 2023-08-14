export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  supplierId: number;
  unit: string;
  qty: number;
  isActive: boolean;
}

export interface IProductResponse {}
