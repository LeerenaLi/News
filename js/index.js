import {blogSearch,
    countryBtn,
    countryWrapper,
    formSearch,
    searchSection,
    wrapperFreshNews,
    wrapperSearchNews} from './modules/const.js';
import fetchRequest from './modules/fetchRequest.js';
import preload from './modules/preload.js';
import {renderNews, renderSearch} from './modules/renderNews.js';


const init = (lang, searchValue) => {
    preload.show();
    return Promise.all([
        fetchRequest(`top-headlines?country=${lang}`, {
            callback: renderNews,
        }),
        fetchRequest(`everything?q=${searchValue}`, {
            callback: renderSearch,
        }),
    ]);
};

init('us').then(data => {
    preload.remove();
    wrapperFreshNews.append(data[0]);
});

formSearch.addEventListener('submit', e => {
    e.preventDefault();

    const searchValue = formSearch.search.value.trim();

    if (searchValue !== '') {
        init('us', searchValue).then(data => {
            const listSearch = data[0];
            const listItems = listSearch.querySelectorAll('li');
            Array.from(listItems).forEach((listItem, index) => {
                if (index > 3) {
                    listItem.parentNode.removeChild(listItem);
                }
            });

            searchSection.style.display = 'block';
            blogSearch.style.display = 'block';
            wrapperSearchNews.append(data[1]);
            wrapperFreshNews.append(listSearch);
            formSearch.reset();
        });
    }
});


//

countryBtn.addEventListener('click', () => {
    countryWrapper.classList.add('country__wrapper_open');
});

countryWrapper.addEventListener('click', ({target}) => {
    if (target.closest('.country__option')) {
        init(target.value).then(data => {
            preload.remove();
            countryWrapper.classList.remove('country__wrapper_open');
            wrapperFreshNews.append(data[0]);
            searchSection.style.display = 'none';
        });
    }
});

