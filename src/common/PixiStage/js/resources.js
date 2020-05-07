import Utils from '../../../lib/WxUtils.js';
let resources = [
    { name:"logo",url:require("../../../assets/logo.png"),},
];
getPlanes(408,433);
getGirls(160,222);
function getGirls(from,to){
    for(let i = from; i<=to; i++){
        resources.push({
            name:'girl' + i,
            url:require('../../../assets/img/girl/' + i + ".png")
        })
    }
}
function getPlanes(from,to){
    for(let i = from; i<=to; i++){
        resources.push({
            name:'plane' + i,
            url:require('../../../assets/img/plane/' + i + ".png")
        })
    }
}
export default resources;