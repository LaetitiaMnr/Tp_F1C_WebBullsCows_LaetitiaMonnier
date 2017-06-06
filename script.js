//Laetitia Monnier
var buttons = [];
var codes = [];
var life = 7;


window.onload = function() 
{
	loadCodes();
	loadButton();
}


//Function that loads a 4 digits code (from 0 to 9).
function loadCodes() 
{
	var codeNumbers = [];
	for (var compteur = 0; compteur < 10; compteur++) codeNumbers[compteur] = compteur;

	for (compteur = 0; compteur < 4; compteur++) //In order to have no repeated numbers in the code, we remove the used one from the array. 
	{
		var index = Math.floor(Math.random() * codeNumbers.length);
		var codeNumber = codeNumbers.splice(index, 1);
		codes.push(codeNumber);
	}
}

function loadButton() 
{
	buttons.push(document.getElementById("button1"));
	buttons.push(document.getElementById("button2"));
	buttons.push(document.getElementById("button3"));
	buttons.push(document.getElementById("button4"));
}


//Function that write inside the buttons a number (from 0 to 9). On click, there is an incrementation and when the number = 9, the button restart at 0.
function button(number)
{
	var button = buttons[number];
	button.innerHTML = +button.innerHTML + 1;
	if (button.innerHTML == 10) button.innerHTML = 0;
}


/*This function check if the number inside a button is equal to a number in the 4 digits code. If the number in a button exists and correctly placed, a point
is added for the bulls. If the number exists but incorrectly placed, the point is added to the cows.*/
function check()
{
	var bulls = 0;
	var cows = 0;
	for (var compteurC = 0; compteurC < codes.length; compteurC++)
	{
		for (var compteurB = 0; compteurB < buttons.length; compteurB++)
		{
			if (buttons[compteurB].innerHTML == codes[compteurC]) {
				if (compteurB == compteurC) bulls++;
				else cows++;
			}
		}
	}

	document.getElementById("bulls1" ).innerHTML += bulls + " - ";
	document.getElementById("cows1" ).innerHTML += cows + " - ";

	createResultLine();
	for (var compteur = 0; compteur < buttons.length; compteur++) //Initialization of the buttons to 0. 
	{
		buttons[compteur].innerHTML = 0;
	}

	life = life - 1;
	if (bulls == 4) alert("You win");
	else if (life ==  0) alert(codes);
}


//This function creates a new line. The previous answer will appear under the originals buttons (where we enter the answer).
function createResultLine()
{
	var article = document.getElementById("choice");
	var line = document.createElement("div");
	line.className = "resultLine";
	line.style.width = article.clientWidth + "px";

	for (var compteur = 0; compteur < buttons.length; compteur++)
	{
		var div = createResultButton(buttons[compteur].innerHTML);

		line.appendChild(div);
	}

	article.appendChild(line);
}

//This function creates new buttons.
function createResultButton(buttonValue) 
{
	var div = document.createElement("div");
	div.className = "alignment";
	div.innerHTML = buttonValue;

	return div;
}