const Product = require("./models/product");

// const a = () => {
//   Product.findAll().then((data) => {
//     console.log(data[0].dataValues);
//   });
//   console.log("1");
// };

// a();

const b = async () => {
  const data = Product.findAll();
  const kq = await data;
  console.log(kq[0].dataValues);
  console.log("1");
};

b();
