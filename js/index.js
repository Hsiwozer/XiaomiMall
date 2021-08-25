window.addEventListener('load', function() {
    // 返回顶部按钮
    var singlerowbar = document.querySelector('.singleRowBar');
    var singlerowbarTop = singlerowbar.offsetTop;
    var backTotop = document.querySelector('.backTotop');
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= singlerowbarTop) {
            backTotop.style.display = 'block';
        } else {
            backTotop.style.display = 'none';
        }
    });
    // QRcode
    var QRcode = document.querySelector('.download-QRcode');
    var downApp = document.querySelector('.downApp');
    downApp.addEventListener('mouseenter', function() {
        QRcode.style.display = 'block';
    });
    downApp.addEventListener('mouseleave', function() {
        QRcode.style.display = 'none';
    });

    // 轮播图 动态生成小圆圈
    var homebox = document.querySelector('.homebox');
    var homeboxswiper = document.querySelector('.homebox-swiper'); //ul
    var homboxcicles = document.querySelector('.hombox-cicles'); //ol
    var imgWidth = homebox.offsetWidth;
    for (var i = 0; i < homeboxswiper.children.length; i++) {
        var li = document.createElement('li');
        // 设置小圆圈的索引号
        li.setAttribute('index', i);
        homboxcicles.appendChild(li);
        // 小圆圈的排他思想
        li.addEventListener('click', function() {
            for (var i = 0; i < homboxcicles.children.length; i++) {
                homboxcicles.children[i].className = '';
            }
            this.className = 'circle-current';
            // 小圆圈的索引号
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            // 点击小圆圈，移动图片，移动的是ul
            animate(homeboxswiper, -index * imgWidth);
        })
    }
    homboxcicles.children[0].className = 'circle-current';
    // 克隆第一张图片（第一个li）放到ul最后面
    var first = homeboxswiper.children[0].cloneNode(true);
    homeboxswiper.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    var num = 0;
    // 控制小圆圈的变化
    var circle = 0;
    // 节流阀
    var flag = true;
    var btnnext = document.querySelector('.swiper-btn-next');
    btnnext.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到最后一张重复的图片，要快速复原到第一张图片
            if (num == homeboxswiper.children.length - 1) {
                homeboxswiper.style.left = 0;
                num = 0;
            }
            num++;
            animate(homeboxswiper, -num * imgWidth, function() {
                flag = true; //打开节流阀
            });
            // 点击按钮，小圆圈跟着变化
            circle++;
            circle = circle == homboxcicles.children.length ? 0 : circle;
            circleChange();
        }
    });
    // 左侧按钮做法
    var btnprev = document.querySelector('.swiper-btn-prev');
    btnprev.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到最后一张重复的图片，要快速复原到第一张图片
            if (num == 0) {
                num = homeboxswiper.children.length - 1;
                homeboxswiper.style.left = -num * imgWidth + 'px';
            }
            num--;
            animate(homeboxswiper, -num * imgWidth, function() {
                flag = true;
            });
            // 点击按钮，小圆圈跟着变化
            circle--;
            circle = circle < 0 ? homboxcicles.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < homboxcicles.children.length; i++) {
            homboxcicles.children[i].className = '';
        }
        homboxcicles.children[circle].className = 'circle-current';
    }
    // 自动播放轮播图
    var timer = setInterval(function() {
        // 手动调用点击事件
        btnnext.click();
    }, 6000)
    homebox.addEventListener('mouseenter', function() {
        clearInterval(timer);
        // 清空定时器变量
        timer = null;
    })
    homebox.addEventListener('mouseleave', function() {
        timer = setInterval(function() {
            btnnext.click();
        }, 6000)
    });

    // 返回顶部做法
    var backTotop = document.querySelector('.backTotop');
    backTotop.addEventListener('click', function() {
        // window.scroll(0, 0);
        backTotopAnimate(window, 0);
    });
    // 返回顶部缓动动画函数
    function backTotopAnimate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            window.scroll(0, window.pageYOffset + step);
        }, 15)
    }
})