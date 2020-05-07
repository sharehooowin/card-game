const sprites = {
    plane:{
        key:"plane",
        size:{ mode:"widthFit", width:0.2},
        position:{ mode:"relative", x:0.5,y:0.2},
        anchor:"center",
        isAnimation:true,
        animations:{
            from:408,
            to:433,
            autoplay:true,
        }
    },
    girl:{
        key:"girl",
        size:{ mode: "widthFit", width: 0.8},
        position:{ mode: "absolute", x: 375,y: 100},
        anchor:"top",
        isAnimation:true,
        animations:{
            from:160,
            to:222,
            autoplay:true,
        }
    },

};
export default sprites;