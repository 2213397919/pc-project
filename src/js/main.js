export default function () {
// 获取所要操作的元素
    const liNodes = document.querySelectorAll('.nav li');
    const arrow = document.querySelector('.arrow');
    const content = document.querySelector('#content');
    const ulNode = document.querySelector('#content>ul');
    const music = document.querySelector('.music');
    const audio = document.querySelector('.music audio');
    const contentNav = document.querySelectorAll('.content-nav li');

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
           contentNav[j].className = '';
        }
        liNodes[nowIndex].className='active';
        contentNav[nowIndex].className = 'active';
        arrow.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth+'px';
        ulNode.style.top = - nowIndex * sectionH + 'px';
    }
    //1. 头部导航条事件
    for (let i = 0; i < liNodes.length; i++) {
        liNodes[i].onclick = function () {
            nowIndex = i;
            move(nowIndex);
        };
        contentNav[i].onclick = function () {
            nowIndex = i;
            move(nowIndex);
        }
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
    music.onclick = function () {
        if (audio.paused){
            audio.play();
            this.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAIABAAB8Z////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI4M0ZGM0UzNEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI4M0ZGM0U0NEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjgzRkYzRTE0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjgzRkYzRTI0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJKAABACwAAAAADgAOAAACHoyPqasAjBw8ksm67rMPB6x9nTOKJlmG6JmSLKu2BQAh+QQJKAABACwAAAAADgAOAAACHoyPqcvtCMCKhyobKM7S6O6BHyRKY3Saaspx7PeqBQAh+QQFKAABACwAAAAADgAOAAACHYyPqcvtDxUAcC5rcKZaBwtO3PiNYYmK5KmmK1AAADs=")';
        }else {
            audio.pause();
            this.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAJEAAAAAAP///wB8Z////yH5BAEAAAMALAAAAAAOAA4AAAIenI+pqyKMHDySybrusw8PrH2dM4omWYbomZIsq7YFADs=")';
        }
    };
}