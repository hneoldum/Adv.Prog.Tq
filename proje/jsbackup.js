var count = 0;
var question_screen = false;
var result_letter;
var clicked_button;
var resimBoyut = 100;
var transcript = "ş";
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var sonuc = [];
var solsonuc = 0;
var sagsonuc = 0;
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function que_screen() {
    question_screen = true;
    //console.log(question_screen);
    if (question_screen == true) {
        document.getElementById("startEkran").style.visibility = "hidden";
        document.getElementById("gozTest").style.visibility = "visible";
        document.getElementById("resimEkran").style.visibility = "visible";
      //  document.getElementById("resimEkran").style.position = "0px";
       // document.getElementById("resimEkran").style.top = "0px";
    }
}


function getRandomLetter() {
    a = letters[Math.floor(Math.random() * letters.length)]
    letters = removeCharacter(a,letters);
   // console.log(a);
   // console.log(letters);
    return a;

   /* shuffle(letters);
    return letters[Math.floor(Math.random() * letters.length)]
*/

}

function getResultLetter(distance, top) {
    result_letter = getRandomLetter()

    create_button(result_letter, distance, top);
    document.getElementById("resimEkran").style.innerHTML = "";
    document.getElementById("resimEkran").style.fontSize = resimBoyut + "px";
    resimBoyut = resimBoyut / 1.5;
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
  //  document.getElementById(isim).style.width = "100px";
   // document.getElementById(isim).style.height = "100px";
    document.getElementById(isim).style.fontSize = "40px";
    document.getElementById(isim).style.backgroundColor = "darksalmon";
   // document.getElementById(isim).style.border = "0";
}


function start_recognition() {




    recognition.onstart = function () {
        console.log("listening, please speak...");
        document.getElementById("microphone").style.visibility = "visible";
    };

    recognition.lang = "tr-TR";

    recognition.onspeechend = function () {
        console.log("dinleme bitti");
        document.getElementById("microphone").style.visibility = "hidden";
        recognition.stop();
    }

    recognition.onresult = function (event) {
        transcript = event.results[0][0].transcript;
        console.log("Transcript =", transcript);
        instance_control();
    };

    
    try {
        recognition.start();
       
    }
    catch(err) {
      console.log("dinleme hatası");
      recognition.stop();
      document.getElementById("microphone").style.visibility = "hidden";
      alert("Dinleme bitmeden mikrofona basmayınız.");
    }
    
}




function create_speech_recognition_button() {
    isim = "Konuş";
    distance = 0;
    top = 600;

    create_button(isim, distance=-100, top=320);
    document.getElementById(isim).onclick = function () { start_recognition() };
    document.getElementById(isim).style.backgroundColor="darkslategrey"
}

function instance_control() {

    if (sonuc.length == 4) {
        digerGozeGec();
        resimBoyut = 100;


    }
    if (sonuc.length == 9) {
        uygulamayi_bitir();
        resimBoyut=100;
    }



    if (clicked_button == result_letter || transcript[0].toUpperCase() == result_letter) {

        console.log("its true");
        sonuc.push(20);
        document.getElementById('gozTest').innerHTML = "";
        document.getElementById('resimEkran').innerHTML = "";
      //  console.log("RESİM BOYUT ="+resimBoyut);
        create_all_buttons();

        count++;

    }
    
    else {

        console.log("false");
        document.getElementById('gozTest').innerHTML = "";
        document.getElementById('resimEkran').innerHTML = "";
        sonuc.push(0);
        count++;
        create_all_buttons();

        console.log("count =", count);
        // resimBoyut = resimBoyut / 1.5;


    }



    hesaplama();

}


function reply_click(clicked_id) {


    clicked_button = clicked_id;
    instance_control();


}
//console.log(clicked_button, result_letter)


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

function uygulamayi_bitir() {
    document.getElementById("bitisEkran").style.visibility = "visible";
  //  document.getElementById("tekrar").style.visibility = "visible";
    document.getElementById("digerGoz").style.visibility = "hidden";
    document.getElementById("gozTest").style.visibility = "hidden";
    document.getElementById("resimEkran").style.visibility = "hidden";
    count = -1;
    //resimBoyut=100;


}

function hesaplama() {
    if (sonuc.length == 10) {
        const newArray = sonuc.slice(0, 5);
        const newArray2 = sonuc.slice(5, 10);

        console.log("sag " + newArray);
        console.log("sol " + newArray2);
        console.log(sonuc);


        sagsonuc = newArray.reduce(function (a, b) {
            return a + b;
        }, 0);


        solsonuc = newArray2.reduce(function (a, b) {
            return a + b;
        }, 0);
       // console.log("sag array" + sagsonuc);
       // console.log("sol array" + solsonuc);
        document.getElementById("demo").innerHTML = " SONUÇ:  ";
        document.getElementById("demo").innerHTML= "sağ %" + sagsonuc+" "+"sol %" + solsonuc;
    }
}


function tekrar_basla() {
    question_screen = false;
    document.getElementById("startEkran").style.visibility = "visible";
    document.getElementById("bitisEkran").style.visibility = "hidden";

    sonuc = [];
    //create_all_buttons();
}

class ikili {
    constructor(distance, top) {
        this.distance = distance;
        this.top = top;
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function create_all_buttons() {
    var ikililer = [new ikili(0, 250), new ikili(0, 250), new ikili(200, 250), new ikili(200, 250)];

    shuffle(ikililer);
    getResultLetter(ikililer[1].distance, ikililer[0].top);
  //  console.log("result position", ikililer[0].distance, ikililer[0].top);
    for (i = 1; i < 4; i++) {
     //   console.log(ikililer[i].distance, ikililer[i].top);
        create_button(getRandomLetter(), ikililer[i].distance, ikililer[i].top);
    
    }
    create_speech_recognition_button();
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}

function removeCharacter(isim,arr){
    for (var i = 0; i < letters.length; i++) {
        if (arr[i]===isim){
            arr =  arr.slice(0, i) + arr.slice(i+1, arr.length);
            return arr;
        }

        
}
}
create_all_buttons();
