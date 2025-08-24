$(document).ready(function(){
    // 모바일 메뉴 토글
    $('.toggle_btn').click(function(){
        $('#main-menu').toggleClass('active');
        $('html, body').css('overflow', $('#main-menu').hasClass('active') ? 'hidden' : '');
    });

    $('.close_btn').click(function(){
        $('#main-menu').removeClass('active');
        $('html, body').css('overflow', '');
    });

    // 모바일 환경에서 서브메뉴 토글 (슬라이드 업/다운)
    // 1024px 이하에서만 동작
    function isMobileMenu() {
        return window.innerWidth <= 1024;
    }

    // slideToggle을 사용해서 더 간결하게 처리
    // slideToggle 대신 show/hide로 변경
    $('#main-menu > ul > li.has-submenu > a').on('click', function(e) {
        if (isMobileMenu()) {
            e.preventDefault();

            var $parentLi = $(this).parent();
            var $submenu = $parentLi.children('.submenu');
            var isOpened = $(this).hasClass('active');

            // 모든 서브메뉴 닫기 + active 클래스 제거
            $('#main-menu > ul > li.has-submenu').each(function() {
                $(this).children('.submenu').hide();
                $(this).children('a').attr('aria-expanded', 'false').removeClass('active');
            });

            // 만약 본인 메뉴가 이미 열려있었다면 닫기만 하고 종료
            if (isOpened) {
                $submenu.hide();
                $(this).attr('aria-expanded', 'false').removeClass('active');
            } else {
                // 아니면 본인 메뉴만 열기
                $submenu.show();
                $(this).attr('aria-expanded', 'true').addClass('active');
            }
        }
    });

    // 윈도우 리사이즈 시 서브메뉴 스타일 초기화 (PC로 전환 시)
    $(window).on('resize', function() {
        if (!isMobileMenu()) {
            $('#main-menu .submenu').removeAttr('style');
            $('#main-menu > ul > li.has-submenu > a').attr('aria-expanded', 'false');
        }
    });

    // pc 환경(1024px 이상)에서만 동작하도록 수정
    $(window).scroll(function(){
        if (window.innerWidth >= 1024) {
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 70) {
                $("#downfix").css("bottom", "140px");
            } else {
                $("#downfix").css("bottom", "0");
            }
        }
    });

    // "전체선택" 체크박스 클릭 시, 하단 item들의 체크박스 전체 선택/해제 로직
    $(document).on('change', '#allCheck', function() {
        var isChecked = $(this).is(':checked');
        // .search_result_body_content 내의 모든 item 체크박스에 적용
        $('.search_result_body_content .item_checkbox input[type="checkbox"]').prop('checked', isChecked);
    });

    // 개별 체크박스 상태에 따라 "전체선택" 체크박스 상태 동기화
    $(document).on('change', '.search_result_body_content .item_checkbox input[type="checkbox"]', function() {
        var total = $('.search_result_body_content .item_checkbox input[type="checkbox"]').length;
        var checked = $('.search_result_body_content .item_checkbox input[type="checkbox"]:checked').length;
        $('#allCheck').prop('checked', total === checked);
    });
});
