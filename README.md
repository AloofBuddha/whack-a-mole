Whack-a-mole
============

[**PLAY NOW!**](http://kaizerroll.github.io/whack-a-mole/)

Setup
-----
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `npm install` to download the dependencies
- `npm start` to run locally
- `npm test` to run test suites

Serves on `localhost:3000`


My Approach
-----------
This app uses React for the visual layer and Redux for the state management, along with Seamless-Immutable, a library for working with immutable data structures. One of the things I love about Redux is how you can design the core functionality of the app entirely in the model, which lends itself well to test-driven-development (as seen in `tests.js`). React + Redux + Immutable work nicely together, and I was able to build the entire app out of pure components, i.e. components which simply render based on their attributes and hold no internal state. What's nice about this is changes are very localized and updates to the state or the view were generally straight forward and painless.

Redux gets you the 'state transitions' and React (naturally) reacts to these changes automatically. However, for the actual logic of the game to be implemented, I needed various game-logic functions to capture click events and dispatch messages to the Redux store when appropriate. This proved a little trickier, as whack-a-mole deals with a lot of 'timed' components - when the moles come out, how long they stay out, the clock ticking down, etc. I ended up doing this with timeouts and intervals, though I'm not fully satisfied with how clean and intuitive that ends up being. I've heard of something called a Redux 'Saga' that is made for such a problem, but it isn't implemented in this app.

Finally, the mole animations and custom cursor were all done in CSS. I found the CSS animations to be difficult to work with at times, and had a bug for a while with the custom cursor (it turns out the 'click-point' is the top-left by default, which was a transparent layer for my image). Because of these issues and the time-oriented nature of the game, another approach would have been to use a web-oriented game engine like Phaser.js, though I assumed for a project like this it was less desirable to use a heavy framework. That said, the more polish and animation I added the slower the app ran, so a v2 of this app would probably use HTML Canvas at the very least.
 

