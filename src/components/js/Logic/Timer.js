import {timeElapsed} from "../Controllers/controller";
import timeToString from "../serviceUtils/timeUtils"
class Timer{
    constructor(){
        this.count;
        this.hour;
        this.min;
        this.sec;
        this.ms;
        this.timeElapsed="00:00";
    };

    stop(){
        if (this.count) {
            clearInterval(this.count);
            this.count = null;
        }
    }

}

const timer = new Timer();
export default timer;
