class VerifyUtils{
    constructor(){}

    /**
     * 手机号码格式校验
     * @param mobile 手机号码
     * @returns {boolean}
     */
    isPhoneNumber(mobile){
        return /^1[3456789]\d{9}$/.test(mobile);
    }

    /**
     * 邮箱格式判断
     * @param email 邮箱地址
     * @returns {boolean}
     */
    isEmail(email){
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
    }

    /**
     *
     * @returns {boolean}
     */
    isWeiXin(){
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }

    /**
     *
     * @returns {boolean}
     */
    isAndroid(){
        return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1
    }

    /**
     *
     * @returns {boolean}
     */
    isIphone(){
        return navigator.userAgent.indexOf('iPhone') > -1
    }

    /**
     *
     * @returns {boolean}
     */
    isIpad(){
        return navigator.userAgent.indexOf('iPad') > -1
    }

    /**
     *
     * @returns {boolean}
     */
    isPC () { //是否为PC端
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
}

export default new VerifyUtils();