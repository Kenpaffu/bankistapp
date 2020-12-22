'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

////////////////// CREATING DOM ELEMENTS

// Instead of working with global variables, instead get used to passing data that is needed directly into a function.

const displayMovements = function (movements) {};

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
//////////////// SIMPLE ARRAY METHODS
// Arrays themselves are also objects.
// They get access to special methods.

let arr = ['a', 'b', 'c', 'd', 'e'];

////// SLICE method
console.log(arr.slice(2));
// the start number will be included but not the end parameter number
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// Create a shallow copy with slice same as the spread (...) operator
console.log(arr.slice());
console.log([...arr]);

/////// SPLICE method
// first number is the where on the array you want to splice and the second number is the amount of values you want to delete.
// Works like slice, but it mutates the original array
// The original array is left with everything that wasn't spliced

// console.log(arr.splice(2));

// A good way to get rid of the final value in the array
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

///////// REVERSE
// Reverse method DOES mutate the array.

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
// Used to concatinate multiple arrays
// Does NOT mutate original arrays.

const letters = arr.concat(arr2);
console.log(letters);

// same as spread (...)
console.log([...arr, ...arr2]);

////////// JOIN
// Turns into a string with a specified separator.

console.log(letters.join('-'));

*/

/*
//////////////////////////////////////////////////////////
////////////// LOOPING ARRAYS forEach()///////////////////
//////////////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Using the for( of ) loop to compare to forEach
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement: ${i + 1}, You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

console.log('----------- FOR EACH ------------');

// Using the forEach()
// forEach is a higher order function which requires a callback function in order to tell it what to do.
// The forEach() method can NOT break out of a loop, if you need to break out of a loop, use a for( of ) loop,

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement: ${i + 1}, You deposited ${mov}`);
  } else {
    console.log(`Movement: ${i + 1}, You withdrew ${Math.abs(mov)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// forEach() on Maps and Sets

// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
// Both value and key are the same thing on a set.
// In javaScript the "_" is a throwaway variable
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${_}: ${value}`);
});
*/
