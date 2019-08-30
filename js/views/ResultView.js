import View from './View.js';
import KeywordView from "./KeywordView.js";

const tag = '[ResultView]';

const ResultView = Object.create(View);

ResultView.message = {
    NO_RESULT: '검색 결과가 없습니다'
};

ResultView.setup = function(el){
    this.init(el);
    return this;
};

ResultView.render = function(data = []){
    this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.message.NO_RESULT;
    this.bindClickEvent();
    this.show();
};

ResultView.bindClickEvent = function () {
    Array.from(this.el.querySelectorAll('#search-result li')).forEach(li => {
        li.addEventListener('click', (e) => this.onClickKeyword(e))
    })
};

ResultView.onClickKeyword = function (e) {
    // const { keyword } = e.currentTarget.dataset;
    const keyword = e.currentTarget;
    this.emit('@click', { keyword })
};

// KeywordView.onClickKeyword = function (e) {
//     console.log('e.currentTarget.dataset : ', e.currentTarget.dataset);
//     const { keyword } = e.currentTarget.dataset;
//     this.emit('@click', { keyword })
// };

ResultView.getSearchResultsHtml = function(data){
    return data.reduce((html, item) => {
        html += this.getSearchItemHtml(item)
        return html
    }, '<ul>') + '</ul>'
};

ResultView.getSearchItemHtml = function(item){
    return `<li>
                <img src="${item.image}">
                <p class="title">${item.name}</p>
            </li>`
    };

export default ResultView
