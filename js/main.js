// requirements and goals
// make a simple crawler game using canvas that we manipulate in js

// we need two entities, a hero and an ogre
// the hero should move with the WASD or ARROW keys(display hero coords)
// the ogre(for now) will be stationary
// the hero and the ogre should be able to collide to make something happen
// when the hero collides with the ogre, ogre is removed from the screen, the game stops, and sends a message to the user that they have won

// SETUP //
// first we grab our HTML elements for easy reference later
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')

// if we want to test if we got the right elements, we can do this:
// movement.innerText = 'some stuff'
// message.innerText = 'whats up how are you'

// we need to set the game's context to be 2d
// we also want to save that context to a variable for reference later
// this is how we tell code to work within the context of the canvas
const ctx = game.getContext('2d')

// one thing we need to do, is get the computed size of our canvas
// then we save that attribute to our canvas so we can refer to it later
// once we have the exact size of our canvas, we can use those dimensions to simulate movement in interesting ways
// these two lines will set the width and height attributes according to the way they look in your browser at the time the code runs

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height = 360

// CRAWLER CLASS //
// since these two objects are basically the same, we can create a class to keep our code DRY
class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

const player = new Crawler(10, 10, 16, 16, 'lightsteelblue')
const ogre = new Crawler(200, 50, 32, 48, '#bada55')

// player.render()
// ogre.render()

/// MOVEMENT HANDLER ///
// our movement handler function tells our code how and when to move the player around
// this will be tied to an event listener for key events
const movementHandler = (e) => {
    // here the `e` represents `event` -> specifically will be a keydown
    // we're going to use keyCodes to tell it do do different movements for different keys
    // here are some basic key codes:
    // w = 87, a = 65, s = 83, d = 68
    // up = 38, left = 37, down = 40, right = 39
    // by linking these keycodes to a function(or codeblock)
    // we can tell them to change the player x or y values
    // console.log('what the heck is e?\n', e.keyCode)

    // conditional statements if keycode === something do something if keycode === somethingElse do somethingElse
    // could build a giant if...else for this
    // im going to use a switch case instead
    // switch is my condition, and it opens up for a multitude of cases
    switch (e.keyCode) {
        // move up
        case (87):
        case (38):
            // this moves player up 10px every press
            player.y -= 10
            // we need the break keyword so we can move to another case if necessary
            break
        // move left
        case (65):
        case (37):
            player.x -= 10
            break
        // move down
        case (83):
        case (40):
            player.y += 10
            break
        // move right
        case (68):
        case (39):
            player.x += 10
            break

    }
}

/// COLLISION DETECTION ///
// here we'll detect a hit between entities
// to accurately do this, we need to account for the entire space that one entity takes up
// this means using the player x, y, width, and height
// this also means using the ogre x, y, width, and height
const detectHit = () => {
    // we'll basically use a big if statement, to be able to tell if any of the sides of our hero interact with any of the sides of our ogre
    if (player.x < ogre.x + ogre.width
        && player.x + player.width > ogre.x
        && player.y < ogre.y + ogre.height
        && player.y + player.height > ogre.y) {
            // console.log('HIT!')
            // console.log('player x -> ', player.x)
            // console.log('player width -> ', player.x + player.width)
            // console.log('player y -> ', player.y)
            // console.log('player height -> ', player.y + player.height)
            // console.log('ogre x -> ', ogre.x)
            // console.log('ogre width -> ', ogre.x + ogre.width)
            // console.log('ogre y -> ', ogre.y)
            // console.log('ogre height -> ', ogre.y + ogre.height)
            // message.textContent = 'We have a hit!'
            ogre.alive = false
            message.textContent = 'You Win!'
        }
}



// GAME LOOP //
// we're going to set up a gameLoop function
// this will be attached to an interval
// this function will run every interval(amount of milliseconds)
// this is how we will animate our game

const gameLoop = () => {
    // no console logs in here if you can avoid it
    // for testing, it's ok to add them, but final should not have any
    // putting our hit detection at the top so it takes precedence
    if (ogre.alive) {
        detectHit()
    }
    // to resemble movement, we should clear the old canvas every loop
    // then instead of drawing a snake because it's maintaining all the old positions of our character
    // we'll just see our player square moving around
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    movement.textContent = `${player.x}, ${player.y}`

    if (ogre.alive) {
        ogre.render()
    }
}

// here we'll add an event listener, when the DOMcontent loads, run the game on an interval
// eventually this event will have more in it
document.addEventListener('DOMContentLoaded', function () {
    // this is where I'll link up the movementHandler event
    document.addEventListener('keydown', movementHandler)
    // here is our gameLoop interval
    setInterval(gameLoop, 60)
})