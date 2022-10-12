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

const prikaziTransakcije = function (transakcije) {
  containerMovements.innerHTML = ''; //ovo omogucava da obrisemo html podatke sa stranice koji se vec nalaze u html kodu na samom startu

  transakcije.forEach(function (trans, i) {
    const type = trans > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${trans}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

prikaziTransakcije(account1.movements);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//SPLICE brise elemente iz niza u rasponu koji napisemo (sto znaci da ova metoda mutate originalni niz)
console.log(arr.splice(2)); //iz niza su izbrisani c, d i e, u nizu su ostali samo a i b
//metoda se najcesce koristi kako bi se uklonio poslednji element u nizu

//REVERSE (i ova metoda mutate originalni niz (niz zadrzava promenu nakon metode))
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT spaja nizove
const letters = arr.concat(arr2);
console.log(letters);
const letters2 = arr2.concat(arr);
console.log(letters);
console.log([...arr, ...arr2]); //isto sto i concat

//JOIN pretvara niz u string
console.log(letters.join(' - '));
*/
/*
//AT metoda
const arr = [23, 54, 89];
console.log(arr.at(1));
//nacini kako izvuci poslednji element u nizu
console.log(arr.slice(-1)[0]);
console.log(arr[arr.length - 1]);
console.log(arr.at(-1));

//AT metoda radi i na stringovima
const str = 'uros';
console.log(str.at(1));
*/
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//raniji nacin
for (const transakcija of movements) {
  if (transakcija > 0) {
    console.log(`You deposited ${transakcija}$`);
  } else {
    console.log(`You withdrew ${Math.abs(transakcija)}$`);
  }
}

//FOR EACH
console.log('---------- FOR EACH -------------');

movements.forEach(function (transakcija) {
  if (transakcija > 0) {
    console.log(`You deposited ${transakcija}$`);
  } else {
    console.log(`You withdrew ${Math.abs(transakcija)}$`);
  }
});

//raniji nacin
for (const [i, transakcija] of movements.entries()) {
  if (transakcija > 0) {
    console.log(`Transakcija ${i + 1}: You deposited ${transakcija}$`);
  } else {
    console.log(`Transakcija ${i + 1}: You withdrew ${Math.abs(transakcija)}$`);
  }
}

console.log('------- FOR EACH ----------');
//FOR EACH

movements.forEach(function (transakcija, index, niz) {
  //ovde je redosled striktno bitan
  if (transakcija > 0) {
    console.log(`Transakcija ${index + 1}: You deposited ${transakcija}$`);
  } else {
    console.log(
      `Transakcija ${index + 1}: You withdrew ${Math.abs(transakcija)}$`
    );
  }
});
*/
/*
//FOR EACH MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//FOR EACH SET
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'GBP', 'USD']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

///MAP METODA - smesta podatke u novi niz

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const usdKurs = 120.7;

const usdMenjacnica = movements.map(function (svota) {
  return svota * usdKurs;
});

console.log(usdMenjacnica);

//drugi nacin uz pomoc for of

const menjacnica = [];
for (const svota of movements) {
  menjacnica.push(svota * usdKurs);
}
console.log(menjacnica);

//uz pomoc ARROW FUNKCIJE
const dolarUDinar = movements.map(svota => svota * usdKurs);
console.log(dolarUDinar);

///////////////////////////////////////////////////

const opisTransakcija = movements.map((svota, i, arr) => {
  if (svota > 0) {
    return `Transakcija ${i + 1}: Priliv ${Math.abs(svota)} dolara.`;
  } else if (svota < 0) {
    return `Odliv ${i + 1}: Odliv ${Math.abs(svota)} dolara.`;
  }
});
console.log(opisTransakcija);

/*
//uz pomoc ARROW FUNKCIJE
const opisTransakcija = movements.map(
  (svota, i) =>
    `Transakcija ${i + 1}: ${svota > 0 ? 'Priliv' : 'Odliv'} ${Math.abs(
      svota
    )} dolara.`
);
console.log(opisTransakcija);
*/
