const keyStorage = "listTask";

function cekStorage() {
  return typeof Storage !== "undefined";
}

document.getElementById("addList").addEventListener("click", () => {
  const inputList = document.getElementById("addTask").value;
  const timestamp = new Date().getTime();

  let myListTask = {
    id: timestamp,
    task: inputList,
    isComplete: false,
  };

  putDataOnStorage(myListTask);
  renderShowData();
  document.getElementById("addTask").value = "";
});

function putDataOnStorage(data) {
  if (cekStorage) {
    let listTask = [];
    if (localStorage.getItem(keyStorage) !== null) {
      listTask = JSON.parse(localStorage.getItem(keyStorage));
    }
    listTask.unshift(data);
    localStorage.setItem(keyStorage, JSON.stringify(listTask));
  }
}

function getDataList() {
  if (cekStorage) {
    return JSON.parse(localStorage.getItem(keyStorage)) || [];
  } else {
    return [];
  }
}

// function renderShowData() {
//   let containerList = document.querySelector(".container-list");
//   let content = "";
//   const tasksList = getDataList();
//   tasksList.forEach((obj) => {
//     content += `<p class="list" onclick="clearTask(${obj.id}, this)">${obj.task}<span class="remove" onclick="remove(${obj.id})">x</span></p>`;
//   });
//   containerList.innerHTML = content;
// }

function renderShowData() {
  let containerList = document.querySelector(".container-list");
  let content = "";
  const tasksList = getDataList();
  tasksList.forEach((obj) => {
    const completedStyle = obj.isComplete
      ? 'style="font-style: italic; text-decoration: line-through; background-color: rgb(119, 119, 119)"'
      : "";
    content += `<p class="list" onclick="clearTask(${obj.id}, this)" ${completedStyle}>${obj.task}<span class="remove" onclick="remove(${obj.id})">x</span></p>`;
  });
  containerList.innerHTML = content;
}

function clearTask(o, e) {
  const tasksList = getDataList();
  tasksList.forEach((obj) => {
    if (obj.id === o) {
      if (obj.isComplete === false) {
        const getIndex = tasksList.indexOf(obj);
        tasksList[getIndex].isComplete = true;
        localStorage.setItem(keyStorage, JSON.stringify(tasksList));

        e.style.fontStyle = "italic";
        e.style.textDecoration = "line-through";
        e.style.backgroundColor = "rgb(119, 119, 119)";
        // console.log(e);
      } else {
        const getIndex = tasksList.indexOf(obj);
        tasksList[getIndex].isComplete = false;
        localStorage.setItem(keyStorage, JSON.stringify(tasksList));

        e.style.fontStyle = "normal";
        e.style.textDecoration = "none";
        e.style.backgroundColor = "rgb(197, 197, 197)";
        // console.log(e);
      }
    }
  });
}

function remove(id) {
  const tasksList = getDataList();
  tasksList.forEach((obj) => {
    if (obj.id === id) {
      const getIndex = tasksList.indexOf(obj);
      tasksList.splice(getIndex, 1);
      localStorage.setItem(keyStorage, JSON.stringify(tasksList));
      renderShowData();
    }
  });
}

// window.addEventListener("load", () => {
//   if (localStorage.getItem(keyStorage) !== null) {
//     renderShowData();
//   }
// });

window.addEventListener("load", () => {
  const tasksList = getDataList();
  renderShowData(tasksList);
});
