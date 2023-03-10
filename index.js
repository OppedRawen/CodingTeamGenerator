const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const container = document.querySelector("#container");
const answer = [
    {
        type: "input",
        name: "name",
        message: "What is the member's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the member's employee ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the member's Email Address?",
    },
    {
        type: "list",
        name: "role",
        message: "What is the role?",
        choices: ["Manager","Engineer","Intern"]
    }, 

];
let team = [];
let value = "";

const generateHtml =(cards)=>{

    const code = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    
        <title>My Team</title>
    </head>
    <header>
       
          
          <!-- As a heading -->
          <nav class="bg-body-tertiary text-center">
            <div class="container-fluid">
              <div class = "row">
                <h1 class = "text-center">My Team</h1>
              </div>
              
            </div>
          </nav>
    </header>
    <body>
       <section id = "container">
        <div class = "row">
          {card}
        </div>
        
       </section> 
        <!-- cards -->
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    
    </body>
    </html>`;
    
    return code.replace("{card}",cards);;
}
const cards = (name,id,email,special,unique)=>{
    const code = `<div class="card p-3" style="width: 25rem;">
    
    <div class="card-body">
      <h5 class="card-title fs-1 text-center">${name}</h5>
      <p class="card-text fs-2 ">Id: ${id}</p>
      <a class="fs-2"href="mailto:${email}">Send Email</a>
      <p class="card-text fs-2">Position: ${special}</p>
      <p class="card-text fs-2">${unique}</p>
      <a href="#" class="btn btn-primary">Go</a>
    </div>
  </div>`;
  return code;
}
const writeFile = (fileName,data)=>{
    fs.writeFile(fileName,data,(err)=>{
        err ? console.log(err): console.log("Added card");
    })
}
const makeMember = ()=>{
    inquirer.prompt(answer).then((response)=>{
       if(response.role==="Manager"){
        inquirer.prompt([
            {
                type:"input",
                name: "office",
                message: "what is the office number?",
            },
            {
                type: "confirm",
                name: "add",
                message: "would you like to add another member?"   
            }
        ]).then((answer)=>{
            const manager = new Manager(response.name,response.id,response.email,answer.office);
            team.push(manager);
            team.map((item)=>{
                console.log(item);
                return item;
            });
            value += cards(manager.getName(),manager.getId(),manager.getEmail(),manager.getRole(),"Office: "+manager.getOfficeNumber());
            if(answer.add){
                makeMember();
            }else{
                 
                writeFile("./dist/index.html",generateHtml(value));
              
            }
        })
       }else if(response.role==="Engineer"){
        inquirer.prompt([
            {
                type:"input",
                name: "github",
                message: "what is the github username?",
            },
            {
                type: "confirm",
                name: "add",
                message: "would you like to add another member?"   
            }
        ]).then((answer)=>{
            const engineer = new Engineer(response.name,response.id,response.email,answer.github);
            team.push(engineer);
            team.map((item)=>{
                console.log(item);
                return item;
            });
            value += cards(engineer.getName(),engineer.getId(),engineer.getEmail(),engineer.getRole(),"Github: "+engineer.getGithub());

            if(answer.add){
                makeMember();
            }else{
                writeFile("./dist/index.html",generateHtml(value));
             
            }
        })
       }
       else if(response.role==="Intern"){
        inquirer.prompt([
            {
                type:"input",
                name: "school",
                message: "Where do you go to school?",
            },
            {
                type: "confirm",
                name: "add",
                message: "would you like to add another member?"   
            }
        ]).then((answer)=>{
            const intern = new Intern(response.name,response.id,response.email,answer.school);
            team.push(intern);
            team.map((item)=>{
                console.log(item);
                return item;
            });
            value += cards(intern.getName(),intern.getId(),intern.getEmail(),intern.getRole(),"School: "+ intern.getSchool());

            if(answer.add){
                makeMember();
            }else{
                writeFile("./dist/index.html",generateHtml(value));
            
            }
        })
       }
    })

    
};

function init(){
    makeMember();
    
}
init();
