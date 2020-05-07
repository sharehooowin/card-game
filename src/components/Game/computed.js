const computeds = {
    total:function(){
        return Math.pow(this.currentRound,2) + this.currentRound * 3 + 2;
    }
}

export default computeds
