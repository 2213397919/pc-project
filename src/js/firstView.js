export default function () {
    //获取小圆点
    const pointsNode = document.querySelectorAll('.home-point li');
    //获取轮播图中的li
    const liNodes = document.querySelectorAll('.home-carousel li');
    //鼠标移入移出区域
    const home = document.querySelector('.home');
    //记录上一次下标
    let lastIndex = 0;
    //记录当前下标
    let nowIndex = 0;
    //上次时间
    let lastTime = 0;
    //定时器
    let timer = null;
    //1.绑定点击事件
    for (let i = 0; i < pointsNode.length; i++) {
        pointsNode[i].onclick = function () {
            //函数节流
            let nowTime = Date.now();
            if (nowTime -lastTime <=2500) return;
            //将当前下标同步当前小圆点下标
            nowIndex = i;
            //点击同一个小圆点时不处理
            if (lastIndex === nowIndex) return;
            if (nowIndex > lastIndex) {
                //说明点击的是右边
                liNodes[nowIndex].className = 'common-title rightShow';
                liNodes[lastIndex].className = 'common-title leftHide';

            } else {
                //说明点击是左边
                liNodes[nowIndex].className = 'common-title leftShow';
                liNodes[lastIndex].className = 'common-title rightHide';
            }
            //让上一次的小圆点清空，当前的加上active
            pointsNode[lastIndex].className = '';
            pointsNode[nowIndex].className = 'active';

            //同步更新上一次下标
            lastIndex = nowIndex;
            lastTime=nowTime;
        };
    }
    //2.自动轮播，通过定时器
    function move() {
        timer = setInterval(() => {
            nowIndex++;
            //极值判断
            if (nowIndex === 4) nowIndex = 0;
            //沿着一个方向轮播
            liNodes[nowIndex].className = 'common-title rightShow';
            liNodes[lastIndex].className = 'common-title leftHide';
            //让上一次的小圆点清空，当前的加上active
            pointsNode[lastIndex].className = '';
            pointsNode[nowIndex].className = 'active';
            //同步更新上一次下标
            lastIndex = nowIndex;
        }, 3000);
    }
    //开启自动轮播
    move();
    //3.绑定移入移出事件
    home.onmouseenter = function () {
        //鼠标移入，清除轮播。
        clearInterval(timer);
    };
    //鼠标移出，开始轮播。
    home.onmouseleave=move;
}



