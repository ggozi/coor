(function() {
    function pageLoaded() {
        // only skin
    }
    function dndComponent() {
        $('.dnd_module_547e3c4cffc426ce9a7152907e9658ea #shopQ').find('button.btnDelete').bind('click', function () {
            $(this).parent().find('input.keyword').attr('value', '').focus();
        });
    }
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
})();