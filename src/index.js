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
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import form from "./elements/form";
import formContainer from "./elements/formContainer";
import newBookBtn from "./elements/newBookBtn";
import radioContainer from "./elements/radioContainer";

const firebase = initializeApp({
  apiKey: "AIzaSyBgm37ckHS83RUfvHUrPpuXNT9-PHc1578",
  authDomain: "library-a7ff2.firebaseapp.com",
  projectId: "library-a7ff2",
  storageBucket: "library-a7ff2.appspot.com",
  messagingSenderId: "405656357801",
  appId: "1:405656357801:web:a4c7afd131710a4e5012b8",
});
const db = getFirestore(firebase);

const fetchShelf = () => {
  onSnapshot(collection(db, "shelf"), async (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "removed") {
      } else if (change.type === "added") {
        const { title, author, pgCount, status } = change.doc;
        const newBook = bookFactory(title, author, pgCount, status);
        cardProcesses.renderBook(newBook);
      } else {
        console.log("modify target id");
      }
    });
    cardProcesses.initShelf();
    displayShelf();
  });
};
fetchShelf();

const getShelf = async (db) => {
  const shelfCol = collection(db, "shelf");
  const shelfSnapshot = await getDocs(shelfCol);
  const shelfData = shelfSnapshot.docs.map((doc) => {
    const { title, author, pgCount, status } = doc.data();
    return bookFactory(doc.id, title, author, pgCount, status);
  });
  return shelfData;
};

const displayShelf = async () => {
  const shelf = await getShelf(db);
  cardProcesses.renderShelf(shelf);
};

displayShelf();

const addBookToDB = async (book) => {
  try {
    await addDoc(collection(getFirestore(firebase), "shelf"), { ...book });
    console.log(`${book.title} added to shelf`);
  } catch (error) {
    console.error("Error adding book to shelf", error);
  }
};

const removeBookFromDB = async (id) => {
  try {
    const docRef = doc(db, "shelf", id);
    const docSnapshot = await getDoc(docRef);
    const bookTitle = docSnapshot.data().title;
    deleteDoc(docRef);
    console.log(`${bookTitle} removed from database`);
  } catch (error) {
    console.error("Error removing book from shelf", error);
  }
};

//Static DOM
const root = document.getElementById("root");
root.appendChild(formContainer);
root.appendChild(newBookBtn);

const content = document.getElementById("content");

const bookFactory = (id, title, author, pgCount, status) => {
  return {
    id,
    title,
    author,
    pgCount,
    status,
  };
};

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
    return Array.from(radios).find((radio) => radio.checked).value;
  };

  newBookBtn.addEventListener("click", () => {
    if (formShowing) {
      //hide
      toggleFormShowing();
    } else {
      //display
      toggleFormShowing();
    }
  });

  form.addEventListener("submit", (e) => {
    //validation
    // if (form.children.every = valid) {
    e.preventDefault();
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pgCount = bookPages.value;
    const status = findChecked(statusRadios);
    const book = { title, author, pgCount, status };
    addBookToDB(book);
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
      removeBookFromDB(obj.id);
    });

    const contentDiv = makeDiv();
    contentDiv.classList.add("info");

    const p = document.createElement("p");
    p.textContent = `ID: ${obj.id}`;
    p.classList.add("bookIDs");

    let h1 = makeH1();
    h1.textContent =
      obj.title + " by " + obj.author + ", " + obj.pgCount + "pgs";
    h1.classList.add("bookTitles");

    let toggleBtn = makeBtn();
    toggleBtn.classList.add("toggleBtns");
    toggleBtn.textContent = obj.status;
    toggleBtn.addEventListener("click", () => {
      //change status in db
      renderShelf(bookShelfArr);
    });

    let div = makeDiv();
    div.classList.add("statusColor");
    div.style.backgroundColor = determineColor(obj.status);
    li.appendChild(delBtn);
    contentDiv.appendChild(p);
    contentDiv.appendChild(h1);
    li.appendChild(contentDiv);
    li.appendChild(toggleBtn);
    li.appendChild(div);
    return li;
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
    content.appendChild(card);
  };

  const renderBook = (book) => {
    const newCard = makeCard(book);
    content.appendChild(newCard);
  };

  const renderShelf = (shelfArr) => {
    initShelf();
    shelfArr.forEach((book) => {
      renderBook(book);
    });
  };

  return { initShelf, addCard, renderBook, renderShelf };
})();
