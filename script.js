// База даних авто
const cars = [
  {
    id: 1,
    title: "Audi RS e-tron GT",
    category: "electric",
    price: 135000,
    year: 2024,
    power: "637 к.с.",
    speed: "3.3 сек до 100 км/год",
    img: "https://images.unsplash.com/photo-1614026425726-1b0a9cdbe752?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "BMW M5 Competition",
    category: "sedan",
    price: 110000,
    year: 2023,
    power: "625 к.с.",
    speed: "3.4 сек до 100 км/год",
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Porsche Cayenne GTS",
    category: "suv",
    price: 125000,
    year: 2024,
    power: "500 к.с.",
    speed: "4.5 сек до 100 км/год",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Mercedes-AMG GT R",
    category: "sport",
    price: 160000,
    year: 2023,
    power: "585 к.с.",
    speed: "3.6 сек до 100 км/год",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Tesla Model S Plaid",
    category: "electric",
    price: 98000,
    year: 2024,
    power: "1020 к.с.",
    speed: "2.1 сек до 100 км/год",
    img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Range Rover Sport",
    category: "suv",
    price: 115000,
    year: 2023,
    power: "530 к.с.",
    speed: "4.5 сек до 100 км/год",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
  }
];

const carGrid = document.getElementById('carGrid');
const carSelect = document.getElementById('carSelect');

// Виведення карток
function displayCars(items) {
  carGrid.innerHTML = items.map(car => `
    <div class="car-card">
      <img src="${car.img}" alt="${car.title}">
      <div class="car-info">
        <h3 class="car-title">${car.title}</h3>
        <div class="car-specs">
          <span><i class="fa-solid fa-bolt"></i> ${car.power}</span>
          <span><i class="fa-solid fa-gauge-high"></i> ${car.speed}</span>
        </div>
        <div class="car-price-row">
          <div class="car-price">$${car.price.toLocaleString()}</div>
          <button class="btn btn-outline" onclick="openModal(${car.id})">Деталі</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Заповнення випадаючого списку
function populateSelect() {
  cars.forEach(car => {
    const option = document.createElement('option');
    option.value = car.title;
    option.textContent = car.title;
    carSelect.appendChild(option);
  });
}

// Фільтрація карток
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    if (filter === 'all') {
      displayCars(cars);
    } else {
      const filtered = cars.filter(item => item.category === filter);
      displayCars(filtered);
    }
  });
});

// Калькулятор оцінки Trade-In
document.getElementById('tradeinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const year = parseInt(document.getElementById('tradeYear').value);
  const mileage = parseInt(document.getElementById('tradeMileage').value);

  let basePrice = 30000;
  let yearMultiplier = (year - 2000) * 800;
  let mileagePenalty = (mileage / 10000) * 500;
  
  let estimatedPrice = Math.max(3000, basePrice + yearMultiplier - mileagePenalty);

  document.getElementById('calcPrice').textContent = `$${Math.round(estimatedPrice).toLocaleString()}`;
  document.getElementById('tradeResult').classList.remove('hidden');
});

// Робота модального вікна
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

function openModal(id) {
  const car = cars.find(c => c.id === id);
  modalBody.innerHTML = `
    <h2>${car.title}</h2>
    <img src="${car.img}" style="width:100%; border-radius:8px; margin: 15px 0;">
    <p><strong>Потужність двигуна:</strong> ${car.power}</p>
    <p><strong>Розгін:</strong> ${car.speed}</p>
    <p><strong>Рік випуску:</strong> ${car.year}</p>
    <h3 style="margin-top:15px; color:var(--accent);">Ціна: $${car.price.toLocaleString()}</h3>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="closeModalFunc()">Записатися на огляд</button>
  `;
  modal.style.display = 'flex';
}

function closeModalFunc() {
  modal.style.display = 'none';
}

closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFunc();
});

// Відправка форми тест-драйву
document.getElementById('testDriveForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Дякуємо за заявку! Наш менеджер зв\'яжеться з вами найближчим часом.');
  e.target.reset();
});

// Ініціалізація
displayCars(cars);
populateSelect();
