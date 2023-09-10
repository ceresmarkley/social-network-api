# social-network-api [![GNU](https://img.shields.io/static/v1.svg?label=📃%20License&message=GNU&color=important)](./LICENSE)

## Table of Contents

* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Technology](#technology)
* [Installation](#installation)
* [Usage](#usage)
* [Links](#links)
* [License](#license)
* [Sources](#sources)

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Technology

* [![Node.js](https://img.shields.io/badge/Node.js®-v20.4.0-blue?logo=node.js)](https://nodejs.org/en)

* [![npm](https://img.shields.io/badge/npm-v9.8.0-blue?logo=npm)](https://docs.npmjs.com/cli/v9/)
  * [![Express Package](https://img.shields.io/badge/Express-4.18.2-green?logo=express)](https://www.npmjs.com/package/express)
  * [![Mongoose Package](https://img.shields.io/badge/Mongoose-7.5.0-green?logo=mysql)](https://www.npmjs.com/package/mongoose)
  * [![Moment Package](https://img.shields.io/badge/moment-2.29.4-green?logo=sequelize)](https://www.npmjs.com/package/moment)


## Installation

* Install express, mongoose, and moment to your local file using following command:

```bash
npm i
```

* Then start application by using the following command:

```bash
npm start
```

## Usage
Demo Video   



## Links

* GitHub Repo: [Social Network API](https://github.com/ceresmarkley/social-network-api)


## License

* This application is licensed by [![GNU](https://img.shields.io/static/v1.svg?label=📃%20License&message=GNU&color=important)](./LICENSE).