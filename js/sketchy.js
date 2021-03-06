/*
		1. Create a 16x16 grid using divs
		Solve for the height and width variable of each individual grid
		Get main container height and width
		Divide that into the number of grids
		Generate the divs
			For loop (i<row){
				for (i<column)
				append divs style= display:inline-block; height:divHeight; width:divWidth;
			}

		2. Add a hover effect so that the div changes color when the mouse passes over it

		var generateColor = function(){}

		Add an event handlder to the divs when the mouseenters and leaves
		//use .addClass to add a class that changes the color
		change the css individually instead

		$('#grid-container').on('mouseenter','.gridBox',function(){
			$(this).css({'background', ''});
		});

		3. Add clear grid functionality which lets the user enter a new grid specification (max: 64x64)

	*/


//global variables
var defaultGridSize = 16; //default grid size 16x16
//initialize container height and width
var containerHeight=0;
var containerWidth=0;


$(document).ready(function(){
	// Get container height and width;
	containerHeight = +$('#grid-container').height();
	containerWidth = +$('#grid-container').width();
	console.log("containerHeight : " + containerHeight);
	console.log('containerWidth : ' + containerWidth);
	generateGrid(defaultGridSize);
	initEventHandler();

	});
	

// Step #1 Generate the 16x16 grid

var generateGrid = function(gridNumber){
	
	//compute the height and width of the individual grid boxes
	var divHeight = containerHeight / gridNumber;
	var divWidth = containerWidth / gridNumber;
	console.log('div Height = ' + divHeight);
	console.log('div Width = ' + divWidth);

	//generate the grid
	//update: moved the div outside the loop to hopefully improve performance when creating a huge grid
	var gridBoxDiv = '<div class="gridBox" data-opacity="0.4" style ="height:' + divHeight +'px; width:' + divWidth + 'px;"></div>';
	/*for testing
	slice string I can add id=rowx on the first column
	*/
	var splitIndex = gridBoxDiv.indexOf('class');
	splitIndex -= 1; //so that index points to the space before class not 'c' of class
	//slice(0,4) in this case and slice(4,gridBoxDiv.length) for the second string
	var firstDiv = gridBoxDiv.slice(0,splitIndex);
	var secondDiv = gridBoxDiv.slice(splitIndex,gridBoxDiv.length);



	//for loop for row
	for (var i=0; i<gridNumber; i++){
		//for loop for the column
		for(var j=0; j<gridNumber; j++){
			//add if statement that checks if it is the first column; if yes then add id = rownumber;
			if (j==0){
				$('#grid-container').append(firstDiv +' id=row'+ i + secondDiv);
			} else{ // if not first column then append the div normally
				$('#grid-container').append(gridBoxDiv);
			}
		}
	}
}
	
	
// Step #2 : Trailing colors

	//generate padding to add before the hex if less than 6 digits
	var generateHexPadding = function(padNum){
		var padding='';
		for (var i=0; i<padNum;i++){
			padding += '0';
			//console.log('padding:'+padding+'; padNum:'+padNum);
		}
		return padding;
	}

	//generate random color
	var getRandomColor = function(){

		var hex = Math.floor(Math.random() * 0xFFFFFF);
		
		/* toString(16) converts number to hexadecimal;
		'000000' acts as a padding to ensure 6 digits and substr(6) chops off at the end
		*/
		//return "#" + ('000000' + hex.toString(16)).substr(-6); 
		
		//used a different approach, check if length is less than 6 then add 0s at the beginning
		var hexPadding;
		hex = hex.toString(16);

		if (hex.length<6){
			hexPadding = 6 - hex.length;
			hex = generateHexPadding(hexPadding) + hex;
			//console.log('hex value less than 6. Prepending 0s as padding to the hex value');
		} else if (hex.length>6){
			hexPadding = hex.length - 6;
			console.log('hex value greater than 6, subtracting padding: ' + hexPadding);
			hex.substr(-hexPadding);
			console.log('new hex value: ' + hex);
		} else{
			//console.log('hex value is exactly 6 digits');
		}
		//console.log('returning #'+hex);
		return "#" + hex;
	}
	




	//event handler for drawing on hover
	var initEventHandler = function(){
		/*update: changed initial selector from $('#grid-container') to directly $(.gridBox)
		because the event handler is not removed along with gridbox since the selector used is
		actually the container. Not sure if there is any performance gain

		update2: moved it back. slower load times and event not working for some reason.
		gonna remove the event manually at the clearGrid function instead with off()
		*/
		
		$('#grid-container').on('mouseenter','.gridBox',function(){
			//get current color of gridBox. If it's transparent then generate random color else change shadeColor
			var currentColor = $(this).css("background-color");
			//init opacity
			var opacity=0.4;
			
			//if white or transparent then generate random color
			if (currentColor=="transparent")
			{
				opacity = $(this).data('opacity');
				$(this).css({'background': getRandomColor(), 'opacity': opacity});
			} else if ( +$(this).data('opacity') < 0.90000){
				//if opacity < 1.0 then add more opacity and randomize color
				opacity = +$(this).data('opacity');
				opacity+=.1;
				console.log('opacity: '+opacity);
				$(this).css({'background': getRandomColor(), 'opacity': opacity});
				$(this).data('opacity',opacity);
			//if opacity is maxed out, make the color black
			} else if ( +$(this).data('opacity') == 0.9999999999999999){
				$(this).css({'background':'#000000'});
			}
			
		});
	}
	

//Step # 3 : Clear and Reset Grid

	var clearGrid = function(){
		var newGridNumber = prompt('What grid size would you like? (Max:64)');
		//update: used remove() instead of empty() cause I think the classes are not removed
		//update: changed back to empty. It is faster. lol - http://blog.nictunney.com/2011/02/jquery-remove-performance-issues.html
		$('#grid-container').empty().off('mouseenter');
		generateGrid(newGridNumber);
		initEventHandler();
	}

