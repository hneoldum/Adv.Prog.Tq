var count = 0;
var question_screen = false;
var result_letter;
var clicked_button;
var resimBoyut = 100;


function que_screen() {
    question_screen = true;
    console.log(question_screen);
    if (question_screen == true) {
        document.getElementById("startEkran").style.visibility = "hidden";
        document.getElementById("gozTest").style.visibility = "visible";
        document.getElementById("resimEkran").style.visibility = "visible";


    }
}


function getRandomLetter() {

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    return letters[Math.floor(Math.random() * letters.length)]
}

function getResultLetter(distance, top) {
    result_letter = getRandomLetter()

    create_button(result_letter, distance, top);

    document.getElementById("resimEkran").style.fontSize = resimBoyut + "px";
    document.getElementById("resimEkran").append(result_letter);


    document.getElementById(result_letter).style.position = "relative";
}




function create_button(isim, distance, top) {
    var btn = document.createElement("BUTTON");   // Create a <button> element
    btn.innerHTML = isim;
    btn.id = isim;
    btn.onclick = function () { reply_click(btn.id) }            // Insert text
    document.getElementById("gozTest").appendChild(btn)
    document.getElementById(isim).style.position = "relative";
    document.getElementById(isim).style.left = distance + "px";
    document.getElementById(isim).style.top = top + "px";
   // document.getElementById(isim).style.display="inline-block";

}


function reply_click(clicked_id) {
    if (count == 4) {
        digerGozeGec();
        resimBoyut = 100;
    }

    clicked_button = clicked_id
    if (clicked_button == result_letter) {
        console.log("its true");
        document.getElementById('gozTest').innerHTML = "";
        document.getElementById('resimEkran').innerHTML = "";
        resimBoyut = resimBoyut / 2; //deneme
        create_all_buttons();
        count++;

    }
    else {
        console.log("false");
        document.getElementById('gozTest').innerHTML = "";
        document.getElementById('resimEkran').innerHTML = "";
        resimBoyut = resimBoyut / 2; //deneme
        //getResultLetter()
        //create_buttons();
        count++;
        create_all_buttons();
        console.log(count);
    }

    return clicked_id
}
console.log(clicked_button, result_letter)


function create_buttons() {
    for (i = 0; i < 3; i++) {
        create_button(getRandomLetter(), 50 * i)
    }
}

function digerGozeGec() {
    document.getElementById("digerGoz").style.visibility = "visible";
    document.getElementById("gozTest").style.visibility = "hidden";
    document.getElementById("resimEkran").style.visibility = "hidden";
    setTimeout(() => {
        document.getElementById("digerGoz").style.visibility = "hidden";
        document.getElementById("gozTest").style.visibility = "visible";
        document.getElementById("resimEkran").style.visibility = "visible";
    }, 2500);


}

function create_all_buttons() {
    const distances = [0,200,100];
    const tops = [100];
    const temp = distances;
    const temp2 = tops;
    randomDistance = temp[Math.floor(Math.random() * temp.length)];
    randomTop = temp2[Math.floor(Math.random() * temp2.length)];
    removeElement(randomDistance, temp);
    removeElement(randomTop, temp2);
    const result = getResultLetter(randomDistance);


    for (i = 0; i < 3; i++) {
        randomDistance = temp[Math.floor(Math.random() * temp.length)];
        randomTop = temp2[Math.floor(Math.random() * temp2.length)];
        removeElement(randomDistance, temp);
        removeElement(randomTop, temp2);
        create_button(getRandomLetter(), randomDistance, randomTop);
    }


}

function removeElement(isim, arr) {
    for (var i = 0; i < arr.length; i++) {

        if (arr[i] === isim) {

            arr.splice(i, 1);
        }
    }
}
create_all_buttons();
//getResultLetter();
//create_buttons();