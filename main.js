//const { type } = require("os");

const { TIMEOUT } = require("dns");

//constants
const readline = require("readline"),
  fs = require("fs"),
  orders_file = "./orders.csv",
  customers_file = "customers.csv",
  products_file = "products.csv",
  order_prices_file = "order_prices.csv";

//getProducts(getDocument(orders_file));
var orders_matrix = getDocument(orders_file); //each element of the array is an entry
var product_matrix = transpose(getDocument(products_file)); //each element of the array is a category
let orders_costs = ["euros"];
for (let i = 1; i < orders_matrix.length; i++) {
  //for(let i=2 ; i< 3; i++){
  let order_price = 0;

  let products_ids = orders_matrix[i][2].split(""); //wrong
  let a = products_ids.map((id) => parseInt(id));
  const newArray = a.filter(function (value) {
    return !Number.isNaN(value);
  });
  products_ids = newArray;

  for (let id of products_ids) {
    let index = product_matrix[0].indexOf(id.toString());
    let temp = parseFloat(product_matrix[2][index]);

    order_price = order_price + temp;
    //console.log(id+ ':'+ temp +'...' + order_price+ ':'+ index+'|'+id.toString())
  }
  orders_costs.push(order_price.toString()); //I'm not sure if there is a problem with it being a number
}
// espacio para pegar matrices
let temp_matrix = transpose(orders_matrix);
temp_matrix.push(orders_costs);

let x = temp_matrix.splice(1, 2);
let order_prices = transpose(temp_matrix);

console.log(order_prices);
//espacio para escribir en csv

outPutCsv(order_prices_file); // no llamo a la funcion aun porque aun no esta

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
    //for (let j = 0; j < 2; j++){
    writeLine(order_prices[i].join() + "\r\n");
    console.log(order_prices[i]);
    /*switch (j) {
        case 0:
          writeComma(); 
          break;
        case 1:
          breakLine() 
      }*/

    //}
  }
}

function getDocument(file) {
  const raw_data = fs.readFileSync(file, "utf-8"); //single string with all the data
  let array_of_strings = raw_data.split("\r\n"); // Each element of the array is a string with a whole line

  const file_matrix = array_of_strings.map((line) => line.split(","));
  file_matrix.pop();
  //console.log({...file_matrix})
  return file_matrix;
}

function getProducts(matrix) {
  let mat = transpose(matrix);
  const array = mat[2].map((line) => line.split(" "));
  // console.log(mat)
  //orders = mat.reduce((a, v) => ({ ...a, [v]: v}), {})
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
    //console.log('Hello World > helloworld.txt');
  });
}

// function to parse an array to a coma separated string
