var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var all = document.querySelector(".all");
var active = document.querySelector(".active");
var completed = document.querySelector(".completed");

form.addEventListener("keypress", addItem);
itemList.addEventListener("click", removeItem);
all.addEventListener("click", showAll);
active.addEventListener("click", showActive);
completed.addEventListener("click", showCompleted);

var arrayOfItems = [];

function addItem(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    var newItem = document.querySelector(".input-area").value;
    if (newItem != "" && newItem.trim() != "") {
      var li = document.createElement("li");
      li.classList.add("list-group-item");
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(newItem));
      let data = {};
      data[`data${arrayOfItems.length}`] = {
        value: newItem,
        isCompleted: false,
      };
      arrayOfItems.push(data);
      var itemLength = document.querySelector(".item-count");
      if (arrayOfItems.length < 2) {
        itemLength.textContent = `${arrayOfItems.length}` + " item left";
      } else {
        itemLength.textContent = `${arrayOfItems.length}` + " items left";
      }
      document.querySelector(".input-area").value = "";
      li.appendChild(div);
      var deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.appendChild(document.createTextNode("X"));
      li.appendChild(deleteButton);
      var tickBoxContainer = document.createElement("div");
      tickBoxContainer.classList.add("container");
      var roundBox = document.createElement("div");
      roundBox.classList.add("round");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "checkbox";
      checkbox.checked = false;
      var labelCheckbox = document.createElement("label");
      labelCheckbox.htmlFor = "checkbox";
      labelCheckbox.classList.add("checkbox");
      roundBox.appendChild(checkbox);
      roundBox.appendChild(labelCheckbox);
      tickBoxContainer.appendChild(roundBox);
      li.insertAdjacentElement("afterbegin", tickBoxContainer);

      tickBoxContainer.addEventListener("click", checkItem);
      itemList.appendChild(li);
    }
  }
}

//remove item
function removeItem(event) {
  if (event.target.classList.contains("delete")) {
    event.preventDefault();
    var li = event.target.parentElement;
    var textValue = li.children[1].textContent;
    arrayOfItems = arrayOfItems.filter((element) => {
      let keyValue;
      for (let key in element) {
        keyValue = key;
      }
      if (element[keyValue]["value"] != textValue) {
        return element;
      }
    });
    var itemLength = document.querySelector(".item-count");
    if (arrayOfItems.length < 2) {
      itemLength.textContent = `${arrayOfItems.length}` + " item left";
    } else {
      itemLength.textContent = `${arrayOfItems.length}` + " items left";
    }
    itemList.removeChild(li);
  }
}

//line through item
function checkItem(event) {
  event.preventDefault();
  if (event.target.classList.contains("checkbox")) {
    let targetItem = event.target.parentElement.parentElement.nextSibling;
    let textValue = targetItem.textContent;
    let tick = event.target.parentElement.children[0];
    if (targetItem.style.textDecoration == "none") {
      tick.checked = true;
      targetItem.style.textDecoration = "line-through";
      targetItem.setAttribute("data-completed", "true");
      arrayOfItems.map((element) => {
        for (let key in element) {
          if (element[key]["value"] == textValue) {
            element[key]["isCompleted"] = true;
          }
        }
      });
    } else {
      tick.checked = false;
      targetItem.style.textDecoration = "none";
      arrayOfItems.map((element) => {
        for (let key in element) {
          if (element[key]["value"] == textValue) {
            element[key]["isCompleted"] = false;
            targetItem.setAttribute("data-completed", "false");
          }
        }
      });
    }
  }
}

function showAll(event) {
  var list = document.getElementsByTagName("li");
  for (let element of list) {
    element.classList.add("show");
    element.classList.remove("hide");
  }
  var itemLength = document.querySelector(".item-count");
  if (list.length < 2) {
    itemLength.textContent = `${list.length}` + " item left";
  } else {
    itemLength.textContent = `${list.length}` + " items left";
  }
}

function showActive(event) {
  var list = document.getElementsByTagName("li");
  let length = list.length;
  for (let element of list) {
    var dataType = element.children[1].getAttribute("data-completed");
    if (dataType) {
      element.classList.add("hide");
      element.classList.remove("show");
      length--;
    } else {
      element.classList.add("show");
      element.classList.remove("hide");
    }
  }
  var itemLength = document.querySelector(".item-count");
  if (list.length < 2) {
    itemLength.textContent = `${length}` + " item left";
  } else {
    itemLength.textContent = `${length}` + " items left";
  }
}

function showCompleted(event) {
  var list = document.getElementsByTagName("li");
  let length = list.length;
  for (let element of list) {
    var dataType = element.children[1].getAttribute("data-completed");
    if (!dataType) {
      element.classList.add("hide");
      element.classList.remove("show");
      length--;
    } else {
      element.classList.add("show");
      element.classList.remove("hide");
    }
  }
  var itemLength = document.querySelector(".item-count");
  if (length < 2) {
    itemLength.textContent = `${length}` + " item left";
  } else {
    itemLength.textContent = `${length}` + " items left";
  }
}
