// import { Utils, Services } from '@/common'

const methods = {
    initData(){
        for(let i = 0; i <= 12; i++){
            this.cards.push({
                name: i+1,
                url:require(`../../assets/img/card/${i+1}.jpg`),
            });
        }
    },
    sort(){
        let current = this.current;
        current = current.sort(function() {
            return (0.5-Math.random());
        });
        this.current = current;
    },
    setRound(){
        let totalHalf = this.total / 2;
        this.current = [];
        for(let i = 0; i < totalHalf; i++){
            let randomKey = parseInt(Math.random(0,10) * this.cards.length-1);
            let obj1 = Object.assign({
                key : `card${this.$utils.guuid()}`
            },this.cards[randomKey]);
            let obj2 = Object.assign({
                key : `card${this.$utils.guuid()}`
            },this.cards[randomKey]);
            this.current.push(obj1,obj2);
        }
    },
    handleClick(e,item){
        if(!this.canClick){
            return;
        }
        let back = e.target;
        let front = back.parentElement.getElementsByClassName("front")[0];
        back.style.transform = 'rotateY(-180deg)';
        front.style.transform = 'rotateY(0deg)';
        this.clickedCards.push({
            card:item,
            front:front,
            back:back,
        });
        if(this.clickedCards.length==2){
            this.canClick = false;
            this.checkCurrentClick();
        }
    },
    checkCurrentClick(){
        let clickedCards = this.clickedCards;
        if(clickedCards[0].card.name != clickedCards[1].card.name){ // 不一样，延迟把牌转回来
            setTimeout(()=>{
                this.turnOverClicked();
            },600);
        }else{ // 一样，检查是否全部翻转
            this.clickRight();
            this.checkAll();
        }
    },
    clickRight(){
        this.turnOverCards.push(this.clickedCards[0],this.clickedCards[1]);
        this.clickedCards = [];
        this.canClick = true;
    },
    turnOverClicked(){
        this.clickedCards.map(item=>{
            let { front, back } = item;
            front.style.transform = 'rotateY(-180deg)';
            back.style.transform = 'rotateY(0deg)';
        });
        this.clickedCards = [];
        this.canClick = true;
    },
    checkAll(){
        if(this.turnOverCards.length==this.current.length){ // 通过当前关卡，关卡数+1
            this.$utils.showTips("通关了！");
            setTimeout(()=>{
                this.currentRound++;
                this.resetGame();
            },1000);
        }
    },
    turnBackAll(){
        this.turnOverCards.map(item=>{
            let { front, back } = item;
            front.style.transform = 'rotateY(-180deg)';
            back.style.transform = 'rotateY(0deg)'
        });
        this.turnOverCards = [];
    },
    resetGame(){
        this.turnOverClicked();
        this.turnBackAll();
        this.setRound();
        this.sort();
        this.canClick = true;
    },
};

export default methods
