var form = document.getElementById("addForm");
// console.log(form);
var itemList = document.getElementById("items");

form.addEventListener("keypress", addItem);
itemList.addEventListener("click", removeItem);

var arrayOfItems = [];
console.log(arrayOfItems);
console.log(arrayOfItems.length);

function addItem(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    var newItem = document.querySelector(".input-area").value;
    if (newItem != "" && newItem != " ") {        
      var li = document.createElement("li");
      li.classList.add("list-group-item");
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(newItem));
      arrayOfItems.push(newItem);
      console.log(arrayOfItems);
      var itemLength = document.querySelector('.item-count');
      console.log(itemLength);
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
      var tickBoxContainer = document.createElement('div');
      tickBoxContainer.classList.add('container');
      var roundBox = document.createElement('div');
      roundBox.classList.add('round');
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = 'checkbox';
      checkbox.checked = false;
      var labelCheckbox = document.createElement('label');
      labelCheckbox.htmlFor = 'checkbox';
      labelCheckbox.classList.add('checkbox');
      roundBox.appendChild(checkbox);
      roundBox.appendChild(labelCheckbox);
      tickBoxContainer.appendChild(roundBox);
      li.insertAdjacentElement('afterbegin', tickBoxContainer);

      tickBoxContainer.addEventListener('click', checkItem);
      itemList.appendChild(li);
    }
  }
}

//remove item
function removeItem(event) {
  if (event.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = event.target.parentElement;
      console.log(li.children[1].textContent);
      console.log(arrayOfItems.indexOf(li.children[1].textContent));
      // console.log(arrayOfItems);
      itemList.removeChild(li);
      delete arrayOfItems[arrayOfItems.indexOf(li.children[1].textContent)];
      arrayOfItems.filter(Boolean);
      console.log(arrayOfItems);
      console.log(arrayOfItems.length);
      var itemLength = document.querySelector('.item-count');
      console.log(itemLength);
      if (arrayOfItems.length < 2) {
        itemLength.textContent = `${arrayOfItems.length}` + " item left"; 
      } else {
        itemLength.textContent = `${arrayOfItems.length}` + " items left";
      }
      console.log(itemLength);
    }
  }
}

//line through item
function checkItem(event) {
  event.preventDefault();
  if (event.target.classList.contains("checkbox")) {
    let targetItem = event.target.parentElement.parentElement.nextSibling;
    let tick = event.target.parentElement.children[0];
    if (targetItem.style.textDecoration == "none") {
      tick.checked = true;
      targetItem.style.textDecoration = "line-through";
    } else {
      tick.checked = false;
      targetItem.style.textDecoration = "none";
    }
  }
}

// console.log(arrayOfItems);