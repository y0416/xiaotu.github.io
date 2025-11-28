
// (function () {
//     const banner = document.querySelector('.banner');
//     if (!banner) return;
//     const slides = Array.from(banner.querySelectorAll('.pic li'));
//     const dots = Array.from(banner.querySelectorAll('ol li'));
//     if (!slides.length) return;

//     let index = 0;
//     let timer = null;
//     const interval = 3000;

//     function show(i) {
//         i = (i + slides.length) % slides.length;
//         slides.forEach((li, idx) => {
//             li.style.display = idx === i ? 'block' : 'none';
//         });
//         dots.forEach((dot, idx) => {
//             if (idx === i) dot.classList.add('current');
//             else dot.classList.remove('current');
//         });
//         index = i;
//     }

//     function start() {
//         stop();
//         timer = setInterval(() => show(index + 1), interval);
//     }

//     function stop() {
//         if (timer) {
//             clearInterval(timer);
//             timer = null;
//         }
//     }

//     // 初始化：隐藏除第一个外的图片，绑定事件
//     show(0);
//     start();

//     // 点击圆点切换
//     dots.forEach((dot, idx) => {
//         dot.addEventListener('click', () => {
//             show(idx);
//         });
//     });

//     // 悬停暂停
//     banner.addEventListener('mouseenter', stop);
//     banner.addEventListener('mouseleave', start);
// })();
(function () {
    // 自动轮播 3s，支持点切换和悬停暂停
    const banner = document.querySelector('.banner');
    if (!banner) return;

    const slides = Array.from(banner.querySelectorAll('.pic li'));
    const dots = Array.from(banner.querySelectorAll('ol li'));
    if (!slides.length) return;

    let index = 0;
    let timer = null;
    const INTERVAL = 3000; 

    // 显示指定索引
    function show(i) {
        i = (i + slides.length) % slides.length;
        slides.forEach((li, idx) => {
            li.style.display = idx === i ? 'block' : 'none';
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('current', idx === i);
        });
        index = i;
    }

    function next() {
        show(index + 1);
    }

    function start() {
        stop();
        timer = setInterval(next, INTERVAL);
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // 初始化：显示第一个
    show(0);
    start();

    // 点击圆点切换
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            show(idx);
        });
    });

    // 箭头控制：上一张 / 下一张
    const prevBtn = banner.querySelector('.arrow.prev');
    const nextBtn = banner.querySelector('.arrow.next');
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stop();
            show(index - 1);
            start();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stop();
            show(index + 1);
            start();
        });
    }

    // 悬停暂停 / 离开继续
    banner.addEventListener('mouseenter', stop);
    banner.addEventListener('mouseleave', start);

    // 页面隐藏时停止计时，切回时恢复，节省资源
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else start();
    });

    // 卸载时清理
    window.addEventListener('beforeunload', stop);
})();