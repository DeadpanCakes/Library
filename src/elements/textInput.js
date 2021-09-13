const container = document.createElement("div");
container.id = "textFormDiv";
const makeInput = () => document.createElement("input");
const makeLabel = () => document.createElement("label");

const titleLabel = makeLabel();
titleLabel.textContent = "Title";
const titleInput = makeInput();
titleInput.id = "bookTitle";
titleLabel.appendChild(titleInput);

const authorLabel = makeLabel();
authorLabel.textContent = "Author";
const authorInput = makeInput();
authorInput.id = "bookAuthor";
authorLabel.appendChild(authorInput);

const pgLabel = makeLabel();
pgLabel.textContent = "Page Count";
const pgInput = makeInput();
pgInput.id = "bookPages";
pgLabel.appendChild(pgInput);

container.appendChild(titleLabel);
container.appendChild(authorLabel);
container.appendChild(pgLabel);

export default container;
