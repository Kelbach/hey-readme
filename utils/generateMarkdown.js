
const renderLicenseBadge = input => {
  if (input === 'No License') {
    return ''
  } else {
    return `[![Badge](https://img.shields.io/badge/License-${input.replace(/ /g, '_')}-yellow)](#license)`
  }
}

const renderLicenseSection = input => {
  if (input === 'No License') {
    return ''
  } else {
    return `## License
  This project is covered under the ${input} license.
    `
  }
}

const renderCreditSection = data => {
  var credit = [];
  if (data.confirmCredit === false) {
    return `
    `
  } else {
    for (const val of data.add){
    if (val.credit === undefined) {
      break;
    } else {
      credit.push("["+val.credit+"]("+val.creditLink+") ")
    }
  };
  return `## Credit
  ${credit.concat()}
  `
  }
}

const renderContribution = data => {
  if (data.confirmContribution === false) {
    return `## Guidelines for Contribution
  This project follows the guidelines of the [Contributor's Covenant](https://www.contributor-covenant.org/).
    `
  } else {
    return `## Guidelines for Contribution
  ${data.contribution}
    `
  }
}

const generateMarkdown = data => {
  return `
  # ${data.title} ${renderLicenseBadge(data.license)}

  ## Description
  ${data.description}

  ## Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  
  ## Installation
  ${data.installation}
  
  ## Usage
  ${data.usage}

  ${renderCreditSection(data)}
  ${renderLicenseSection(data.license)}
  ${renderContribution(data)}
  ## Tests
  ${data.test}

  ## Questions, Comments, Concerns
  * GitHub Username: [${data.github}](https://github.com/${data.github})
  * Please feel free to contact me at ${data.email}.
  `;
}

module.exports = generateMarkdown;

//title with license badge/link
//description
//table of contents
//installation
//usage
//license
//contributing guidelines
//tests
//questions