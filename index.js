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

write a fn to discern which card a button press corresponds to
const checkCard = (event) =>  {
    let card = event.parentElement.parentElement
    index = bookShelf.childNodes.indexOf(card)
    bookshelfArr[index].toggleStatus();
}


write a fn to attach to a button that displays and hides the form
const = toggleForm => (element) {
    if (!!element.classList[0]) {
        element.classList.remove("animateShow");
    } else {
        element.classList.add("animateShow");
    }
}

animate the displaying and hiding of the form

test obj:
let karamazov = new Book("The Brothers Karamazov","Fyodor Dostoevsky","840","Read");
let warAndPeace = new Book("War And Peace", "Leo Tolstoy", "1225", "Reading");
*/

const karamazov = new Book("The Brothers Karamazov", "Fyodor Dostoevsky", 840, "Read");
const warAndPeace = new Book("War And Peace", "Leo Tolstoy", 1225, "Reading");
const metamorphosis = new Book("The Metamorphosis", "Franz Kafka", 58, "Read");

let bookShelfArr = [karamazov, warAndPeace,metamorphosis];
const content = document.getElementById("content")

function Book(title, author, pgCount, status) {
    this.title = title,
        this.author = author,
        this.pgCount = pgCount,
        this.printInfo = () => title + " by " + author + ", " + pgCount + "pgs",
        this.status = status,
        this.toggleStatus = () => {
            if (this.status === "Unread") {
                this.status = "Reading"
            } else if (this.status === "Reading") {
                this.status = "Read";
            } else {
                this.status = "Unread";
            }
        }
}

const formProceses = (() => {
    const submitBtn = document.getElementById("submitBtn");
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");
    const bookPages = document.getElementById("bookPages");
    const statusRadios = document.querySelectorAll(".statusRadio");
    const findChecked = radios => {
        let checked
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                checked = radios[i].labels[0].textContent;
            }
        }
        return checked;
    }

    submitBtn.addEventListener("click", e => {
        e.preventDefault();
        const title = bookTitle.value;
        const author = bookAuthor.value;
        const pages = bookPages.value;
        const status = findChecked(statusRadios);
        bookShelfArr.push(new Book(title, author, pages, status));
        cardProcesses.renderShelf(bookShelfArr);
    });
})();

const cardProcesses = (() => {
    const makeLi = () => document.createElement("li");
    const makeH1 = () => document.createElement("h1");
    const makeBtn = () => document.createElement("button");
    const makeDiv = () => document.createElement("div");

    const makeCard = obj => {
        let li = makeLi();

        let delBtn = makeBtn();
        delBtn.textContent = "X"
        delBtn.addEventListener("click", e => {
                bookShelfArr = delCard(checkCard(e));
                renderShelf(bookShelfArr);
        });

        let h1 = makeH1();
        h1.textContent = obj.printInfo();

        let toggleBtn = makeBtn();
        toggleBtn.textContent = obj.status;
        toggleBtn.addEventListener("click", () => {
            obj.toggleStatus();
            renderShelf(bookShelfArr);
        });

        let div = makeDiv();
        div.classList.add("statusColor");
        div.style.backgroundColor = determineColor(obj.status)
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
        const booksBefore = bookShelfArr.slice(0,index);
        const booksAfter = bookShelfArr.slice(index+1);
        return booksBefore.concat(booksAfter);
    }

    const determineColor = (status) => {
        switch (status) {
            case "Read":
                return "green";
            case "Reading":
                return "blue";
            case "Unread":
                return "red";
        };
    };

    const initShelf = () => {
        if (!!content.childElementCount) {
            for (let i = 0, length=content.childNodes.length; i < length; i++) {
                content.removeChild(content.lastElementChild);
            };
        }
    };

    const renderShelf = (shelfArr) => {
        initShelf();
        for (let i = 0; i < shelfArr.length; i++) {
            content.appendChild(makeCard(shelfArr[i]));
        };
    };

    return { initShelf, renderShelf }
})();

cardProcesses.renderShelf(bookShelfArr);