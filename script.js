// Get slider elements
const sliderDots = document.querySelectorAll('.slider-dot');
const prevArrow = document.querySelector('.slider-arrows .arrow:first-child');
const nextArrow = document.querySelector('.slider-arrows .arrow:last-child');
const sliderContent = document.querySelector('.hero-container');
const slideImages = ['img/Slider Image Flat White.png']; // Add more image paths for additional slides

// Create additional slide data (for demonstration)
const slides = [
  {
    title: "Ті, що створюють",
    description: "Професії, які розпочинають ланцюжок створення продукту, потребують креативності",
    price: "2",
    image: "img/art.png",
    country: "ethiopia"
  },
  {
    title: "Ті, що оформлують",
    description: "Професії, що можуть зробити навіть найгірший товар презентабельним, потребують творчості",
    price: "2",
    image: "img/worker.png",
    country: "colombia"
  },
  {
    title: "Ті, що рекламують",
    description: "Професії, що дуже гарно знають як знайти клієнтів, потребують навичок у маркетингу",
    price: "1",
    image: "img/person.png",
    country: "costa-rica"
  },
  {
    title: "Ті що підтримують",
    description: "Професії, що захищають та підтримують у гарному стані продукт та місце де його продают",
    price: "1",
    image: "img/shield.png",
    country: "peru"
  },
];

// Variable to track current active dot index
let currentDotIndex = 0;

// Function to update active dot with animation
function updateActiveDot(index) {
  // Remove active class from all dots
  sliderDots.forEach(dot => {
    dot.classList.remove('active');
    // Reset transition for non-active dots
    dot.style.transition = 'width 0.3s ease, background-color 0.3s ease';
  });
  
  // Add active class to the current dot with animation
  const activeDot = sliderDots[index];
  activeDot.classList.add('active');
  
  // Enhance animation for active dot
  activeDot.style.transition = 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease';
  
  // Update current index
  currentDotIndex = index;
  
  // Update slide content with animation
  updateSlideContent(index);
}

// Function to update slide content
function updateSlideContent(index) {
  // Fade out current content
  sliderContent.style.opacity = 0;
  sliderContent.style.transform = 'translateX(-20px)';
  
  // After fade out, update content and fade in
  setTimeout(() => {
    // Update content (title, description, price, image)
    const slide = slides[index];
    const titleElement = document.querySelector('.hero-content h1');
    const descriptionElement = document.querySelector('.hero-content p');
    const priceElement = document.querySelector('.price');
    const imageElement = document.querySelector('.hero-image img');
    
    titleElement.textContent = slide.title;
    descriptionElement.textContent = slide.description;
    priceElement.textContent = slide.price;
    imageElement.src = slide.image;
    
    // Animation for image
    imageElement.style.transform = 'scale(0.95)';
    imageElement.style.opacity = 0;
    
    setTimeout(() => {
      // Fade in content
      sliderContent.style.opacity = 1;
      sliderContent.style.transform = 'translateX(0)';
      
      // Animate image
      imageElement.style.transform = 'scale(1)';
      imageElement.style.opacity = 1;
    }, 50);
  }, 300);
}

// Add CSS for transitions
function addTransitionStyles() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .hero-container {
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .slider-dot {
      transition: width 0.3s ease, background-color 0.3s ease;
      cursor: pointer;
    }
    .hero-image img {
      transition: transform 0.5s ease, opacity 0.5s ease;
    }
    .hero-content h1, 
    .hero-content p, 
    .price-buy {
      transition: transform 0.4s ease, opacity 0.4s ease;
      transition-delay: 0.1s;
    }
    .arrow {
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .arrow:hover {
      transform: scale(1.2);
      color: #5b3da8;
    }
  `;
  document.head.appendChild(styleSheet);
}

// Handle previous arrow click
prevArrow.addEventListener('click', () => {
  // Add click effect
  prevArrow.style.transform = 'scale(0.9)';
  setTimeout(() => {
    prevArrow.style.transform = '';
  }, 150);
  
  // Calculate previous index with cycling
  let prevIndex;
  if (currentDotIndex === 0) {
    prevIndex = sliderDots.length - 1; // Go to last dot if on first
  } else {
    prevIndex = currentDotIndex - 1;
  }
  
  updateActiveDot(prevIndex);
});

// Handle next arrow click
nextArrow.addEventListener('click', () => {
  // Add click effect
  nextArrow.style.transform = 'scale(0.9)';
  setTimeout(() => {
    nextArrow.style.transform = '';
  }, 150);
  
  // Calculate next index with cycling
  let nextIndex;
  if (currentDotIndex === sliderDots.length - 1) {
    nextIndex = 0; // Go to first dot if on last
  } else {
    nextIndex = currentDotIndex + 1;
  }
  
  updateActiveDot(nextIndex);
});

// Add click functionality to dots themselves
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateActiveDot(index);
  });
});

// Auto-rotate slider (optional)
function startAutoRotation(interval = 5000) {
  return setInterval(() => {
    const nextIndex = (currentDotIndex + 1) % sliderDots.length;
    updateActiveDot(nextIndex);
  }, interval);
}

// Initialize slider
function initSlider() {
  addTransitionStyles();
  // Set the first dot as active
  updateActiveDot(0);
  
  // Optional: Start auto-rotation (uncomment to enable)
  // const autoRotationTimer = startAutoRotation();
  
  // Optional: Pause auto-rotation on hover
  // sliderContent.addEventListener('mouseenter', () => clearInterval(autoRotationTimer));
  // sliderContent.addEventListener('mouseleave', () => autoRotationTimer = startAutoRotation());
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSlider);
// Get the price filter elements
const priceRange = document.querySelector('.price-range');
const minPriceInput = document.querySelector('.price-inputs input:first-child');
const maxPriceInput = document.querySelector('.price-inputs input:last-child');
const priceFilterSection = document.querySelector('.price-filter');

// Create and replace with dual range slider
function createDualRangeSlider() {
  // Remove the existing single slider
  priceRange.remove();
  
  // Create the dual range slider container
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'dual-slider-container';
  
  // Create the track and active range
  const sliderTrack = document.createElement('div');
  sliderTrack.className = 'slider-track';
  
  const sliderRange = document.createElement('div');
  sliderRange.className = 'slider-range';
  
  // Create min and max thumbs
  const minThumb = document.createElement('input');
  minThumb.type = 'range';
  minThumb.className = 'range-input min-range';
  minThumb.min = 0;
  minThumb.max = 1000000;
  minThumb.value = 0;
  
  const maxThumb = document.createElement('input');
  maxThumb.type = 'range';
  maxThumb.className = 'range-input max-range';
  maxThumb.min = 0;
  maxThumb.max = 1000000;
  maxThumb.value = 1000000;
  
  // Append elements to the container
  sliderContainer.appendChild(sliderTrack);
  sliderContainer.appendChild(sliderRange);
  sliderContainer.appendChild(minThumb);
  sliderContainer.appendChild(maxThumb);
  
  // Insert the new slider after the filter title
  const filterTitle = document.querySelector('.filter-title');
  filterTitle.after(sliderContainer);
  
  // Add styles
  addDualSliderStyles();
  
  return { minThumb, maxThumb, sliderRange };
}

// Add required CSS styles for the dual slider
function addDualSliderStyles() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .dual-slider-container {
      position: relative;
      width: 100%;
      height: 4px;
      margin: 30px 0;
    }
    
    .slider-track {
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: #E6E6E6;
      border-radius: 2px;
    }
    
    .slider-range {
      position: absolute;
      height: 4px;
      background-color: #7859CF;
      border-radius: 2px;
    }
    
    .range-input {
      position: absolute;
      top: -8px;
      width: 100%;
      -webkit-appearance: none;
      pointer-events: none;
      background: none;
      outline: none;
      height: 20px;
    }
    
    .range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: white;
      border: 2px solid #7859CF;
      border-radius: 50%;
      pointer-events: auto;
      cursor: pointer;
    }
    
    .range-input::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: white;
      border: 2px solid #7859CF;
      border-radius: 50%;
      pointer-events: auto;
      cursor: pointer;
    }
    
    .price-inputs {
      display: flex;
      justify-content: space-between;
      margin-top: 28px;
      align-items: center;
    }
    
    .price-inputs input {
      width: 45%;
      padding: 8px;
      border: 2px solid #7859CF;
      border-radius: 4px;
      text-align: center;
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
    
    .price-inputs::between{
      content: "—";
      color: #7859CF;
      font-weight: 300;
    }
  `;
  document.head.appendChild(styleSheet);
}

// Initialize the dual range slider
function initDualRangeSlider() {
  const { minThumb, maxThumb, sliderRange } = createDualRangeSlider();
  
  // Set initial input values
  minPriceInput.value = minThumb.value;
  maxPriceInput.value = maxThumb.value;
  
  // Function to update the slider range and position
  function updateSlider() {
    // Calculate percentage position for UI updates
    const minPercent = (parseInt(minThumb.value) / parseInt(minThumb.max)) * 100;
    const maxPercent = (parseInt(maxThumb.value) / parseInt(maxThumb.max)) * 100;
    
    // Update the slider range appearance
    sliderRange.style.left = minPercent + '%';
    sliderRange.style.width = (maxPercent - minPercent) + '%';
  }
  
  // Update text inputs when sliders move
  minThumb.addEventListener('input', function() {
    // Prevent min thumb from crossing over max thumb
    if (parseInt(minThumb.value) > parseInt(maxThumb.value)) {
      minThumb.value = maxThumb.value;
    }
    minPriceInput.value = minThumb.value;
    updateSlider();
  });
  
  maxThumb.addEventListener('input', function() {
    // Prevent max thumb from crossing over min thumb
    if (parseInt(maxThumb.value) < parseInt(minThumb.value)) {
      maxThumb.value = minThumb.value;
    }
    maxPriceInput.value = maxThumb.value;
    updateSlider();
  });
  
  // Update sliders when text inputs change
  minPriceInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    
    // Validate input values
    if (isNaN(value)) {
      value = 0;
    } else if (value > parseInt(maxThumb.value)) {
      value = parseInt(maxThumb.value);
    }
    
    this.value = value;
    minThumb.value = value;
    updateSlider();
  });
  
  maxPriceInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    
    // Validate input values
    if (isNaN(value) || value > 900) {
      value = 900;
    } else if (value < parseInt(minThumb.value)) {
      value = parseInt(minThumb.value);
    }
    
    this.value = value;
    maxThumb.value = value;
    updateSlider();
  });
  
  // Initial call to set slider appearance
  updateSlider();
}
let creator = "img/art.png"
let worker = "img/worker.png"
let seller = "img/person.png"
let helper = "img/shield.png"
// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initDualRangeSlider);
// PRODUCT DATA
// Sample product data with all necessary properties for filtering
const products = [
    {
      id: 1,
      title: "Розробник Сайтів",
      description: "Людина, що оформлює продукт у вигляді сайту",
      price: 37500,
      image: worker,
      milk: "animal", // animal, plant, none
      country: "colombia",
      popularity: 100
    },
    {
      id: 2,
      title: "Web Дизайнер",
      description: "Людина, що оформлює продукт у вигляді макету",
      price: 40000,
      image: worker,
      milk: "plant",
      country: "colombia",
      popularity: 90
    },
    {
      id: 3,
      title: "Контент-Менеджер",
      description: "Людина, що створює оформлення сайту",
      price: 22500,
      image: creator,
      milk: "animal",
      country: "ethiopia",
      popularity: 80
    },
    {
      id: 4,
      title: "Системний Адміністратор",
      description: "Людина, що підтримує весь офіс у працездатному стані",
      price: 30000,
      image: helper,
      milk: "none",
      country: "peru",
      popularity: 78
    },
    {
      id: 5,
      title: "Креативний Директор",
      description: "Людина, що створює ідеї для продукту",
      price: 50000,
      image: creator,
      milk: "none",
      country: "ethiopia",
      popularity: 85
    },
    {
      id: 6,
      title: "Таргетолог",
      description: "Людина, що слыдкуэ за ринком заради визначення найкращого методу рекламування",
      price: 40000,
      image: seller,
      milk: "none",
      country: "costa-rica",
      popularity: 89
    },
    {
      id: 6,
      title: "Прибиральник",
      description: "Єлітна, але малооплачувальна робота",
      price: 10000,
      image: "img/Sweeper.png",
      milk: "none",
      country: "peru",
      popularity: 10
    }
  ];
  
  // DOM ELEMENTS
  // Get all filter elements
  const milkRadios = document.querySelectorAll('input[name="milk"]');
  const countryCheckboxes = document.querySelectorAll('.country-filter input[type="checkbox"]');
  const sortingSelect = document.querySelector('.sorting-select');
  const applyButton = document.querySelector('.apply-button');
  const resetButton = document.querySelector('.reset-button');
  const productsContainer = document.querySelector('.products');
  
  // FILTER STATE
  // Object to track current filter state
// Add sort direction to filter state
let filterState = {
    minPrice: 0,
    maxPrice: 900,
    milk: "any", // any, animal, plant, none
    countries: ["brazil", "ethiopia", "colombia", "costa-rica", "peru"],
    sortBy: "popularity", // popularity, price, alphabet
    sortDirection: "desc" // desc (descending) or asc (ascending)
  };
  // FILTER FUNCTIONS
  // Function to apply all filters and update product display
function applyFilters() {
  // Get current filter values
  updateFilterState();
  
  // Filter products based on current filter state
  const filteredProducts = products.filter(product => {
    // Price filter
    const matchesPrice = product.price >= filterState.minPrice && 
                         product.price <= filterState.maxPrice;
    
    // Milk filter
    const matchesMilk = filterState.milk === "any" || 
                       product.milk === filterState.milk;
    
    // Country filter
    const matchesCountry = filterState.countries.includes(product.country);
    
    return matchesPrice && matchesMilk && matchesCountry;
  });
  
  // Sort filtered products
  sortProducts(filteredProducts);
  
  // Calculate pagination
  calculatePagination(filteredProducts);
  
  // Reset to first page when filters change
  paginationState.currentPage = 1;
  
  // Display products for current page
  displayCurrentPage();
  
  // ВИДАЛІТЬ ЦІ РЯДКИ ЯКЩО ВОНИ Є:
  // scrollToProducts();
  // document.querySelector('.products').scrollIntoView();
}
  // Function to update filter state from UI elements
  function updateFilterState() {
    // Update price range
    filterState.minPrice = parseInt(minPriceInput.value) || 0;
    filterState.maxPrice = parseInt(maxPriceInput.value) || 900;
    
    // Update milk selection
    const selectedMilk = document.querySelector('input[name="milk"]:checked');
    if (selectedMilk) {
      switch (selectedMilk.id) {
        case 'milk-any':
          filterState.milk = "any";
          break;
        case 'milk-animal':
          filterState.milk = "animal";
          break;
        case 'milk-plant':
          filterState.milk = "plant";
          break;
        case 'milk-no':
          filterState.milk = "none";
          break;
      }
    }
    
    // Update countries selection
    filterState.countries = [];
    countryCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const country = checkbox.id.replace('country-', '');
        filterState.countries.push(country);
      }
    });
    
    // Update sorting option
    filterState.sortBy = sortingSelect.value;
  }
  
  // Function to sort products based on selected criteria
// Updated sort function that considers direction
// Example of initializing the filterState with default sorting option first
const SortState = {
  sortBy: 'за замовчуванням', // Default sort option now appears first
  sortDirection: 'asc',
  // other filter properties...
};
function sortProducts(productList) {
  switch (filterState.sortBy) {
    case 'за замовчуванням':
      if (SortState.sortDirection === 'desc') {
        productList.sort((a, b) => b.id - a.id); // Reverse ID order
      } else {
        productList.sort((a, b) => a.id - b.id); // Natural ID order
      }
      break;
    case 'за ціною':
      if (filterState.sortDirection === 'desc') {
        productList.sort((a, b) => b.price - a.price); // Highest price first
      } else {
        productList.sort((a, b) => a.price - b.price); // Lowest price first
      }
      break;
    case 'за алфавітом':
      if (filterState.sortDirection === 'desc') {
        productList.sort((a, b) => b.title.localeCompare(a.title)); // Z to A
      } else {
        productList.sort((a, b) => a.title.localeCompare(b.title)); // A to Z
      }
      break;
  }
  return productList;
}


function displayProducts(productList) {
  // Clear products container
  productsContainer.innerHTML = '';
  // Loop through products and create HTML for each
  productList.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    
    productElement.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.title}">
        <div class="product-text">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.description}</p>
          <span class="product-pay">Зарплатня від</span>
          <div class="product-actions">
            <span class="product-price">${product.price}грн</span>
            <button class="add-to-cart" onclick="openModal()">
              <img class="add-to-cart__img " src="img/look.png">
              Переглянути
            </button>
          </div>
        </div>
    `;
    
    productsContainer.appendChild(productElement);
  });
}
  
  // Function to reset all filters to default values
  function resetFilters() {
    // Reset price inputs
    minPriceInput.value = 0;
    maxPriceInput.value = 1000000;
    
    // Reset range sliders if they exist
    const minThumb = document.querySelector('.min-range');
    const maxThumb = document.querySelector('.max-range');
    if (minThumb && maxThumb) {
      minThumb.value = 0;
      maxThumb.value = 1000000;
      
      // Update slider range visual
      const sliderRange = document.querySelector('.slider-range');
      if (sliderRange) {
        sliderRange.style.left = '0%';
        sliderRange.style.width = '100%';
      }
    }
    
    // Reset milk radio buttons
    document.getElementById('milk-any').checked = true;
    
    // Reset country checkboxes
    countryCheckboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
    
    // Reset sorting
    sortingSelect.value = 'за замовчуванням';
    
    // Apply reset filters
    applyFilters();
  }
  
  // EVENT LISTENERS
  // Apply filters when button is clicked
  applyButton.addEventListener('click', applyFilters);
  
  // Reset filters when button is clicked
  resetButton.addEventListener('click', resetFilters);
  
  // Apply filters when sorting option changes
  sortingSelect.addEventListener('change', applyFilters);
  
  // Initialize the page with default filters
  document.addEventListener('DOMContentLoaded', function() {
    // Make sure dual slider is initialized first if it exists
    if (typeof initDualRangeSlider === 'function') {
      setTimeout(() => {
        // Generate initial products display
        applyFilters();
      }, 100);
    } else {
      // Generate initial products display
      applyFilters();
    }
  });
  // Make sure all country checkboxes are checked on page load
document.addEventListener('DOMContentLoaded', function() {
    // Select all country checkboxes and set them as checked
    document.querySelectorAll('.country-filter input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    
    // Rest of your initialization code...
    // Apply filters to update products with all countries selected
    if (typeof applyFilters === 'function') {
        applyFilters();
    }
});
  // Add to your document ready function
// ADD THIS CODE TO YOUR EXISTING JAVASCRIPT

// Function to handle buy button click
function handleBuyButtonClick() {
  // Get current slide's country
  const currentSlide = slides[currentDotIndex];
  const targetCountry = currentSlide.country;
  
  // Add button click animation
  const buyButton = document.querySelector('.buy-button');
  buyButton.style.transform = 'scale(0.95)';
  buyButton.style.transition = 'transform 0.2s ease';
  
  setTimeout(() => {
    buyButton.style.transform = 'scale(1)';
  }, 200);
  
  // Filter by current slide's country
  setTimeout(() => {
    filterByCountryOnly(targetCountry);
    scrollToProducts();
  }, 300);
}

// Function to filter by specific country only
function filterByCountryOnly(targetCountry) {
  // Uncheck all country checkboxes first
  const countryCheckboxes = document.querySelectorAll('.country-filter input[type="checkbox"]');
  countryCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Check only the target country
  const targetCheckbox = document.querySelector(`#country-${targetCountry}`);
  if (targetCheckbox) {
    targetCheckbox.checked = true;
  }
  
  // Apply filters
  if (typeof applyFilters === 'function') {
    applyFilters();
  }
}

// Function to scroll to products section
function scrollToProducts() {
  const productsSection = document.querySelector('.products') || 
                         document.querySelector('#products') || 
                         document.querySelector('.products-container');
  
  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ADD EVENT LISTENER TO BUY BUTTON
document.addEventListener('DOMContentLoaded', function() {
  const buyButton = document.querySelector('.buy-button');
  if (buyButton) {
    buyButton.addEventListener('click', handleBuyButtonClick);
  }
});
// ADD THIS CODE TO YOUR EXISTING JAVASCRIPT

// Function to handle Brazil checkbox interaction
function handleBrazilCheckbox() {
  const brazilCheckbox = document.querySelector('#country-brazil');
  const otherCountryCheckboxes = document.querySelectorAll('.country-filter input[type="checkbox"]:not(#country-brazil)');
  
  if (brazilCheckbox.checked) {
    // If Brazil is checked, check all other countries
    otherCountryCheckboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  } else {
    // If Brazil is unchecked, uncheck all other countries
    otherCountryCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
  
  // Apply filters after changing checkboxes
  if (typeof applyFilters === 'function') {
    applyFilters();
  }
}

// MODIFY YOUR EXISTING displayProducts FUNCTION
// Replace your existing displayProducts function with this updated version:
function displayProducts(productList) {
  // Clear products container
  productsContainer.innerHTML = '';
  
  if (productList.length === 0) {
    // Display enhanced error message if no products match filters
    productsContainer.innerHTML = `
      <div class="no-products-message">
        <div class="error-icon">⚠️</div>
        <h3>Товари не знайдено</h3>
        <p>На жаль, за вашими критеріями пошуку товари відсутні.</p>
        <div class="error-suggestions">
          <p><strong>Спробуйте:</strong></p>
          <ul>
            <li>Розширити діапазон цін</li>
            <li>Вибрати більше країн</li>
            <li>Змінити тип молока</li>
            <li>Скинути всі фільтри</li>
          </ul>
        </div>
        <button class="reset-filters-btn" onclick="resetFilters()">
          Скинути фільтри
        </button>
      </div>
    `;
    return;
  }
  
  // Loop through products and create HTML for each (existing code)
  productList.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    
    productElement.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.title}">
        <div class="product-text">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.description}</p>
          <span class="product-pay">Зарплатня від</span>
          <div class="product-actions">
            <span class="product-price">${product.price}грн</span>
            <button class="add-to-cart">
              <img class="add-to-cart__img " src="img/look.png">
              Переглянути
            </button>
          </div>
    `;
    
    productsContainer.appendChild(productElement);
  });
}

// ADD EVENT LISTENER FOR BRAZIL CHECKBOX
document.addEventListener('DOMContentLoaded', function() {
  const brazilCheckbox = document.querySelector('#country-brazil');
  if (brazilCheckbox) {
    brazilCheckbox.addEventListener('change', handleBrazilCheckbox);
  }
});

// ADD CSS STYLES FOR ERROR MESSAGE
// Add this CSS to your stylesheet or create a style tag
const errorMessageStyles = `
<style>
.no-products-message {
  text-align: center;
  padding: 60px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
  margin: 40px 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.no-products-message h3 {
  color: #495057;
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
}

.no-products-message p {
  color: #6c757d;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.error-suggestions {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: left;
}

.error-suggestions p {
  margin-bottom: 10px;
  font-weight: 600;
  color: #495057;
}

.error-suggestions ul {
  margin: 0;
  padding-left: 20px;
  color: #6c757d;
}

.error-suggestions li {
  margin-bottom: 8px;
  line-height: 1.4;
}

.reset-filters-btn {
  background: gray;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-filters-btn:hover {
  background: gray;
}

.reset-filters-btn:active {
  transform: translateY(1px);
}
</style>
`;

// Add the CSS styles to the page
document.head.insertAdjacentHTML('beforeend', errorMessageStyles);
  const jobSites = [
            {
                name: 'Robota.ua',
                icon: '🔍',
                url: 'https://robota.ua',
                description: 'Найбільший сайт вакансій в Україні'
            },
            {
                name: 'Work.ua',
                icon: '💼',
                url: 'https://work.ua',
                description: 'Популярний портал пошуку роботи'
            },
            {
                name: 'Djinni',
                icon: '💻',
                url: 'https://djinni.co',
                description: 'IT вакансії та фриланс проекти'
            },
            {
                name: 'DOU.ua',
                icon: '⚡',
                url: 'https://jobs.dou.ua',
                description: 'IT вакансії для розробників'
            },
            {
                name: 'LinkedIn',
                icon: '🔗',
                url: 'https://linkedin.com/jobs',
                description: 'Міжнародна платформа вакансій'
            },
            {
                name: 'Indeed',
                icon: '🌐',
                url: 'https://ua.indeed.com',
                description: 'Глобальний пошук вакансій'
            }
        ];

        function createModal() {
            // Створюємо overlay
            const overlay = document.createElement('div');
            overlay.id = 'modal-overlay';
            overlay.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                backdrop-filter: blur(4px);
            `;

            // Створюємо модальне вікно
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 16px;
                width: 500px;
                max-height: 700px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            `;

            // Заголовок модального вікна
            const header = document.createElement('div');
            header.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 100px;
                width: 90%;
            `;

            const title = document.createElement('h2');
            title.textContent = 'Сайти з вакансіями';
            title.style.cssText = `
                font-size: 20px;
                font-weight: 700;
                color: #333;
                margin: 0;
            `;

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 40px;
                color: #999;
                cursor: pointer;
                border-radius: 4px;
                transition: background-color 0.2s;
            `;
            closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#f0f0f0';
            closeBtn.onmouseout = () => closeBtn.style.backgroundColor = 'transparent';
            closeBtn.onclick = closeModal;

            header.appendChild(title);
            header.appendChild(closeBtn);

            // Тіло модального вікна
            const body = document.createElement('div');
            body.style.cssText = `
                padding: 0;
                height: 400px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 40px;
                width: 90%;
            `;

            // Створюємо елементи для кожного сайту
            jobSites.forEach((site, index) => {
                const item = document.createElement('div');
                item.style.cssText = `
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: ${index === jobSites.length - 1 ? 'none' : '1px solid #f0f0f0'};
                    transition: background-color 0.2s;
                    width: 90%;
                    height: 100px;
                `;
                item.onmouseover = () => item.style.backgroundColor = '#f8f9ff';
                item.onmouseout = () => item.style.backgroundColor = 'transparent';

                const icon = document.createElement('div');
                icon.textContent = site.icon;
                icon.style.cssText = `
                    width: 48px;
                    height: 48px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    background: gray;
                `;

                const info = document.createElement('div');
                info.style.cssText = ``;

                const name = document.createElement('div');
                name.textContent = site.name;
                name.style.cssText = `
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                `;

                const desc = document.createElement('div');
                desc.textContent = site.description;
                desc.style.cssText = `
                    font-size: 14px;
                    color: #666;
                    width: 200px;
                `;

                const visitBtn = document.createElement('button');
                visitBtn.textContent = 'Перейти';
                visitBtn.style.cssText = `
                    background: gray;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                `;
                visitBtn.onmouseover = () => {
                    visitBtn.style.background = '#7859cf';
                    icon.style.background = '#7859cf';
                    icon.style.transform = 'translateY(-1px)';
                    visitBtn.style.transform = 'translateY(-1px)';
                };
                visitBtn.onmouseout = () => {
                    visitBtn.style.background = 'gray';
                    icon.style.background = 'gray';
                    icon.style.transform = 'translateY(0)';
                    visitBtn.style.transform = 'translateY(0)';
                };
                visitBtn.onclick = (e) => {
                    e.stopPropagation();
                    window.open(site.url, '_blank');
                };

                info.appendChild(name);
                info.appendChild(desc);
                item.appendChild(icon);
                item.appendChild(info);
                item.appendChild(visitBtn);
                body.appendChild(item);
            });

            // Футер модального вікна
            const footer = document.createElement('div');
            footer.style.cssText = `
                background: #f8f9fa;
                height: 150px;
                width: 90%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
            `;

            const totalSites = document.createElement('div');
            totalSites.textContent = `Всього сайтів:`;
            totalSites.style.cssText = `
                font-size: 26px;
            `;
            const totalN = document.createElement('div');
            totalN.textContent = `${jobSites.length}`;
            totalN.style.cssText = `
                font-size: 26px;
            `;

            const primaryBtn = document.createElement('button');
            primaryBtn.textContent = 'Закрити';
            primaryBtn.style.cssText = `
                background: #7859cf;
                color: white;
                border: none;
                padding: 12px 32px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: transform 0.2s;
            `;
            primaryBtn.onmouseover = () => primaryBtn.style.transform = 'translateY(-2px)';
            primaryBtn.onmouseout = () => primaryBtn.style.transform = 'translateY(0)';
            primaryBtn.onclick = closeModal;

            footer.appendChild(totalSites);
           footer.appendChild(totalN);
            footer.appendChild(primaryBtn);

            // Збираємо модальне вікно
            modal.appendChild(header);
            modal.appendChild(body);
            modal.appendChild(footer);
            overlay.appendChild(modal);

            // Закриття при кліку на overlay
            overlay.onclick = (e) => {
                if (e.target === overlay) {
                    closeModal();
                }
            };

            document.body.appendChild(overlay);
            return overlay;
        }

        function openModal() {
            let overlay = document.getElementById('modal-overlay');
            if (!overlay) {
                overlay = createModal();
            }
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Додаємо обробник на кнопку
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart') || 
                e.target.closest('.add-to-cart')) {
                openModal();
            }
        });
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('job') || 
                e.target.closest('.job')) {
                openModal();
            }
        });
        // Закриття модального вікна при натисканні Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
// PAGINATION STATE
let paginationState = {
  currentPage: 1,
  itemsPerPage: 6,
  totalPages: 1,
  filteredProducts: []
};

// Function to calculate pagination
function calculatePagination(productList) {
  paginationState.filteredProducts = productList;
  paginationState.totalPages = Math.ceil(productList.length / paginationState.itemsPerPage);
  
  // Reset to page 1 if current page exceeds total pages
  if (paginationState.currentPage > paginationState.totalPages) {
    paginationState.currentPage = 1;
  }
  
  // Ensure current page is at least 1
  if (paginationState.currentPage < 1) {
    paginationState.currentPage = 1;
  }
}

// Function to get products for current page
function getProductsForCurrentPage() {
  const startIndex = (paginationState.currentPage - 1) * paginationState.itemsPerPage;
  const endIndex = startIndex + paginationState.itemsPerPage;
  return paginationState.filteredProducts.slice(startIndex, endIndex);
}

// Function to update pagination controls
function updatePaginationControls() {
  const pagination = document.querySelector('.pagination');
  
  if (paginationState.totalPages <= 1) {
    pagination.style.display = 'none';
    return;
  }
  
  pagination.style.display = 'flex';
  pagination.innerHTML = '';
  
  // Previous button
  const prevBtn = document.createElement('a');
  prevBtn.href = '#';
  prevBtn.className = 'page-nav';
  prevBtn.innerHTML = '❮ Назад';
  prevBtn.onclick = (e) => {
    e.preventDefault();
    if (paginationState.currentPage > 1) {
      paginationState.currentPage--;
      displayCurrentPage();
    }
  };
  
  // Disable if on first page
  if (paginationState.currentPage === 1) {
    prevBtn.style.opacity = '0.5';
    prevBtn.style.pointerEvents = 'none';
  }
  
  pagination.appendChild(prevBtn);
  
  // Page numbers
  for (let i = 1; i <= paginationState.totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.className = 'page-link';
    pageLink.textContent = i;
    
    if (i === paginationState.currentPage) {
      pageLink.classList.add('active');
    }
    
    pageLink.onclick = (e) => {
      e.preventDefault();
      paginationState.currentPage = i;
      displayCurrentPage();
    };
    
    pagination.appendChild(pageLink);
  }
  
  // Next button
  const nextBtn = document.createElement('a');
  nextBtn.href = '#';
  nextBtn.className = 'page-nav';
  nextBtn.innerHTML = 'Вперед ❯';
  nextBtn.onclick = (e) => {
    e.preventDefault();
    if (paginationState.currentPage < paginationState.totalPages) {
      paginationState.currentPage++;
      displayCurrentPage();
    }
  };
  
  // Disable if on last page
  if (paginationState.currentPage === paginationState.totalPages) {
    nextBtn.style.opacity = '0.5';
    nextBtn.style.pointerEvents = 'none';
  }
  
  pagination.appendChild(nextBtn);
}

// Function to display current page products
function displayCurrentPage(shouldScroll = false) {
  const productsForPage = getProductsForCurrentPage();
  displayProducts(productsForPage);
  updatePaginationControls();
  
  // Скрол тільки при зміні сторінки пагінації, не при завантаженні
  if (shouldScroll) {
    const catalogContent = document.querySelector('.catalog-content');
    if (catalogContent) {
      catalogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}