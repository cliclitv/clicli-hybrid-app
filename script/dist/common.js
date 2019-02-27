/*
 **  当前文件为公共函数库
 **  可复用的函数功能抽离于此
 */

var utils = function () {
    //检测输入文本是否为空，空则true，非空则false
    var checkNullText = function checkNullText(test) {
        var input = /^[\s]*$/;
        if (input.test(test)) {
            return true;
        }
        return false;
    };

    //时间转换，天数，小时，分钟
    var formatMsgTime = function formatMsgTime(timespan) {
        //获取GMT时间
        var timeStamp = new Date(timespan);
        var year = timeStamp.getFullYear();
        var month = timeStamp.getMonth() + 1;
        var day = timeStamp.getDate();
        var hour = timeStamp.getHours();
        var minute = timeStamp.getMinutes();
        var second = timeStamp.getSeconds();
        //获取当前GMT时间
        var now = new Date();
        var milliseconds = 0;
        var timeSpanStr = void 0;
        //计算时间差（时间戳格式）
        milliseconds = now - timeStamp;

        if (milliseconds <= 1000 * 60 * 1) {
            timeSpanStr = '刚刚';
        } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前';
        } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
        } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
        } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
            timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
        } else {
            timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        }
        return timeSpanStr;
    };

    return {
        checkNullText: checkNullText,
        formatMsgTime: formatMsgTime
    };
}();