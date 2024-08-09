let library_management_form = document.getElementById('library_management_form');
let searchInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');


library_management_form.addEventListener('keydown', function(event) {

    function append_search_results(book_author, book_image_link, book_title) {

        let book_container = document.createElement("div");
        let image_el = document.createElement('img');
        image_el.src = book_image_link;
        book_container.appendChild(image_el);
        let p_el = document.createElement('p');
        p_el.textContent = book_author;
        book_container.appendChild(p_el);

        searchResults.appendChild(book_container);
    }

    if (event.key === "Enter"); {
        spinner.classList.toggle("d-none");

        searchResults.textContent = "";

        let searchInput_value = searchInput.value;

        let options = {
            method: "GET"
        };

        fetch("https://apis.ccbp.in/book-store?title=" + searchInput_value, options)
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                let parsedata = JSON.parse(data);
                for (let book_object of parsedata.search_results) {
                    let book_author = book_object.author;
                    let book_image_link = book_object.imageLink;
                    let book_title = book_object.title;
                    append_search_results(book_author, book_image_link, book_title);
                }
            });

    }
})
