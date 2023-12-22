export const getProductsAdapter = (products: any) => {
  const productsFormatted = products.map((product: any) => {
    product.id = product._id;
    delete product._id;
    return product;
  });

  return productsFormatted;
};
