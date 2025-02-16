const depthDisplay = document.getElementById("depth-display");

let textures = {};
let map = [
  ["A", "A", "A", "A", "A", "A", "A", "A"], // Air layer
  ["A", "A", "A", "A", "A", "A", "A", "A"], // Air layer
  ["A", "A", "A", "A", "A", "A", "A", "A"], // Air layer
  ["B", "B", "B", "B", "B", "B", "B", "B"], // Grass layer
  ["C", "C", "C", "C", "C", "C", "C", "C"], // Dirt Layer
  ["D", "D", "D", "D", "D", "D", "D", "D"], // Stone
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
  ["D", "D", "D", "D", "D", "D", "D", "D"],
];

function preload() {
    textures["A"] = loadImage("Assets/Blocks/sky.png");
    textures["B"] = loadImage("Assets/Blocks/grass.png");
    textures["C"] = loadImage("Assets/Blocks/dirt.png");
    textures["D"] = loadImage("Assets/Blocks/stone.png");

    textures["1"] = loadImage("Assets/Blocks/copper_ore.png");
    textures["2"] = loadImage("Assets/Blocks/iron_ore.png");
    textures["3"] = loadImage("Assets/Blocks/gold_ore.png");
    textures["4"] = loadImage("Assets/Blocks/diamond_ore.png");

    playerImage = loadImage("Assets/player.png");

    //  = loadImage("Assets/Blocks/copper_block.png");
    //  = loadImage("Assets/Blocks/iron_block.png");
    //  = loadImage("Assets/Blocks/gold_block.png");
    //  = loadImage("Assets/Blocks/diamond_block.png");
}

let tileSize = 160;
// Start Pos x4, y2
let xPos = 4;
let yPos = 2;

let depth = 0;

function setup() {
    createCanvas(1280, document.querySelector("#game").getBoundingClientRect().height, game);
    colorMode(RGB, 255);
    noSmooth();
}

function draw() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            let img = textures[map[row][col]];
            if (img) {
                image(img, col * tileSize, row * tileSize + depth * tileSize, tileSize, tileSize);
            }
        }
    }
    image(playerImage, xPos * tileSize, yPos * tileSize, tileSize, tileSize);
}

function updateDisplays() {
    depthDisplay.textContent = "Depth: " + depth;
}

// image(blockSky, 0, 0, 160, 160);
// 1280 / 8 = 160

function keyPressed() {
    switch (key) {
        case "w":
            depth++;
            break;
        case "a":
            xPos--;
            break;
        case "s":
            depth--;
            break;
        case "d":
            xPos++;
            break;
    }

    if (xPos < 0) xPos++;
    if (xPos >= 8) xPos--;
    if (depth > 0) depth--;

    updateDisplays();
}






// temp functions
function down() {
    depth--;
}

function up() {
    depth++;
}