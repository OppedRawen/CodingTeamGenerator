const Manager = require("../lib/Manager");

describe('Get name',()=>{
    it('Creates a name',()=>{
        const manager = new Manager("David",5,"yud2372@gmail.com","5");
        const name = "David";
        expect(manager.getName()).toEqual(name);
    })
})