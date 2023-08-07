(() => {
  const actions = {
    // bird 클래스 가지고 있는 위치에서 birdFlies() 함수 실행하도록 작성
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
      }
    },

    birdFlies2(key) {
      if (key) {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${
          window.innerWidth
        }px, ${-window.innerHeight * 0.7}px)`;
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
      }
    },
  };

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
  let currentItem = graphicElems[0];
  let ioIndex;

  /* Intersection Observer를 이용해서 해당 요소가 눈에 보이는지 체크
     IntersectionObserver의 관찰 대상인 객체들이 사라지거나 나타날 때, 그 시점마다 콜백함수가 실행된다. */
  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
  });

  for (let i = 0; i < stepElems.length; i++) {
    // 모든 stepElems를 관찰 대상으로 등록
    io.observe(stepElems[i]);

    // stepElemsp[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  // currentItem 화면에 보이게 하는 경우 (visible 클래스 추가)
  function activate(action) {
    currentItem.classList.add('visible');
    if (action) {
      actions[action](true);
    }
  }

  // currentItem 화면에서 remove (visible 클래스 제거)
  function inactivate(action) {
    currentItem.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener('scroll', () => {
    // stepElems 말풍선들의 위치 체크해서 이벤트 핸들링 (위치 범위 안에 들어왔을 때 활성화)
    let step;
    let boundingRect;
    let temp = 0;

    // ioIndex를 이용해 현재 눈에 보이는 요소와 직전 & 직후만 for문 돌도록 수정
    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      temp++;

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate(currentItem.dataset.action);
        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action); // currentItem의 data-action값 전달
      }
    }
    //console.log(temp);
  });

  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });

  activate();
})();
