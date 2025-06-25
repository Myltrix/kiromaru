document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchError = document.getElementById('searchError');
  
  // Create search dropdown if it doesn't exist
  let searchDropdown = document.getElementById('searchDropdown');
  if (!searchDropdown) {
    searchDropdown = document.createElement('div');
    searchDropdown.id = 'searchDropdown';
    searchDropdown.className = 'search-dropdown';
    searchDropdown.style.display = 'none';
    
    // Insert dropdown after search input
    const searchContainer = searchInput?.parentElement;
    if (searchContainer) {
      searchContainer.appendChild(searchDropdown);
    }
  }

  // Real-time search as user types
  searchInput?.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    
    if (searchTerm.length >= 1) {
      const matches = searchAnime(searchTerm);
      showSearchResults(matches);
    } else {
      hideSearchResults();
    }
  });

  // Handle Enter key for direct navigation
  searchInput?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const searchTerm = this.value.trim().toLowerCase();
      if (searchTerm) {
        const matches = searchAnime(searchTerm);
        if (matches.length > 0) {
          // Navigate to first match
          selectAnime(matches[0]);
        } else {
          // Check current page to show appropriate error message
          const currentPage = window.location.pathname;
          const isFilmsPage = currentPage.includes('films.html');
          const contentType = isFilmsPage ? 'фильм' : 'аниме';
          showError(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} не найден. Попробуйте другой запрос.`);
        }
      }
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!searchInput?.contains(e.target) && !searchDropdown?.contains(e.target)) {
      hideSearchResults();
    }
  });

  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideSearchResults();
      searchInput?.blur();
    }
  });

  function searchAnime(term) {
    if (!animeDatabase) return [];
    
    return animeDatabase.filter(item => 
      item.title.toLowerCase().includes(term)
    ).slice(0, 8); // Limit to 8 results
  }

  function showSearchResults(matches) {
    if (!searchDropdown) return;
    
    if (matches.length === 0) {
      searchDropdown.innerHTML = '<div class="search-no-results">Ничего не найдено</div>';
    } else {
      const resultsHTML = matches.map(anime => `
        <div class="search-result-item" onclick="selectAnime(${JSON.stringify(anime).replace(/"/g, '&quot;')})">
          <img src="${anime.image}" alt="${anime.title}" class="search-result-image">
          <div class="search-result-info">
            <div class="search-result-title">${anime.title}</div>
            <div class="search-result-type">${anime.type === 'anime' ? 'Аниме-сериал' : 'Аниме-фильм'}</div>
          </div>
        </div>
      `).join('');
      
      searchDropdown.innerHTML = resultsHTML;
    }
    
    searchDropdown.style.display = 'block';
  }

  function hideSearchResults() {
    if (searchDropdown) {
      searchDropdown.style.display = 'none';
    }
  }

  function selectAnime(anime) {
    try {
      // Save anime data
      localStorage.setItem('selectedAnime', JSON.stringify(anime));
      
      // Clear search
      if (searchInput) {
        searchInput.value = '';
      }
      
      // Hide dropdown
      hideSearchResults();
      
      // Navigate to appropriate details page based on content type
      if (anime.type === 'film') {
        window.location.href = 'film-details.html';
      } else {
        window.location.href = 'anime-details.html';
      }
    } catch (error) {
      console.error('Error selecting anime:', error);
      // Check current page to show appropriate error message
      const currentPage = window.location.pathname;
      const isFilmsPage = currentPage.includes('films.html');
      const contentType = isFilmsPage ? 'фильма' : 'аниме';
      showError(`Произошла ошибка при загрузке ${contentType}.`);
    }
  }

  function showError(message) {
    if (searchError) {
      searchError.textContent = message;
      searchError.style.display = 'block';
      setTimeout(() => {
        searchError.style.display = 'none';
      }, 3000);
    }
  }

  // Make selectAnime function globally available
  window.selectAnime = selectAnime;
});