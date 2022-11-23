export function getEleOffsetTop(ele) {
    if (!ele) return 0;
    let top = ele.offsetTop
    let parent = ele.offsetParent

    while (parent) {
        top += parent.offsetTop
        parent = parent.offsetParent
    }
    return top
}

export function funDrag(ele, dragEle, cb = function() {}) {
    let params = {
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        flag: false
    };
    //获取相关CSS属性
    let getCss = function(ele, key) {
        return ele.currentStyle ? ele.currentStyle[key] : document.defaultView.getComputedStyle(ele, false)[key];
    };

    if (getCss(ele, 'left') !== 'auto') {
        params.left = getCss(ele, 'left');
    }
    if (getCss(ele, 'top') !== 'auto') {
        params.top = getCss(ele, 'top');
    }
    (dragEle || ele).onmousedown = function(event) {
        params.flag = true;
        params.currentX = event.clientX;
        params.currentY = event.clientY;
    };
    document.onmouseup = function(event) {
        params.flag = false;
        params.left = getCss(ele, 'left');
        params.top = getCss(ele, 'top');
        cb();
    };
    document.onmousemove = function(event) {
        if (params.flag) {
            let x = event.clientX,
                y = event.clientY;

            let dx = x - params.currentX,
                dy = y - params.currentY;
            ele.style.left = parseInt(params.left) + dx + 'px';
            ele.style.top = parseInt(params.top) + dy + 'px';
        }
    }
    return ele;
}