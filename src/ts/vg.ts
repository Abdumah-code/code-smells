/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
// export enum Sort {
//   PRICE_ASCENDING = "Stigande pris",
//   PRICE_DECENDING = "Sjunkande pris",
//   NAME_ALPHABETIC = "Alfabetisk ordning",
//   NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
// }

// export class Product {
//   constructor(
//     public id: number,
//     public name: string,
//     public imageUrl: string[],
//     public price: number,
//     public description: string
//   ) {
//     this.id = id;
//     this.name = name;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }
// }

// export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
//   let copiedList: Product[] = [];
//   products.forEach((product) => copiedList.push(product));

//   let sortedList: Product[] = [];
//   if (sort === Sort.PRICE_ASCENDING) {
//     sortedList = sortList("Price", copiedList);
//     sortedList.reverse();
//   } else if (sort === Sort.PRICE_DECENDING) {
//     sortedList = sortList("Price", copiedList);
//   } else if (sort === Sort.NAME_ALPHABETIC) {
//     sortedList = sortList("Name", copiedList);
//   } else if (sort === Sort.NAME_ALPHABETIC_REVERSE) {
//     sortedList = sortList("Name", copiedList);
//     sortedList.reverse();
//   }

//   return sortedList;
// }

// function sortList(whichAttribute: string, products: Product[]): Product[] {
//   return products.sort((p1, p2) => {
//     if (whichAttribute === "Price") {
//       if (p1.price < p2.price) {
//         return 1;
//       } else if (p1.price > p2.price) {
//         return -1;
//       }
//       return 0;
//     } else {
//       if (p1.name < p2.name) {
//         return 1;
//       } else if (p1.name > p2.name) {
//         return -1;
//       }
//       return 0;
//     }
//   });
// }

/* delar i flera functioner för det blir enklare att läsa och förstå/tetsa senare med. 
tog bort alla duplicerad kod också självklart istället för att ha copiedlist så att
sortedlist nu skapas genom att kopiera products. ändrare variebel namn självklart och typer så finns det inga
magic strings. adderar erro behandling. adderar products för det fann sinte i og koden. */

interface Product {
  name: string;
  price: number;
}

enum Sort {
  PriceAscending,
  PriceDescending,
  NameAlphabetic,
  NameAlphabeticReverse,
}

function compareProductsByPriceAscending(a: Product, b: Product): number {
  return a.price - b.price;
}

function compareProductsByPriceDescending(a: Product, b: Product): number {
  return b.price - a.price;
}

function compareProductsByNameAlphabetic(a: Product, b: Product): number {
  return a.name.localeCompare(b.name);
}

function compareProductsByNameAlphabeticReverse(a: Product, b: Product): number {
  return b.name.localeCompare(a.name);
}

function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  let sortedList: Product[] = [];

  switch (sort) {
    case Sort.PriceAscending:
      sortedList = [...products].sort(compareProductsByPriceAscending);
      break;
    case Sort.PriceDescending:
      sortedList = [...products].sort(compareProductsByPriceDescending);
      break;
    case Sort.NameAlphabetic:
      sortedList = [...products].sort(compareProductsByNameAlphabetic);
      break;
    case Sort.NameAlphabeticReverse:
      sortedList = [...products].sort(compareProductsByNameAlphabeticReverse);
      break;
    default:
      throw new Error(`Invalid sort option: ${sort}`);
  }

  return sortedList;
}



/*
  2. Refaktorera funktionen createProductHtml :)
  */
// class Cart {
//   addToCart(i: number) {}
// }
// export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
// export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

// export function createProductHtml() {
//   let quantity = 0;
//   for (let i = 0; i < cartList.length; i++) {
//     quantity += cartList[i].quantity;
//   }
//   let floatingCart = document.getElementById(
//     "floatingcartnumber"
//   ) as HTMLElement;
//   floatingCart.innerHTML = "" + quantity;

//   for (let i = 0; i < productList.length; i++) {
//     let dogproduct: HTMLDivElement = document.createElement("div");
//     let dogImgContainer: HTMLDivElement = document.createElement("div");
//     dogImgContainer.className = "dogimgcontainer";
//     dogproduct.appendChild(dogImgContainer);
//     let dogImg: HTMLImageElement = document.createElement("img");

//     dogImg.src = productList[i].picture;
//     dogImg.alt = productList[i].pictureAlt;

//     dogImg.addEventListener("mouseover", () => {
//       cartSymbolContainer.classList.add("hover");
//       dogImg.classList.add("hover");
//     });

//     dogImg.addEventListener("mouseout", () => {
//       dogImg.classList.remove("hover");
//       cartSymbolContainer.classList.remove("hover");
//     });

//     dogImgContainer.appendChild(dogImg);
//     let cartSymbolContainer: HTMLDivElement = document.createElement("div");
//     cartSymbolContainer.className = "cartSymbolContainer";
//     dogImgContainer.appendChild(cartSymbolContainer);

//     let cartSymbol: HTMLElement = document.createElement("i");
//     cartSymbol.className = "bi bi-bag-plus";
//     cartSymbolContainer.appendChild(cartSymbol);

//     let name: HTMLHeadingElement = document.createElement("h5");
//     name.innerHTML = productList[i].name;
//     dogproduct.appendChild(name);

//     let price: HTMLHeadingElement = document.createElement("p");
//     price.innerHTML = "$" + productList[i].price;
//     dogproduct.appendChild(price);

//     let info: HTMLHeadingElement = document.createElement("p");
//     info.innerHTML = productList[i].info;
//     dogproduct.appendChild(info);

//     productList[i].productSpec = false;

//     dogImg.addEventListener("click", () => {
//       productList[i].productSpec = !productList[i].productSpec;
//       window.location.href = "product-spec.html#backArrow";
//       let listastext = JSON.stringify(productList);
//       localStorage.setItem("savedList", listastext);
//     });

//     cartSymbol.addEventListener("click", () => {
//       let cart = new Cart();
//       cart.addToCart(i);
//     });

//     if (productList[i].category === "sassy") {
//       let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
//       dogproduct.className = "dogproduct";
//       cat1.appendChild(dogproduct);
//     }
//     if (productList[i].category === "kriminella") {
//       let cat2: HTMLElement = document.getElementById(
//         "kriminella"
//       ) as HTMLElement;
//       dogproduct.className = "dogproduct";
//       cat2.appendChild(dogproduct);
//     }
//     if (productList[i].category == "singlar") {
//       let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
//       dogproduct.className = "dogproduct";
//       cat3.appendChild(dogproduct);
//     }
//     if (productList[i].category === "puppy") {
//       let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
//       dogproduct.className = "dogproduct";
//       cat4.appendChild(dogproduct);
//     }
//     if (productList[i].category === "oldies") {
//       let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
//       dogproduct.className = "dogproduct";
//       cat5.appendChild(dogproduct);
//     }
//   }
//   let listastext = JSON.stringify(productList);
//   localStorage.setItem("savedList", listastext);
//   sessionStorage.clear();
// }

/* gör om koden som updaterar the cart så att den inte behöver dupliceras.
ändrar til en foreach loop iställer för for för att göra koden mer enklare att förstå.
ändrare variebel namn som vanligt. 
tar bort all kod som inte behövs egentligen som roducspec som inte används i försat function.
tog bort all kod som inte behövs för html elemnter med och nu är det mindre kod som finns.*/

function createProductHtml() {
  const cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
  const productList = JSON.parse(localStorage.getItem("savedList") || "[]");

  const quantity = cartList.reduce((total, item) => total + item.quantity, 0);
  const floatingCart = document.getElementById("floatingcartnumber") as HTMLElement;
  floatingCart.textContent = quantity.toString();

  const productContainer = document.getElementById("product-container");
  productList.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image-container";
    const image = document.createElement("img");
    image.src = product.picture;
    image.alt = product.pictureAlt;
    image.addEventListener("mouseover", () => card.classList.add("hover"));
    image.addEventListener("mouseout", () => card.classList.remove("hover"));
    image.addEventListener("click", () => {
      product.productSpec = !product.productSpec;
      window.location.href = "product-spec.html#backArrow";
      localStorage.setItem("savedList", JSON.stringify(productList));
    });
    imageContainer.appendChild(image);

    const cartIconContainer = document.createElement("div");
    cartIconContainer.className = "cart-icon-container";
    const cartIcon = document.createElement("i");
    cartIcon.className = "bi bi-bag-plus";
    cartIcon.addEventListener("click", () => {
      const cart = new Cart();
      cart.addToCart(productList.indexOf(product));
    });
    cartIconContainer.appendChild(cartIcon);
    imageContainer.appendChild(cartIconContainer);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "product-details-container";
    const name = document.createElement("h5");
    name.textContent = product.name;
    detailsContainer.appendChild(name);
    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    detailsContainer.appendChild(price);
    const info = document.createElement("p");
    info.textContent = product.info;
    detailsContainer.appendChild(info);

    card.appendChild(imageContainer);
    card.appendChild(detailsContainer);
    productContainer.appendChild(card);
  });

  localStorage.setItem("savedList", JSON.stringify(productList));
  sessionStorage.clear();
}


/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage() {
  let container = document.getElementById("checkout-table");

  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let astext: CartProduct[] = JSON.parse(fromstorage);

  let productcontainer = document.getElementById(
    "product-ckeckout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < astext.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = astext[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + astext[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < astext.length; i++) {
    addition += astext[i].price *= astext[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
