const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRender');
const teamArray = [];

function crossroads () {
    inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'Do you want to add more members?',
            choices: ["engineer", "intern", "finish"]
        }).then(function (res) {
            console.log(res)
            if(res.choice==="engineer"){
                addEngineer()
            }
            else if (res.choice==="intern"){
                addIntern()
            }else{
                buildTeam()
            }
        })
}
    
function addManager(){

    inquirer.prompt([
        {
           type:'input',
           name:'managerName',
           message:'What is your Manager\'s Name?'
        },
        {
           type:'input',
           name:'managerId',
           message:'What is your Manager\'s Id?'
        },        
        {
           type:'input',
           name:'managerEmail',
           message:'What is your Manager\'s email?'
        },        
        {
           type:'input',
           name:'officeNo',
           message:'What is your Manager\'s officeno?'
        },        
    ]).then(res => {
        console.log(res);
        const manager = new Manager(res.managerName, res.managerId, res.managerEmail, res.officeNo);
        teamArray.push(manager);
        crossroads();
    })
}
addManager();

function addEngineer(){
    inquirer.prompt([
        {
            type:'input',
            name:'engineerName',
            message:'What is your Engineer\'s Name?'
        },
        {
            type:'input',
            name:'engineerId',
            message:'What is your Engineer\'s Id?'
        },
        {
            type:'input',
            name:'engineerEmail',
            message:'What is your Engineer\'s Email?'
        },
        {
            type:'input',
            name:'github',
            message:'What is your Engineer\'s Github?'
        },
    ]).then(res => {
        console.log(res);
        const engineer = new Engineer(res.engineerName, res.engineerId, res.engineerEmail, res.github);
        teamArray.push(engineer);
        crossroads();
    })
}
//addEngineer();

function addIntern(){
    inquirer.prompt([
        {
            type:'input',
            name:'internName',
            message:'What is your Intern\'s Name?'
        },
        {
            type:'input',
            name:'internId',
            message:'What is your Intern\'s Id?'
        },
        {
            type:'input',
            name:'internEmail',
            message:'What is your Intern\'s Email?'
        },
        {
            type:'input',
            name:'internSchool',
            message:'What is your Intern\'s School?'
        },
    ]).then(res => {
        console.log(res);
        const intern = new Intern(res.internName, res.internId, res.internEmail, res.internSchool);
        teamArray.push(intern);
        crossroads();
    })
}
//addIntern();
function buildTeam(){
    console.log(teamArray);
    render(teamArray);
    fs.writeFile('index.html', render(teamArray), function(err){
        if(err) throw err;
})
};
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
