$(document).ready(function() {
    if($('.slider').length) {
        $('.slider').slick({
            dots: false,
            arrows: false
        });
    }

    // цвет категорий на главной
    $('.category_main .category_main__item').each(function () {
        let color = $(this).data('color');

        $(this).css('border-color', color);
        $(this).find('.category_main__item-name').css('color', color);
        $(this).find('.category_main__item-name path').css('fill', color);
    })

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
    }

    if(('#map').length) {
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
    }
});
