import $ from 'jquery';
import Component from './component';

class Modal extends Component{
    constructor(el){
        super(el);
        this.init();
    }

    init(){
        $(this.el).on('click',this.onButtonClick.bind(this));
    }
    
    onButtonClick(e){
        this.openModal();
    }

    openModal(){
        alert('Modal Open');
    }
}


export default Modal;