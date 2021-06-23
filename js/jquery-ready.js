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

        $('.catalog__menu .catalog__menu-item.current').addClass('active').find('.catalog__menu-sub').slideDown();
      
    }

    //клик по чекбоксам и радиокнопкам
    if($('.filter').length) {
        //счетчик для показа цифры в кнопке "Сбросить"
        let resetCount = 0;

        $('.filter__checkbox input').click(function() {
            if($(this).is(':checked')) {
                $(this).prop('checked', true).attr('checked', 'checked');
                resetCount++;
            } else {
                $(this).prop('checked', false).removeAttr('checked');
                resetCount--;
            }
           console.log(resetCount) 
        });

        $('.filter__radio input').click(function() {
            
            if($(this).is(':checked')) {
                $(this).prop('checked', true).attr('checked', 'checked');
                $(this).parent().siblings().find('input').prop('checked', false).removeAttr('checked');
            };            
        });
    }
    
    

    //диапазон в каталоге
    if($('.filter').length) {        

        $(".js-range-slider").each(function() {
            let inputFrom = $(this).siblings('.filter__range-row').find('.filter__range-input_from');
            let inputTo = $(this).siblings('.filter__range-row').find('.filter__range-input_to');
            $(this).ionRangeSlider({
                hide_from_to: true,
                hide_min_max: true,
                skin: "round",
    
                onStart: function (data) {
                    inputFrom.val(data.from);
                    inputTo.val(data.to)
                },

                onChange: function (data) {
                    inputFrom.val(data.from);
                    inputTo.val(data.to)
                },

                onFinish: function (data) {
                    inputFrom.val(data.from);
                    inputTo.val(data.to)
                }
            });

            let range = $(this).data("ionRangeSlider");

            inputFrom.on('change', function() {
                let value = $(this).val();
                //минимальное возможное значение для ввода
                let minValue = range.options.min.toString();
                //максимальное возможное значение для ввода
                let maxValue = range.options.max.toString();  
                
                if (value == "") {                    
                    $(this).val("0")
                } else if (value >= maxValue) {
                    $(this).val(maxValue);
                }
                range.update({
                    from: value
                })
            })

            inputTo.on('change', function() {
                let value = $(this).val();
                //минимальное возможное значение для ввода
                let minValue = range.options.min.toString();
                //максимальное возможное значение для ввода
                let maxValue = range.options.max.toString();  
                
                if (value == "") {                    
                    $(this).val("0")
                } else if (value >= maxValue) {
                    $(this).val(maxValue);
                }

                range.update({
                    to: $(this).val()
                })
            })
        });

        $('.filter__range-input').on('input', function() {
            $(this).val($(this).val().replace(/\D/, ''));
        });
    }    

    //кнопка reset в фильтре
    if($('.filter').length) {
        //очистка
        $('button[type="reset"]').click(function() {
            $('.filter').find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');
            $('.filter').find('input[type="radio"]').prop('checked', false).removeAttr('checked');
        }); 
        
    }

    //октрытие/скрытие фильтров
    if($('.filter').length) {
        $('.filter .filter__item .drop').click(function() {

            $(this).closest('.filter__item').toggleClass('active');
            $(this).siblings('.filter__item-content').slideToggle();
        })
    }

    //переключение цветов на странице категории и в сайдбаре
    if($('.catalog__item-color .item').length || $('.similar__item-color .item').length) {
        $('.catalog__item-color .item, .similar__item-color .item').click(function() {
            let colorItemIndex = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).closest('.catalog__item').find('.catalog__item-img').find('img').removeClass('active').eq(colorItemIndex).addClass('active')
        });

        $('.similar__item-color .item').click(function() {
            let colorItemIndex = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).closest('.similar__item').find('.similar__item-img').find('img').removeClass('active').eq(colorItemIndex).addClass('active')
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
