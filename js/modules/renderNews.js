import {titleSearch, wrapperFreshNews, wrapperSearchNews} from './const.js';


const createCards = (data, count = 8) => {
    const cards = data.slice(0, count).map((item) => {
        const card = document.createElement('li');
        card.className = 'blog__item card';
        card.innerHTML = `
        <img src="${item.urlToImage !== null ? item.urlToImage : '../../img/unsplash.jpg'}"
            onerror="this.src='../../img/unsplash.jpg'"
            alt="${item.title}" class="card__img">
        
            <a href="${item.url}" class="card__link" target="_blank">
                <div class="card__text">
                    <h3 class="card__title">${item.title}</h3>
                    <p class="card__description">${item.description !== null ? item.description : ''}</p>
                </div>
            </a>
            <div class="card__info">
                <p class="card__data">${item.publishedAt.slice(0, 10)}</p>
                <p class="card__time">${item.publishedAt.slice(11, 16)}</p>
                <p class="card__autor">${item.author !== null ? item.author : ''}</p>
            </div>
        
        `;

        return card;
    });
    return cards;
};


export const renderSearch = async (err, data, postfix) => {
    if (data) {
        data = await data.articles;
    }

    if (err) {
        console.warn(err, data);
        return;
    }

    const request = postfix.replace('everything?q=', '');
    console.log('request: ', request);

    wrapperSearchNews.textContent = '';

    if (data.length < 1) {
        titleSearch.textContent = `По вашему запросу ничего не найдено`;
    } else {
        titleSearch.textContent =
            `По вашему запросу "${request}" найдено ${data.length > 8 ? 8 : data.length} результатов`;
    }

    const searchNewsList = document.createElement('ul');
    searchNewsList.classList.add('blog__list', 'blog__list_search');

    const cards = createCards(data, 8);

    searchNewsList.append(...cards);

    return searchNewsList;
};


export const renderNews = (err, data, postfix) => {
    console.log('data: ', data);
    data = data.articles;
    if (err) {
        console.warn(err, data);
        return;
    }

    wrapperFreshNews.textContent = '';

    const freshNewsList = document.createElement('ul');
    freshNewsList.classList.add('blog__list');

    const cards = createCards(data, 12);

    freshNewsList.append(...cards);

    return freshNewsList;
};

