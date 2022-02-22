const { type } = require("os");

//constants
const readline = require("readline"),
    fs = require("fs"),
    orders_file = "./orders.csv",
    customers_file = "customers.csv",
    products_file = "products.csv";





//I don't understand this
//const rl = readline.createInterface({ input: fs.readFileSync(orders_file) });
//const data = fs.readFileSync(0, "utf8");


//getProducts(getDocument(orders_file));
var orders_matrix = getDocument(orders_file) //each element of the array is an entry
var product_matrix = transpose(getDocument(products_file)) //each element of the array is a category
let orders_costs= ['euros']
for(let i=1 ; i< orders_matrix.length; i++){
//for(let i=2 ; i< 3; i++){
  let order_price = 0;

  let products_ids = orders_matrix[i][2].split('')
  let a = products_ids.map(id => parseInt(id))
  const newArray = a.filter(function (value) {
    return !Number.isNaN(value);
  });
  products_ids = newArray;

  
  for (let id of products_ids) {
    let index = product_matrix[0].indexOf(id.toString())
    let temp = parseFloat(product_matrix[2][index])

    order_price = order_price + temp;
    //console.log(id+ ':'+ temp +'...' + order_price+ ':'+ index+'|'+id.toString())
  }
  console.log(order_price)
  orders_costs.push(order_price)
  
}

function getDocument(file) {
    const raw_data = fs.readFileSync(file, 'utf-8'); //single string with all the data
    let array_of_strings = raw_data.split("\r\n");    // Each element of the array is a string with a whole line 
    
    const file_matrix = array_of_strings.map(line => line.split(","))
    file_matrix.pop();
    //console.log({...file_matrix})
    return file_matrix
}

function getProducts(matrix) {
    let mat =transpose(matrix);
    const array = mat[2].map(line => line.split(" "))
   // console.log(mat)
    //orders = mat.reduce((a, v) => ({ ...a, [v]: v}), {}) 
}



function transpose(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
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