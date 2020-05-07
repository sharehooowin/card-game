import * as PIXI from 'pixi.js';
class LoaderPixi{
    constructor() {
        this.loader = new PIXI.Loader()
        this.progressTimmer = null;
        this.progress = 0;
        this.resources; // 资源列表
    }
    /**
     * 初始化预加载器
     * @param resources 资源列表 type:array
     * 参数结构 : [ { name:'test', url:'./assets/img/test.png' }, ... ]
     */
    init(resources){
        for(let i in resources){
            let resource = resources[i];
            let { name,url } = resource;
            name = name || url;
            this.loader.add(name, url);
        }
    }
    /**
     * 开始加载
     * @param callback 加载完成时的回调处理
     */
    load(callback){
        this.loader.load();
        this.loader.onError.add((err,loader,resource)=>{
            console.error(err,"emmmmmmm,这个资源加载失败了:",resource);
        })
        this.onProgress(callback);
    }

    /**
     * 单独添加一个资源
     * @param resource
     */
    add(resource){
        let { name, url } = resource;
        name = name || url;
        this.loader.add(name, url);
    }
    onProgress(callback){
        clearTimeout(this.progressTimmer);
        this.progressTimmer = setInterval(()=>{
            if(this.progress < parseInt(this.loader.progress)){
                this.progress++;
            }
            // 加载完成
            if(this.progress >= 100){
                if(callback){
                    callback();
                }else{
                    console.warn("虽然没有回调,但pixi已完成了预加载,放心使用哈！");
                }
                clearInterval(this.progressTimmer)
            }
        },20);
    }
}

export default new LoaderPixi();