document.addEventListener('DOMContentLoaded', function() {
    var $scope = $(".dnd_module_9742c60d3a2ee81fffada3eade8d931d");
    $scope.find('.headerMenu .btnSearch').unbind('click.btnSearch').bind('click.btnSearch', function () {
        var $header = $(this).closest('#header');
        $header.addClass('open');
        $header.find('#dimmedSlider').one("click", function () {
            $header.removeClass('open');
        });
    });
    $('.xans-layout-searchheader').find('button.btnDelete').unbind('click.btnDelete').bind('click.btnDelete', function () {
        $('.topSearch').find('input#keyword').attr('value', '').focus();
    });
});
(function() {
    function pageLoaded(){
    }
    function dndComponent() {
  
        var $scope = $(".dnd_module_c785e267507864e0f86dfc2033986f74");
        var calculateNavigationCategoryTimer = null,
            $navigation = $scope.find("#navigation");
  
        function calculateNavigationCategory() {
  
            var $navigationCategory = $("#navigation > .inner .category"),
                $categoryChild = $navigationCategory.children(),
                calculate = 0;
  
            if(!$navigationCategory.length) return;
  
            $categoryChild.each( function( idx ) {
                calculate = calculate + $(this).outerWidth(true) + parseInt( $( this ).css('marginLeft'),10 );
            } );
  
            if( $navigationCategory.width() < calculate + 50 ) {
  
                $("#navigation").addClass('isShort');
  
            } else {
  
                $("#navigation").removeClass('isShort');
  
            }
  
        }
  
        if( $navigation.length ) {
  
            $(window).bind('resize.calculateNavigationCategory', function() {
                if(calculateNavigationCategoryTimer) clearTimeout( calculateNavigationCategoryTimer );
                calculateNavigationCategoryTimer = setTimeout(calculateNavigationCategory, 100);
            }).trigger("resize.calculateNavigationCategory");
  
        }
  
        $scope.find('.eToggleCateLayer').click(function () {
            $scope.find('> nav').toggleClass('open');
            $('.navDimmed').toggleClass('show');
        });
  
    }
  
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
  
})();
(function() {
    function pageLoaded() {
        
    }
    function dndComponent() {
        
        var $scope = $(".dnd_module_3b6ee54302059a36ca24383156b8f64c");
        // ??????????????? ????????????
        $('#product_select_all').bind('click', function() {
            var _status = $(this).data('status');
            $('[id^="basket_chk_id_"]').each(function(){
                var bChecked = $(this).is(":checked");
                if (_status == 'off') {
                    if (bChecked === false) $(this).attr('checked', true);
                } else {
                    $(this).attr('checked', false);
                }
            });
            $(this).data('status', _status == 'off' ? 'on' : 'off');
            fixedLayerPriceSet();
        });
        // ??????????????? ???????????? ??????
        var fixedLayerPriceSet = function() {
            var iSumPrice = 0;
            var iCheckPrdCnt = 0;
            $('[id^="basket_chk_id_"]').each(function(){
                if ($(this).attr('checked') == true) {
                    var sCheckId = $(this).attr('id');
                    var aTemp = sCheckId.split('_');
                    var iCheckId = aTemp[3];
                    var iQuantity = $('#quantity_id_'+iCheckId).val();
                    var iProductPrice = aBasketProductData[iCheckId].product_sum_price * iQuantity;
                    iSumPrice = iSumPrice + iProductPrice;
                    iCheckPrdCnt = iCheckPrdCnt + 1;
                }
            });
            if (iCheckPrdCnt > 0) {
                var sTotalPrice = SHOP_PRICE_FORMAT.toShopPrice(iSumPrice);
                $('#checked_order_count').html('<strong>' + sprintf(__('%s'),iCheckPrdCnt) + '</strong>' +'??? ????????????').css('padding-bottom','5px');
                $('#checked_order_price').html('?????????????????? <strong><em>'+sTotalPrice+'</em></strong>').css('padding-bottom','5px');
                var sPriceRef = SHOP_PRICE_FORMAT.shopPriceToSubPrice(iSumPrice);
                if (sPriceRef != '') $('#checked_order_price').find('strong').append(sPriceRef);
            } else {
                fixLayerPriceRest();
            }
        };
        // ???????????? ?????????????????????
        var fixLayerPriceRest = function() {
            $('#checked_order_count, #checked_order_price').html('').css('padding-bottom','0');
        };
        fixLayerPriceRest();
        // ???????????? ???????????? ????????? ???????????????, ????????? ?????? ?????????
        $('[id^="basket_chk_id_"]').click(function(e) {
            fixedLayerPriceSet();
        });
        
        // ???????????? ???????????? ??????
        function selBasketDel(id) {
            $('[id^="'+BASKET_CHK_ID_PREFIX+'"]').attr('checked', false);
            $('[id="'+id+'"]').attr('checked', true);
            Basket.deleteBasket();
        }
    }
  
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
  
})();