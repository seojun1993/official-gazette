  // 모바일에서 간행물 유형 토글 기능
  $(document).ready(function() {
    // 모바일에서만 토글 기능 활성화
    if (window.innerWidth < 1024) {
        initPublicationToggle();
    }
    
    // 화면 크기 변경 시 토글 기능 재설정
    $(window).on('resize', function() {
        if (window.innerWidth < 1024) {
            initPublicationToggle();
        } else {
            // PC에서는 토글 기능 비활성화
            $('.publication_item').off('click');
            $('.publication_item .item_content, .publication_item .item_example').show();
        }
    });
    
    function initPublicationToggle() {
        // 초기 상태: item_content와 item_example 숨기기
        $('.publication_item .item_content, .publication_item .item_example').hide();
        
        // item_type 클릭 시 토글
        $('.publication_item').off('click').on('click', function() {
            const $item = $(this);
            const $content = $item.find('.item_content, .item_example');
            const isExpanded = $item.hasClass('expanded');
            
            // 현재 아이템만 토글 (다른 아이템들은 건드리지 않음)
            if (isExpanded) {
                $item.removeClass('expanded');
                $content.hide();
            } else {
                $item.addClass('expanded');
                $content.show();
            }
        });
    }
});