//! Variables
// Map and rendering
let tileSize = 160;
let textures = {};
let map = [
  ["A", "A", "A", "A", "A", "A", "A", "A"], // Air layer
  ["A", "0", "1", "A", "A", "A", "A", "A"], // Air layer
  ["A", "2", "3", "A", "A", "A", "A", "A"], // Air layer
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
let copperPickaxeSrc = "Assets/items/pickaxe_copper.png";
let ironPickaxeSrc = "Assets/items/pickaxe_iron.png";
let goldPickaxeSrc = "Assets/items/pickaxe_gold.png";
let diamondPickaxeSrc = "Assets/items/pickaxe_diamond.png";

let copperSrc = "Assets/items/copper_material.png";
let ironSrc = "Assets/items/iron_material.png";
let goldSrc = "Assets/items/gold_material.png";
let diamondSrc = "Assets/items/diamond_material.png";

// Backpack & Inventory
const backpackDisplay = document.getElementById("backpack");
const backpackSlotsDisplay = document.getElementsByClassName("backpack-slot");
let backpackSlots = 12;
let activeSlot = 0;
let inventory = [];
let inventoryItems = 0;

// Player
const depthDisplay = document.getElementById("depth-display");
const moneyDisplay = document.getElementById("money-display");
const sellItemsDisplay = document.getElementById("sell-items");
const buyItemsDisplay = document.getElementById("buy-items");
let depth = 0;
let xPos = 4;
let yPos = 2;

let money = 0;
let copper = 0;
let iron = 0;
let gold = 0;
let diamond = 0;

// Shop
const shopDisplay = document.getElementById("shop");
let shopOpened = false;

const switchToSellButton = document.getElementById("switch-to-sell-button");
const switchToBuyButton = document.getElementById("switch-to-buy-button");

const sellCopperMaterialDisplay = document.getElementById("sell-copper-material");
const sellIronMaterialDisplay = document.getElementById("sell-iron-material");
const sellGoldMaterialDisplay = document.getElementById("sell-gold-material");
const sellDiamondMaterialDisplay = document.getElementById("sell-diamond-material");

const copperPickaxeUpgradeDisplay = document.getElementById("copper-pickaxe-upgrade");
const ironPickaxeUpgradeDisplay = document.getElementById("iron-pickaxe-upgrade");
const goldPickaxeUpgradeDisplay = document.getElementById("gold-pickaxe-upgrade");
const diamondPickaxeUpgradeDisplay = document.getElementById("diamond-pickaxe-upgrade");

//! Functions

function preload() {
    // p5js Canvas Textures
    textures["A"] = loadImage("Assets/Blocks/sky.png");
    textures["B"] = loadImage("Assets/Blocks/grass.png");
    textures["C"] = loadImage("Assets/Blocks/dirt.png");
    textures["D"] = loadImage("Assets/Blocks/stone.png");

    textures["4"] = loadImage("Assets/Blocks/copper_ore.png");
    textures["5"] = loadImage("Assets/Blocks/iron_ore.png");
    textures["6"] = loadImage("Assets/Blocks/gold_ore.png");
    textures["7"] = loadImage("Assets/Blocks/diamond_ore.png");

    textures["0"] = loadImage("Assets/Blocks/shop0.png");
    textures["1"] = loadImage("Assets/Blocks/shop1.png");
    textures["2"] = loadImage("Assets/Blocks/shop2.png");
    textures["3"] = loadImage("Assets/Blocks/shop3.png");

    playerImage = loadImage("Assets/player.png");
}

function setup() {
    createCanvas(1280, document.querySelector("#game").getBoundingClientRect().height, game);
    colorMode(RGB, 255);
    noSmooth();

    inventoryItems++;
    inventory.push(pickaxeSrc);
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
    moneyDisplay.textContent = "Money: " + money + " $";
    depthDisplay.textContent = "Depth: " + depth + " ^";

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

function shopInteract() {
    if (shopOpened) {
        shopOpened = false;
        shopDisplay.style.display = "none";
    } else {
        shopOpened = true;
        shopDisplay.style.display = "flex";
    }
}

function keyPressed() {
    if (!shopOpened) {
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
    }

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

    if (key == "p" && depth == 0 && xPos >= 1 && xPos <= 2 && yPos == 2) shopInteract();

    update();
}

// Notify user when backpack full
function fullBackpack() {
    console.log("your backpack is full sillyhead, cant add item");
}

function switchToSell() {
    sellItemsDisplay.style.display = "block";
    buyItemsDisplay.style.display = "none";
    switchToSellButton.style.border = "6px solid #646464";
    switchToSellButton.style.background = "#484848";
    switchToBuyButton.style.border = "6px solid #161616";
    switchToBuyButton.style.background = "#242424";
}

function switchToBuy() {
    buyItemsDisplay.style.display = "block";
    sellItemsDisplay.style.display = "none";
    switchToBuyButton.style.border = "6px solid #646464";
    switchToBuyButton.style.background = "#484848";
    switchToSellButton.style.border = "6px solid #161616";
    switchToSellButton.style.background = "#242424";
}



function sellCopperMaterial() {
    if (copper >= 1) {
        copper--;
        money += 2;
    } else console.log("you dont have enough")
}

function sellIronMaterial() {
    if (iron >= 1) {
        iron--;
        money += 5;
    } else console.log("you dont have enough")
}

function sellGoldMaterial() {
    if (gold >= 1) {
        gold--;
        money += 11;
    } else console.log("you dont have enough")
}

function sellDiamondMaterial() {
    if (diamond >= 1) {
        diamond--;
        money += 45;
    } else console.log("you dont have enough")
}



function buyCopperPickaxeUpgrade() {
    if (money >= 6 && copper >= 3) {
        copperPickaxeUpgradeDisplay.style.display = "none";
        ironPickaxeUpgradeDisplay.style.display = "flex";
        sellIronMaterialDisplay.style.display = "flex";
    } else console.log("you dont have enough")
}

function buyIronPickaxeUpgrade() {
    if (money >= 14 && iron >= 5) {
        ironPickaxeUpgradeDisplay.style.display = "none";
        goldPickaxeUpgradeDisplay.style.display = "flex";
        sellGoldMaterialDisplay.style.display = "flex";
    } else console.log("you dont have enough")
}

function buyGoldPickaxeUpgrade() {
    if (money >= 36 && gold >= 7) {
        goldPickaxeUpgradeDisplay.style.display = "none";
        diamondPickaxeUpgradeDisplay.style.display = "flex";
        sellDiamondMaterialDisplay.style.display = "flex";
    } else console.log("you dont have enough")
}

function buyDiamondPickaxeUpgrade() {
    if (money >= 100 && diamond >= 10) {
        diamondPickaxeUpgradeDisplay.style.display = "none";
    } else console.log("you dont have enough")
}