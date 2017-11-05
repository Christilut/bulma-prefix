## Goal
This project is use to add custom prefix to every bulma css class.

**This project use Bulma Version 0.6.0

##How to use
1. Fork this repository...
2. open postcss.config.js
3. change the following code.. from custom prefix to your prefix

~~~~

require('./ext_vendor/postcss-class-prefix')('custom-prefix-')

~~~~

4. run "npm install" (if you haven't install dependencies)
5. run "npm run dev" (for development version) or "npm run prod" (for production version)
6. grab your final css from dist folder

Enjoy!

####Notes

Since postcss-class-prefix plugins for postcss is not maintained any more. I took the latest version and PRs and merge manually and put into ext_vendor directory.