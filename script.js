// Function to save tasks to localStorage
function SaveTasks() {
  let tasks = [];
  document.querySelectorAll("#list li").forEach((item) => {
    tasks.push(item.innerText);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to unsave (clear) tasks from localStorage
function ClearTasks() {
  if (confirm("Are you sure you want to unsave all tasks?")) {
      localStorage.removeItem("tasks");
      alert("unsaved successfully")
  }
}

// Initialize save state
let isSaved = false; 

// Function to create a button
function createbtn(classname, innerHTML, title) {
  let btn = document.createElement("button");
  btn.className = classname;
    btn.innerHTML = innerHTML;
    btn.title=title
  return btn;
}
// Create Save/Unsave button
const SaveTasksbtn = createbtn("save", '<i class="far fa-save"></i>', 'save button');


// Add event listener to save button
SaveTasksbtn.addEventListener("click", () => {
    if (!isSaved) {
    // When isSaved is false, save tasks
    isSaved = true;
      SaveTasks();
    alert("Saved successfully");
      isSaved ? (SaveTasksbtn.innerHTML = '<i class="fas fa-save"></i>') : '<i class="far fa-save"></i>';   // Set isSaved to true after saving
  } else {
      ClearTasks();
      isSaved = false; // Set isSaved to false after clearing
    SaveTasksbtn.innerHTML = '<i class="far fa-save"></i>'
  }
 });



// Function to get tasks from localStorage and append them to the container
function getTasks(todocontainer) {
  const items = JSON.parse(localStorage.getItem("tasks") || []);
  items.forEach((item) => {
    const task = createTaskElement(item);
    todocontainer.appendChild(task);
  });
}

window.onload = () => {
  getTasks(list);
};


// Get DOM elements
const tb = document.getElementById("tb");
const add_btn = document.getElementById("add_btn");
const list = document.querySelector("#list");
const container = document.querySelector(".container");




// Function to create a task element with buttons
function createTaskElement(text) {
  const task = document.createElement("li");
  task.innerText = text + "     ";

  const btnContainer = document.createElement("div");
  btnContainer.className = "btn_container";

  const delbtn = createbtn("del", '<i class="fa-solid fa-trash"></i>','delete button');
  delbtn.addEventListener("click", () => {
    list.removeChild(task);
  });

  const donebtn = createbtn("done", '<i class="fa-solid fa-check"></i>','done button');
  donebtn.addEventListener("click", () => {
    if (task.classList.contains("li_done")) {
      task.classList.remove("li_done")
    }
    else {
      task.classList.add("li_done")
    }
  });

  const editbtn = createbtn( "edit",'<i class="fa-solid fa-pen-to-square"></i>','edit button');
  editbtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
      editInput.style.height = "45px";
      const text= task.innerText
    editInput.value = text.trim();

    const editdone = document.createElement("button");
    editdone.className = "editdone";
    editdone.innerHTML = '<i class="fa-solid fa-check"></i>';
    editdone.style.marginLeft = "20px";
    editdone.addEventListener("click", () => {
      task.innerHTML = editInput.value + "     ";
      task.appendChild(btnContainer);

    });

    task.innerHTML = ""; // Clear existing content
    task.append(editInput, editdone);

    editInput.focus();
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        editdone.click();
      }
    });
  });

  container.appendChild(SaveTasksbtn);
  btnContainer.append(donebtn, editbtn, delbtn);
  task.appendChild(btnContainer);

  return task;
}

// Function to add a new task
function add() {
  const text = tb.value.trim();
  if (text) {
    const task = createTaskElement(text);
    list.appendChild(task);
    tb.value = ""; // Clear the input field
  } else {
    alert("The task field is empty. Please enter a task to add it.");
  }
}

// Event listeners for adding tasks
add_btn.addEventListener("click", add);
tb.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    add();
  }
});


