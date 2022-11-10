# cat-wonderland

![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

## Description

Welcome to the game for cat people. Cat Wonderland uses deckbuilder, sequelize, express, handlebars, and more to bring you a game where you get to keep your picky, independent thinking cat alive. Sign up for the game and log in to play!

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Questions](#questions)

## Installation

First, make sure to enter your mysql password in your .env file.

Then, install the necessary packages by entering the following in your integrated terminal:
```
npm install
```
Then open the db folder in your integrated terminal. Run the following, then enter your password when asked to do so:
```
mysql -u root -p
```
Then, run the following:
```
SOURCE schema.sql
```
Then return to the main file in your integrated terminal. Run the seeds by entering the following:
```
node seeds/seed.js
```
Then, run the following:
```
node server.js
```
## Usage

Heroku link:

When the user enters the site they will be able to sign up. If they have already signed up, they can log in.

The user will then be able to start the game.

The user will be present with a set of cards with different scenarios.

Depending on the card they pick, the health meter will change.

After the cat's health is zero or below, or there are no more turns, the game is over.

## Credits

Health bar from:
http://jsfiddle.net/jessefreeman/mXUEx/

Google Fonts:
https://fonts.google.com/

Adobe Color:
https://color.adobe.com/create/color-wheel

Figma:
https://www.figma.com/

Bootstrap:
https://getbootstrap.com/

Contrib.rocks:
https://contrib.rocks/

## License
    
This project is licensed under the MIT License. To learn more about this license, go to:

https://opensource.org/licenses/MIT 

## Questions

If you have any questions, please contact Richard Hong at rhong24@gmail.com or github.com/richardjhong, Megan McHugh at megan.mchugh@gmail.com or github.com/mchughmegan, Payton Ray at paytonray0810@gmail.com or github.com/PaytonRay, Christina Greer at cgreer799@gmail.com or github.com/cgreer799, or Alex Nguyen at nguyenchristopher020@gmail.com or github.com/chrisnguyen12.

![Creators](https://contrib.rocks/image?repo=richardjhong/cat-wonderland)