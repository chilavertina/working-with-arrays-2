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

const prikaziTransakcije = function (transakcije, sort = false) {
  // sort je ovde false zato sto zelimo da se sort aktivira (da bude true) tek kada kliknemo na sort dugme
  containerMovements.innerHTML = ''; //ovo omogucava da obrisemo html podatke sa stranice koji se vec nalaze u html kodu na samom startu

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; //ovde koristimo slice() kako bismo sortirali kopiju, a ne originalni niz

  movs.forEach(function (trans, i) {
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

// prikaziTransakcije(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(
    (akumul, vrednost) => akumul + vrednost,
    0
  );
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const inSummary = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${inSummary}€`;

  const outSummary =
    acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0) *
    -1; //umesto mnozenja sa -1 moze se ispod napisati `${Math.abs(outSummary)}€`
  labelSumOut.textContent = `${outSummary}€`; //`${Math.abs(outSummary)}€` ako necemo da mnozimo sa -1

  const interestSummary = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1) //banka dodaje kamatu samo ako je ona veca ili jednaka 1
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interestSummary}€`;
};

// calcDisplaySummary(account1.movements);

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

const updateUI = function (acc) {
  // Display movements
  prikaziTransakcije(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

//////EVENT HANDLER
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //currentAccount?.pin ovo uz pomoc '?' proverava da li uneti account postoji
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur(); //blur sluzi da ne ostane fokus (linija koja treperi) u polju nakon unosa podataka i login-a

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
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  // const amount = Number(inputLoanAmount.value); --- mozemo amount da ubacimo u kod na svim mestima umesto 'Number(inputLoanAmount.value)'
  if (
    Number(inputLoanAmount.value) > 0 &&
    currentAccount.movements.some(
      mov => mov >= Number(inputLoanAmount.value * 0.1)
    )
  ) {
    currentAccount.movements.push(Number(inputLoanAmount.value));
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  prikaziTransakcije(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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
/*
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
*/
/*
////// SOME metoda
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

///// EVERY metoda svi elementi niza moraju da zadovolje uslov da bi bilo true
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//// izdvojena callback funkcija
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(account4.movements.every(deposit));
console.log(movements.every(deposit));

///// FLAT metoda
const arr = [[1, 2, 3], 4, 5, [6, 7, 8]];
console.log(arr.flat());
const deepArr = [[1, [2, 3]], 4, 5, [6, [7], 8]];
console.log(deepArr.flat()); //flat metoda ide do samo jednog nivoa 'nesting' nizova
console.log(deepArr.flat(2)); //ako ubacimo zeljeni nivo u funkciju flat-a, onda ce flat ici do zeljenog nivoa

///// primer vezivanja metoda
const accMovements = accounts.map(acc => acc.movements);
console.log(accMovements);
const ukupniBilansSvihKlijenata = accounts
  .map(acc => acc.movements) //izdvaja transakcije u zasebne nizove
  .flat() //sve nizove spaja u jedan niz
  .reduce((akum, vrednost) => akum + vrednost, 0); //sabira sve vrednosti u nizu
console.log(ukupniBilansSvihKlijenata);

/////// flatMap metoda
const ukupniBilansSvihKlijenata2 = accounts
  .flatMap(acc => acc.movements) // spaja map i flat metode u jednu metodu (ali ide samo do prvog nivo)
  .reduce((akum, vrednost) => akum + vrednost, 0);
console.log(ukupniBilansSvihKlijenata2);
*/
/*
/////// SORT metoda - metoda mutate originalni niz

/// stringovi primer
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //sort ce poredjati imena po abecednom redu, posto elemente uvek gleda kao STRINGOVE (isto ce biti i sa brojevima)
//sto znaci da ce broj 100 kao string biti uvek ispred 50, jer je 1 manji od 5
console.log(owners); // niz je mutated

// brojevi primer
console.log(movements);
console.log(movements.sort()); //ovde su brojevi u nizu poremeceni (1300 je vece od 200)

// nacin kako sortirati brojeve po rastucem nizu (ili opadajucem)
//return < 0, A,B (zadrzava se redosled)
//return > 0 B,A (menja se redosled)

//rastuci niz
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);

movements.sort((a, b) => a - b);
console.log(movements);

//opadajuci niz
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);
*/

///////////// EMPTY ARRAY + FILL METODA
const x = new Array(7); //ovaj nacin ce samo stvoriti niz sa sedam praznih mesta
console.log(x);
x.fill(1); // uz pomoc fill popunicemo ceo niz navedenom vrednoscu [1, 1, 1, 1, 1, 1, 1]
console.log(x);
const y = new Array(6);
y.fill(1, 3); // kada ubacimo dva parametra u funkciju fill, u ovom slucaju ce prva tri mesta u nizu ostati prazna,a ostala ce se popuniti vrednoscu broj 1
console.log(y);
const z = new Array(7);
z.fill(1, 3, 5); // ovde ce prva tri mesta ostati prazna, pa ce se niz popunjavati do 5. mesta, nakon cega ce dalje ostati prazan
console.log(z);
const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 4, 6); // ovde ce broj 23 biti ubacen izmedju 4. i 6. mesta u nizu i zamenice vrednosti u nizu na tim mestima
console.log(arr);

// Array.from metoda
const a = Array.from({ length: 7 }, () => 1); // popunjava se niz brojem jedan u duzini od 7 mesta
console.log(a);
const b = Array.from({ length: 7 }, (_, i) => i + 1); // popunjava se niz od 1 do 7
console.log(b); // _ oznacava da nam nije potrebna pocetna vrednost

const diceRoll = Array.from(
  { length: 100 },
  () => Math.floor(6 * Math.random()) + 1
);
console.log(diceRoll);

// ubacivanje vrednosti transakcija sa UI uz pomoc Array.from metode

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')) //ovo je map metoda kao drugi parametar
  );
  console.log(movementsUI);
});
