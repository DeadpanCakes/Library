import textInput from "./textInput";
import radioContainer from "./radioContainer";

const form = document.createElement("form");
form.id = "bookForm";

form.appendChild(textInput);
form.appendChild(radioContainer);

const submitBtn = document.createElement("button");
submitBtn.id = "submitBtn";
submitBtn.textContent = "Submit"

form.appendChild(submitBtn);

export default form;
