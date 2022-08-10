const { v4 } = require('uuid');
const { db } = require('../db');

exports.Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const { name } = input;
    const newCategory = {
      id: v4(),
      name,
    };
    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { products }) => {
    const { image, name, description, quantity, price, onSale, categoryId } =
      input;
    const newProduct = {
      id: v4(),
      image,
      name,
      description,
      quantity,
      price,
      onSale,
      categoryId,
    };
    products.push(newProduct);
    return newProduct;
  },
  addReview: (parents, { input }, { reviews }) => {
    const { title, comment, rating, productId } = input;
    const newReview = {
      id: v4(),
      date: new Date().toISOString().replace(/T.*/, ''),
      title,
      comment,
      rating,
      productId,
    };
    reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parents, { id }, context) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        return {
          ...product,
          categoryId: null,
        };
      }
      return product;
    });
    return true;
  },
  deleteProduct: (parents, { id }, context) => {
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },
  deleteReview: (parent, { id }, context) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
  updateCategory: (parent, { id, input }, { categories }) => {
    const { name } = input;
    const index = categories.findIndex((category) => category.id === id);
    if (index === -1) return null;
    categories[index] = {
      ...categories[index],
      name,
    };
    return categories[index];
  },
  updateProduct: (parent, { id, input }, { products }) => {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return null;
    products[index] = {
      ...products[index],
      ...input,
    };
    return products[index];
  },
  updateReview: (parent, { id, input }, { reviews }) => {
    const index = reviews.findIndex((review) => review.id === id);
    if (index === -1) return null;
    reviews[index] = {
      ...reviews[index],
      ...input,
    };
    return reviews[index];
  },
};
