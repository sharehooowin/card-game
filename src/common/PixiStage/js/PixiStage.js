import * as PIXI from 'pixi.js';
import PixiUtils from '../../../lib/PixiUtils';
import Preload from "./preload";
import AlloyTouch from "alloytouch";
import resources from './resources';
import sprites from './sprites';
import texts from './texts';
import { TEXTS_ANIMATIONS, SPRITES_ANIMATIONS} from "./animations";
import { TweenMax, TimelineMax } from 'gsap';

export default class PixiStage {
    constructor(context, ref) {
        this.context = context; // 记录上下文
        this.ref = ref; // 要渲染pixi的dom节点
        this.loader = new PIXI.loaders.Loader();
        this.sprites = [];
        this.texts = [];
        this.init();
    }

    init() {
        let windowHeight = window.innerHeight,
            windowWidth = window.innerWidth;
        this.app = new PIXI.Application({
            width: windowWidth,
            height: windowHeight,
            // transparent:true, // 舞台透明
            backgroundColor: 0x1099bb
        });
        this.ref.appendChild(this.app.view);
        // this.pixiUtils = new PixiUtils({
        //     stageWidth: this.app.screen.width,
        //     stageHeight: this.app.screen.height,
        // });
        this.preload();
    }

    preload() {
        let preloader = new Preload({
            context: this,
            loader:this.loader,
            // pixiUtils: this.pixiUtils,
            pixiUtils:PixiUtils,
            resources: resources,
            backgroundColor: '0xf8c564',
            iconSprite: {
                url: require("../img/loading_icon.png"),
                size: {mode: "widthFit", width: 0.8},
                position: {mode: "relative", x: 0.5, y: 0.4},
                anchor: "center"
            },
            barSprite: {
                url: require("../img/loading.jpg"),
                size: {width: this.app.screen.width * 0.8, height: this.app.screen.width / 15},
            }
        });
        preloader.load(this.render);
        // this.render();
    }

    render() {
        // 开始pixi.js的业务内容渲染
        this.initBg();          // 创建背景，同时设置长图的总高度
        this.initTexts();       // 创建所有文本对象
        this.initSprites();     // 创建所有sprite对象和animatedSprite对象
        this.setSpecialProps(); // 设置对象的特殊属性
        this.initTimeline();    // 初始化时间轴
        this.initTouch();       // 滚动监听
    }

    initBg() {
        // 创建背景
        this.bg = new PIXI.Graphics();
        this.bg.position.x = 0;
        this.bg.position.y = 0;
        this.bg.beginFill(0xfdfbe2);
        this.bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height * 2);
        this.bg.endFill();
        this.app.stage.addChild(this.bg);
        this.scrollHeight = this.bg.height - this.app.screen.height;  // 记录滚动的总高
    }
    initSprites() {
        for (let name in sprites) {
            let spriteConfig = sprites[name];
            let { position, size, anchor } = spriteConfig;
            if(spriteConfig.isAnimation && spriteConfig.animations){
                let animations = spriteConfig.animations;
                let textures = [];
                for(var i = animations.from; i<=animations.to; i++){
                    textures.push(PIXI.loader.resources[spriteConfig.key + i].texture);
                }
                this.sprites[name] = new PIXI.extras.AnimatedSprite(textures);
                PixiUtils.setPosition(this.sprites[name], position);
                PixiUtils.setSize(this.sprites[name], size);
                PixiUtils.setAnchor(this.sprites[name],anchor);
                this.app.stage.addChild(this.sprites[name]);
                if(animations.autoplay){
                    this.sprites[name].play();
                    this.sprites[name].animationSpeed = 0.2;
                }
            } else {
                let texture =PIXI.loader.resources[spriteConfig.key].texture;
                this.sprites[name] = new PIXI.Sprite(texture);
                PixiUtils.setPosition(this.sprites[name], position);
                PixiUtils.setSize(this.sprites[name], size);
                PixiUtils.setAnchor(this.sprites[name], anchor);
                this.app.stage.addChild(this.sprites[name]);
            }
        }
    }
    initTexts() {
        for(let name in texts){
            let textConfig = texts[name];
            let { text, anchor, position, fontStyle } = textConfig;
            this.texts[name] = new PIXI.Text(text,fontStyle);
            PixiUtils.setAnchor(this.texts[name],anchor);
            PixiUtils.setPosition(this.texts[name],position);
            this.app.stage.addChild(this.texts[name]);
        }
    }
    setSpecialProps(){

    }
    initTimeline(){
        this.timeline = new TimelineMax({
            paused:true
        });

        // 设置文本动画
        for(let name in TEXTS_ANIMATIONS){
            this.setAnimations(this.texts[name], TEXTS_ANIMATIONS[name]);
        }
        // 设置精灵动画
        for(let name in SPRITES_ANIMATIONS){
            this.setAnimations(this.sprites[name], SPRITES_ANIMATIONS[name]);
        }
    }
    setAnimations(obj, animations){
        for(let index in animations){
            let animation = animations[index];
            let action;
            let { delay = 0, duration = 1, from, to, } = animation;
            let convertProps = ["x","y", "width","height"];
            for(let index in convertProps){
                let key = convertProps[index];
                if(from && from[key]){
                    from[key] = PixiUtils.display(from[key]);
                }
                if(to && to[key]){
                    to[key] = PixiUtils.display(to[key]);
                }
            }
            let target = obj;
            if(animation.prop){
                target = obj[animation.prop];
            }
            if(from || to){
                if(from && to){
                    action = TweenMax.fromTo(target, duration, from, to);
                } else if(from) {
                    action = TweenMax.from(target, duration, from);
                } else if(to) {
                    action = TweenMax.to(target, duration, to);
                }
                const timeline = new TimelineMax({ delay });
                timeline.add(action, 0); //在0s处添加动画
                timeline.play();
                if(!( to && to.repeat === -1)){
                    this.timeline.add(timeline, 0);
                }
            }

        }
    }
    initTouch(){
        // // 获取屏幕宽高，判断横屏还是竖屏
        // let min = (window.innerWidth<window.innerHeight)?window.innerWidth:window.innerHeight;
        // let scale = min/750;  // 根据设计稿尺寸进行缩放比例调整
        // this.app.stage.scale.set(scale,scale);  // 根据屏幕实际宽高放大舞台
        // if(window.innerWidth<window.innerHeight){
        //     this.app.stage.rotation = 1.57;
        //     this.app.stage.pivot.set(0.5);
        //     this.app.stage.x = window.innerWidth;
        // }
        const touchOptions = {
            touch:".PixiStage",//反馈触摸的dom
            // vertical: "vertical",//不必需，默认是true代表监听竖直方向touch
            maxSpeed:0.01,
            max:0,
            min:-this.bg.height + this.app.screen.height,
            initialValue:0,
            bindSelf:true,
            change:(value)=>{
                this.touchMove(value);
            }
        }
        this.alloyTouch = new AlloyTouch(touchOptions)
    }
    touchMove(value){ // value的值就是滚动的值
        console.log(value);
        if(value <0 && value > -this.bg.height + this.app.screen.height) {
            this.app.stage.position.y = value;
        }
        // 用-value / this.scrollHeight 可以算出时间轴的%
        this.progress = -value / this.scrollHeight;
        this.progress = this.progress < 0 ? 0 : this.progress;
        this.progress = this.progress > 1 ? 1 : this.progress;
        this.timeline.seek(this.progress);
    }
}
