// Универсальная функция для открытия деталей
function openContentDetails(title, imageUrl, contentType) {
  console.log(`Opening ${contentType}:`, title);
  
  try {
    // Проверка данных
    if (!title || !imageUrl || !contentType) {
      throw new Error("Missing required parameters");
    }

    // Создаем объект с данными
    const contentData = {
      title: title,
      image: imageUrl,
      type: contentType
    };

    // Сохраняем данные в localStorage в том же формате, что и поиск
    localStorage.setItem('selectedAnime', JSON.stringify(contentData));
    
    // Очищаем старые отдельные ключи для совместимости
    localStorage.removeItem('selectedTitle');
    localStorage.removeItem('selectedImage');
    localStorage.removeItem('contentType');
    
    // Перенаправляем
    const page = contentType === 'anime' 
      ? 'anime-details.html' 
      : 'film-details.html';
    
    window.location.href = page;
  } catch (error) {
    console.error('Error in openContentDetails:', error);
    alert('Произошла ошибка при загрузке страницы');
  }
}

// Прокрутка карусели
function scrollCarousel(id, direction) {
  const carousel = document.getElementById(id);
  if (carousel) {
    carousel.scrollBy({ 
      left: direction * 220, 
      behavior: 'smooth' 
    });
  }
}

// Слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const backgrounds = document.querySelectorAll('.slide-bg');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  backgrounds.forEach(bg => bg.classList.remove('active'));

  slides[index].classList.add('active');
  backgrounds[index].classList.add('active');
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide(currentSlide);
}

setInterval(() => {
  changeSlide(1);
}, 5000);

// Карусель
function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  carousel.scrollBy({ left: direction * 220, behavior: 'smooth' });
}

// Открытие страницы с описанием
// Открытие страницы с описанием (работает для аниме и фильмов)
function openAnimeDetails(title, imageUrl, contentType) {
  try {
    // Создаем объект с данными аниме
    const animeData = {
      title: title,
      image: imageUrl,
      type: contentType
    };
    
    // Сохраняем данные в localStorage в том же формате, что и поиск
    localStorage.setItem('selectedAnime', JSON.stringify(animeData));
    
    // Очищаем старые отдельные ключи для совместимости
    localStorage.removeItem('selectedTitle');
    localStorage.removeItem('selectedImage');
    localStorage.removeItem('contentType');

    // Перенаправляем на соответствующую страницу
    if (contentType === 'anime') {
      window.location.href = 'anime-details.html';
    } else if (contentType === 'film') {
      window.location.href = 'film-details.html';
    }
  } catch (error) {
    console.error('Error in openAnimeDetails:', error);
    alert('Произошла ошибка при загрузке аниме.');
  }
}

// Делаем функции глобальными
window.openContentDetails = openContentDetails;
window.scrollCarousel = scrollCarousel;