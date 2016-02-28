var slide = {
    init: function(prefix) {
        (prefix == null) ? (prefix = '.swiper-container') : prefix = (prefix + ' .swiper-container');
        var Swiper = require("swiper");
        var appendNumber = 4;
        var prependNumber = 1;
        var swiper = new Swiper(prefix, {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 3,
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 30,
        });
        $(".swiper-wrapper").css("transform", "translate3d(0px, 0px, 0px)");
    }
}
module.exports = slide;
