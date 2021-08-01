function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function getHref(){
	url = window.location.href;
	data = url.split('/category/');
	if( url != data[0]){
		data2 = data[1].split('/display/');	
	}else{
		return false;
	}
	return data2[0];
}

// var $sidebar = document.getElementById( 'btn_sidebar' );
// function openNav() {
// 	$('#mobile_allcate').show();
// 	if( document.getElementById("mobile_allcate").style.left == '0px'){
// 	$sidebar.classList.remove( 'active' );
// 		closeNav();
// 		return;
// 	}					
// 	$sidebar.classList.add( 'ani' ); //첫구동후 복귀애니메이션 추가  
// 	$sidebar.classList.add( 'active' );
	
// 	jQuery("html").addClass("fixed");
// 	document.getElementById("mobile_allcate").style.left = "0px";
// 	document.getElementById("sidebarBackpanel").style.display = "block";
// }
// var mql767 = window.matchMedia("screen and (max-width: 767.98px)");
// if (mql767.matches) {
// 	function closeNav() {
// 		$sidebar.classList.remove( 'active' );
// 		jQuery("html").removeClass("fixed");
// 		document.getElementById("mobile_allcate").style.left = "-100%"; 
// 		document.getElementById("sidebarBackpanel").style.display = "none";
// 	}
// } else {
// 	function closeNav() {
// 		$sidebar.classList.remove( 'active' );
// 		jQuery("html").removeClass("fixed");
// 		document.getElementById("mobile_allcate").style.left = "-485px";	
// 		document.getElementById("sidebarBackpanel").style.display = "none";
// 	}
// }

$(document).ready(function(){	 

	navBtn();

	// $("#quickly").bind('click', function(e) {
	// 	e.preventDefault();
	// 	$('#quick_search').bPopup({
	// 		follow: [true, true],
	// 		position: ['auto', 'auto'],
	// 		closeClass : '.quick_searchClose',
	// 		modalClose: true,
	// 		modalColor : '#000',
	// 		opacity: 0.7,
	// 		positionStyle: 'fixed',
	// 		transition : 'fadeIn'
	// 	});
	// });


	cate_no = getParameterByName("cate_no");
	
	if( getHref() ){
		cate_no = getHref();
	} 
	if( cate_no ){	 
		$('html,body').animate({scrollTop:0},300);
		$("[data-selectside=cate_no"+cate_no+"]").each(function(){
			$(this).parent().addClass("on");
		});

		$("[data-selectside=shop]").parent().addClass("on");
	}

	/* /shopinfo/store.html */
	$(".menu.local li").bind("click",function(){
		//본인만선택
		$(".menu.local li").removeClass("on");
		$(this).addClass("on");

		//페이지선택
		idx = $(".menu.local li").index(this);
		$(".local-menu-child li").removeClass("on");
		$(".local-menu-child li").eq(idx).addClass("on");
	});
	for( var i in selectside ){
		$("[data-selectside="+selectside[i]+"]").addClass("on");
	}


			  
	$(".gnb-parent").bind('click', function(e) { 

		$(".gnb-parent").removeClass("on");
		$(".gnb-parent a").removeClass("on");
		$(this).addClass("on");
		$(this).parent('ul').hide();
		$('.btn_back').show();

		target = "#gnb-child-"+$(this).find("a").attr("data-selectside");
		$(".gnb-child").removeClass("on");
		$(target).addClass("on");
	});

	$('.btn_back').on('click',function(){	//GNB Menu back btn
		$(this).hide();
		$(this).next('ul').show();
		$(".gnb-parent").removeClass("on");
		$(".gnb-child").removeClass("on");
	});

	$("#mobile_allcate ul li.title").click(function(){
		$parent = $(this).closest("ul")	;
		$parent.toggleClass("on");
	});

	$(".xans-order-optionall.optionList li").each(function(){
		str = $(this).text();
		
		str = str.replace( "[옵션: ", "" );
		str = str.replace( "]", "" );

		$(this).text(str).show();



	});

	$(".menu1 > li").on("mouseover",function(){
		var itemCnt = $(this).find("ul").length;
		if( itemCnt ){
			$(".nav_background").show();
		}
	}).on("mouseout",function(){
		$(".nav_background").hide();
	});
	
});

function navBtn(){	//GNB Btn
	var $gnbHead = $('.mobile_head')
		$btnClose = $gnbHead.find('.btn_close'),
		$btnHam = $gnbHead.find('.btn_ham'),
		$btnBasket = $gnbHead.find('.btn_basket'),
		$menu = $('#mobile_allcate');

	$gnbHead.on('click','.btn_ham',function(){
		var $this = $(this);
		$this.hide();
		$btnBasket.hide();
		$btnClose.show();
		$gnbHead.addClass('on');
		$menu.fadeIn();
		$('html,body').css({'overflow-y':'hidden'});
		
	});

	$gnbHead.on('click','.btn_close',function(){
		var $this = $(this);
		
		$this.hide();
		$btnHam.show();
		$btnBasket.show();
		$gnbHead.removeClass('on');
		$menu.fadeOut();
		$('html,body').removeAttr('style');

	});

	$(window).resize(function(){
		$('.btn_close').trigger('click');
	})
}

$(document).ready(function(){	 
	if( $(".infoArea") ){
		
		var desc_short = $("[data-i18n=PRODUCT.PRD_INFO_SIMPLE_DESC]").closest("tr").find("td span").html();
		var desc_info = $("[data-i18n=PRODUCT.PRD_INFO_CUSTOM_OPTION1]").closest("tr").find("td span").html();
		var desc_fabic = $("[data-i18n=PRODUCT.PRD_INFO_CUSTOM_OPTION2]").closest("tr").find("td span").html();
		var desc_model = $("[data-i18n=PRODUCT.PRD_INFO_CUSTOM_OPTION3]").closest("tr").find("td span").html();
		var desc_size = $("[data-i18n=PRODUCT.PRD_INFO_CUSTOM_OPTION4]").closest("tr").find("td span").html();

		$(".desc_short").html(desc_short.replace(/\n/g, '<br/>'));
		$(".desc_info").html(desc_info);
		$(".desc_fabic").html(desc_fabic);
		
		var _desc_model = desc_model.split(',');
		$(".desc_model_cm").html(_desc_model[0]);
		$(".desc_model_kg").html(_desc_model[1]);
		$(".desc_fitting").html(desc_size);
		$(".prd_detail").show();

	}

});