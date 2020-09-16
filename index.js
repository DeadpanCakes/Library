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

write constructor function to accept relevant input

write fn to push generated obj to an arr
bookShelf.push(new Book(formTitle, formAuthor, formPgCount))

write a fn to generate a 'card' based on an book object's values
    What will a card look like?
        List (unsure whether or not to order) id = "bookshelf"
            list item
                h1>obj.printInfo()
                obj.status
                btn>Toggle Read
                div>Background color (dependant on obj.status)
    In Javascript?
        const makeLi = () => document.createElement("li");
        const makeH1 = () => document.createElement("h1");
        const makeBtn = () => document.createElement("button");
        const makeDiv = () => document.createElement("div");
        const makeCard = obj => {
            let li = makeLi();
            let h1 = makeH1();
            h1.textContent = obj.printInfo();
            let btn = makeBtn();
            btn.textContent = obj.status;
            btn.addEventListener("click", e => {
                obj.toggleStatus();
                console.log(obj.status);
                console.log(obj.title);
            });
            let div = makeDiv();
            div.style.backgroundColor = determineColor(obj.status)
            li.appendChild(h1);
            li.appendChild(btn);
            li.appendChild(div);
            return li;
        } 

write a fn to discern which card a button press corresponds to
const checkCard = (event) =>  {
    let card = event.parentElement.parentElement
    index = bookShelf.childNodes.indexOf(card)
    bookshelfArr[index].toggleStatus();
}

write a fn that changes the corrpesponding card's read status
const = (obj) => obj.toggleStatus

write a fn that associates read statuses with particular colors
const determineColor = (status) => {
    switch(status) {
        case "Read":
            return "green";
        case "Reading":
            return "blue";
        case "Unread":
            return "red";
    }
}

write a form to accept all relevant information
form
    label for = "title"> Title
    input id = "title" type = text
    label for = "author"> Author
    input id = "author" type = text
    label for = "pages"> Pages
    input id = "pages" type = numeber min = 1 max = 9,999
    input id = "read" type = radio
    label for = "read"> Read
    input id = "unread" type = radio
    label for = "unread"> Unread

write a fn to attach to a button that displays and hides the form
const = toggleForm => (element) {
    if (!!element.classList[0]) {
        element.classList.remove("animateShow");
    } else {
        element.classList.add("animateShow");
    }
}

write a fn to initialize #bookshelf
const init = () => {
    let x = bookshelf.childNodes.length
    for (let i=0;i<x;i++) {
        bookshelf.removeChild(bookshelf.lastElementChild)
    }
}

write a fn to populate bookshelf with cards
const populateShelf = (shelf) => {
    for (let i = 0;i<shelf.length,i++) {
        document.getElementById("bookshelf").appendChild(makeCard(shelf[i]);
    }
}
animate the displaying and hiding of the form

test obj:
let karamazov = new Book("The Brothers Karamazov","Dostoevsky","like 800","read");
let warAndPeace = new Book("War And Peace", "Tolstoy", "like 1000", "reading");
*/

const bookShelfArr = [];

function Book(title,author,pgCount,status) {
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