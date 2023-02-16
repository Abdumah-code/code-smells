/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
*/

// function getLength(jumpings: number[]): number {
//   let totalNumber = 0;

//   totalNumber = jumpings.reduce(
//     (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
//   );

//   return totalNumber;
// }

/* ändrade let till const för att let är för saker som ska modiferas och det vill vi inte,
istället så är det const för det är bara ett nummer vi ska få tillbaak varje gång.
ändrar Variabelnamn till totalDistance för att it makes sense, vi håller på räkna sträcka efter fumpings.
lägger till en lite error för det ska vara bara siffror i en array.
skrev om hela functionen med så att det är enklare att läsa.*/

function getLength(jumpings: number[]): number {
  const totalDistance = jumpings.reduce((acc, curr) => acc + curr, 0);
  return totalDistance;
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

// function getStudentStatus(student: Student): string {
//   student.passed =
//     student.name == "Sebastian"
//       ? student.handedInOnTime
//         ? true
//         : false
//       : false;

//   if (student.passed) {
//     return "VG";
//   } else {
//     return "IG";
//   }
// }

/*den dära första delen av functionen är extrem förvirrande haha,
iaf jag skrev om functionen så att man direkt får se att vad kan retuners till the user.
ändrar till consts och gör det lite enklare att läsa med men basicallly rörde ej id statement. */

function getStudentStatus(student: Student): "VG" | "IG" {
  const isSebastian = student.name === "Sebastian";
  const isOnTime = student.handedInOnTime;

  if (isSebastian && isOnTime){
    return "VG";
  }else{
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
*/

class Temp {
  constructor(public q: string, public where: Date, public v: number) {}
}

// function averageWeeklyTemperature(heights: Temp[]) {
//   let r = 0;

//   for (let who = 0; who < heights.length; who++) {
//     if (heights[who].q === "Stockholm") {
//       if (heights[who].where.getTime() > Date.now() - 604800000) {
//         r += heights[who].v;
//       }
//     }
//   }

//   return r / 7;
// }

/* ändrar main variabelnamn till temperaturer för att heights makes no sense
och försökte göra om alla magic numbers till normala variabler eller insode variabler.
tog bort hela for loop för det bara gjorde koden mer krånglig
*/

function averageWeeklyTemperature(temperatures: Temp[]): number {
  const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000; // 604800000 ms

  const relevantTemperatures = temperatures.filter(
    (temp) =>
      temp.q === "Stockholm" && temp.where.getTime() > Date.now() - ONE_WEEK_IN_MILLISECONDS
  );

  const sumOfTemperatures = relevantTemperatures.reduce(
    (sum, temp) => sum + temp.v,
    0
  );

  const averageTemperature = sumOfTemperatures / relevantTemperatures.length;
  return averageTemperature;
}


/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
*/

function showProduct(
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pris = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = name;
  pris.innerHTML = price.toString();
  imageTag.src = image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pris);
  parent.appendChild(container);
}

/* behövde göra om den till två functioner så är det enklare att fixa den om nåt går fel,
tog bort lite saker som inte ens används i og functionen. använder textcontent istället för 
innehhtml för att det är mer vänligt. */

function createProductElement(
  name: string,
  price: number,
  description: string,
  image: string
): HTMLDivElement {
  const container = document.createElement("div");
  const title = document.createElement("h4");
  const priceTag = document.createElement("strong");
  const imageTag = document.createElement("img");

  title.textContent = name;
  priceTag.textContent = price.toString();
  imageTag.src = image;
  imageTag.alt = name;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(priceTag);

  return container;
}

function displayProductElement(
  element: HTMLDivElement,
  parent: HTMLElement
): void {
  parent.appendChild(element);
}

//detta är exempel användning
const productContainer = document.querySelector<HTMLElement>("#product-container");
if (productContainer) {
  const product = createProductElement(
    "Product Name",
    9.99,
    "Product description",
    "https://example.com/product.jpg"
  );
  displayProductElement(product, productContainer);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
*/
// function presentStudents(students: Student[]) {
//   for (const student of students) {
//     if (student.handedInOnTime) {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = true;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#passedstudents");
//       listOfStudents?.appendChild(container);
//     } else {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = false;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#failedstudents");
//       listOfStudents?.appendChild(container);
//     }
//   }
// }

/* behövde dela i fyra functioner så att det blir bäst, det blev mer kod men jag hoppas att det blir okej för nu finnd det mindre repetition. 
ändrade variabel nan som vanligt, sepparerade allt så att det blir enkalre att läsa och fixa om nåt går fel.
*/

function createStudentCheckbox(
  handedInOnTime: boolean
): HTMLInputElement {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = handedInOnTime;
  return checkbox;
}

function addStudentCheckboxToContainer(
  checkbox: HTMLInputElement,
  container: HTMLElement
): void {
  container.appendChild(checkbox);
}

function addStudentContainerToList(
  container: HTMLElement,
  listId: string
): void {
  const list = document.querySelector<HTMLElement>(`#${listId}`);
  if (list) {
    list.appendChild(container);
  }
}

function presentStudents(students: Student[]): void {
  for (const student of students) {
    const checkbox = createStudentCheckbox(student.handedInOnTime);
    const container = document.createElement("div");
    addStudentCheckboxToContainer(checkbox, container);

    if (student.handedInOnTime) {
      addStudentContainerToList(container, "passedstudents");
    } else {
      addStudentContainerToList(container, "failedstudents");
    }
  }
}

// exempel användning
const students: Student[] = [
  new Student("Alice", true, true),
  new Student("Bob", false, false),
];
presentStudents(students);


/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
*/
// function concatenateStrings() {
//   let result = "";
//   result += "Lorem";
//   result += "ipsum";
//   result += "dolor";
//   result += "sit";
//   result += "amet";

//   return result;
// }

/* tog bort result för det behövs ej, liturly tomt, skapar en array,
och använder join föra tt lösa problemet enklare */

function concatenateStrings(): string {
  const strings = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return strings.join("");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
lösning som är hållbar och skalar bättre. 
*/
// function createUser(
//   name: string,
//   birthday: Date,
//   email: string,
//   password: string
// ) {
//   // Validation

//   let ageDiff = Date.now() - birthday.getTime();
//   let ageDate = new Date(ageDiff);
//   let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

//   console.log(userAge);

//   if (!(userAge < 20)) {
//     // Logik för att skapa en användare
//   } else {
//     return "Du är under 20 år";
//   }
// }

/* delar upp i 2 functioner så att det är mer futureproof kan man säga, 
läger info i en interface självklart, adderade returns så att man fattar bättre,
ändrar variebelnamn som vanligt. samma med magec numbers.*/

interface User {
  name: string;
  birthday: Date;
  email: string;
  password: string;
  age: number;
}

function createUser(user: User): User | string {
  const ageInYears = calculateAgeInYears(user.birthday);
  if (ageInYears < 20) {
    return "Du är under 20 år";
  }
  return { ...user, age: ageInYears };
}

function calculateAgeInYears(birthday: Date): number {
  const ageDiff = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// exempel anvädning
const user: User = {
  name: "Alice",
  birthday: new Date("1990-01-01"),
  email: "alice@example.com",
  password: "password123",
};

const createdUser = createUser(user);
if (typeof createdUser === "string") {
  console.log(createdUser);
} else {
  console.log(createdUser);
}
