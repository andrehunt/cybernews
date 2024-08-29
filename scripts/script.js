document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');

    // List of sources (APIs or custom endpoints)
    const sources = [
        {
            url: 'https://newsapi.org/v2/everything?q=cybersecurity&sortBy=publishedAt&apiKey=YOUR_API_KEY',
            name: 'Cybersecurity'
        },
        {
            url: 'https://newsapi.org/v2/everything?q=IT&sortBy=publishedAt&apiKey=YOUR_API_KEY',
            name: 'IT News'
        }
    ];

    function fetchNews() {
        sources.forEach(source => {
            fetch(source.url)
                .then(response => response.json())
                .then(data => {
                    displayNews(data.articles, source.name);
                })
                .catch(error => {
                    console.error(`Error fetching news from ${source.name}:`, error);
                });
        });
    }

    function displayNews(articles, sourceName) {
        articles.forEach(article => {
            // Check if article already exists (optional, to avoid duplicates)
            if (document.getElementById(article.url)) return;

            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');
            articleElement.setAttribute('id', article.url);
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description || ''}</p>
                <p><strong>Source:</strong> ${sourceName}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.insertBefore(articleElement, newsContainer.firstChild);
        });
    }

    // Initial fetch
    fetchNews();

    // Fetch every 5-10 minutes
    setInterval(fetchNews, 300000); // 300000ms = 5 minutes
});

