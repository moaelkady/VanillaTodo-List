let taskArr = [];
const input = document.getElementById("taskInput");
const submit = document.getElementById("taskBtn");
const tasksDiv = document.getElementById("taskArea");
const rmAll = document.getElementById("rmAll");

if (window.localStorage.getItem("taskArr")) {
  taskArr = JSON.parse(window.localStorage.getItem("taskArr"));
}
getDataFromLocalStorage();

//add function to submit button
submit.addEventListener("click", () => {
  //make sure input has value
  if (input.value) {
    //add value to array
    addTaskToArr(input.value);
    //clear input field
    input.value = "";
  }
});

//add task using enter key
input.addEventListener("keypress", (e) => {
  // If the user presses the "Enter" key on the keyboard
  if (e.key === "Enter") {
    // Trigger the button element with a click
    submit.click();
  }
});

//remove task element from page
tasksDiv.addEventListener("click", (e) => {
  //check if user clicks delete btn
  if (e.target.classList.contains("delTask")) {
    //delete from local storage
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("task-id"));
    //delete from page
    e.target.parentNode.remove();
  }
  //check if user clicks task container
  if (e.target.classList.contains("task")) {
    //toggle status using id for toggling class
    toggleTaskStatus(e.target.parentElement.getAttribute("task-id"));
    //toggle class
    e.target.classList.toggle("done");
  }
});

//function to add tasks to array
function addTaskToArr(text) {
  //set task object
  const task = {
    id: Date.now(),
    title: text,
    completed: false,
  };
  //add task to array
  taskArr.push(task);
  //add tasks to page
  addTasksToDOM(taskArr);
  //Add data to local storage
  addDataToLocalStorage(taskArr);
}

//function to loop array of tasks and add them to DOM
function addTasksToDOM(taskArr) {
  //empty tasks area
  tasksDiv.innerHTML = "";
  taskArr.forEach((task) => {
    tasksDiv.innerHTML += `
    <div class="inputGroup taskArea" task-id="${task.id}">
        <div class="task ${task.completed ? "done" : ""}">${task.title}</div>
        <button class="delTask">Delete Task</button>
    </div>
  `;
  });
}

//function to add data to local storage
function addDataToLocalStorage(taskArr) {
  window.localStorage.setItem("taskArr", JSON.stringify(taskArr));
}
//function to get data from local storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("taskArr");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToDOM(tasks);
  }
}

//function to delete data from local storage
function deleteTaskFromLocalStorage(taskId) {
  taskArr = taskArr.filter((task) => task.id != taskId);
  addDataToLocalStorage(taskArr);
}

//toggle task complete status
function toggleTaskStatus(taskId) {
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].id == taskId) {
      taskArr[i].completed == false
        ? (taskArr[i].completed = true)
        : (taskArr[i].completed = false);
    }
  }
  addDataToLocalStorage(taskArr);
}


//clear all data

function removeAllTasks() {
  rmAll.addEventListener("click", () => {
    if(taskArr.length >= 1) {
      let result = confirm("Are you sure you want to clear list?");
      if(result) {
        let result2 = confirm("يسطا شاور عقلك تاني؟");
        if(result2) {
          alert('انت حر دوس اوك خلينا ننجز');
          tasksDiv.innerHTML = "";
          window.localStorage.removeItem("taskArr");
          location.reload();
        } else {
          alert('ايوا كدا اعقل');
        }
      } else {
        alert('ايوا كدا اعقل');
      }
    } else {
      alert('ايوا ما اللسته فاضية اهي!');
    }
  });
}
removeAllTasks();

