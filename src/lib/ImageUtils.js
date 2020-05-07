class ImageUtils{
    constructor(){
        this.base64Data = "";
        this.img = null;
        this.reader = null;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext('2d');
        // 瓦片canvas
        this.tCanvas = document.createElement("canvas");
        this.tctx = this.tCanvas.getContext("2d");
        this.base64 = "";
    }
    getBase64(){
        return this.base64;
    }
    readFromFile(file,callback){
        if(!file){
            return;
        }
        this.reader = new FileReader();
        this.reader.readAsDataURL(file);
        this.reader.onload = () => {
            this.img = new Image();
            this.img.src = this.reader.result;
            this.img.onload = () => {
                callback(this.img);
            }
        }
    }
    compress(){
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = this.img.src.length;
        let width = this.img.width;
        let height = this.img.height;

        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
            console.log("大于400万像素")
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }
        this.canvas.width = width;
        this.canvas.height = height;

        //        铺底色
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
            //            计算每块瓦片的宽和高
            let nw = ~~(width / count);
            let nh = ~~(height / count);
            tCanvas.width = nw;
            tCanvas.height = nh;
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    tctx.drawImage(this.img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    this.ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            this.ctx.drawImage(this.img, 0, 0, width, height);
        }

        // 进行最小压缩
        let ndata = this.canvas.toDataURL( 'image/jpeg' , 0.8);
        console.table({
            "压缩前" : initSize,
            "压缩后" : ndata.length,
            "压缩率" : ~~(100 * (initSize - ndata.length) / initSize) + "%"
        });
        this.base64 = ndata;
        return ndata;
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
}

export default new ImageUtils();