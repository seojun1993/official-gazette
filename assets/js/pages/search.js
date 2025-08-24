// 편찬구분 전체 체크박스 기능
document.addEventListener('DOMContentLoaded', function() {
    const allCheckbox = document.getElementById('pubTypeAll');
    const individualCheckboxes = document.querySelectorAll('input[name="pubTypeArr"]');
    
    allCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        
        individualCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });
    
    individualCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(individualCheckboxes).every(cb => cb.checked);
            
            if (allChecked) {
                allCheckbox.checked = true;
            } else {
                allCheckbox.checked = false;
            }
        });
    });
});



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
            $('.item_content, .item_example').show();
        }
    });
    
    function initPublicationToggle() {
        // 초기 상태: item_content와 item_example 숨기기
        $('.item_content, .item_example').hide();
        
        // item_type 클릭 시 토글
        $('.publication_item').off('click').on('click', function() {
            const $item = $(this);
            const $content = $item.find('.item_content, .item_example');
            const isExpanded = $item.hasClass('expanded');
            
            // 다른 아이템들 닫기
            $('.publication_item').not($item).removeClass('expanded');
            $('.publication_item').not($item).find('.item_content, .item_example').hide();
            
            // 현재 아이템 토글
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

// 기관코드검색 모달 열기
function openSearch() {
    document.body.style.overflow = 'hidden';
    const modal = document.querySelector('.search_modal');
    if (modal) {
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false'); // 접근성 보완
    }
}

// 기관코드검색 모달 닫기
function closeSearch() {
    document.body.style.overflow = 'auto';
    const modal = document.querySelector('.search_modal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true'); // 접근성 보완
    }
}

// 기관코드검색 모달의 전체 체크박스 기능
document.addEventListener('DOMContentLoaded', function() {
    // 전체 체크박스와 개별 체크박스들
    const allCheckbox = document.getElementById('all');
    const individualCheckboxes = document.querySelectorAll('input[name="all01"]');
    
    // 전체 체크박스 클릭 이벤트
    if (allCheckbox) {
        allCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            
            // 개별 체크박스들을 전체 체크박스와 동일하게 설정
            individualCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            
            // 선택된 기관 수 업데이트
            updateSelectedCount();
        });
    }
    
    // 개별 체크박스 클릭 이벤트
    individualCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 모든 개별 체크박스가 선택되었는지 확인
            const allChecked = Array.from(individualCheckboxes).every(cb => cb.checked);
            
            // 전체 체크박스 상태 업데이트
            if (allCheckbox) {
                allCheckbox.checked = allChecked;
            }
            
            // 선택된 기관 수 업데이트
            updateSelectedCount();
        });
    });
    
    // 선택된 기관 수 업데이트 함수
    function updateSelectedCount() {
        const selectedCount = Array.from(individualCheckboxes).filter(cb => cb.checked).length;
        const countElement = document.querySelector('.organ_list_content .organ_list_header .organ_list_header_item .organ_list_count');
        
        if (countElement) {
            countElement.textContent = `선택 건수 : ${selectedCount}`;
        }
    }
    
    // 초기 선택 건수 설정
    updateSelectedCount();
});

