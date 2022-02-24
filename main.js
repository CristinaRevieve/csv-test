//constants
const readline = require("readline"),
  fs = require("fs"),
  orders_file = "./orders.csv",
  customers_file = "customers.csv",
  products_file = "products.csv",
  order_prices_file = "order_prices.csv";


var orders_matrix = getDocument(orders_file); //each element of the array is an entry
var product_matrix = transpose(getDocument(products_file)); //each element of the array is a category
let orders_costs = ["euros"];
for (let i = 1; i < orders_matrix.length; i++) {
  let order_price = 0;

  let products_ids = orders_matrix[i][2].split("\s+"); //wrong
  let a = products_ids.map((id) => parseInt(id));
  const newArray = a.filter(function (value) {
    return !Number.isNaN(value);
  });
  products_ids = newArray;

  for (let id of products_ids) {
    let index = product_matrix[0].indexOf(id.toString());
    let temp = parseFloat(product_matrix[2][index]);
    order_price = order_price + temp;
  }
  orders_costs.push(order_price.toString());
}
// play with matrices to get desired output in an array
let temp_matrix = transpose(orders_matrix);
temp_matrix.push(orders_costs);

let x = temp_matrix.splice(1, 2);
let order_prices = transpose(temp_matrix);


//CVS writing
outPutCsv(order_prices_file);

function outPutCsv(file_name) {
  writeDocument("", order_prices_file);
  function writeLine(string) {
   fs.appendFileSync(file_name, string, function (err) {
      if (err) {
      } else {
      }
    });
  }

  for (let i = 0; i < order_prices.length; i++) {
    writeLine(order_prices[i].join() + "\r\n");
  }
}

function getDocument(file) {
  const raw_data = fs.readFileSync(file, "utf-8"); //single string with all the data
  let array_of_strings = raw_data.split("\r\n"); // Each element of the array is a string with a whole line

  const file_matrix = array_of_strings.map((line) => line.split(","));
  file_matrix.pop();
  return file_matrix;
}

function getProducts(matrix) {
  let mat = transpose(matrix);
  const array = mat[2].map((line) => line.split("\s+"));
}

function transpose(matrix) {
  const rows = matrix.length,
    cols = matrix[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  return grid;
}

function writeDocument(string_data, file) {
  fs.writeFile(file, string_data, function (err) {
    if (err) return console.log(err);
  });
}


