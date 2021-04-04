import $ from 'jquery';

class Component{
    constructor(ele){
        this.$ = $(ele).find;
        this.el = ele;
    }

    logMe(val){
        console.log("%cComponent Log:","font-size:16px;color:cyan",val,this)
    }

}

export default Component;