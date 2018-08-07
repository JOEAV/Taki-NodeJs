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



    const timeToString=(time,showsMS)=>{
        //showMS true shows milli-seconds
        return showsMS ?
           pad(time.min)+":"+pad(time.sec)+":"+pad(time.ms)
           :
           pad(time.min)+":"+pad(time.sec);

    }

    export default timeToString;