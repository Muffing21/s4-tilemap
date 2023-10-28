import "./style.css";


//setting up the multiple canvases
const gridCanvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
const gridCtx = gridCanvas.getContext("2d") as CanvasRenderingContext2D;

const selectCanvas = document.getElementById("selectCanvas") as HTMLCanvasElement;
const selectCtx = selectCanvas.getContext("2d") as CanvasRenderingContext2D;


//defining the textures to use
const imageUrls = [
    "/tile1.png",
    "/tile2.png",
    "/tile3.png",
    "/tile4.png",
    "/tile5.png",
    "/tile6.png",
    "/tile7.png",
    "/tile8.png"
];


//defining the size of the main grid
const numTiles = 32*2;
const tileSize = gridCanvas.width / numTiles;


//defining the size of the select grid
const numSelectables = imageUrls.length;
const selectHeight = selectCanvas.height / numSelectables;

// function functieArray(imgArr: HTMLImageElement[]){
//     for (let i = 0; i < imgArr.length; i++) {
//         imgArr[i];
//     }
//     document.getElementById("pozeGallery").innerHTML = imgArray.src;
// };



//My idea was instead of having a nested array, we have one big image array. However it is not working for some reason lol
//creating the tilemap nested array
let tilemap: HTMLImageElement[] = new Array(numTiles);
let img = new Image();

for(let i = 0; i < numTiles; i++) {
    img = new Image();
    img.src = "/tile1.png"; 
    tilemap.push(img);
}

//track the selected tile
let currentTile = "/tile1.png";

//draw the initial canvases
redrawTilemap();
drawSelectCanvas();


//Function that draws a texture to a specific canvas ctx
function drawTexture(row: number, col: number, ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number, cellSize: number) {
    image.onload = () => {
        ctx.drawImage(image, row * cellSize, col * cellSize, width, height)
    };
    ctx.drawImage(image, row * cellSize, col * cellSize, width, height)
}


// ----- Interacting with the main tilemap -----

function redrawTilemap()
{
  gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    for (let i = 0; i < numTiles; i++) {
        for (let j = 0; j < numTiles; j++) {
            drawTexture(i, j, gridCtx, tilemap[i], gridCanvas.width / numTiles, gridCanvas.height / numTiles, tileSize);
        }
    }
}


gridCanvas.addEventListener("click", (e) => {
    const coordX = Math.trunc(e.offsetX / tileSize);
    const coordY = Math.trunc(e.offsetY / tileSize);

    tilemap[coordX].src = currentTile;
    redrawTilemap();
})


// ----- Interacting with the selectable tilemap -----

// Loop through the selectable tiles and draw textures in each cell
function drawSelectCanvas()
{
    for (let i = 0; i < numSelectables; i++) {
        const selectableImage = new Image();
        selectableImage.src = imageUrls[i];
        drawTexture(0, i, selectCtx, selectableImage, selectCanvas.width, selectHeight, 64);
    }
}

selectCanvas.addEventListener("click", (e) => {
    const coordY = Math.trunc(e.offsetY / selectHeight);
    currentTile = imageUrls[coordY];
})