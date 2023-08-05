(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');

  for (let i = 0; i < stepElems.length; i++) {
    //stepElemsp[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
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
        //console.log(step.dataset.index);
        graphicElems[step.dataset.index].classList.add('visible');
      }
    }
  });
})();
