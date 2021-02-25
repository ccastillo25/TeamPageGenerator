const Employee = require("./Employee");

class Manager extends Employee {
    constructor(id, name, email, officeNo){

        super(id, name, email);

        this.officeNumber = officeNo;
        
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;