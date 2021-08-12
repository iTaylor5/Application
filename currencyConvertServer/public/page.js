/**
 * author:          itaylor5
 * Version:         1.0
 * Date:            17/04/2021
 * Description:     Functions for Currency Converter App on movie review.
 */

/* Pops last element added to array*/
function pop() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            updateStackOnUi();
        }
    };

    xhttp.open("GET", "pop", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}

/* Euro Conversion */
function convertToEuro() {

    let dollars = document.getElementById("amount").value;
    var xhttp = new XMLHttpRequest();
    var result = 0;
    var item;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("display").innerHTML = 'Currency value is: ' + xhttp.responseText + " in Euros.";
            updateStackOnUi();
            console.log("Back from updating the stack UI");
        }
    };

    xhttp.open("POST", "euro", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ amount: dollars }));
}

/* Pound converter */
function convertToPounds() {

    let dollars = document.getElementById("amount").value;

    var xhttp = new XMLHttpRequest();
    var result = 0;
    var item;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("display").innerHTML = 'Currency value is: '
                + xhttp.responseText + " in Pounds.";
            updateStackOnUi();
        }
    };

    xhttp.open("POST", "pounds", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({ amount: dollars }));
}

/* Get the history */
function history() {
    updateStackOnUi();
}

/* Reset everything */
function reset() {

    let valDisplay = document.getElementById("display");
    valDisplay.innerHTML = "0";

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            updateStackOnUi();
        }
    };

    xhttp.open("GET", "reset", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

}


/* Update the stack displayed to user in the UI */
function updateStackOnUi() {

    //let dollars = document.getElementById("amount").value;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("display").innerHTML = 'Currency value is: ' + xhttp.responseText + " in Pounds.";

            result = xhttp.responseText;
            console.log("result" + result);

            let stackJSON;

            if (result == "") {
                console.log("undefined returned");
                let stackDis = document.getElementById("stackDisplay");
                stackDis.innerHTML = "";
                //
            } else {
                stackDis = document.getElementById("stackDisplay");
                let str;
                stackJSON = JSON.parse(result);
                for (i = 0; i < stackJSON.length; i++) {
                    if (str == undefined) {
                        str = "Operand: " + stackJSON[i].operand + " was converted from USD to " + stackJSON[i].result + " " + stackJSON[i].currency + " User details: " + stackJSON[i].usr + " IP: " + stackJSON[i].ipAdd + "<br><br/>";
                    } else {
                        str += "Operand: " + stackJSON[i].operand + " was converted from USD to " + stackJSON[i].result + " " + stackJSON[i].currency + " User details: " + stackJSON[i].usr + " IP: " + stackJSON[i].ipAdd + "<br><br/>";
                        //str += "Operand: " + stackJSON[i].operand + " was converted from USD to " + stackJSON[i].result + " " + stackJSON[i].currency + "<br><br/>";
                    }
                }
                if (str == undefined) {
                    console.log("Undefined found");
                    document.getElementById('resetBut').disabled = true;
                    stackDis.innerHTML = "";
                } else {
                    document.getElementById('resetBut').disabled = false; // enable the reset button
                    stackDis.innerHTML = str;
                }
            }
        }
    };

    xhttp.open("get", "stack", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();

}

/* Hide buttons if input from id="amount" is not an integer*/
// Number.isInteger(parseFloat(document.getElementById("amount").value)
function success() {

    // let input = document.getElementById("amount").value;

    // if (!isNaN(input)) {
    //     //input = parseFloat(input);
    //     document.getElementById('euroBut').disabled = false;
    //     document.getElementById('poundBut').disabled = false;
    // } else if (input = "") {
    //     document.getElementById('euroBut').disabled = true;
    //     document.getElementById('poundBut').disabled = true;
    // } else {
    //     alert("Please enter a real number");
    //     document.getElementById('euroBut').disabled = true;
    //     document.getElementById('poundBut').disabled = true;
    // }

    if (parseFloat(document.getElementById("amount").value)) {
        document.getElementById('euroBut').disabled = false;
        document.getElementById('poundBut').disabled = false;
    } else {
        document.getElementById('euroBut').disabled = true;
        document.getElementById('poundBut').disabled = true;
    }
}