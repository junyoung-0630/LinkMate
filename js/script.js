/*스와이퍼 호출*/

const view = new Swiper("#main_view",{
    //스와이퍼 옵션설정
    wrapperClass:"slide",
    slideClass:"view",
    slideActiveClass:"active",
    effect:"fade",
    speed:800,
    loop:true,
    autoplay:{
        //자동전환
        delay:2000, //2초마다 전환됨.
    },
    pagination:{
        el:".pager",
        bulletActiveClass:"active",
        clickable:true,
},
    navigation:{
        nextEl: '.next',
        prevEl: '.prev',
    },
});


/*요쇼복제하기*/
var menu = $("#gnb > ul").clone();//대상을 복제함.

$("#main_menu").append(menu);//복제된 요소를 마지막에 넣음.

$("#main_menu a").addClass("arrow");//클래스부여

var sns = $(".sns").clone();

$("footer").prepend(sns);//복제된 요소를 앞에 넣음.