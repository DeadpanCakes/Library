/*
Write a webpage that allows users to input book data to keep track of books they have read and intend to read. The page should display a "card" for each 
submitted book. The card should display the book title, author, page count, and whether or not they have read the book. The cards should also have some
sort of interface allowing the user to change its read status. The page should have a NEW BOOK button that allows the user to sumbit new books as well.

Interface? A simple top-down list of cards. There is a button at the top of the page that lowers a header with a form to submit new information. The form
should have fields for Title, Author, Page Count, radial buttons for read status, and a submit button. Pressing the "NEW BOOK" button again will hide the form
again, also removing any information that might have been input. Each card should have a button to toggle read status, and also some sort of color indicator
to tell its read status at a glance.

Input? The input will be three text fields that accept strings, a radial menu, and a submission button. Each card will also have a button to toggle read
status.

Output? The form inputs will submit the form, instantiating a new object which will contain all of the relevant information, ultimately storing the object in
an array. After this, the array will be looped through, generating div elements displaying all the relevant information by accessing each object and their
properties. These divs will then be appended on to the page in order.

form validation

clear fields upon submit

newBook should change in content depending on formProcesses.formShowing

test obj:""
let karamazov = new Book("The Brothers Karamazov","Fyodor Dostoevsky","840","Read");
let warAndPeace = new Book("War And Peace", "Leo Tolstoy", "1225", "Reading");
*/

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDoc } from "firebase/firestore";
const fireBase = initializeApp({
  apiKey: "AIzaSyBgm37ckHS83RUfvHUrPpuXNT9-PHc1578",
  authDomain: "library-a7ff2.firebaseapp.com",
  projectId: "library-a7ff2",
  storageBucket: "library-a7ff2.appspot.com",
  messagingSenderId: "405656357801",
  appId: "1:405656357801:web:a4c7afd131710a4e5012b8",
});

class Book {
  constructor(title, author, pgCount, status) {
    (this.title = title),
      (this.author = author),
      (this.pgCount = pgCount),
      (this.printInfo = () => title + " by " + author + ", " + pgCount + "pgs"),
      (this.status = status),
      (this.toggleStatus = () => {
        if (this.status === "Unread") {
          this.status = "Reading";
        } else if (this.status === "Reading") {
          this.status = "Read";
        } else {
          this.status = "Unread";
        }
      });
  }
}

const karamazov = new Book(
  "The Brothers Karamazov",
  "Fyodor Dostoevsky",
  840,
  "Read"
);
const warAndPeace = new Book("War And Peace", "Leo Tolstoy", 1225, "Reading");
const solitude = new Book(
  "100 Years Of Solitude",
  "Gabriel Garcia Marquez",
  448,
  "Unread"
);

let bookShelfArr = [karamazov, warAndPeace, solitude];
const content = document.getElementById("content");

const formProceses = (() => {
  let formShowing = true;
  const toggleFormShowing = () =>
    formShowing ? (formShowing = false) : (formShowing = true);

  const formContainer = document.getElementById("formContainer");
  const bookForm = document.getElementById("bookForm");
  const submitBtn = document.getElementById("submitBtn");
  const bookTitle = document.getElementById("bookTitle");
  const bookAuthor = document.getElementById("bookAuthor");
  const bookPages = document.getElementById("bookPages");
  const statusRadios = document.querySelectorAll(".statusRadio");
  const findChecked = (radios) => {
    let checked;
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        checked = radios[i].labels[0].textContent;
      }
    }
    return checked;
  };

  const newBook = document.getElementById("newBook");
  newBook.addEventListener("click", () => {
    if (formShowing) {
      anim.shiftElementRight(formContainer);
      toggleFormShowing();
    } else {
      anim.shiftElementLeft(formContainer);
      toggleFormShowing();
    }
  });

  submitBtn.addEventListener("click", (e) => {
    //validation
    // if (form.children.every = valid) {
    e.preventDefault();
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const status = findChecked(statusRadios);
    bookShelfArr.push(new Book(title, author, pages, status));
    cardProcesses.addCard(bookShelfArr[bookShelfArr.length - 1]);
    anim.showNewElement(content.lastElementChild);
    anim.shiftElementRight(formContainer);
    toggleFormShowing();
    bookForm.reset();
    //} else {
    //makePopup()
    //}
  });
})();

const cardProcesses = (() => {
  const makeLi = () => document.createElement("li");
  const makeH1 = () => document.createElement("h1");
  const makeBtn = () => document.createElement("button");
  const makeDiv = () => document.createElement("div");

  const makeCard = (obj) => {
    let li = makeLi();
    li.classList.add("card");

    let delBtn = makeBtn();
    delBtn.classList.add("delBtn");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", (e) => {
      if (!anim.getAnimPlaying()) {
        anim.toggleAnim();
        const index = checkCard(e);
        const childNodes = Array.from(content.childNodes);
        anim.animateDeletion(childNodes, index);
        setTimeout(() => {
          bookShelfArr = delCard(index);
          renderShelf(bookShelfArr);
          anim.toggleAnim();
        }, 500);
      }
    });

    let h1 = makeH1();
    h1.textContent = obj.printInfo();
    h1.classList.add("info");

    let toggleBtn = makeBtn();
    toggleBtn.classList.add("toggleBtns");
    toggleBtn.textContent = obj.status;
    toggleBtn.addEventListener("click", () => {
      obj.toggleStatus();
      renderShelf(bookShelfArr);
    });

    let div = makeDiv();
    div.classList.add("statusColor");
    div.style.backgroundColor = determineColor(obj.status);
    li.appendChild(delBtn);
    li.appendChild(h1);
    li.appendChild(toggleBtn);
    li.appendChild(div);
    return li;
  };

  const checkCard = (e) => {
    const card = e.target.parentElement;
    const arr = Array.from(content.childNodes);
    return arr.indexOf(card);
  };

  const delCard = (index) => {
    const booksBefore = bookShelfArr.slice(0, index);
    const booksAfter = bookShelfArr.slice(index + 1);
    return booksBefore.concat(booksAfter);
  };

  const determineColor = (status) => {
    switch (status) {
      case "Read":
        return "#231651";
      case "Reading":
        return "#2374AB";
      case "Unread":
        return "#4DCCBD";
    }
  };

  const initShelf = () => {
    if (!!content.childElementCount) {
      for (let i = 0, length = content.childNodes.length; i < length; i++) {
        content.removeChild(content.lastElementChild);
      }
    }
  };

  const addCard = (book) => {
    const card = makeCard(book);
    card.style.opacity = 0;
    content.appendChild(card);
  };

  const renderShelf = (shelfArr) => {
    initShelf();
    for (let i = 0; i < shelfArr.length; i++) {
      content.appendChild(makeCard(shelfArr[i]));
    }
  };

  return { initShelf, addCard, renderShelf };
})();

const anim = (() => {
  let animPlaying = false;
  const getAnimPlaying = () => animPlaying;
  const toggleAnim = () =>
    animPlaying ? (animPlaying = false) : (animPlaying = true);

  const shiftElementUp = (element) => {
    element.animate(
      [
        { transform: "translate(0,0)", offset: 0 },
        { transform: "translate(0,-100%)", offset: 1 },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
  };
  const shiftElementRight = (element) => {
    element.animate(
      [
        { transform: "translate(0,0)", offset: 0 },
        { transform: "translate(100%,0%)", offset: 1 },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
  };
  const shiftElementLeft = (element) => {
    element.animate(
      [
        { transform: "translate(100%,0)", offset: 0 },
        { transform: "translate(0%,0%)", offset: 1 },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
  };
  const hideElement = (element) => {
    element.animate(
      [
        { opacity: 1, offset: 0 },
        { opacity: 0, offset: 1 },
      ],
      {
        duration: 500,
        easing: "linear",
        fill: "forwards",
      }
    );
  };
  const showNewElement = (element) => {
    element.animate(
      [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: 1 },
      ],
      {
        duration: 500,
        easing: "linear",
        fill: "forwards",
      }
    );
    console.log("Running on: " + element);
  };
  const animateDeletion = (nodeList, index) => {
    hideElement(nodeList[index]);
    for (let i = index + 1; i < nodeList.length; i++) {
      shiftElementUp(nodeList[i]);
    }
  };
  return {
    getAnimPlaying,
    toggleAnim,
    shiftElementUp,
    shiftElementRight,
    shiftElementLeft,
    hideElement,
    showNewElement,
    animateDeletion,
  };
})();

cardProcesses.renderShelf(bookShelfArr);
