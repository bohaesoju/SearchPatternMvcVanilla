import View from './View.js';

const tag = '[HomeView]';

const HomeView = Object.create(View);

HomeView.setup = function(el){
    this.init(el);
    el.addEventListener('click', e => this.onClickReset(e));
    return this
};

HomeView.onClickReset = function(){
    this.emit('@click');
    // this.showResetBtn(false);
};

export default HomeView;
