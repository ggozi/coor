jQuery(document).ready(function() {
    /* 메인상품이 1개 이상일때 실행   */
    jQuery(".dnd_module_7ddaff3fa2e90f2ef2f2d3ca0ad0a94b .main-swipe-roll .swiper-wrapper").each(function(){
        var swiperslidelength = jQuery('.swiper-slide',this).length; 
        if ( swiperslidelength > 1 ) {
            $.getScript('https://moma-img.echosting.cafe24.com/img/1/8435/jquery.plugin.js', function() {
                var swiper2 = new Swiper('.dnd_module_7ddaff3fa2e90f2ef2f2d3ca0ad0a94b .main-swipe-roll', {
                    slidesPerView: 'auto',
                    autoHeight: true, //enable auto height		
                    spaceBetween: 0,
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.dnd_module_7ddaff3fa2e90f2ef2f2d3ca0ad0a94b .pagination-main-roll',
                        type: 'progressbar',
                    },
                });
            });
        }
    });
});