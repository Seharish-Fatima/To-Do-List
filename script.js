const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Please Enter A Task");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
  }
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  const tasks = [];
  listContainer.querySelectorAll("li").forEach((item) => {
    tasks.push({
      text: item.childNodes[0].textContent,
      checked: item.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = task.text;

      if (task.checked) {
        li.classList.add("checked");
      }

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);

      listContainer.appendChild(li);
    });
  }
}

loadData();
