$(document).ready(function(){
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

	*/

	// Step #1 Generate the 16x16 grid

	//set Grid Number; Get container height and width;
	var gridNumber = 16;
	var containerHeight = +$('#grid-container').height();
	var containerWidth = +$('#grid-container').width();
	console.log("containerHeight : " + containerHeight);
	console.log('containerWidth : ' + containerWidth);

	//compute the height and width of the individual grid boxes
	var divHeight = containerHeight / gridNumber;
	var divWidth = containerWidth / gridNumber;
	console.log('div Height = ' + divHeight);
	console.log('div Width = ' + divWidth);

	//generate the grid
	for(var i=0; i<gridNumber;i++){
		for(var j=0; j<gridNumber; j++){
			$('#grid-container').append('<div class="gridBox" style = "display:inline-block ; height: ' + divHeight +'px; width: ' + divWidth + 'px;">'+j+'</div>');
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

	$('#grid-container').on('mouseenter','.gridBox',function(){
		$(this).css({'background': getRandomColor()});
	});


});
