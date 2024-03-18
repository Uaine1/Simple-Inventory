// Get the form element
const inputForm = document.getElementById('inputForm');

// Getting the checkbox element
const checkbox = document.getElementById('checkbox');

// Getting the tables section
const tablesSection = document.querySelector('.tablesSection');

// Array for storing inventory items
const inventoryItems = [];

// Function for checking if an item exists already
function checkIfExists(item, inventoryItems) {
	return inventoryItems.includes(item);
}

// Function to handle quantity cell click
function handleQuantityEdit(e) {
	const tdQuantity = e.target;
	const oldValue = tdQuantity.textContent;
	const input = document.createElement('input');
	input.type = 'number';
	input.value = oldValue;
	input.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			const newValue = input.value.trim();
			if (newValue !== '') {
				tdQuantity.textContent = newValue;
			}
			input.replaceWith(newValue);
		}
	});
	input.addEventListener('blur', function () {
		const newValue = input.value.trim();
		if (newValue !== '') {
			tdQuantity.textContent = newValue;
		}
		input.replaceWith(newValue);
	});
	tdQuantity.textContent = '';
	tdQuantity.appendChild(input);
	input.focus();
}

// Function for adding new item in the inventory
inputForm.addEventListener('submit', function (e) {
	e.preventDefault();

	// Getting the item from the input field
	const itemInput = document.getElementById('item');
	const item = itemInput.value.trim();

	// Getting the quantity from the input field
	const quantityInput = document.getElementById('quantity');
	const quantity = quantityInput.value.trim();

	// Check if item or quantity is empty
	if (item === '' || quantity === '') {
		alert("Fill out the form first");
		return;
	}

	// Check if item already exists
	if (checkIfExists(item, inventoryItems)) {
		alert('Item already taken');
		return;
	}

	// push to the inventoryItems list
	inventoryItems.push(item);
	console.log(inventoryItems);

	// Clear input fields
	itemInput.value = '';
	quantityInput.value = '';

	// create the table row element for storing items
	const trElement = document.createElement('tr');

	// create table data for storing item name
	const tdElementForItemName = document.createElement('td');

	// create table data for storing quantity 
	const tdElementForQty = document.createElement('td');
	tdElementForQty.addEventListener('click', handleQuantityEdit);

	// setting the text content of the item name and quantity
	tdElementForItemName.textContent = item;
	tdElementForQty.textContent = quantity;

	// adding table data element to the table row
	trElement.appendChild(tdElementForItemName);
	trElement.appendChild(tdElementForQty);

	// adding table row element to the table
	const inventoryTable = document.querySelector('table');
	inventoryTable.appendChild(trElement);
});

checkbox.addEventListener('change', function () {
	if (checkbox.checked) {
		tablesSection.style.display = "block";
	} else {
		tablesSection.style.display = "none";
	}
});