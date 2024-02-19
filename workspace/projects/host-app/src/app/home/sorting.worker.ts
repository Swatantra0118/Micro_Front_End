import { Product } from "../models/product.model";

addEventListener('message', ({ data }) => {
    data.sort((a: Product, b: Product) => {
      return b.price - a.price; // Sorting by price ascending
    });
  
    postMessage(data);
  });