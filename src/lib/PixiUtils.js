class PixiUtils{
    constructor(){
        this.mode = "widthFit"; // widhtFit,heightFit
        this.stageWidth = window.innerWidth;
        this.stageHeight = window.innerHeight;
        this.designWidth = 750;
        this.designHeight = 1334;
    }
    // 未知转换
    positionMap(type){
        const map = {
            top: { x: 0.5, y: 0 },
            right: { x: 1, y: 0.5 },
            bottom: { x: 0.5, y: 1 },
            left: { x: 0, y: 0.5 },
            topLeft: { x: 0, y: 0 },
            topRight: { x: 1, y: 0 },
            bottomLeft: { x: 0, y: 1 },
            bottomRight: { x: 1, y: 1 },
            center: { x: 0.5, y: 0.5 }
        }
        return map[type] || { x: 0, y: 0}
    }
    // 设置对象的相对原点，锚点
    setAnchor(obj, anchor){
        if(typeof anchor==='string'){
            const anchorMap = this.positionMap(anchor);
            obj.anchor.set(anchorMap.x, anchorMap.y);
        } else {
            obj.anchor.set(anchor.x, anchor.y);
        }
    }
    // 设置位置
    setPosition(obj, position){
        if(typeof position === 'string'){
            position = this.positionMap(position);
            obj.position.x = position.x * this.stageWidth;
            obj.position.y = position.y * this.stageHeight;
        } else if ( position.mode === "absolute" ){
            obj.position.x = this.displayX(position.x);
            obj.position.y = this.displayX(position.y);
        } else if ( position.mode === "relative" ){
            obj.position.x = position.x * this.stageWidth;
            obj.position.y = position.y * this.stageHeight;
        }
    }
    // 设置大小
    setSize(obj, size){
        if( size.mode === 'widthFit' ){
            const scale = this.stageWidth / obj.width * size.width;
            obj.scale.set(scale,scale);
        } else if ( size.mode === 'heightFit' ){
            const scale = this.stageHeight / size.height * size.height;
            obj.scale.set(scale,scale);
        } else {
            obj.width = size.width;
            obj.height = size.height;
        }
    }
    displayX(x){
        return x * this.scaleX();
    }
    displayY(y){
        return y * this.scaleY();
    }
    display(number) {
        let result;
        switch (this.mode) {
            case "widthFit":
                result = this.displayX(number);
                break;
            case "heightFit":
                result = this.displayY(number);
                break;
        }
        return result;
    }
    scaleX(){
        return this.stageWidth / this.designWidth;
    }
    scaleY(){
        return this.stageHeight / this.designHeight;
    }
}

export default new PixiUtils();