function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.querySelector('#cart-table tbody');

  cartTableBody.innerHTML = '';

  if (cart.length === 0) {
    cartTableBody.innerHTML = '<tr><td colspan="4">Savat bo\'sh</td></tr>';
    return;
  }

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
      ${item.name}
        <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px;"> 
      </td>
      <td>${item.size} см</td>
      <td>${item.crust}</td>
      <td>от ${item.price} ₽</td>
    `;
    cartTableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', loadCart);


function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.querySelector('#cart-table tbody');

  cartTableBody.innerHTML = '';
  if (cart.length === 0) {
      cartTableBody.innerHTML = '<tr><td colspan="4">Savat bo\'sh</td></tr>';
      return;
  }

  cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px;"> <br></br> ${item.name}</td>
          <td>${item.size} см</td>
          <td>${item.crust}</td>
          <td>от ${item.price} ₽</td>
      `;
      cartTableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', loadCart);

const pizzas = [
  { id: 1, name: "Чизбургер-пицца", price: 395, img: "./logo/image 2.png" },
  { id: 2, name: "Сырная", price: 450, img: "./logo/image 7.png" },
  { id: 3, name: "Креветки по-азиатски", price: 290, img: "./logo/image 6.png" },
  { id: 4, name: "Сырный цыпленок", price: 290, img: "./logo/image 3.png" }
];

let selectedOptions = {};

function renderPizzas() {
  const pizzaList = document.getElementById('pizza-list');
  pizzas.forEach(pizza => {
    let pizzaDiv = document.createElement('div');
    pizzaDiv.classList.add('pizza-box');
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

  window.location.href = './basket.html';  
}

document.addEventListener('DOMContentLoaded', renderPizzas);

function clearCart() {
  localStorage.removeItem('cart'); 
  loadCart(); 
}

document.getElementById('clear-cart').addEventListener('click', clearCart);

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.querySelector('#cart-table tbody');

  cartTableBody.innerHTML = '';

  if (cart.length === 0) {
    cartTableBody.innerHTML = '<tr><td colspan="4">Savat bo\'sh</td></tr>';
    return;
  }

  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px;"> 
        ${item.name}
      </td>
      <td>${item.size} см</td>
      <td>${item.crust}</td>
      <td>от ${item.price} ₽</td>
    `;
    cartTableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', loadCart);

document.getElementById('pay-cart').addEventListener('click', function() {
  window.location.href = 'https://payme.uz/home/payment'; 
});
