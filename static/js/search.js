(function () {
  const panel = document.querySelector('[data-search-panel]');
  if (!panel) return;

  const openButtons = document.querySelectorAll('[data-search-open]');
  const closeButton = panel.querySelector('[data-search-close]');
  const input = panel.querySelector('[data-search-input]');
  const resultsContainer = panel.querySelector('[data-search-results]');
  const emptyState = panel.querySelector('[data-search-empty]');

  let index = [];
  let hasLoaded = false;

  async function loadIndex() {
    if (hasLoaded) return index;
    try {
      const response = await fetch('/index.json');
      index = await response.json();
      hasLoaded = true;
    } catch (error) {
      console.error('Search index failed to load', error);
    }
    return index;
  }

  function openPanel() {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    loadIndex().then(() => {
      input.value = '';
      renderResults([]);
      emptyState.textContent = 'Start typing to find posts.';
      emptyState.hidden = false;
      input.focus();
    });
  }

  function closePanel() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  }

  function renderResults(items) {
    resultsContainer.innerHTML = '';
    if (!items.length) {
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    items.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'search-result';
      article.innerHTML = `
        <a href="${item.url}">
          <p class="search-result__title">${item.title}</p>
          <p class="search-result__meta">${item.date}${item.readingTime ? ` · ${item.readingTime} min read` : ''}</p>
          <p>${item.description}</p>
        </a>
      `;
      resultsContainer.appendChild(article);
    });
  }

  function filterIndex(query) {
    if (!query) {
      renderResults([]);
      emptyState.textContent = 'Start typing to find posts.';
      emptyState.hidden = false;
      return;
    }

    const normalized = query.toLowerCase();
    const matches = index.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized) ||
        (item.tags || []).join(' ').toLowerCase().includes(normalized)
      );
    });

    if (!matches.length) {
      emptyState.textContent = 'No matches yet. Try another keyword.';
      emptyState.hidden = false;
      resultsContainer.innerHTML = '';
      return;
    }

    renderResults(matches.slice(0, 10));
  }

  openButtons.forEach((btn) => btn.addEventListener('click', openPanel));
  closeButton.addEventListener('click', closePanel);
  panel.addEventListener('click', (event) => {
    if (event.target === panel) {
      closePanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
    }
  });

  input.addEventListener('input', (event) => {
    filterIndex(event.target.value);
  });
})();
