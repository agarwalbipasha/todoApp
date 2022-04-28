var form = document.getElementById('input-area');
// console.log(form);
var itemList = document.getElementById('items');

//Form submit event
form.addEventListener('keypress', addItem);

itemList.addEventListener('click', removeItem);


//Add Item
function addItem(event) {
    event.preventDefault();
    
    if (event.key === 'Enter') {

        var newItem = document.getElementById('input-area').value;
        console.log(newItem);
        if (newItem != "" || newItem != " ") {
        console.log("inside");
        var li = document.createElement('li');
        li.classList.add('list-group-item');
        console.log(li);
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(newItem));
        document.querySelector('.input-area').value = "";
        li.appendChild(div);
        // console.log(div);
        // console.log(li);
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.appendChild(document.createTextNode('X'));
        li.appendChild(deleteButton);
        itemList.appendChild(li);
        }
    }
}

//remove item

function removeItem(event) {
    if(event.target.classList.contains('delete')) {
        if(confirm('Are you sure?')) {
            var li = event.target.parentElement;
            itemList.removeChild(li);
        }
    }
}