$(document).ready(function() {

    if($('.slider').length) {
        $('.slider').slick({
            dots: false,
            arrows: false
        });

        //положение курсора в элементе
        $('.slider').mousemove(function (e) {
            let parentOffset = $(this).offset();
            let relX = e.pageX - parentOffset.left;
            let relY = e.pageY - parentOffset.top;
            let parentWidth = $(this).width();

            if(relX >= (parentWidth / 2)) {
                $('.slider').removeClass('left').addClass('right');
            } else {
                $('.slider').removeClass('right').addClass('left');
            }

        });

        $('.slider').on('click', function(e) {
            let target = e.target;

            if($(this).hasClass('right') && !($(target).hasClass('slider__item-link'))) {
                $('.slider').slick('slickNext')
            }
            if($(this).hasClass('left') && !($(target).hasClass('slider__item-link'))) {
                $('.slider').slick('slickPrev')
            }            
        })
    }

    //десктопное меню
    $('.header__menu .header__menu-drop').click(function () {
        $(this).toggleClass('active').next().slideToggle();
    });

    //Мобильное меню

    if (window.innerWidth <= 992) {
        let desktopMenu = $('.header__menu');
        let headerIcons = $('.header__wrap .icons');
        let mobileMenuClose = document.createElement('div');
        let mobileMenuCloseSvg = $('.header__wrap .form.small .form__close svg');
        let mobileMenu = document.createElement('div');
        let mobileMenuContent = document.createElement('div');
        
        $(mobileMenu).addClass('mobile-menu').appendTo('.header__wrap');
        $(mobileMenuContent).addClass('mobile-menu__content').appendTo('.mobile-menu');
        $(mobileMenuClose).addClass('mobile-menu__close').appendTo('.mobile-menu__content');
        mobileMenuCloseSvg.clone().appendTo('.mobile-menu__close')
        desktopMenu.detach().appendTo('.mobile-menu__content');
        headerIcons.detach().appendTo('.mobile-menu__content');
        
    }

    //Открытие/закрытие мобильного меню
    $('.burger').click(function() {
        $('body').addClass('opacity-layer no-scroll');
        $('.mobile-menu').show("slide", { direction: "right" }, 500);
    });

    $('.mobile-menu__close').click(function() {
        $('body').removeClass('opacity-layer');
        $('.mobile-menu').hide("slide", { direction: "right" }, 500);
    })

    //открытие/закрытие поиска
    $('.header__wrap .icons .search').click(function() {
        $('body').addClass('opacity-layer');
        $('.form.small').fadeOut();
        $('.search-block').slideDown();

        if (window.innerWidth <= 992) {           
           
            $('.mobile-menu').hide("slide", { direction: "right" }, 500);
        }
    });

    $('body').click(function(e) {
        let target = e.target;
       
        if ($(target).hasClass('opacity-layer') && $('.search-block').css('display') == 'block') {
            $('body').removeClass('opacity-layer');
            $('.search-block').slideUp();
        }
        
    })

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
        let resetCount;

        $('.filter__item input').click(function() {
            let inputCheckedLength = $('.filter__item input:checked').length
            let rangeChangeTrueLength = $(".js-range-slider[data-change='true']").length;

            resetCount = inputCheckedLength + rangeChangeTrueLength;

            if (resetCount >= 1) {            
                $('.catalog__sidebar-name.parameters button[type="reset"] .count').text(resetCount);
                $('.catalog__sidebar-name.parameters button[type="reset"]').fadeIn();
            } else {
                $('.catalog__sidebar-name.parameters button[type="reset"]').fadeOut();
            }
        });

        

        // чекбоксы
        $('.filter__checkbox input').click(function() {

            if($(this).is(':checked')) {
                $(this).prop('checked', true).attr('checked', 'checked');                
            } else {
                $(this).prop('checked', false).removeAttr('checked');
            }
        });

        //радио
        $('.filter__radio input').click(function() {   
            
            if($(this).is(':checked')) {
                $(this).prop('checked', true).attr('checked', 'checked');
                $(this).parent().siblings().find('input').prop('checked', false).removeAttr('checked');
            };            
        });

        //диапазон в каталоге
       
        $(".js-range-slider").each(function() {
            let inputFrom = $(this).siblings('.filter__range-row').find('.filter__range-input_from');
            let inputTo = $(this).siblings('.filter__range-row').find('.filter__range-input_to');
            let item = $(this);
            

            $(this).ionRangeSlider({
                hide_from_to: true,
                hide_min_max: true,
                skin: "round",
    
                onStart: function (data) {
                    inputFrom.val(data.from);
                    inputTo.val(data.to);
                },

                onChange: function (data) {
                    inputFrom.val(data.from);
                    inputTo.val(data.to);

                    
                    if(resetCount != undefined) {  
                        
                        if(data.from != data.min || data.to != data.max) {
                            item.attr('data-change', true);
                        } else {
                            item.attr('data-change', false);
                        }
                        

                        let inputCheckedLength = $('.filter__item input:checked').length
                        let rangeChangeTrueLength = $(".js-range-slider[data-change='true']").length;
            
                        resetCount = inputCheckedLength + rangeChangeTrueLength;
                        
                        if (resetCount >= 1) {            
                            $('.catalog__sidebar-name.parameters button[type="reset"] .count').text(resetCount);
                            $('.catalog__sidebar-name.parameters button[type="reset"]').fadeIn();
                        } else {
                            $('.catalog__sidebar-name.parameters button[type="reset"]').fadeOut();
                        }
                    } else {
                        resetCount = 0;
                        
                    }   
                },

                onFinish: function (data) {
                    inputFrom.val(data.from);
                    inputTo.val(data.to);                    
                }

                
            });

            

            let range = $(this).data("ionRangeSlider");

            inputFrom.on('change', function() {
                let value = parseInt($(this).val());                
                //минимальное возможное значение для ввода
                let minValue = range.options.min;
                //максимальное возможное значение для ввода
                let maxValue = range.options.max;  
                //позиция бегунка
                let newFromValue = range.options.from;  
                let newToValue = range.options.to;  
                //ближайший range                   
                let rangeInput = $(this).closest('.filter__range').find('.js-range-slider');

                
                
                if ($(this).val() != range.options.min) {
                    rangeInput.attr('data-change', true);
                    
                } else if ($(this).val() == range.options.min && inputTo.val() == range.options.max) {
                    rangeInput.attr('data-change', false);
                }

                let inputCheckedLength = $('.filter__item input:checked').length
                let rangeChangeTrueLength = $(".js-range-slider[data-change='true']").length;
    
                resetCount = inputCheckedLength + rangeChangeTrueLength;
                
                if (resetCount >= 1) {            
                    $('.catalog__sidebar-name.parameters button[type="reset"] .count').text(resetCount);
                    $('.catalog__sidebar-name.parameters button[type="reset"]').fadeIn();
                } else {
                    $('.catalog__sidebar-name.parameters button[type="reset"]').fadeOut();
                }

                if (isNaN(value)) {                    
                    $(this).val(minValue);
                    value = minValue;

                    range.update({
                        from: value
                    })
                
                } else if (value >= maxValue) {                    
                    $(this).val(maxValue);
                    value = maxValue;

                    range.update({
                        from: value
                    })
                } else if (value >= newToValue) {
                    $(this).val(newToValue);
                    value = newToValue;

                    range.update({
                        from: value
                    })
                } else {
                    $(this).val(value);

                    range.update({
                        from: value
                    })
                }

                


                
            })

            inputTo.on('change', function() {
                let value = parseInt($(this).val());                
                //минимальное возможное значение для ввода
                let minValue = range.options.min;
                //максимальное возможное значение для ввода
                let maxValue = range.options.max;
                //позиция бегунка
                let newFromValue = range.options.from;  
                let newToValue = range.options.to;
                //ближайший range                   
                let rangeInput = $(this).closest('.filter__range').find('.js-range-slider');
                
                if ($(this).val() != range.options.max) {
                    rangeInput.attr('data-change', true);
                } else if ($(this).val() == range.options.min && inputFrom.val() == range.options.min) {
                    rangeInput.attr('data-change', false);
                }

                let inputCheckedLength = $('.filter__item input:checked').length
                let rangeChangeTrueLength = $(".js-range-slider[data-change='true']").length;
    
                resetCount = inputCheckedLength + rangeChangeTrueLength;
                
                if (resetCount >= 1) {            
                    $('.catalog__sidebar-name.parameters button[type="reset"] .count').text(resetCount);
                    $('.catalog__sidebar-name.parameters button[type="reset"]').fadeIn();
                } else {
                    $('.catalog__sidebar-name.parameters button[type="reset"]').fadeOut();
                }


                if (isNaN(value)) {                    
                    $(this).val(maxValue);
                    value = maxValue;

                    range.update({
                        to: value
                    })
                } else if (value >= maxValue) {
                    value = maxValue;
                    $(this).val(maxValue);

                    range.update({
                        to: value
                    })
                } else if (value <= newFromValue) {
                    $(this).val(newFromValue);
                    value = newFromValue;
                    
                    range.update({
                        to: value
                    })
                } else {
                    $(this).val(value);

                    range.update({
                        to: value
                    })
                }

                
                
            })
        });

        $('.filter__range-input').on('input', function() {
            $(this).val($(this).val().replace(/\D/, ''));
        });

        //кнопка reset в фильтре очистка
        $('button[type="reset"]').click(function() {
            resetCount = 0;
            $(this).fadeOut();

            $('.filter').find('input[type="checkbox"]').prop('checked', false).removeAttr('checked');
            $('.filter').find('input[type="radio"]').prop('checked', false).removeAttr('checked');
            $('.filter').find('.js-range-slider').attr('data-change', false);
            

            $(".js-range-slider").each(function() {
                let inputFrom = $(this).siblings('.filter__range-row').find('.filter__range-input_from');
                let inputTo = $(this).siblings('.filter__range-row').find('.filter__range-input_to');

                let range = $(this).data("ionRangeSlider");
               
                range.update({
                    from: range.options.min,
                    to: range.options.max
                });

                inputFrom.val(range.options.min)
                inputTo.val(range.options.max)
            })
        }); 

        
    }  

    //октрытие/скрытие фильтров
    if($('.filter').length) {
        $('.filter .filter__item .drop').click(function() {

            $(this).closest('.filter__item').toggleClass('active');
            $(this).siblings('.filter__item-content').slideToggle();
        })
    }

    if (window.innerWidth <= 992) {
        $('.js-catalog-toggle').click(function(e) {
            $(this).toggleClass('active').next('.js-catalog-content').slideToggle();

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
            arrows: true,
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 5
                    
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 4
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2
                  }
                }
            ]
        });
    }

    //одинаковая высота новостей
    if($('.news').length) {
        $('.news .news__item .news__item-content').matchHeight();
    };

    if($('.opportunities').length) {
        $('.opportunities .opportunities__item .opportunities__item-name').matchHeight();
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

    //слайдер Производство-детальная
    if($('.prod-detail__slider').length) {
        $('.prod-detail__slider').slick({
            arrows: true,
            dots: false
        })
    }

    //Слайдер каталог-детальная
    if($('.catalog-detail__slider').length) {
        $('.catalog-detail__slider .catalog-detail__big').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.catalog-detail__small',
            
        });

        $('.catalog-detail__slider .catalog-detail__small').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            asNavFor: '.catalog-detail__big',
            focusOnSelect: true,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3
                  }
                }
            ]
        })
    }

    //смена цветов Каталог-детальная
    if($('.catalog-detail').length) {

        $('.catalog-detail__feedback').css('background-color', $('.catalog-detail__color .item.active').css('background-color'));
        if ($('.catalog-detail__color .item.active').css('background-color') == 'rgb(255, 255, 255)') {
            $('.catalog-detail__feedback').addClass('white');
        } else {
            $('.catalog-detail__feedback').removeClass('white');
        }
        $('.catalog-detail__color .item').click(function () {
            let activeItemColor = $(this).css('background-color');
            
            $(this).addClass('active').siblings('.item').removeClass('active');
            $('.catalog-detail__feedback').css('background-color', activeItemColor);

            if ($(this).css('background-color') == 'rgb(255, 255, 255)') {
                $('.catalog-detail__feedback').addClass('white');
            } else {
                $('.catalog-detail__feedback').removeClass('white');
            }
        })
    }

    //перенос блока комплектов из сайдбара
    if (window.innerWidth <= 992 && $('.similar').length) {
        let similarBlock = $('.similar:not(h2)');
        let similarBlockTitle = $('h2.similar');

        similarBlock.detach().appendTo($('.catalog-detail .catalog__content'));
        similarBlock.prepend(similarBlockTitle);
        similarBlock.addClass('catalog-detail__similar');
        similarBlockTitle.removeClass('catalog__sidebar-name similar').addClass('block-title');
    }

    //открытие/закрытие формы в шапке
    $('.icons .feedback').click(function () {
        $('.form.small').fadeIn();

        if (window.innerWidth <= 992) {
            $('body').removeClass('no-scroll');
            $('.burger').hide();
            $('.mobile-menu').hide("slide", { direction: "right" }, 500);
        }
    });

    $('.form.small .form__close').click(function () {
        if (window.innerWidth <= 992) {
            $('body').removeClass('opacity-layer');
            $('.burger').show();
        }
        $('.form.small').fadeOut();
    });

    //открытие/закрытие формы "Отправить запрос" в каталоге-детальная
    $('.catalog-detail__feedback, .prod-detail__order').click(function() {
        if (window.innerWidth <= 992) {
            $('body').addClass('opacity-layer');
            $('body,html').animate({scrollTop:0},500);
            $('.form.request').fadeIn();
        } else {
            $('.form.request').fadeIn();
        }
         
    });

    $('.form.request .form__close').click(function() {

        if (window.innerWidth <= 992) {
            $('body').removeClass('opacity-layer');
            
            $('.form.request').fadeOut();
        } else {
            $('.form.request').fadeOut();
        }
        
    });

    if (window.innerWidth <= 992 && $('.form.request').length) {
        $('.footer').after($('.form.request'))
    }

    //прикрепление файла
    $('.form__file input').on('change', function(e) {
        let filename = $(this)[0].files[0].name;

        $(this).siblings('.name').text(filename);
        
      })
});
