const Employee =require("../lib/Employee");

describe('Get name',()=>{
    it('Creates a name',()=>{
        const employee = new Employee("David",5,"yud2372@gmail.com");
        const name = "David";
        expect(employee.getName()).toEqual(name);
    })
});