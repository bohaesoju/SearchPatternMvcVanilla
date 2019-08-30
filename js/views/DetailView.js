import View from './View.js';

const tag = '[DetailView]';

const DetailView = Object.create(View);

DetailView.message = {
    NO_RESULT: '검색 결과가 없습니다'
};

DetailView.setup = function(el){
    this.init(el)
};

DetailView.render = function(data){
    console.log(tag, 'render()', data);
    this.el.innerHTML = this.getDetailItemHtml(data[0]);
    // this.el.innerHTML = data.length ? this.getDetailItemHtml(data) : this.message.NO_RESULT;
    this.show();
};

DetailView.getDetailItemHtml = function(item){
    return `<ul>
                <li>
                    <img src="${item.image}">
                    <p class="title">${item.name}</p>
                </li>
            </ul>`
        };

export default DetailView
