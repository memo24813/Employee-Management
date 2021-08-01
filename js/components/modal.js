export default class Modal{

    constructor(elementId){
        this.element = document.getElementById(elementId);
        this.element.children[0].onclick = () => this.toogle();
        this.alert = this.element.children[3];
        this.modalSubmit = this.element.lastElementChild;
    }


    toogle()
    {
        this.element.classList.toggle('active');
    }

    alertActive(message)
    {
        this.alert.innerHTML =`<i class="fa fa-info-circle" aria-hidden="true"></i> ${message}`;
        this.alert.classList.add('visible');
        setTimeout(() => this.alert.classList.toggle('visible'),2000);

    }
}