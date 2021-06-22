$(document).ready(function() {
    if($('.slider').length) {
        $('.slider').slick({
            dots: false,
            arrows: false
        });
    }

    // цвет категорий на главной
    if($('.category_main').length) {
        $('.category_main .category_main__item').each(function () {
            let color = $(this).data('color');
    
            $(this).css('border-color', color);
            $(this).find('.category_main__item-name').css('color', color);
            $(this).find('.category_main__item-name path').css('fill', color);
        });
    }
    

    // цвет категорий на странице 
    if($('.catalog__menu').length) {
        $('.catalog__menu .catalog__menu-item').each(function () {
            let color = $(this).data('color');
    
            $(this).children('a').css('border-color', color);
            
        });
    };

    //аккордион категорий 
    if($('.catalog__menu').length) {
        $('.catalog__menu .catalog__menu-item .drop').click(function() {

            $(this).closest('.catalog__menu-item').toggleClass('active');
            $(this).siblings('.catalog__menu-sub').slideToggle();
        })
    }

    //переключение цветов на странице категории
    if($('.catalog__item-color .item').length) {
        $('.catalog__item-color .item').click(function() {
            let colorItemIndex = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).closest('.catalog__item').find('.catalog__item-img').find('img').removeClass('active').eq(colorItemIndex).addClass('active')
        })
    }

    //Слайдер партнеров
    if($('.partners__slider').length) {
        $('.partners__slider').slick({
            slidesToShow: 6,
            dots: false,
            arrows: true
        });
    }

    //одинаковая высота новостей
    if($('.news').length) {
        $('.news .news__item .news__item-content').matchHeight();
    };

    if($('#map').length) {
        ymaps.ready(init);
        function init(){
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                center: [59.85120307488966,30.30813975396727],
                controls: ['geolocationControl'],                
                zoom: 16
            });

            var myPlacemark = new ymaps.Placemark([59.85120307488966,30.30813975396727], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/icons/map-marker.png',
                iconImageSize: [55, 57],
                iconImageOffset: [-28, -45]
            });

            myMap.geoObjects.add(myPlacemark);
        }
    };

    //Наведение на блоке НАШИ МЕНЕДЖЕРЫ
    if($('.team').length) {
        $('.team__item').each(function() {
            if($(this).find('.team__item-img .hover').length) {
                $(this).hover(function() {
                    $(this).find('.team__item-img').addClass('animate');
                }, function() {
                    $(this).find('.team__item-img').removeClass('animate')
                });
            }
            
        });
        
    }
});
