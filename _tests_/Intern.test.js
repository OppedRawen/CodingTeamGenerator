const Intern = require("../lib/Intern");

describe('Get name',()=>{
    it('Creates a name',()=>{
        const intern = new Intern("David",5,"yud2372@gmail.com","IVC");
        const name = "David";
        expect(intern.getName()).toEqual(name);
    })
})