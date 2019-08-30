import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';
import HistoryView from '../views/HistoryView.js';
import DetailView from '../views/DetailView.js';
import HomeView from '../views/HomeView.js';

import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryModel from "../models/HistoryModel.js";

const tag = '[MainController]';

export default {
    init() {
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm());

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword));

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword));

        ResultView.setup(document.querySelector('#search-result'))
            .on('@click', (e) => this.onClickDetail(e.detail.keyword));

        DetailView.setup(document.querySelector('#search-detail'));

        HomeView.setup(document.querySelector('.gohome'))
            .on('@click', e => this.onResetForm());

        this.selectedTab = '추천 검색어';
        this.renderView()
    },

    renderView(){
        console.log(tag, 'RenderView');
        TabView.setActiveTab(this.selectedTab);

        if(this.selectedTab === '추천 검색어'){
            this.fetchSearchKeyword();
            HistoryView.hide();
            DetailView.hide()
        } else {
            this.fetchSearchHistory();
            KeywordView.hide();
            DetailView.hide()
        }
        ResultView.hide();
    },

    fetchSearchKeyword(){
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },

    fetchSearchHistory(){
        HistoryModel.list().then(data => {
            HistoryView.render(data).bindRemoveBtn()
        })
    },

    search(query){
        console.log('search query : ', query);
        FormView.setValue(query);
        HistoryModel.add(query);
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })
    },

    detail(query){
        console.log('detail query : ', query);
        FormView.setValue('');
        SearchModel.list(query).then(data => {
            this.onSearchDetail(data)
        })
        // this.onSearchDetail(SearchModel.viewData)
    },

    onSubmit(input){
        console.log(tag, 'onSubmit()', input);
        this.search(input)
    },

    onResetForm(){
        this.renderView()
    },

    onSearchResult(data){
        TabView.hide();
        KeywordView.hide();
        HistoryView.hide();
        ResultView.render(data)
    },

    onSearchDetail(data){
        console.log('onSearchDetail data : ', data);
        TabView.hide();
        KeywordView.hide();
        HistoryView.hide();
        ResultView.hide();
        DetailView.render(data)
    },

    onChangeTab(tabName){
        this.selectedTab = tabName;
        this.renderView();
    },

    onClickKeyword(keyword) {
        this.search(keyword)
    },

    onClickHistory(keyword){
        this.search(keyword)
    },

    onClickDetail(keyword){
        console.log('keyword', keyword);
        this.detail(keyword)
    },

    onRemoveHistory(keyword){
        HistoryModel.remove(keyword);
        this.renderView()
    }
}
