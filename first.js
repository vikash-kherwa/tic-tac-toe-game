let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let turnO = true;//Player O , Player X
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msgcontainer");

let msg = document.querySelector("#msg");

let count = 0;

const winPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left to bottom-right
    [2, 4, 6]  // diagonal from top-right to bottom-left
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}



boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.style.color = "red";
            count++;
        }

        else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "blue";
            count++;
        }
        console.log(count);
        box.disabled = true
        checkWinner();
    });
});


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}



const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }

}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showdraw = () => {
    msg.innerText = `Congratulations! Match is Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const checkWinner = () => {
    for (pattern of winPatterns) {
        let posvalu1 = boxes[pattern[0]].innerText;
        let posvalu2 = boxes[pattern[1]].innerText;
        let posvalu3 = boxes[pattern[2]].innerText;
        if (posvalu1 != "" && posvalu2 != "" && posvalu3 != "") {

            if (posvalu1 == posvalu2 && posvalu2 == posvalu3) {
                console.log("Winner", posvalu1);
                showWinner(posvalu1);
                return;
            }
        }

    }
    if (count == 9) {
        showdraw();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);