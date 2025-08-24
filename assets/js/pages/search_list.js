// 아코디언 슬라이드 기능
document.addEventListener('DOMContentLoaded', function() {
    // 아코디언 토글 버튼들
    const accordionToggles = document.querySelectorAll('.filter-group-toggle');
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const targetId = this.getAttribute('aria-controls');
            const targetElement = document.getElementById(targetId);
            
            // 현재 버튼의 상태 변경
            this.setAttribute('aria-expanded', !isExpanded);
            
            // 타겟 요소 토글
            if (isExpanded) {
                targetElement.classList.remove('active');
            } else {
                targetElement.classList.add('active');
            }
        });
    });


});

const detailInfoClick = (e) => {
    const target = e;
    const targetClass = target.classList;
    const targetParent = target.closest('.item');
    const detailInfo = targetParent.nextElementSibling;
    const listTable = targetParent.nextElementSibling.nextElementSibling;
    
    // 같은 아이템 내의 다른 버튼들 찾기
    const sameItemButtons = targetParent.querySelectorAll('button');
    
    if (targetClass.contains('active')) {
        target.classList.remove('active');
        if (detailInfo && detailInfo.classList.contains('detail_info')) {
            detailInfo.style.display = 'none';
        }ㅁ
    } else {
        // 같은 아이템 내의 다른 버튼들 비활성화
        sameItemButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // 다른 테이블들 숨기기
        if (listTable && listTable.classList.contains('list_table')) {
            listTable.style.display = 'none';
        }
        
        // 현재 버튼 활성화
        target.classList.add('active');
        if (detailInfo && detailInfo.classList.contains('detail_info')) {
            detailInfo.style.display = 'block';
        }
    }
}

const listInfoClick = (e) => {
    const target = e;
    const targetClass = target.classList;
    const targetParent = target.closest('.item');
    const detailInfo = targetParent.nextElementSibling;
    const listTable = targetParent.nextElementSibling.nextElementSibling;
    
    // 같은 아이템 내의 다른 버튼들 찾기
    const sameItemButtons = targetParent.querySelectorAll('button');
    
    if (targetClass.contains('active')) {
        target.classList.remove('active');
        if (listTable && listTable.classList.contains('list_table')) {
            listTable.style.display = 'none';
        }
    } else {
        // 같은 아이템 내의 다른 버튼들 비활성화
        sameItemButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // 다른 테이블들 숨기기
        if (detailInfo && detailInfo.classList.contains('detail_info')) {
            detailInfo.style.display = 'none';
        }
        
        // 현재 버튼 활성화
        target.classList.add('active');
        if (listTable && listTable.classList.contains('list_table')) {
            listTable.style.display = 'block';
        }
    }
}

const openTypeDetail = () => {
    document.body.style.overflow = 'hidden';
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false'); // 접근성 보완
  }
  
  const closeTypeDetail = () => {
    document.body.style.overflow = 'auto';
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true'); // 접근성 보완
  }

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