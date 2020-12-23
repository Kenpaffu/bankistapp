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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // .textContent = 0

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// creating user names
// We used forEach in this case because we wanted to have the side effects of each value in the array
// We used the map method inside the foreach method because we wanted it to return a new array with only the initial letters before we join them back together.

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display Balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer.
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

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

//////////// CODING CHALLENGE # 1

/*

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶
")

4. Run the function for both test datasets
*/

/*

Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

*/

/*
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const dogsJuliaFixed = dogsJulia.slice(1, -2);

const dogsJulia1 = [9, 16, 6, 8, 3];
const dogsKate1 = [10, 5, 6, 1, 4];

const dogsJuliaFixed1 = dogsJulia1.slice(1, -2);

const checkDogs = function (arr1, arr2) {
  const fullData = arr1.concat(arr2);

  fullData.forEach(function (val, i) {
    if (val >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${val} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs(dogsJuliaFixed, dogsKate);
console.log('---Data 1 Above ------------- Data 2 Below-----');
checkDogs(dogsJuliaFixed1, dogsKate1);
*/

//////////////// MAP, FILTER AND REDUCE

// Map:
// Returns a NEW ARRAY containing the results of applying an operation on all original array elements.

// Filter:
// Returns a NEW ARRAY containing the array elements that passed a specified test condition.

// Reduce:
// Boils ('reduces') all array elements down to one single value.
// (e.g. adding all elements together), (multiplying), (etc)
// No new array in this case, but just the single reduced value.

/////////////////////////// MAP METHOD //////////////////

/*
// Returns an entire NEW ARRAY. Unlike forEach()

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// More inline with functional programming
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// Less inline with functional programming
const movementsUSDFor = [];
for (const mov of movements) {
  movementsUSDFor.push(mov * eurToUsd);
}
console.log(movementsUSDFor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
*/
///

/////////////////////// FILTER METHOD

/*
// Used to filter through elements to find a certain condition

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const withdrawals = movements.filter(mov => mov < 0);

console.log(movements);
console.log(deposits);
console.log(withdrawals);

// same thing with for( of )
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
*/

/////////////////////// REDUCE
/*
// Accumulator is like a snowball

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// manually with a for loop
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// Maximum value of the movements array

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);

console.log(max);
*/

///////////////// CODING CHALLENGE #2
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.

Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)

4. Run the function for both test datasets
Test data:

§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

/*
const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogAge2 = [16, 6, 10, 5, 6, 1, 4];

const humanAge = dogAge1.map(dog => (dog <= 2 ? dog * 2 : dog * 4 + 16));
console.log(humanAge);

const adultDogs = humanAge.filter(age => age >= 18);
console.log(adultDogs);

const dogAvgAge = adultDogs.reduce(
  (acc, age, i, arr) => (acc + age) / arr.length,
  0
);
console.log(dogAvgAge);

const calcAverageHumanAge = function (ages) {};
*/

///////////// THE MAGIC OF CHAINING METHODS
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

// PIPELINE (metaphor)... How to inspect the current array at any point of the pipeline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/

////////////////// CODING CHALLENGE #3
/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!

Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

/*
const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogAge2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = ages =>
  ages
    .map(dog => (dog <= 2 ? dog * 2 : dog * 4 + 16))
    .filter((dog, i, arr) => dog >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge(dogAge1));
console.log(calcAverageHumanAge(dogAge2));
*/

////////////////////// FIND METHOD
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Just like filter(), the find() needs a boolean
// returns the first value that fulfills the conditions
// filter() returns a new array, find() only returns the value.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);
*/

/*
//////////////// SOME AND EVERY

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

// Checks for equility
console.log(movements.includes(-130));

// Some

// Unlike includes(), some() can have a condition instead of just a value.
// Checks for condition
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// Every
// every() only returns true if all the elements in the array satisfy the condition that we pass in.

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate Callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////// FLAT AND FLATMAP

// flat() combines nested arrays into a single array.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

// flat() method only goes one level deep when flattening the array. You can specify the depth of the nesting to fix that.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovement = accountMovements.flat();
// console.log(allMovement);
// const overallBalance = allMovement.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// FLATMAP
// flatMap() was created because you usually have to map() before you flat() so it's more simple to use flatMap()
// flatMap() only goes one level deep, you can not specify the depth of the nested arrays. If they are more than one level of nesting, you will have to use flat()

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);
*/
