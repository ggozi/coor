document.addEventListener('DOMContentLoaded', function() {
    var $scope = $(".dnd_module_403fc44481ecc8740bce862728fdc832");
    //로그인폼 placeholder 추가
    if ($('.xans-member-login').val() != undefined) {
        var loginId = $('#member_id').parent().attr('title');
        $('#member_id').attr('placeholder', loginId);
        $('#member_passwd').attr('placeholder', 'PASSWORD');
    }
    if ($('.xans-myshop-orderhistorynologin').val() != undefined) {
        $('#order_name').attr('placeholder', '주문자명');
        $('#order_id1').attr('placeholder', '주문번호');
        $('#order_id').attr('placeholder', '주문번호(하이픈(-) 포함)');	//ECHOSTING-358843 비회원 주문조회
        $('#order_password').attr('placeholder', '주문번호 비밀번호');
    }
    //키보드 미리보기
    $('.keyboard button').click(function(){
        if($(this).hasClass('selected')==true){
            $('.keyboard .btnKey').removeClass('selected');
            $('.view div').hide();
        }
        else{
            $('.keyboard .btnKey').removeClass('selected');
            $('.view div').hide();
            $(this).addClass('selected');
            var key=$(this).attr('title');
            $(this).parent().next().children('.'+key+'').show();
        }
    });
    // 회원&비회원 토글
    $('.memberTab').each(function(){
        var selected = $(this).find('> ul > li.selected > a');
    });
    $('body').delegate('.memberTab a', 'click', function(e){
        var _target = $(this).attr('href');
        if (_target == '#member') {
            $('.memberLogin').show();
            $('.orderHistoryNoLogin').hide();
        } else {
            $('.memberLogin').hide();
            $('.orderHistoryNoLogin').show();
        }
        e.preventDefault();
    });
});