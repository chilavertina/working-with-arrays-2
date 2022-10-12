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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const tenkovi = ['m84', 't72', 't90', 't72ms', 't55', 'abrams m1', 'leopard2'];
console.log(tenkovi);
// const tenk = tenkovi.join(' ');
// console.log(tenk);

// const prvoSlovo = function (rec) {
//   return rec.split(' ').map(word => word[0]);
// };

// console.log(prvoSlovo(tenk));
/*
tenkovi.forEach(function (tenk) {
  if (tenk.split(' ').map(word => word[0]) == 't') {
    console.log(`${tenk} je ruske proizvodnje`);
  } else {
    console.log(`${tenk} nije ruske proizvodnje`);
  }
});

tenkovi.forEach(function (tenk, i) {
  if (tenk.split(' ').map(word => word[0]) == 't') {
    console.log(`${tenk} pod brojem ${i + 1} je ruske proizvodnje`);
  } else {
    console.log(`${tenk} pod brojem ${i + 1} nije ruske proizvodnje`);
  }
});
*/

// const kateData = [4, 1, 15, 8, 3];
// const juliaData = [3, 5, 2, 12, 7];

// const kateData = [10, 5, 6, 1, 4];
// const juliaData = [9, 16, 6, 8, 3];
/*
const checkDogs = function (kateData, juliaData) {
  const juliaDataCopy = juliaData.slice();
  const juliaDataOnlyDogs = juliaDataCopy.slice(1, -2);
  const dogs = juliaDataOnlyDogs.concat(kateData);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else if (dog < 3) {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([4, 1, 15, 8, 3], [3, 5, 2, 12, 7]);
checkDogs([10, 5, 6, 1, 4], [9, 16, 6, 8, 3]);
*/

//////////////////////

/* MAP METODA
const juliaData = [3, 5, 2, 12, 7];

const kucici = juliaData.map(function (godina, i) {
  if (godina >= 3) {
    return `Pas pod rednim brojem ${
      i + 1
    } je odrastao pas i ima ${godina} godina.`;
  } else {
    return `Pas pod rednim brojem ${i + 1} je stene i ima ${godina} godine`;
  }
});
console.log(kucici);

const godine = [1993, 1965, 2022, 2005, 2003, 1975];

const vek = godine.map(
  (godina, i) =>
    `Godina ${godina}. koja je na rednom broju ${i + 1} pripada ${
      godina > 2000 ? '21.' : '20.'
    } veku.`
);
console.log(vek);

const godinaRodjenja = [1993, 1965, 1966, 2001, 1943, 1998, 2012];

const starost = godinaRodjenja.map(godina => 2022 - godina);
console.log(starost);
*/
