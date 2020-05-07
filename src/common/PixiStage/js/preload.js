import * as PIXI from "pixi.js";

export default class Prolader{
    constructor(options){
        this.context = options.context;
        this.pixiUtils = options.pixiUtils;
        this.resources = options.resources;  // 加载资源
        this.originBackgroundColor = options.originBackgroundColor;
        this.backgroundColor = options.backgroundColor;
        this.iconSprite = options.iconSprite;
        this.barSprite = options.barSprite;
        this.loader = options.loader;
        this.progress = 0;
        this.innerval = "";
        this.loading_icon;
        this.loading_bar;
        this.progress_text;
        this.bar_mask;
        this.BarConfig = {
            width:this.context.app.screen.width * 0.8,
            height:this.context.app.screen.width / 15,
            y:this.context.app.screen.height/2,
            originOffsetX:null
        };
        this.init();
    }
    init(){
        this.context.app.renderer.backgroundColor = this.backgroundColor;

        this.loading_container = new PIXI.Container();
        this.loading_icon = PIXI.Sprite.from(this.iconSprite.url);
        this.pixiUtils.setAnchor(this.loading_icon, this.iconSprite.anchor); // 设置相对原点
        this.pixiUtils.setSize(this.loading_icon, this.iconSprite.size);  // 设置大小
        this.pixiUtils.setPosition(this.loading_icon, this.iconSprite.position); // 设置位置
        this.loading_container.addChild(this.loading_icon);

        this.loading_bar = new PIXI.Sprite.from(this.barSprite.url);
        this.pixiUtils.setSize(this.loading_bar, this.barSprite.size);
        this.BarConfig.originOffsetX = - this.loading_bar.width + (this.context.app.screen.width - this.loading_bar.width)/2;
        // this.loading_bar.x = (this.context.app.screen.width - this.loading_bar.width)/2;
        this.loading_bar.x = this.BarConfig.originOffsetX;
        this.loading_bar.y = this.BarConfig.y;
        this.loading_container.addChild(this.loading_bar);

        // 进度条遮罩
        this.bar_mask = new PIXI.Graphics();
        this.loading_container.addChild(this.bar_mask);
        this.bar_mask.x = (this.context.app.screen.width - this.loading_bar.width)/2;
        // this.bar_mask.x = this.BarConfig.originOffsetX;
        this.bar_mask.y = this.BarConfig.y;
        this.bar_mask.beginFill(null,1);
        this.bar_mask.drawRoundedRect(0,0,this.loading_bar.width,this.loading_bar.height,10);
        this.bar_mask.endFill();
        this.loading_bar.mask = this.bar_mask;

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#008B8B',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });
        this.progress_text = new PIXI.Text(this.progress,style);
        this.progress_text.anchor.set(0.5);
        this.progress_text.x = this.context.app.screen.width /2;
        this.progress_text.y = this.context.app.screen.height /2 + this.loading_bar.height * 2;
        this.loading_container.addChild(this.progress_text);
        this.context.app.stage.addChild(this.loading_container);
    }
    load(callback){
        for(var i in this.resources){
            PIXI.loader.add(this.resources[i].name,this.resources[i].url);
        }
        PIXI.loader.load();

        let that = this;
        this.innerval = setInterval(function(){
            if(that.progress<parseInt(PIXI.loader.progress)){
                that.progress += 1;
            }
            if(that.progress>=100){
                setTimeout(()=>{
                    that.context.app.stage.removeChild(that.loading_container); // 移除预加载容器
                    // that.context.render(); // 开始渲染业务内容
                    callback.apply(that.context); // 开始渲染业务内容
                },200);
                clearInterval(that.innerval);
            }
            let currentWidth = that.BarConfig.width * that.progress / 100;
            that.loading_bar.x = that.BarConfig.originOffsetX + currentWidth;
            that.progress_text.text = that.progress + "%";
        },20);
    }
}