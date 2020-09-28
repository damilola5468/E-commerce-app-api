const products = [
  {
    id: 1,
    name: "Bags of Rice",
    category: "grains",
    available_quantity: 5,
    price: 45000,
    description:
      "This is the Description of the Above Item, confirm Your Order Before Checkout."
  },
  {
    id: 2,
    name: "Bag of Beans",
    category: "grains",
    available_quantity: 7,
    price: 50000,
    description:
      "This is the Description of the Above Item, confirm Your Order Before Checkout. "
  },
  {
    id: 3,
    name: "Bliss Groundnut Oil",
    category: "beverage",
    available_quantity: 0,
    price: 5000,
    description:
      "This is the Description of the Above Item, confirm Your Order Before Checkout."
  },
  {
    id: 4,
    name: "Coco Tea",
    category: "beverage",
    available_quantity: 3,
    price: 5000,
    description:
      "This is the Description of the Above Item, confirm Your Order Before Checkout."
  }
];

const users = [
  {
    name: "user",
    password: "user"
  },
  {
    name: "example",
    password: "qwerty"
  }
];

const category = [
  {
    id: 1,
    name: "fruits"
  },
  {
    id: 2,
    name: "vegetables"
  },
  {
    id: 3,
    name: "cereals"
  },
  {
    id: 4,
    name: "grains"
  },
  {
    id: 5,
    name: "Beverages"
  },
  {
    id: 6,
    name: "services"
  }
];

module.exports = { products: products, users: users, category: category };
