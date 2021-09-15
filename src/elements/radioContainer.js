const container = document.createElement("div");
container.id = "radioFormDiv";

const makeLabel = () => document.createElement("label");
const makeInput = () => document.createElement("input");

const readLabel = makeLabel();
readLabel.textContent = "Read";
readLabel.for = "bookRead";
const bookRead = makeInput();
bookRead.type = "radio";
bookRead.name = "status";
bookRead.classList.add("statusRadio");
bookRead.id = "bookRead";
bookRead.required = true;
bookRead.value = "Read";
readLabel.appendChild(bookRead);

const readingLabel = makeLabel();
readingLabel.textContent = "Reading";
readingLabel.for = "bookReading";
const bookReading = makeInput();
bookReading.type = "radio";
bookReading.name = "status";
bookReading.classList.add("statusRadio");
bookReading.id = "bookReading";
bookReading.value = "Reading";
readingLabel.appendChild(bookReading);

const unreadLabel = makeLabel();
unreadLabel.textContent = "Not Started";
unreadLabel.for = "bookUnread";
const bookUnread = makeInput();
bookUnread.type = "radio";
bookUnread.name = "status";
bookUnread.classList.add("statusRadio");
bookUnread.id = "bookUnread";
bookUnread.value = "Not Started";
unreadLabel.appendChild(bookUnread);

container.appendChild(readLabel);
container.appendChild(readingLabel);
container.appendChild(unreadLabel);

export default container;
