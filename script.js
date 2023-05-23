// https://the-one-api.dev/
// const BASE_URL = "https://the-one-api.dev/v2";
// const ENDPOINT = "/movie";
// Access token: W1GmuFvxEXzEf8rw1QeH;

// Варіант 1
// const option = {
//     // method: 'GET',
//     headers: {
//         Autorization: 'Bearer ${TOKEN}'
//     }
// }

// fetch ('${BASE_URL}${ENDPOINT}',option)
// .then(resp=>console.log(resp))

// Варіант 2 не створювати об'єкт опцій, а прокинути напряму (погана читаємість)
// fetch ('${BASE_URL}${ENDPOINT}', {
//     headers: {
//         Autorization: 'Bearer ${TOKEN}'
//     }
// })
// .then(resp=>console.log(resp))







// -----------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://developer.themoviedb.org/reference/trending-all
//https://developer.themoviedb.org/reference/collection-images





const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT = "/trending/movie/week";
const API_KEY = "345007f9ab440e5b86cef51be6397df1";
const IMG_PATH = "https://image.tmdb.org/t/p/w300";
const guard = document.querySelector('.js-guard')

const list = document.querySelector('.js-list');

// --------отримали кнопку 
const loadMore = document.querySelector('.js-load-more');
let page = 1;
let options = {
    root: null,
    rootMargin: "400px",
    threshold: 0,
};

let observer = new IntersectionObserver(handlerPagination, options);




// -------------додали прослуховувача подій
loadMore.addEventListener('click', handlerPagination)

// Для її колбеку вказуємо, що щоразу по кліку ми оновлюємо глобальну зміну page

function handlerPagination(){
    page += 1;
    serviceMovie(page)
    .then (data => {
    list.insertAdjacentHTML ('beforeend', createMarkup(data.results))
    if (data.total_pages <= data.page) {
        loadMore.hidden = true;
    } 
})
.catch(err =>console.log(err))
}



    function serviceMovie(page = 1) {
            return fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=${page}`)
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error(resp.statusText);
                    }
        
                    return resp.json()
                })
                
        }

serviceMovie()
.then(data => {
    list.insertAdjacentHTML('beforeend', createMarkup(data.results))
    if (data.total_pages > data.page) {
        loadMore.hidden = false;
    } 
})
.catch(err =>console.log(err))
// ---------------Створюємо розмітку-------------
    


function createMarkup(arr) {
    return arr.map(({ original_title, poster_path, vote_average }) => `<li>
    <img src="${IMG_PATH + poster_path}" alt="${original_title}">
    <div class="movie-info">
    <h3>${original_title}</h3>
    <span class="vote"/>${vote_average}</span>
    </div>
</li>`).join('')
}
 







