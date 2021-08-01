export default class Model{

    constructor()
    {
        this.view = null;
        this.employees = JSON.parse(localStorage.getItem('employees'));
        
        if(!this.employees || this.employees<1)
        {
            this.employees = [
                {
                    id: 0,
                    name: "Guillermo Gutierrez",
                    email: "guillermo@gmail.com",
                    address: "C. test number 40",
                    phone: "1234567890"
                }
            ]
            this.id = 1;
            this.save();
        }
        else
        {
            this.id = this.employees[this.employees.length - 1].id + 1;
        }
    }

    setView(view)
    {
        this.view = view;
    }

    findEmployee(id)
    {
        return this.employees.findIndex(employee => employee.id === id);
    }

    getAll()
    {
        return this.employees.map(x => ({...x}));
    }

    save()
    {
        localStorage.setItem("employees",JSON.stringify(this.employees));
    }

    add(name,email,address,phone)
    {
        let element = {id:this.id++,name,email,address,phone};
        this.employees.push(element);
        this.save();
        return {...element};
    }
    edit(id,values)
    {
        let index = this.findEmployee(id);
        if(index!==-1)
        {
            Object.assign(this.employees[index],values);
            this.save();
        }
    }

    delete(id)
    {
        let index = this.findEmployee(id);
        if(index!==-1)
        {
            this.employees.splice(index,1);
            this.save();
            this.id --;
        }
    }


}