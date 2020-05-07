// import { Utils, Services } from '@/common'
import Utils from "../../lib/Utils";
const methods = {
    init(){

    },
    touchMove(e){
        if(!this.$store.getters.getCanScroll){
            e.preventDefault();
        }
    },
}
export default methods
