const timeToString=(time,showsMS)=>{
    //showMS true shows milli-seconds
    return showsMS ?
        pad(time.min)+":"+pad(time.sec)+":"+pad(time.ms)
        :
        pad(time.min)+":"+pad(time.sec);

}

const pad=(time)=>{
    let  temp;
    if(time < 10){
        temp = "0" + time;
    }
    else{
        temp = time;
    }
    return temp;
}


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

    start(){
        let update = (txt,hour,min,sec,ms)=>{
            this.timeElapsed=txt;
            this.hour=hour;
            this.min=min;
            this.sec=sec;
            this.ms=ms;
        }

            if (!this.count) {
                this.ms = 0;
                this.sec = 0;
                this.min = 0;
                this.hour = 0;

                this.count = setInterval(()=> {
                    if (this.min == 59) {
                        this.min = 0;
                        this.hour++;
                    }
                    if (this.ms == 99) {
                        this.ms = 0;
                        if (this.sec == 59) {
                            this.sec = 0;
                            this.min++;
                        }
                        else {
                            this.sec++;
                        }
                    }
                    else {
                        this.ms++;
                    }
                    let time={sec:this.sec,min:this.min};
                    update(timeToString(time,false),this.hour,this.min,this.sec,this.ms);
                }, 10);
            }
    }

}


module.exports = Timer;


