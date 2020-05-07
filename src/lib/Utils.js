import axios from 'axios'
// 微信分享
// let title='微信分享标题'
// let desc='微信分享语'
// let link= ''
// let imgUrl='分享图片'
let h5_url=''
const wx = window.wx||{}
const MtaH5 = window.MtaH5||{}
class Utils{
    constructor(){
        DEBUG_MODE:"dev"
    }
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return decodeURI(r[2]); return null; //返回参数值
    }
    /**
     * 获取Url参数
     */
    GetRequest(){
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            let strs = str.split("&");
            for(let i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    /**
     * 允许指定doc滚动
     * context:vue上下文,doc：需要滚动的doc
     */
    canScroll(context,doc){
        let startY
        doc.addEventListener('touchstart',(e)=>{
            startY = e.targetTouches[0].clientY
        })
        doc.addEventListener('touchmove',(e)=>{
            let endY = e.targetTouches[0].clientY
            if(endY-startY>=0){
                if(0<doc.scrollTop){
                    context.$store.commit('setCanScroll',true)
                }else {
                    context.$store.commit('setCanScroll',false)
                }
            }else {
                if(doc.scrollTop+doc.clientHeight<doc.scrollHeight){
                    context.$store.commit('setCanScroll',true)
                }else {
                    context.$store.commit('setCanScroll',false)
                }
            }
        })
        doc.addEventListener('touchend',()=>{
            context.$store.commit('setCanScroll',false)
        })
    }
    slideDown(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = -100;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientY;
            // conosle.log(startX)
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientY;
            // conosle.log(moveX);
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX < maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    slideUp(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = 100 ;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientY;
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientY;
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX > maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    slideLeft(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = 100;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientX;
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientX;
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX > maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    slideRight(context,doc,callback){
        let startX = 0, moveX = 0;
        let maxHeight = -100;
        doc.addEventListener("touchstart",(e)=>{
            startX = e.touches[0].clientX;
        })
        doc.addEventListener("touchmove",(e)=>{
            moveX = e.touches[0].clientX;
        })
        doc.addEventListener("touchend",(e)=>{
            if(moveX!=0 && moveX - startX < maxHeight){
                callback();
            }
            startX = 0;
            moveX = 0;
            // e.preventDefault()
        });
    }
    /**
     * 信息提示
     * @param text 内容文本
     * @param cssStyle 自定义样式,最终会与默认样式融合(自定义样式覆盖默认样式)
     * @param time 关闭时间,默认2秒后关闭
     */
    showTips(text='',cssStyle={},time=2000){
        if(this.tipsTimer){
            clearTimeout(this.tipsTimer);
        }
        this.hideTips();
        let tipsDoc = document.createElement('div'); // 创建一个div dom
        tipsDoc.innerHTML = text;  // 设置文本提示内容
        tipsDoc.className = "tips-WxUtils"; // 类名
        // 默认样式
        let originCssStyle = {
            "position": "fixed",
            "max-width": "60%",
            "left": "50%",
            "top": "50%",
            "transform": "translate(-50%,-50%)",
            "background-color": "rgba(0, 0, 0, .7)",
            "color": "white",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "text-align": "center",
            "padding": "10px",
            "font-size": "14px",
            "border-radius": "5px",
        };
        // 最终样式
        let targetCssStyle = Object.assign({},originCssStyle,cssStyle);

        // 将css对象属性转换为字符串
        let cssStyleString = '';
        for(let key in targetCssStyle){
            cssStyleString += `${key}:${targetCssStyle[key]};`;
        }
        // 设置样式
        tipsDoc.style = cssStyleString;

        // 添加显示提示窗口
        document.body.appendChild(tipsDoc);

        // 延时隐藏提示窗口
        this.tipsTimer = setTimeout(()=>{
            document.body.removeChild(tipsDoc)
        },time)
    }

    /**
     * 隐藏已经的信息提示
     */
    hideTips(){
        let tipsList = document.getElementsByClassName('tips-WxUtils')
        if(tipsList.length>0){
            document.body.removeChild(tipsList[0])
        }
    }
    isIphoneX(){
        if(window.innerWidth/window.innerHeight<0.54){
            return true;
        }
        return false;
    }
    isSmallPhone() {
        if (window.innerWidth / window.innerHeight >= 0.6) {
            return true;
        }
        return false;
    }
    getApiHeaders(){
        return {
            'openid': this.openid,
        }
    }

    /**
     * 获取url参数
     * @param name 查询参数名
     * @returns {*}
     */
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return decodeURI(r[2]); return null; //返回参数值
    }

    /**
     * 删除url参数
     * @param name 参数名
     * @returns {string} 返回删除指定参数后的url字符串
     */
    delUrlParam(name){
        var loca = window.location;
        var baseUrl = loca.origin + loca.pathname + "?";
        var query = loca.search.substr(1);
        if (query.indexOf(name)>-1) {
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            delete obj[name];
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
            return url
        }else{
            return baseUrl + query;
        };
    }

    /**
     * 防抖动
     * @param func
     * @param wait  防抖时间
     * @param immediate 是否立即执行 true or false
     * @returns {Function}
     * @private
     */
    _DEBOUNCE(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    /**
     * 范围随机
     * @param min 最小值
     * @param max 最大值
     * @returns {number} 随机生成数
     */
    randomIn(min,max){
        return parseInt(Math.random()*(max-min+1)+min,10);
    }
    /**
     * created by xiehaowen 2019.10.18
     * 给节点添加相应机型的class后缀，后可通过直接写css来做布局适配
     * @param dom 需要做机型适配的dom，会为该dom和该dom下的所有子节点添加特殊机型的classname
     * 特殊说明：
     *   只会为所有classname中的第一个添加特殊后缀
     * 后缀使用说明：
     *   小机型 : '_smallphone'
     *   iphonex : '_iphonex'
     */
    addSpecialPhoneClass(dom = document.getElementById("app")){
        // 先为当前元素添加class
        let specialPhoneClass, classList, newClassList = [];
        // 特殊机型的class后缀
        if(this.isSmallPhone()){
            specialPhoneClass = '_smallphone';
        }else if(this.isIphoneX()){
            specialPhoneClass = '_iphonex';
        }else{
            return;
        }
        classList = dom.classList;
        if(classList!=undefined){
            if(classList.length > 0){
                newClassList.push(classList[0] + specialPhoneClass);
                dom.classList.add(newClassList);
            }
        }

        // if(classList.value.indexOf('xhw_adaptation')!=-1){
        //         newClassList.push(classList[0] + specialPhoneClass);
        //         dom.classList.add(newClassList)
        // }

        // 循环为子节点添加class
        let childrens = dom.children;
        if(childrens){
            for(let i=0; i<childrens.length; i++){
                this.addSpecialPhoneClass(childrens[i]);
            }
        }
    }
    domInsertHandler(){
        this.addSpecialPhoneClass(document.getElementById('app'));
        document.body.addEventListener('DOMNodeInserted',(e)=>{
            this.addSpecialPhoneClass(e.target);
        })
    }
    swipeUp(context,doc,callback){
        let startY = 0, endY = 0;
        let canswipe = true;
        doc.ontouchstart = (e)=>{
            if(!canswipe){
                return;
            }
            startY = e.touches[0].clientY;
            e.preventDefault();
        };
        doc.ontouchmove = (e)=>{
            if(!canswipe){
                return;
            }
            endY = e.touches[0].clientY;
            let offsetY = endY - startY;
            if(offsetY<0){
                doc.style.transform = `translateY(${offsetY}px)`;
                if(Math.abs(offsetY) >= document.documentElement.clientHeight/2){
                    doc.style.transition = `all 0.5s`;
                    doc.style.transform = `translateY(-100%)`;
                    canswipe = false;
                }
            }
            e.preventDefault();
        };
        doc.ontouchend = (e)=>{
            if(!canswipe){
                return;
            }
            let offsetY = endY - startY;
            // console.log(Math.abs(offsetY),document.documentElement.clientHeight* 2/3)
            if(Math.abs(offsetY) < document.documentElement.clientHeight/2){
                doc.style.transform = `translateY(0px)`;
            }
            startY = 0;
            endY = 0;
            e.preventDefault();
        };
    }
    scrollTop(){
        window.scrollTo(0, document.body.scrollTop + 1);
    }

    /**
     * created by xiehaowen 2020-04-29
     * 顺时针旋转图片
     * @param img
     * @param canvas
     * @param step 顺时针旋转step次90度，默认不旋转
     */
    rotateImgClockwise(img,canvas,step){
        let degree = 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        let height = img.height;
        let width = img.width;
        switch (step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                break;
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0);
                break;
            default:
                ctx.drawImage(img, 0,0,width,height);
                break;
        }
    }
    S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    guuid() {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    }
}
let utils = new Utils()
export default utils