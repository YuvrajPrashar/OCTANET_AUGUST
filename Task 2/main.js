let AddBtn = document.querySelector(".Add");
AddBtn.addEventListener("click", AddTask);

function AddTask(e) {
  e.preventDefault();
  let CuurBtn = e.currentTarget;
  let CurrInp = CuurBtn.previousElementSibling.value.trim();

  if (CurrInp !== "") {
    let newLi = document.createElement("li");
    newLi.classList.add("ListElements");
    newLi.innerHTML = `<div class="Tasks">${CurrInp}</div>
              <div class="btns">
                <button class="modify" type="button" onclick="EditOrSaveTask(this)">Modify</button>
                <button class="delete" type="button" onclick="RemoveTask(this)">Delete</button>
                <button class="Completed" type="button" onclick="CompleteTask(this)">Done</button>
              </div>`;
    let ParentClass = document.querySelector(".ListContainer ul");
    ParentClass.appendChild(newLi);
    CuurBtn.previousElementSibling.value = "";
  }
}

function RemoveTask(button) {
  let listItem = button.closest(".ListElements");
  listItem.remove();
}

function EditOrSaveTask(button) {
  let listItem = button.closest(".ListElements");
  let currentTaskDiv = listItem.querySelector(".Tasks");
  let currentInput = listItem.querySelector(".Input");

  if (!currentInput) {
    currentInput = document.createElement("input");
    currentInput.type = "text";
    currentInput.className = "Input";
    currentInput.value = currentTaskDiv.textContent;
    listItem.insertBefore(currentInput, currentTaskDiv);
    currentTaskDiv.remove();

    button.textContent = "Save"; // Change button text to "Save"
  } else {
    let newText = currentInput.value;

    let newTaskDiv = document.createElement("div");
    newTaskDiv.className = "Tasks";
    newTaskDiv.textContent = newText;

    listItem.insertBefore(newTaskDiv, currentInput);
    currentInput.remove();

    button.textContent = "Modify"; // Change button text back to "Modify"
  }
}

function CompleteTask(button) {
  let taskDiv = button.closest(".ListElements").querySelector(".Tasks");
  taskDiv.classList.toggle("completed");
}
