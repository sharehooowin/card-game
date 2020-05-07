import axios from 'axios';
import Utils from './Utils';
// 微信分享
let url = "https://wx.vip-h5.com/api/wx/getJSSDKConfig";
let title='微信分享标题';
let desc='微信分享语';
let link= '';
let imgUrl='分享图片';
let h5_url='';
const DEBUG_MODE = "dev";   // dev:开发测试/prod:生成环境开关
// 项目上线部署请把开关切换为prod
if(DEBUG_MODE=="dev"){    // 开发测试阶段对分享标题，链接，授权地址处理成测试内容
    title = "（测试）" + title;
    link = link.replace("service","test");
    h5_url = h5_url.replace("service","test");
}

const wx = window.wx||{};
const MtaH5 = window.MtaH5||{};
class WxUtils{
    constructor(){
        this.shareCallback;
        this.optionsWx = new Object();
        this.openid = "oqCOR0r_DeIaawta966YAS6Kr3LI";
        this.url = url;
        this.title = title;
        this.desc = desc;
        this.link = link;
        this.imgUrl = imgUrl;
        this.h5_url = h5_url;
        this.cookieName = "";
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
     * POST请求
     */
    async httpPost(url='',data={},config={}){
        //url = "http://wx.vip-h5.com/api/wx/getJSSDKConfig"
        if(config.headers){
            if(config.headers['Content-Type'] == 'application/json'){
                data = JSON.stringify(data)
            }
        }
        let result = await axios.post(url,data,config)
        return result.data
    }
    /**
     * GET请求
     */
    async httpGet(url=''){
        let retult = await axios.get(url)
        return retult.data
    }

    /**
     * * 初始化微信JS-SDK
     */
    async initWX(url='', title='', desc='', link='', imgUrl='',shareCallback=''){
        this.shareCallback = shareCallback
        this.optionsWx.url = url
        this.optionsWx.title = title
        this.optionsWx.desc = desc
        this.optionsWx.link = link
        this.optionsWx.imgUrl = imgUrl

        let data = new Object()
        let config = new Object()
        data.url = window.location.href.split("#")[0]
        data.projectAppId = "yijabni90ybg45nbfggbg954y54y6hh5"
        config.headers = {'Content-type':'application/json'}
        let result = await this.httpPost(url,data,config)
        if(result.errcode == 0){
            try {
                wx.config({
                    beta: true, // 开启内测接口调用，注入wx.invoke方法
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: result.data.appId, // 公众号的唯一标识
                    timestamp: result.data.timestamp, // 生成签名的时间戳
                    nonceStr: result.data.nonceStr, // 生成签名的随机串
                    signature: result.data.signature,// 签名，见附录1
                    jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareTimeline','onMenuShareAppMessage','getLocation'] //分享到朋友圈：onMenuShareTimeline， 分享到朋友：onMenuShareAppMessage
                    // 需要使用的jsapi列表，所有jsapi列表见附录2
                });
                wx.ready(()=>{
                    this.reOnMenuShareTime({title, link, imgUrl});
                    this.reOnMenuShareAppMessage({title, desc, link, imgUrl});
                    wx.hideMenuItems({
                        menuList: ['menuItem:openWithSafari', 'menuItem:openWithQQBrowser', 'menuItem:copyUrl']
                    })
                })
            }catch (e){
                return e
            }
        }
    }

    /**
     * 微信分享朋友圈
     */
    reOnMenuShareTime({title='', link='', imgUrl=''}) {
        if(!title) title = this.optionsWx.title
        if(!link) link = this.optionsWx.link
        if(!imgUrl) imgUrl = this.optionsWx.imgUrl
        try {
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                success: () =>{
                    MtaH5.clickShare('wechat_moments')  // 统计分享朋友圈
                    if(this.shareCallback) {
                        this.shareCallback(2)
                    }
                },
                cancel: function () {
                    //用户取消分享后执行的回调函数
                    return
                }
            });
        }catch (e){
            return e
        }
    }

    /**
     * 微信分享好友
     */
    reOnMenuShareAppMessage({title='', desc='', link='', imgUrl=''}) {
        if(!title) title = this.optionsWx.title
        if(!desc) desc = this.optionsWx.desc
        if(!link) link = this.optionsWx.link
        if(!imgUrl) imgUrl = this.optionsWx.imgUrl
        try {
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc:desc, // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: () =>{
                    MtaH5.clickShare('wechat_friend')  // 统计分享微信好友
                    if(this.shareCallback) {
                        this.shareCallback(1)
                    }
                },
                cancel: function () {
                    return
                }
            });
        }catch (e){
            return e
        }
    }

    /**
     *微信授权
     */
    auth(callback="") {
        // let url = location.href
        // const key = encodeURI(url.split('?')[0])
        // if (this.GetRequest().openid) {
        //     const obj = { openid: this.GetRequest().openid, expireTime: Date.now() + 24*60*60*1000 }
        //     localStorage.setItem(key, JSON.stringify(obj))
        //     url = url.replace(/&?openid=[^&]+/, '')
        //     location.replace(url)
        //     return false
        // }
        // const o = localStorage.getItem(key)
        // if (o){
        //     const obj = JSON.parse(o)
        //     if (Date.now() >= obj.expireTime) {
        //         localStorage.removeItem(key)
        //         location.replace(h5_url)
        //     }else {
        //         this.openid = obj.openid
        //         if(callback){
        //             callback();
        //         }
        //     }
        // }else {
        //     location.replace(h5_url)
        //     let token = this.getCookieByName(this.cookieName)
        //     if (!token) {
        //         location.replace(h5_url)
        //         return
        //     }
        // }
        let token = this.getCookieByName(this.cookieName)
        if (!token) {
            location.replace(h5_url)
            return
        }
        if(callback){
            callback();
        }
    }
    getCookieByName(name) {
        let cookies = document.cookie
        if (!cookies) {
            return null
        }
        let arr = cookies.split(";")
        for (let i in arr) {
            let val = arr[i].split("=")
            if (name == val[0].trim()) {
                return val[1]
            }
        }
    }
    getApiHeaders(){
        return {
            'openid': this.openid,
        }
    }
}
let wxUtils = new WxUtils();
export default wxUtils;