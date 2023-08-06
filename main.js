(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
  let currentItem = graphicElems[0];

  for (let i = 0; i < stepElems.length; i++) {
    //stepElemsp[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  // currentItem 화면에 보이게 하는 경우 (visible 클래스 추가)
  function activate() {
    currentItem.classList.add('visible');
  }

  // currentItem 화면에서 remove (visible 클래스 제거)
  function inactivate() {
    currentItem.classList.remove('visible');
  }

  window.addEventListener('scroll', () => {
    // stepElems 말풍선들의 위치 체크해서 이벤트 핸들링 (위치 범위 안에 들어왔을 때 활성화)
    let step;
    let boundingRect;

    for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();
      //console.log(boundingRect.top);

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate();
        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });
  activate();
})();
