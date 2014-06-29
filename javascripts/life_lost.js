$(document).ready(function(){
	// if checkbox changed , return checked list & age range

    $('#c_b input').click(SendValue_lifeLost);
    SendValue_lifeLost();

});

function SendValue_lifeLost(){
	var sum;
	var range_a;
	var range_b;
	var bound_a;
	var bound_b;


	range_a = $("#range-4a").val();
  	range_b = $("#range-4b").val();
  	bound_a=Math.floor(range_a/10);
  	bound_b=Math.floor(range_b/10);
  	$.getJSON("/static/life_expenditure_info.json", function(data){ 
		for(i=bound_a;i<=bound_b;i++){
			switch(i){
				case 2:
					sum += lifeLost(data, 20, 29);
				break;
				case 3:
					sum += lifeLost(data, 30, 39);
				break;
				case 4:
					sum += lifeLost(data, 40, 49);
				break;
				case 5:
					sum += lifeLost(data, 50, 59);
				break;
				case 6:
					sum += lifeLost(data, 60, 69);
				break;
				case 7:
					sum += lifeLost(data, 70, 79);
				break;
				case 8:
				break;
				default:
				break;
		  	}
		}
  	});

}


function lifeLost(data, range_lower, range_upper){
	var key;
	var value;
	var LIFE;
	var SE;

	key = range_lower+"-"+range_upper;
	value = data[key].life_lost;
	// console.log("value="+value);

	return 0;
}

