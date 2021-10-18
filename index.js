const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

const init = () => {
    console.log(`
    Welcome to the Hey-ReadMe Generator. 
    After the series of questions your ReadMe will be generated! 
    If at any point you'd like to exit the generator, type ctrl-C. 
    You can also generate a ReadMe file and edit it afterward.
    `)
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
        {
            type: 'confirm',
            name: 'confirmContribution',
            message: "Would you like to use guidelines apart from the contributor's covenant? (visit contributor-covenant.org for more details)"
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'If you would like other developers to contribute it, could you add guidelines for how to do so.',
            when: ({ confirmContribution }) => {
                if (confirmContribution) {
                  return true;
                } else {
                  return false;
                }
            },
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your guidelines.');
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
const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./README.md', fileContent, err => {
            if (err) {
            reject(err);
            return;
            }
            resolve({
            ok: true
            });
        });
    });
};



// Function call to initialize app
init()
    .then(creditList)
    .then(data => {
        return generateMarkdown(data);
    })
    .then(pageMarkdown => {
        writeToFile(pageMarkdown);
        console.log('HEY! ReadMe file generated!')
    })
