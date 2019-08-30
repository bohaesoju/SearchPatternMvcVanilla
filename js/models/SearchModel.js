const data = [
    {
        id: 1,
        name: '[키친르쎌] 홈메이드 칠리소스 포크립 650g',
        image: 'https://placeimg.com/300/300/any'
    },
    {
        id: 2,
        name: '[키친르쎌] 이탈리아 파티 세트 3~4인분',
        image: 'https://upload.wikimedia.org/wikipedia/ko/thumb/b/bd/%EB%94%94%EC%9B%8C.jpg/250px-%EB%94%94%EC%9B%8C.jpg'
    }
];

export const viewData = {
    name: '이탈리아 파스타',
    image: 'https://placeimg.com/300/300/any'
};

export default {
    list(query) {
        return new Promise(res => {
            setTimeout(()=> {
                res(data)
            }, 200);
        })
    }
}
