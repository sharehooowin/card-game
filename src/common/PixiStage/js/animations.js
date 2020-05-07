import PixiUtils from "../../../lib/PixiUtils";

const TEXTS_ANIMATIONS = {
    title:[{
        delay: 0,
        duration: 1,
        from: { y: window.innerHeight * 0.5 },
        to: { yoyo: true, repeat: -1, ease: 'easeOut', y: window.innerHeight * 0.48 }
    }, {
        delay: 0,
        duration: 0.2,
        to: { alpha: 0 }
    }],
    description:[{
        delay: 0,
        duration: 0.2,
        to: { alpha: 0 }
    }],
    author:[{
        delay: 0,
        duration: 0.2,
        to: { alpha: 0 }
    }]
};
const SPRITES_ANIMATIONS = {
    plane:[{ // 缩放这样写
        prop:"scale",
        delay: 0,
        duration: 0.2,
        from:{ x: 10, y:10 },
        to: { x: 1,y: 1}
    },{
        delay: 0,
        duration: 0.2,
        to: { y: 800 }
    },{
        delay: 0,
        duration: 0.2,
        from: { alpha: 0 },
        to: { alpha: 1 }
    }],
    girl:[ {
        delay: 0.25,
        duration: 0.5,
        from:{ alpha: 0 },
        to: { alpha:1,y:1334 }
    },{
        delay: 0.85,
        duration: 0.25,
        to: { y:1334*2 }
    }],
};

export {
    TEXTS_ANIMATIONS,
    SPRITES_ANIMATIONS
};