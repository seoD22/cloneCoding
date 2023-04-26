(()=>{

  let yOffset = 0; // window.pageYOffset 대신 사용할 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0')
      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5, 
      scrollHeight: 0, 
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0, 
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0, 
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ];

  function setLayout(){
    // 각 스크롤 섹션의 높이 세팅
    for(let i = 0; i < sceneInfo.length; i++){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    let totalScrollHeight = 0;
    for(let i = 0; i < sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= pageYOffset){
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }

  function scrollLoop(){
    prevScrollHeight = 0;
    for(let i = 0; i<currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
      // document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
      currentScene++;
      // document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    if(yOffset < prevScrollHeight){
      if(currentScene === 0) return // currentScene이 0이라면 --가 되지 않고 return해서 동작하지 않게 함
      currentScene--;
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }

  window.addEventListener('scroll', ()=>{
    yOffset = window.pageYOffset; // 현재 스크롤한 위치
    scrollLoop();
  });
  // window.addEventListener('DOMContentLoaded', setLayout)
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout); // 윈도우 사이즈가 바뀔 때 높이값 수정

})();