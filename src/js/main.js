export default function () {
// 获取所要操作的元素
    const liNodes = document.querySelectorAll('.nav li');
    const arrow = document.querySelector('.arrow');
    const content = document.querySelector('#content');
    const ulNode = document.querySelector('#content>ul');


    //缓存content的高度，由于溢出隐藏，content的高度为一个li的高度。
    let sectionH = content.offsetHeight;
    //缓存小箭头一半的宽
    const arrowHalfWidth = arrow.offsetWidth / 2;
    //代表li的下标
    let nowIndex = 0;
    //ie/chrome
    document.onmousewheel = wheel;
    //firefox
    document.addEventListener && document.addEventListener('DOMMouseScroll', wheel);
    //声明一个定时器，处理函数防抖
    let wheelTimer = null;
    //2. 滚轮事件
    function wheel(event) {
        event = event || window.event;
        //处理函数防抖的实现。
        //每次上来需要清除一下定时器
        clearInterval(wheelTimer);
       wheelTimer=setTimeout(()=>{
           let flag = '';
           if (event.wheelDelta){
               //IE、谷歌
               if (event.wheelDelta>0){
                   flag = 'up';
               }else {
                   flag = 'down';
               }
           }else if (event.detail){
               //火狐
               if (event.detail < 0){
                   flag = 'up';
               } else {
                   flag ='down';
               }
           }
           switch (flag) {
               //2.1进行极值判断，判断滚轮的方向，进行屏数的切换。
               case  'up':
                   if (nowIndex>0){
                       nowIndex--;
                       move(nowIndex);
                   }
                   break;
               case  'down':
                   if (nowIndex<4){
                       nowIndex++;
                       move(nowIndex);
                   }
                   break;
           }
       },300);
        //禁止默认行为,先判断event上是否有preventDefault，有就调用，没有直接return false;
        event.preventDefault && event.preventDefault();
        return false;
    }
    //1.1 滑动鼠标滚轮，小箭头的移动，导航样式的切换，屏数的切换。
    function move(nowIndex) {
        for (let j = 0; j < liNodes.length; j++) {
           liNodes[j].className='';
        }
        liNodes[nowIndex].className='active';
        arrow.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth+'px';
        ulNode.style.top = - nowIndex * sectionH + 'px';
    }
    //1. 头部导航条事件
    for (let i = 0; i < liNodes.length; i++) {
        liNodes[i].onclick = function () {
            nowIndex=i;
            move(nowIndex);
        };
    }
    arrow.style.left=liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth/2 - arrowHalfWidth +'px';
    //3. 绑定窗口检测事件，修改小箭头和ul的位置。
    window.onresize = function () {
        //修正小箭头
        arrow.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth+'px';
        //修正ul
        sectionH = content.offsetHeight;
        ulNode.style.top = - nowIndex * sectionH + 'px';
    };
}