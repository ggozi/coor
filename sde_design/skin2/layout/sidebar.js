(function() {
    var aCategory = [];
    var methods = {
        aCategory    : [],
        aSubCategory : {},
        get: function()
        {
            $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {
                    if (aData == null || aData == 'undefined') {
                        methods.checkSub();
                        return;
                    }
                    for (var i=0; i<aData.length; i++)
                    {
                        var sParentCateNo = aData[i].parent_cate_no;
                        var sCateNo = aData[i].cate_no;
                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }
                        if (!aCategory[sCateNo]) {
                            aCategory[sCateNo] = [];
                        }
                        methods.aSubCategory[sParentCateNo].push( aData[i] );
                        aCategory[sCateNo] = aData[i];
                    }
                    methods.checkSub();
                }
            });
        },
        getParam: function(sUrl, sKey) {
            var aUrl         = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam       = {};
            if (sQueryString) {
                var aFields = sQueryString.split("&");
                var aField  = [];
                for (var i=0; i<aFields.length; i++) {
                    aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },
        show: function(overNode, iCateNo) {
            var oParentNode = overNode;
            var aHtml = [];
            var sMyCateList = localStorage.getItem("myCateList");
            if (methods.aSubCategory[iCateNo] != undefined) {
                aHtml.push('<ul class="slideSubMenu">');
                $(methods.aSubCategory[iCateNo]).each(function() {
                    var sNextParentNo = this.cate_no;
                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                    if (methods.aSubCategory[sNextParentNo] == undefined) {
                        aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                        var sHref = '/product/list.html'+this.param;
                    } else {
                        aHtml.push('<li id="cate'+this.cate_no+'">');
                        var sHref = '#none';
                    }
                    aHtml.push('<a href="'+sHref+'" class="cate" cate="'+this.param+'" onclick="subMenuEvent(this);">'+this.name+'</a>');
                    if (methods.aSubCategory[sNextParentNo] != undefined)  aHtml.push('<a href="/product/list.html'+this.param+'" class="view">ALL VIEW</a>');
                    if (methods.aSubCategory[sNextParentNo] != undefined) {
                        aHtml.push('<ul>');
                        $(methods.aSubCategory[sNextParentNo]).each(function() {
                            var sNextParentNo2 = this.cate_no;
                            var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                            if (methods.aSubCategory[sNextParentNo2] == undefined) {
                                aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                var sHref = '/product/list.html'+this.param;
                            } else {
                                aHtml.push('<li id="cate'+this.cate_no+'">');
                                var sHref = '#none';
                            }
                            aHtml.push('<a href="'+sHref+'" class="cate" cate="'+this.param+'" onclick="subMenuEvent(this);">'+this.name+'</a>');
                            if (methods.aSubCategory[sNextParentNo] != undefined)  aHtml.push('<a href="/product/list.html'+this.param+'" class="view">ALL VIEW</a>');
 
                            if (methods.aSubCategory[sNextParentNo2] != undefined) {
                                aHtml.push('<ul>');
                                $(methods.aSubCategory[sNextParentNo2]).each(function() {
                                    aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                                    aHtml.push('<a href="/product/list.html'+this.param+'" class="cate" cate="'+this.param+'" onclick="subMenuEvent(this);">'+this.name+'</a>');
                                    aHtml.push('</li>');
                                });
                                aHtml.push('</ul>');
                            }
                            aHtml.push('</li>');
                        });
                        aHtml.push('</ul>');
                    }
                    aHtml.push('</li>');
                });
                aHtml.push('</ul>');
            }
            $(oParentNode).append(aHtml.join(''));
        },
        close: function() {
            $('.slideSubMenu').remove();
        },
        checkSub: function() {
            $('.cate').each(function(){
                var iCateNo = Number(methods.getParam($(this).attr('cate'), 'cate_no'));
                var result = methods.aSubCategory[iCateNo];
                if (result == undefined) {
                    if ($(this).closest('#slideProjectList').length) {
                        var sHref = '/product/project.html'+$(this).attr('cate');
                    } else {
                        var sHref = '/product/list.html'+$(this).attr('cate');
                    }
                    $(this).attr('href', sHref);
                    $(this).parent().attr('class', 'noChild');
                }
            });
        }
    };
    methods.get();
    $('.dnd_module_6ba27f167d7e70bd7e89b73655af2038 li > a.cate').click(function(e) {
        var iCateNo = Number(methods.getParam($(this).attr('cate'), 'cate_no'));
        if ($(this).parent().hasClass('selected')) {
            methods.close();
        } else {
            if (!iCateNo) return;
            $('.dnd_module_6ba27f167d7e70bd7e89b73655af2038 li').removeClass('selected');
            methods.close();
            methods.show(this.parentNode, iCateNo);
        }
    });
    $('.dnd_module_6ba27f167d7e70bd7e89b73655af2038 a.cate').click(function(e){
        $(this).parent().find('li').removeClass('selected');
        $(this).parent().toggleClass('selected');
        if (!$(this).parent('li').hasClass('noChild')){
            e.preventDefault();
        }
    });
})();
function checkInArray(sBookmarkList, iCateNo) {
    if (sBookmarkList == null) return false;
    var aBookmarkList = sBookmarkList.split("|");
    for (var i = 0; i < aBookmarkList.length; i++) {
        if (aBookmarkList[i] == iCateNo) {
            return true;
        }
    }
    return false;
}
function subMenuEvent(obj) {
    $(obj).parent().find('li').removeClass('selected');
    $(obj).parent().toggleClass('selected');
}