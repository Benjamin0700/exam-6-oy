const pizzas = [
  { id: 1, name: "Чизбургер-пицца", price: 395, img: "./logo/image 2.png", category: "Мясные" },
  { id: 2, name: "Сырная", price: 450, img: "./logo/image 7.png", category: "Вегетарианская" },
  { id: 3, name: "Креветки по-азиатски", price: 290, img: "./logo/image 6.png", category: "Гриль" },
  { id: 4, name: "Сырный цыпленок", price: 290, img: "./logo/image 3.png", category: "Мясные" },
  { id: 5, name: "Чизбургер-пицца", price: 395, img: "./logo/image 2.png"},
  { id: 6, name: "Сырная", price: 450, img: "./logo/image 7.png"},
  { id: 7, name: "Креветки по-азиатски", price: 290, img: "./logo/image 6.png"},
  { id: 8, name: "Сырный цыпленок", price: 290, img: "./logo/image 3.png"}
];

let selectedOptions = {};
let currentCategory = "Все";  // Default category is "Все"

// Function to render pizzas based on the current category
function renderPizzas() {
  const pizzaList = document.getElementById('pizza-list');
  pizzaList.innerHTML = '';  // Clear the pizza list

  // Filter pizzas based on the current selected category
  const filteredPizzas = currentCategory === "Все" ? pizzas : pizzas.filter(pizza => pizza.category === currentCategory);

  // Display pizzas
  filteredPizzas.forEach(pizza => {
    let pizzaDiv = document.createElement('div');
    pizzaDiv.innerHTML = `
      <img src="${pizza.img}" alt="${pizza.name}">
      <h3>${pizza.name}</h3>
      <p>от ${pizza.price} ₽</p>
      <div class="pizza-crust">
        <button class="crust" data-id="${pizza.id}" data-crust="тонкое">Тонкое</button>
        <button class="crust" data-id="${pizza.id}" data-crust="традиционное">Традиционное</button>
      </div>
      <div class="pizza-sizes">
        <button class="size" data-id="${pizza.id}" data-size="26">26 см</button>
        <button class="size" data-id="${pizza.id}" data-size="30">30 см</button>
        <button class="size" data-id="${pizza.id}" data-size="40">40 см</button>
      </div>
      <button class="add-to-cart" data-id="${pizza.id}">+ Добавить</button>
    `;
    pizzaList.appendChild(pizzaDiv);
  });

  // Add event listeners for crust and size selection
  document.querySelectorAll('.crust').forEach(button => {
    button.addEventListener('click', selectCrust);
  });

  document.querySelectorAll('.size').forEach(button => {
    button.addEventListener('click', selectSize);
  });

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

function selectCrust(event) {
  const pizzaId = event.target.getAttribute('data-id');
  const crustType = event.target.getAttribute('data-crust');
  document.querySelectorAll(`.crust[data-id="${pizzaId}"]`).forEach(button => {
    button.classList.remove('selected');
  });
  event.target.classList.add('selected');
  if (!selectedOptions[pizzaId]) selectedOptions[pizzaId] = {};
  selectedOptions[pizzaId].crust = crustType;
}

function selectSize(event) {
  const pizzaId = event.target.getAttribute('data-id');
  const size = event.target.getAttribute('data-size');
  document.querySelectorAll(`.size[data-id="${pizzaId}"]`).forEach(button => {
    button.classList.remove('selected');
  });
  event.target.classList.add('selected');
  if (!selectedOptions[pizzaId]) selectedOptions[pizzaId] = {};
  selectedOptions[pizzaId].size = size;
}

function addToCart(event) {
  const pizzaId = event.target.getAttribute('data-id');
  const selectedPizza = pizzas.find(pizza => pizza.id == pizzaId);
  const pizzaOptions = selectedOptions[pizzaId];

  if (!pizzaOptions || !pizzaOptions.crust || !pizzaOptions.size) {
    alert('Iltimos, qobiq va o\'lchamni tanlang!');
    return;
  }

  const cartItem = { ...selectedPizza, size: pizzaOptions.size, crust: pizzaOptions.crust };
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  window.location.href = './Basket/basket.html';
}

// Function to filter pizzas by category when a category button is clicked
function filterByCategory(event) {
  const selectedCategory = event.target.textContent;  // Get the text of the clicked category button
  currentCategory = selectedCategory;  // Update the current category

  // Remove 'active' class from all category buttons
  document.querySelectorAll('.category').forEach(button => {
    button.classList.remove('active');
  });

  // Add 'active' class to the clicked category button
  event.target.classList.add('active');

  // Re-render pizzas based on the selected category
  renderPizzas();
}

// Add event listeners to the category filter buttons
document.querySelectorAll('.category').forEach(button => {
  button.addEventListener('click', filterByCategory);
});

// Initial rendering of all pizzas when the page loads
document.addEventListener('DOMContentLoaded', () => {
  renderPizzas();
});
