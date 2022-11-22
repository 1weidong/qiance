(function flexible(window, document) {
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1;

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = 14 * dpr + "px";
        } else {
            document.addEventListener("DOMContentLoaded", setBodyFontSize);
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        // 默认pc为100
        let rem = 100;
        const width = docEl.clientWidth;
        if (width < 1024) {
            rem = docEl.clientWidth / 7.5;
        }
        docEl.style.fontSize = rem + "px";
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener("resize", setRemUnit);
    window.addEventListener("pageshow", function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });
})(window, document);
