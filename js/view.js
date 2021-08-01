import AddEmployee from "./components/add-employee.js";
import EditEmployee from "./components/edit-employee.js";

export default class View{

    constructor()
    {
        this.model = null;
        this.addEmployeeModal = new AddEmployee('modal-add');
        this.editEmployeeModal = new EditEmployee('modal-edit');
        this.table = document.querySelector('#table-employees');

        this.addNewEmployee = document.querySelector('#btn-employee');
        
        // Events in components
        this.addNewEmployee.onclick = () => this.addEmployeeModal.modal.toogle();
        this.addEmployeeModal.callbackOnSubmit((employee) => this.addEmployee(employee));
        this.editEmployeeModal.callbackOnSubmit((employee) => this.editEmployee(employee));

    }

    setModel(model)
    {
        this.model = model;
    }


    render()
    {
        const employees = this.model.getAll();
        employees.forEach(employee => this.createElement(employee));
    }

    createElement(employee)
    {
        const tbody = this.table.getElementsByTagName('tbody')[0];
            
            const row = tbody.insertRow();
            // insertando informacion
            row.setAttribute('id',employee.id);
            row.innerHTML = 
            `<td>${employee.name}</td>
             <td>${employee.email}</td>
             <td>${employee.address}</td>
             <td>${employee.phone}</td>`;

            // Agregando acciones

            const updateEmployee = document.createElement('button');
            updateEmployee.classList.add('crud','edit');
            updateEmployee.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i>`;
            updateEmployee.onclick = () =>{
                this.editEmployeeModal.modal.toogle();
                this.editEmployeeModal.fillInputs({
                    id:employee.id,
                    name: row.children[0].textContent,
                    email: row.children[1].textContent,
                    address: row.children[2].textContent,
                    phone: row.children[3].textContent
                });
            };

            const deleteEmployee = document.createElement('button');
            deleteEmployee.classList.add('crud','delete');
            deleteEmployee.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
            deleteEmployee.onclick = () =>{ this.deleteEmployee(employee.id)};

            const actions = row.insertCell();
            actions.appendChild(updateEmployee);
            actions.appendChild(deleteEmployee);
            
    }

    addEmployee(employee)
    {
        const e = this.model.add(employee.name,employee.email,employee.address,employee.phone);
        this.createElement(e);
    }

    editEmployee(employee)
    {
        const row = document.getElementById(employee.id);
        console.log(row);
        row.children[0].textContent = employee.name;
        row.children[1].textContent = employee.email;
        row.children[2].textContent = employee.address;
        row.children[3].textContent = employee.phone;

        this.model.edit(employee.id,employee);
    }

    deleteEmployee(id)
    {
        document.getElementById(id).remove();
        this.model.delete(id);
    }
}