//! Variables
// Map and rendering
let tileSize = 160;
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

// Items (Textures)
let pickaxeSrc = "Assets/items/pickaxe.png";

// Backpack & Inventory
const backpackDisplay = document.getElementById("backpack");
const backpackSlotsDisplay = document.getElementsByClassName("backpack-slot");
let backpackSlots = 12;
let activeSlot = 0;

let inventory = [];
let inventoryItems = 0;

// Player
const depthDisplay = document.getElementById("depth-display");
let depth = 0;
let xPos = 4;
let yPos = 2;

//! Functions

function preload() {
    // p5js Canvas Textures
    textures["A"] = loadImage("Assets/Blocks/sky.png");
    textures["B"] = loadImage("Assets/Blocks/grass.png");
    textures["C"] = loadImage("Assets/Blocks/dirt.png");
    textures["D"] = loadImage("Assets/Blocks/stone.png");

    textures["1"] = loadImage("Assets/Blocks/copper_ore.png");
    textures["2"] = loadImage("Assets/Blocks/iron_ore.png");
    textures["3"] = loadImage("Assets/Blocks/gold_ore.png");
    textures["4"] = loadImage("Assets/Blocks/diamond_ore.png");

    playerImage = loadImage("Assets/player.png");
}

function setup() {
    createCanvas(1280, document.querySelector("#game").getBoundingClientRect().height, game);
    colorMode(RGB, 255);
    noSmooth();

    update();
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

// Update everything
function update() {
    depthDisplay.textContent = "Depth: " + depth;

    // Display the proper amount of backpack slots
    for (let i = 0; i < backpackSlots; i++) {
        backpackSlotsDisplay[i].style.display = "flex";
    }

    // Change the backpack height so it matches the slot count
    backpackDisplay.style.height = (56 + 88 * Math.ceil(backpackSlots / 6)) + "px";

    // Clear previous images before adding new ones
    for (let i = 0; i < backpackSlots; i++) {
        backpackSlotsDisplay[i].innerHTML = "";
    }

    // Add items to inventory
    for (let i = 0; i < inventoryItems; i++) {
        let img = document.createElement("img");
        img.src = inventory[i];
        backpackSlotsDisplay[i].appendChild(img);
    }

    // Change display of current slot
    backpackSlotsDisplay[activeSlot].style.border = "6px solid #a0a0a0";
}

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

    // Make all slots unselected in case user selects a new one
    backpackSlotsDisplay.forEach(slot => {
        slot.style.border = "6px solid #161616";
    });

    // Change the active slot
    if (key >= 1 && key <= 9) activeSlot = key - 1;
    if (key == "0") activeSlot = 9;
    if (key == "-") activeSlot = 10;
    if (key == "=") activeSlot = 11;

    if (key == "q" && activeSlot != 0) activeSlot--;
    if (key == "e" && activeSlot != backpackSlots - 1) activeSlot++;
    if (key == "Q") activeSlot = 0;
    if (key == "E") activeSlot = backpackSlots - 1;

    update();
}

// Notify user when backpack full
function fullBackpack() {
    console.log("your backpack is full sillyhead, cant add item");
}

// Add pickaxe to backpack
function addPickaxe() {
    if (inventoryItems >= backpackSlots) fullBackpack();
    else {
        inventoryItems++;
        inventory.push(pickaxeSrc);
        update();
    }
}