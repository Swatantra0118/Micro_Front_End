export interface Product {
    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: string;
      count: string;
    };
  }