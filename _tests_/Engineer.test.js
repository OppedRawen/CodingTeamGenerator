const Engineer = require("../lib/Engineer");

describe('Get name',()=>{
    it('Creates a name',()=>{
        const engineer = new Engineer("David",5,"yud2372@gmail.com","OppedRawen.github");
        const name = "David";
        expect(engineer.getName()).toEqual(name);
    })
})