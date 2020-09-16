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
        List (unsure whether or not to order)
            list item
                div
                    h1>obj.printInfo()
                    obj.status
                    btn>Toggle Read
                    div>Background color (dependant on obj.status)
write a fn that changes the corrpesponding card's read status

write a fn that associates read statuses with particular colors
    switch(status) {
        case "Read":
            return "green";
        case "Reading":
            return "blue";
        case "Unread":
            return "red";
    }
    
write a form to accept all relevant information

write a fn to attach to a button that displays and hides the form

animate the displaying and hiding of the form
*/

const bookShelf = [];

function Book(title,author,pgCount,status) {
    this.title = title,
    this.author = author,
    this.pgCount = pgCount
    this.printInfo = () => title + " by " + author + ", " + pgCount + "pgs",
    this.status = status
}