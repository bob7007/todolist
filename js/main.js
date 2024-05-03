
var listE = new Array(); // store all current list elements of a session in array
var a = new Array(); // temporary array used to retrieve object from local storage.
var textsave = new Array(); // store all the input text from the user in an array.
var numberOfElements; // number of current elements
$(document).ready(function () {

	numberOfElements = ($('#myList li').length) - 2; // element lenght gets 2 substracted to account for header and add list elements
    $('#counter').text('# Of Elements: '+numberOfElements +''); // set the element on the dom.
	

    $("#add").on("click", function () { // function adds on click, all the user input

       numberOfElements++; // elements get updated
	   $('#counter').text('# Of Elements: '+numberOfElements +''); 
        var a = $("#userInput").val();

		if(a.length > 15) // input must be smaller than 15 character because i dont like how it looks otherwise. 
		{
			alert("The input is too large"); // user gets informed of what the conditions are
			a="";
			document.getElementById('userInput').value = '';
		}
		else
		{
			
		textsave.push(a); // save text in array
		
		// 4 different id gets matched across the list element, however all of them are related through items number. 
        var items = $('#myList li').length
        $("#myList").append('<li id="'+(items + 1)+'" class="list-group-item list-group-item-primary"><p contenteditable="true" class="textF" id="' + (items + 1) + '-text">' + a + '</p><label class="check2 container2"><input id="' + (items + 1) + '-check" class="check-test" type="checkbox"><span class="checkmark"></span></label><a><img id="' + (items + 1) + '-trash" class="trash" src="img/trash.png" height="25" width="25"></a></li>');
		listE.push('<li id="'+(items + 1)+'" class="list-group-item list-group-item-primary"><p contenteditable="true" class="textF" id="' + (items + 1) + '-text">' + a + '</p><label class="check2 container2"><input id="' + (items + 1) + '-check" class="check-test" type="checkbox"><span class="checkmark"></span></label><a><img id="' + (items + 1) + '-trash" class="trash" src="img/trash.png" height="25" width="25"></a></li>');
		}

		// pushing list information in array



    });


   

    $(document).on('click', '.check-test', function (event) { // on click 2 classes get added to a list element
		
		
        var id = event.target.id; // getting the specific target id
        var auxSplit = id.split('-'); // using split to obtein the id number
        var intId = auxSplit[0];
        
		var a = $('input#'+ intId +'-check').is(':checked') // checking if the checkbox has been checked
		
		if(a) // if true apply classes. here classes get updated in real time, as well as the array which saves elements using text array and element array with matching id
		{
			$('#' + intId + "-text").addClass("scratch");
			$("#"+intId).addClass("removal");
			listE[intId-6]=('<li id="'+(intId)+'" class="removal list-group-item list-group-item-primary"><p contenteditable="true" class="scratch textF" id="' + (intId) + '-text">' + textsave[intId-6] + '</p><label class="check2 container2"><input id="' + (intId) + '-check" class="check-test" type="checkbox"><span class="checkmark"></span></label><a><img id="' + (intId) + '-trash" class="trash" src="img/trash.png" height="25" width="25"></a></li>');
		}
		else // false removes classes
		{
			$('#' + intId + "-text").removeClass("scratch");
			$("#"+intId).removeClass("removal");
			listE[intId-6]=('<li id="'+(intId)+'" class="list-group-item list-group-item-primary"><p contenteditable="true" class="textF" id="' + (intId) + '-text">' + textsave[intId-6] + '</p><label class="check2 container2"><input id="' + (intId) + '-check" class="check-test" type="checkbox"><span class="checkmark"></span></label><a><img id="' + (intId) + '-trash" class="trash" src="img/trash.png" height="25" width="25"></a></li>');
		}
		
		

   
    });


		$(document).on('click','.trash', function(event) // on click list element gets removed 
		{
				numberOfElements--;
				$('#counter').text('# Of Elements: '+numberOfElements +''); // update number of elements
				var id = event.target.id;
				var auxSplit = id.split('-');
				var intId = auxSplit[0];
			//	console.log(intId);
				
				$("#"+intId).remove(); // remove element
				
				//console.log(intId-6);
				
				delete listE[intId-6]; // remove array element
				

		});
		
		

		$(document).on('click','.clear', function(event) // all local data gets erased upon selecting clear
		{
				localStorage.clear();
				
				
				//alert("Data has been cleared");
				alert("Current data will be lost upon refresh");
		});

		
		
		
		
		
		$(document).on('click','.restore', function(event) // restoring data saved in local storage and appended back to the list with its classes.
		{
				numberOfElements = localStorage.getItem('numberOfElements')
				console.log(numberOfElements);
				$('#counter').text('# Of Elements: '+numberOfElements +''); // update number of elements
				
				a = JSON.parse(localStorage.getItem('listE'));
				
				a.forEach(function(element) { // loop through the whole array
				//console.log(element);
				$("#myList").append(element); // append element upon restore
			
				});
				
		});
		
		
		
		
		

		$(document).on('click','.Save', function(event) // all local data gets saved upon click
		{
				
				localStorage.setItem('listE', JSON.stringify(listE)); // saving the whole element array in local storage
				
				numberOfElements = ($('#myList li').length) - 2; // updating number of elements
				console.log(numberOfElements); 
				localStorage.setItem("numberOfElements", numberOfElements); 
				alert("Data has been saved");
		});
		
		







});
