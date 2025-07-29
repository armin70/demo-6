$(document).ready(function () {
    //initial 
    var onloaded = 1;
    activeMenu();
    lazyLoad();
    animantionOnEnter();


    //modal logic
    modalOpen('#play-video', '.youtube', '.youtube iframe', true);
    modalClose('#modal-container', '.youtube');
    modalClose('#modal-container', '.message-form-sucess');


    //hide #pre-loader
    var timing = 700;
    setTimeout(() => {
        $('#pre-loader').addClass('move-bottom');
    }, timing);
    hideAnimationOnEnd('#pre-loader2');
    hideAnimationOnEnd('#pre-loader');

    //change logo
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const theme = urlParams.get('theme')
    if(theme == 'light'){
        $('body').removeClass('theme-dark') 
        $('body').addClass('theme-light')  
        $('.theme-light .logo').attr('src','./assets/images/personaCV-logo-black.png') 
    }

    if($('body').hasClass('theme-light')){
        $('.theme-light .logo').attr('src','./assets/images/personaCV-logo-black.png')
    }


    function listIdsMenu(entry) {
        let menuArray = ['#home', '#about', '#portfolio', '#resume', '#contact']
        for (let i = 0; i < menuArray.length; i++) {
            if (entry == document.querySelector(menuArray[i])) {
                $('#menu li.' + menuArray[i].replace('#', '') + '-link a').addClass('active')
            }
            else {
                $('#menu li.' + menuArray[i].replace('#', '') + '-link a').removeClass('active')
            }

        }
    }
    function addAnimation(idEle) {
        $(idEle).addClass('animationResume');
    }
  
        
   

    //hover menu change color
    function activeMenu() {
        var observer = new IntersectionObserver(function (entries) {
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting === true) {
                    listIdsMenu(entries[i].target);
                    //add animation on resume section skills
                    if (entries[i].target.id == 'resume') {
                        addAnimation(entries[i].target);
                        circlesSkills();
                    }
                    
                }
            }
        }, { threshold: [0.2] });
        if (document.querySelector('#home'))
            observer.observe(document.querySelector('#home'));
        if (document.querySelector('#resume'))
            observer.observe(document.querySelector('#resume'));
        if (document.querySelector('#about'))
            observer.observe(document.querySelector('#about'));
        if (document.querySelector('#portfolio'))
            observer.observe(document.querySelector('#portfolio'));
        if (document.querySelector('#blog'))
            observer.observe(document.querySelector('#blog'));
        if (document.querySelector('#contact'))
            observer.observe(document.querySelector('#contact'));
    }

    //code to make menu icon show or hide
    $('.menu-icon').click(function () {
        closeMenu();
    })

    //change theme on click button theme
    $('.dark').click(function () {
        $('body').toggleClass('theme-light');
        $('body').toggleClass('theme-dark');
        $(this).toggleClass('btn-light');
        $(this).toggleClass('btn-dark');
        console.log($(this).text())
        if ($(this).text() == 'Dark Theme') {
            $(this).text('Light Theme');

            $('.logo').attr('src', './assets/images/personaCV-logo.png');
        }
        else {
            $(this).text('Dark Theme');
            $('.logo').attr('src', './assets/images/personaCV-logo-black.png');

        }

        if (window.innerWidth < 992)
            closeMenu()
    })

    //menu icon mobile on click
    $('#menu a').click(function () {
        if (window.innerWidth < 999)
            closeMenu()
    })

    //on change input pick color
    $('#pickColor').on('input', function () {
        const pickedColor = $(this).val(); // get the current value of the input field.
        aplyColor(pickedColor)

    });

    //settings icon on click
    $('.settings .fa-cogs').click(function () {
        $('.settings').toggleClass('move-right');
    })





    //config for aearch in blog using plugin jquery-searchable
    if ($('#blog .gallery').length > 0) {
        $('#blog .gallery').searchable({
            selector: '.item',
            childSelector: 'h3',
            searchField: '#mySearchInput',
            hide: function (elem) {
                elem.fadeOut(50);
            },
            show: function (elem) {
                elem.fadeIn(50);
            },
            onSearchActive: function (elem, term) {
                elem.show();
            },
            onSearchFocus: function () {
                $('#feedback').show().text('Type to search.');
            },
            onSearchBlur: function () {
                $('#feedback').hide();
            },
            clearOnLoad: true
        });
    }

    //function used to aply color secundary theme
    function aplyColor(color) {
        var styleElem = document.head.appendChild(document.createElement("style"));
        let style = "#fixed-menu-left li a.active:after {background-color:" + color + "}";
        let style2 = "#fixed-menu-left li:hover a:after,.aply-border:after,.aply-back {background-color:" + color + "!important}";
        let style3 = "#home h2:after,#about h1:nth-child(2):after, #about h2:after,.title-under:after {background-color:" + color + "}";
        let style4 = ".dsn-border-rdu {border-color:" + color + " !important}";
        let style5 = ".app-form-button,.aply-color,#about #personal-intro h3,.contacts-info i,.contacts-info strong  {color:" + color + " !important}";
        let style6 = "#resume h5.section-description {background-color:" + color + "}";
        let style7 = '.btn-grad{background: linear-gradient(to right,'+ color +', #061700);}';
        let style8 = '#about img#personal-photo{border-top: 10px solid '+ color +';border-left: 10px solid '+ color +';} '
        circlesSkills(color)

        
        styleElem.innerHTML = style + style2 + style3 + style4 + style5 + style6 + style7+ style8;
    }

    //function used to change class in some elements on click menu icon on mobile
    function closeMenu() {
        $('#fixed-menu-left').toggleClass('active');
        // $('#fixed-right').toggleClass('active');
        // $('.close').toggleClass('active');
        // $('.menu-icon .fa-bars').toggleClass('visually-hidden opacity-0');
        // $('.dark').toggleClass('show');
        // $('#pickColor').toggleClass('show');
        // $('html,body').toggleClass('no-overflow');

    }

    //change active section
    function initialScreen(hash) {
        console.log(hash)
        $(hash)[0].scrollIntoView({ behavior: 'smooth' });
        // $(hash).toggleClass('active-section');
    }
    //initial state load
    function initialMenu(hash, el) {
        if (!hash && (el.attr('href') == '#home')) {
            el.toggleClass('active');
        }
        if (el.attr('href') == hash) {
            el.addClass('active');
        }
    }

    //function On click change section
    $('#linkAbout').click(function (e) {
        var idSection = $(this).attr('href');
        if ($('.section.active-section').length > 0) {
            $('.section.active-section').toggleClass('active-section');
            $(idSection).toggleClass('active-section');
        }
    });


    //modal open
    function modalOpen(el, elRemoveHide, iframeSrc, action) {
        if (action) {
            $(el).click(function () {
                var elHide = $(elRemoveHide);
                if (!$(iframeSrc).attr('src'))
                    $(iframeSrc).attr('src', $(iframeSrc).attr('data-src'));
                $('#modal-container').removeAttr('class').addClass('play');
                $('body').addClass('modal-active');
                $(elHide).toggleClass('hide');
                $(iframeSrc).on("load", function () {
                    $(this).toggleClass('hide')
                });
            })
        }
        else {
            var elHide = $(elRemoveHide);
            if (!$(iframeSrc).attr('src'))
                $(iframeSrc).attr('src', $(iframeSrc).attr('data-src'));
            $('#modal-container').removeAttr('class').addClass('play');
            $('body').addClass('modal-active');
            $(elHide).toggleClass('hide');
            $(iframeSrc).on("load", function () {
                $(this).toggleClass('hide')
            });
        }
    }

    //modal CLose
    function modalClose(el, elRemoveHide) {
        $(el).click(function () {
            $(this).addClass('out');
            if ($(this).find(elRemoveHide).hasClass('hide')) {
            }
            else {
                $(this).find(elRemoveHide).toggleClass('hide');
            }
            $('body').removeClass('modal-active');
        });
    }




    //submit form
    $('form').submit(function (e) {
        // Stop the form submitting
        if (this.checkValidity() == false) {
            return false;
        }
        else {
            modalOpen('#submit', '.message-form-sucess', '', false);
            document.querySelector('form').reset();
            e.preventDefault();
            //e.currentTarget.submit();
        }

    });

    //remove/hide animation
    function hideAnimationOnEnd(el) {
        var element = document.querySelector(el)
        if (element)
            element.addEventListener('webkitAnimationEnd', function (event) { element.style.display = 'none'; }, false);
    }

    //lazyload images
    function lazyLoad() {
        let images = [...document.querySelectorAll('.lazyload')];
        const callback = (entries) => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    entry.target.setAttribute('src', entry.target.getAttribute('data-src'))
                }
                // handle other code logic here 
            })
        }
        let observer = new IntersectionObserver(callback);
        images.forEach(image => {
            observer.observe(image);
        })
    }
  
    //animantionOnEnter
    function animantionOnEnter() {
        let images = [...document.querySelectorAll('.animationEntry')];
        const callback = (entries) => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    console.log('entered')
                    $(entry.target).addClass('animate__animated animate__fadeInLeft animate__delay-1s')
                }
                // handle other code logic here 
            })
        }
        let observer = new IntersectionObserver(callback);
        images.forEach(image => {
            observer.observe(image);
        })
    }

    //trigger circle skills
    function circlesSkills(color) {
        let selectors = $('.theme-dark .circles');
        let selectors2 = $('.theme-light .circles');
        let visible = $('#pre-loader2,#pre-loader').is(":visible");
        setTimeout(function () {
            selectors.each(function () {
                var self = $(this)
                self.find('.circle').circleProgress({
                    fill: { gradient: [[color? color:'#29c743', .65], ['#ff5f43', .8]] },
                    emptyFill: '#fff',
                }).on('circle-animation-progress', function (event, progress) {
                    self.find('.inner-circle').hide();
                    var value = self.find('.circle').circleProgress('value');
                    self.find('strong').html(Math.round((value * 100) * progress) + '<i>%</i>');
                });
                
            })
            selectors2.each(function () {
                var self = $(this)
                self.find('.circle').circleProgress({
                    fill: { gradient: [[color? color:'#29c743', .65], ['#ff5f43', .8]] },
                    emptyFill: '#000',
                }).on('circle-animation-progress', function (event, progress) {
                    self.find('.inner-circle').hide();
                    var value = self.find('.circle').circleProgress('value');
                    self.find('strong').html(Math.round((value * 100) * progress) + '<i>%</i>');
                });
            })
        }, !visible ? 500 : selectors.attr('data-delay-start'))

    }
});

