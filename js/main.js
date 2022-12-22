// requirements and goals
// make a simple crawler game using canvas that we manipulate in js

// we need two entities, a hero and an ogre
// the hero should move with the WASD or ARROW keys(display hero coords)
// the ogre(for now) will be stationary
// the hero and the ogre should be able to collide to make something happen
// when the hero collides with the ogre, ogre is removed from the screen, the game stops, and sends a message to the user that they have won

// first we grab our HTML elements for easy reference later
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const status = document.getElementById('status')

// if we want to test if we got the right elements, we can do this:
// movement.innerText = 'some stuff'
// status.innerText = 'whats up how are you'

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

const hero = {
    x: 10,
    y: 10,
    color: 'hotpink',
    width: 20,
    height: 20,
    alive: true,
    render: function () {
        // we can use builtin canvas methods for drawing basic shapes
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const ogre = {
    x: 200,
    y: 100,
    color: '#bada55',
    width: 60,
    height: 120,
    alive: true,
    render: function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

hero.render()
ogre.render()