document.addEventListener('DOMContentLoaded', () => {
    const libraryManagementForm = document.getElementById('library_management_form');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const spinner = document.getElementById('spinner');

    // Function to create and append search result elements
    function appendSearchResults(bookAuthor, bookImageLink, bookTitle) {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container'); // Add a class for styling

        const imageEl = document.createElement('img');
        imageEl.src = bookImageLink;
        imageEl.alt = `Cover image of ${bookTitle}`;
        imageEl.classList.add('book-image'); // Add a class for styling
        bookContainer.appendChild(imageEl);

        const pEl = document.createElement('p');
        pEl.textContent = `Author: ${bookAuthor}`;
        pEl.classList.add('book-author'); // Add a class for styling
        bookContainer.appendChild(pEl);

        searchResults.appendChild(bookContainer);
    }

    // Event listener for search input
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission

            spinner.classList.remove('d-none'); // Show spinner
            searchResults.innerHTML = ''; // Clear previous results

            const searchInputValue = searchInput.value.trim();
            if (!searchInputValue) return; // Exit if input is empty

            fetch(`https://apis.ccbp.in/book-store?title=${encodeURIComponent(searchInputValue)}`)
                .then(response => response.json()) // Parse response as JSON
                .then(data => {
                    if (data.search_results) {
                        data.search_results.forEach(book => {
                            const { author, imageLink, title } = book;
                            appendSearchResults(author, imageLink, title);
                        });
                    } else {
                        searchResults.textContent = 'No results found';
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    searchResults.textContent = 'Error fetching data';
                })
                .finally(() => {
                    spinner.classList.add('d-none'); // Hide spinner
                });
        }
    });
});
