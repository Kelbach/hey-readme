//write a function for each different set of questions seperated by input type
//then write a large scale function with thens at bottom

// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const init = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is your project's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a project name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please tell us about your project: ',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please tell us about your project!!');
                    return false;
                }
            }
        },
        // WHEN I enter usage information, contribution guidelines
        // THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
        {
            type: 'input',
            name: 'installation',
            message: "How could others install your project? Please list a step-by-step detailed instruction.",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter installation instructions.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: "How is this project intended to be used?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please tell us how to use this project.');
                    return false;
                }
            }
        },
        // {
        //     type: 'confirm',
        //     name: 'confirmContribution',
        //     message: "Would you like to use the guidelines of the contributor's covenant? (visit contributor-covenant.org for more details)"
        // },
        {
            type: 'input',
            name: 'contribution',
            message: 'If you created an application or package and would like other developers to contribute it, could you add guidelines for how to do so.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'test',
            message: "Please provide a test case that shows off your project's functionality: ",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a test case');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'If applicable, please choose a license.',
            choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense', 'No License']
        },
        {
            type:'input',
            name: 'github',
            message: 'What is your GitHub username?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username.');
                    return false;
                }
            }
        },
        {
            type:'input',
            name: 'email',
            message: 'What is your email address?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter an email address.');
                    return false;
                }
            }
        }
        // WHEN I choose a license for my application from a list of options
        // THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under            
        //use seperator for license choice
        
        // WHEN I enter my GitHub username
        // THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
        // WHEN I enter my email address
        // THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
        // WHEN I click on the links in the Table of Contents
        // THEN I am taken to the corresponding section of the README
    ]);
};

const creditList = creditInfo => {
    if (!creditInfo.add) {
        creditInfo.add = [];
    }
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmCredit',
            message: "Do you want to add a contributor?",
        },
        {
            type: 'input',
            name: 'credit',
            message: 'Please list the name of a contributor: ',
            when: ({ confirmCredit }) => {
                if (confirmCredit) {
                return true;
                } else {
                return false;
                }
            },
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please list a contributor!');
                return false;
                }
            } 
        },
        {
            type: 'input',
            name: 'creditLink',
            message: 'Please type the link to the contributor GitHub: ',
            when: ({ confirmCredit }) => {
                if (confirmCredit) {
                return true;
                } else {
                return false;
                }
            }
        }
    ])
    .then(newCredit => {
        creditInfo.add.push(newCredit);
        if (newCredit.confirmCredit) {
            return creditList(creditInfo);
        } else {
            return creditInfo;
        }
    })
}


// TODO: Create a function to write README file
// const writeToFile = (fileName, data) => {
//     return `
    
//     `
// }



// Function call to initialize app
init()
    .then(creditList)
    .then(answers => {
        console.log(answers);
    });
