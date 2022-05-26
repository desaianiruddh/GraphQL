exports.Query = {
  hello: () => 'World!',
  text: () => 'text',
  number: () => 15,
  price: () => 15.25,
  arrayOfStr: () => ['array', 'of', 'string'],
  arrayOfNum: () => [22.5, 23.5555],
  products: (parent, { filter }, { products, reviews }) => {
    let filteredProducts = products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating;
        });
      }
    }
    return filteredProducts;
  },
  product: (parent, { id }, { products }) => {
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    return product;
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id }, { categories }) => {
    const category = categories.find((product) => product.id === id);
    if (!category) return null;
    return category;
  },
};
