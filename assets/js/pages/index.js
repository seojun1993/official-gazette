document.addEventListener('DOMContentLoaded', function() {
    const timelineGroups = document.querySelectorAll('.timeline-group');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const prevBtn = document.querySelector('.timeline-prev');
    const nextBtn = document.querySelector('.timeline-next');
    const playPauseBtn = document.querySelector('.timeline-play-pause');
    
    // 요소가 없으면 종료
    if (timelineGroups.length === 0 || !prevBtn || !nextBtn || !playPauseBtn) {
        return;
    }
    
    let currentGroupIndex = 0; // 현재 활성화된 그룹
    let isPlaying = true;
    let interval;
  
    // 그룹별로 액티브 변경 함수
    function setActiveGroup(groupIndex) {
      // 모든 그룹과 아이템 비활성화
      timelineGroups.forEach(group => {
        group.classList.remove('active');
        const items = group.querySelectorAll('.timeline-item');
        items.forEach(item => {
          item.classList.remove('active');
          item.querySelector('.timeline-dot').classList.remove('active');
        });
      });
      
      // 현재 그룹 활성화
      const currentGroup = timelineGroups[groupIndex];
      currentGroup.classList.add('active');
      const activeItems = currentGroup.querySelectorAll('.timeline-item');
      activeItems.forEach(item => {
        item.classList.add('active');
        item.querySelector('.timeline-dot').classList.add('active');
      });

      // 하단 상세 내용도 함께 변경 (PC/모바일 둘 다)
      const stateItems = document.querySelectorAll('.state_item');
      stateItems.forEach(item => item.classList.remove('active'));
      
      // PC용과 모바일용 모두 업데이트
      const currentStateItemPC = document.querySelector(`.state_detail.pc .state_item[data-group="${groupIndex}"]`);
      const currentStateItemMobile = document.querySelector(`.state_detail.mobile .state_item[data-group="${groupIndex}"]`);
      
      if (currentStateItemPC) {
        currentStateItemPC.classList.add('active');
      }
      if (currentStateItemMobile) {
        currentStateItemMobile.classList.add('active');
      }
    }
  
    // 다음 그룹으로 이동
    function goNext() {
      currentGroupIndex = (currentGroupIndex + 1) % timelineGroups.length;
      setActiveGroup(currentGroupIndex);
    }
  
    // 이전 그룹으로 이동
    function goPrev() {
      currentGroupIndex = (currentGroupIndex - 1 + timelineGroups.length) % timelineGroups.length;
      setActiveGroup(currentGroupIndex);
    }
  
    // 자동재생 시작
    function startAutoplay() {
      interval = setInterval(goNext, 5000);
    }
  
    // 자동재생 정지
    function stopAutoplay() {
      clearInterval(interval);
    }
  
    // 초기 설정
    setActiveGroup(currentGroupIndex);
    startAutoplay();
  
    // 이벤트 리스너
    nextBtn.addEventListener('click', function() {
      goNext();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay(); // 재시작
      }
    });
  
    prevBtn.addEventListener('click', function() {
      goPrev();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay(); // 재시작
      }
    });
  
    playPauseBtn.addEventListener('click', function() {
      if (isPlaying) {
        stopAutoplay();
        this.innerHTML = '▶';
        isPlaying = false;
      } else {
        startAutoplay();
        this.innerHTML = '⏸';
        isPlaying = true;
      }
    });
  
    // 그룹 클릭 이벤트
    timelineGroups.forEach((group, groupIndex) => {
      group.addEventListener('click', function() {
        currentGroupIndex = groupIndex;
        setActiveGroup(currentGroupIndex);
        if (isPlaying) {
          stopAutoplay();
          startAutoplay(); // 재시작
        }
      });
    });
  });