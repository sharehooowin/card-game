export default function data() {
	return {
	    cards:[],
        current:[],
        currentRound:1,
        roundConfig:[
            { totalTime:6 },
            { totalTime:12 },
            { totalTime:24 },
            { totalTime:32 },
            { totalTime:48 },
        ],
        clickedCards:[],
        turnOverCards:[],
        canClick:true,
    }
}
