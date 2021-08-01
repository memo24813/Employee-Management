import Modal from "./modal.js";

export default class AddEmployee{

    constructor(elementId)
    {
        this.modal = new Modal(elementId);

        // modal items
        this.name = document.getElementById('name');
        this.email = document.getElementById('email');
        this.address = document.getElementById('address');
        this.phone = document.getElementById('phone');
    }


    clearInputs()
    {
        this.name.value = '';
        this.email.value = ''; 
        this.address.value = ''; 
        this.phone.value =  '';
    }

    fillInputs(employee)
    {
        this.name.value = employee.name;
        this.email.value = employee.email; 
        this.address.value = employee.address; 
        this.phone.value = employee.phone;
    }


    callbackOnSubmit(callback)
    {
        this.modal.modalSubmit.onclick = () =>{

            if(this.name.value === '' || this.email.value === '' || this.address.value === '' || this.phone.value === '')
            {
                this.modal.alertActive('Please fill in all the data.');
            }
            else
            {
                callback({name:this.name.value,email:this.email.value,address:this.address.value,phone:this.phone.value});
                this.modal.toogle();
                this.clearInputs();
            }
        }
    }
}