$(document).ready(function() {
    $('.slider').slick({
        dots: false,
        arrows: false
    });

    // цвет категорий на главной
    $('.category_main .category_main__item').each(function () {
        let color = $(this).data('color');

        $(this).css('border-color', color);
        $(this).find('.category_main__item-name').css('color', color);
        $(this).find('.category_main__item-name path').css('fill', color);
    })

    //Слайдер партнеров
    $('.partners__slider').slick({
        slidesToShow: 6,
        dots: false,
        arrows: true
    });

    //одинаковая высота новостей
    if($('.news').length) {
        $('.news .news__item .news__item-content').matchHeight();
    }
});
