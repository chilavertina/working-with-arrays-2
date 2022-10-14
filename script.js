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
          <div class="movements__value">${trans}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

prikaziTransakcije(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((akumul, vrednost) => akumul + vrednost, 0);
  labelBalance.textContent = `${balance} €`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const inSummary = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${inSummary}€`;

  const outSummary =
    movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0) * -1; //umesto mnozenja sa -1 moze se ispod napisati `${Math.abs(outSummary)}€`
  labelSumOut.textContent = `${outSummary}€`; //`${Math.abs(outSummary)}€` ako necemo da mnozimo sa -1

  const interestSummary = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * 1.2) / 100)
    .filter(mov => mov >= 1) //banka dodaje kamatu samo ako je ona veca ili jednaka 1
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interestSummary}€`;
};

calcDisplaySummary(account1.movements);

// const dolarUDinar = movements.map(svota => svota * usdKurs);
// console.log(dolarUDinar);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);
console.log(accounts);

/* moje resenje prikaza bilansa
const calcPrintBalance = function (vrednosti) {
  labelBalance.innerHTML = '';

  const balans = vrednosti.reduce(function (akumulator, vrednost, i, niz) {
    return akumulator + vrednost;
  }, 0);

  const html = `
    <p class="balance__value">${balans}€</p>
 `;
  labelBalance.insertAdjacentHTML('afterbegin', html);
};
calcPrintBalance(account1.movements);
*/
/////////// IZBOR PRVOG SLOVA U SVAKOM STRINGU

// const ime = 'Steven Thomas Williams';
/*
const inicijali = ime
  .toLowerCase()
  .split(' ')
  .map(function (rec) {
    return rec[0];
  })
  .join('');
console.log(inicijali);
*/
/*moje resenje
const inicijali = ime
  .toLowerCase()
  .split(' ')
  .map(rec => rec[0])
  .join('');
console.log(inicijali);
*/

/*moje resenje
const imeNiz = ime.split(' ');
console.log(imeNiz);
const inicijali = imeNiz.map(rec => rec[0]).join('');
console.log(inicijali);
const maliInicijali = inicijali.toLowerCase();
console.log(maliInicijali);
*/

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
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
/*
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
*/
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

/////////////////////////////////////////////

/*
//FILTER
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});

console.log(withdrawals);
//console.log(deposits);

//for of primer
const deposits2 = [];
for (const transakcija of movements) {
  if (transakcija > 0) deposits2.push(transakcija);
}
console.log(deposits2);
*/
/*
//REDUCE metoda - funkcionise kao grudva (moze da spaja sve vrednosti iz niza u jednu vrednost)

const balance = movements.reduce(function (akumulator, vrednost, i, niz) {
  return akumulator + vrednost;
}, 0); //0 je pocetna vrednost akumulatora
console.log(balance);

//arrow primer
const balance3 = movements.reduce(
  (akumulator, vrednost) => akumulator + vrednost,
  0
);
console.log(balance3);

//for of primer
let balance2 = 0;
for (const transakcija of movements) {
  balance2 = balance2 + transakcija;
}
console.log(balance2);

//maximum value
const max = movements.reduce((akumul, vrednost) => {
  if (akumul > vrednost) {
    return akumul;
  } else {
    return vrednost;
  }
}, movements[0]);
console.log(max);
*/

//////////// METODS CHAINING
/*
const ukupniDepozitUDinarima = movements
  .filter(vrednost => vrednost > 0) //vraca niz
  .map(vrednost => vrednost * usdKurs) //vraca niz
  .reduce((akum, vrednost) => vrednost + akum, 0); //vraca vrednost, zato mora biti poslednji u lancu
console.log(`${ukupniDepozitUDinarima} dinara`);
*/

/////////////// FIND metoda - vraca prvi element niza koji zadovoljava uslov metode

const prviOdliv = movements.find(mov => mov < 0);

console.log(movements);
console.log(prviOdliv);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// for of primer
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}
