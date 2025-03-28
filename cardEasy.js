const canvas = document.getElementById('memoryGame');
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
let cols = 3;
let rows = 2;
let imgAmount= cols*rows/2
let cards = [];
let newCard =[]
function setLevel(button) {
    let level = button.value;
    console.log(level);
    if(level == 'easy') {
        cols = 3;
        rows = 2;
        let imgAmount = cols * rows / 2
        setImgList()
    }
}
let img = document.getElementById("image");
function setImgList() {
    cards =[];
    let id=0;
    // ảnh trong mảng
    for(let i=0;i<rows;i++) {
        for(let j=0;j<cols; j++) {
            cards.push(`${id}.jpg`)
            id+=1;
            if(id == imgAmount) id=0;
        }
    }
    // đổi thứ tự ngẫu nhiên
    cards.sort(function() {
        return Math.random() - 0.5
    });
    console.log(cards);
}
function defaultCard() {
    newCard = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            newCard.push(false);
        }
    }
}
setImgList();
// cho thẻ vào canvas
// function displayOnCanvas() {
//     canvas.width = cols * 100;
//     canvas.height = rows * 100;
//
//     let imgWidth = 100;
//     let imgHeight = 100;
//
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             let img = new Image();
//             img.src = "image/" + cards[i * cols + j];
//             img.onload = (function(x, y) {
//                 return function() {
//                     ctx.drawImage(img, x * imgWidth, y * imgHeight, imgWidth, imgHeight);
//                 };
//             })(j, i); // Closure để giữ giá trị j, i
//         }
//     }
// }


// displayOnCanvas();
