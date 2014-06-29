var checked_list=[];
var range_a;
var range_b;
var bound_b;

$(document).ready(function(){
  // if checkbox changed , return checked list & age range

  $('#c_b input').click(SendValue_CIR);
  SendValue_CIR();


});



// if age range changed, return checked list & age ranged
$(document).on("change", "#div-slider", function () { 
 //  console.log(checked_list);
 //  console.log($("#range-4a").val()+"-"+$("#range-4b").val());
     Get_Result();
 //  Get_Life_Result();
});



//Send Value 
function SendValue_CIR() {
     var allVals = [];
     $('#c_b :checked').each(function() {
       allVals.push($(this).val());
     });
     checked_list=allVals;
     Get_Result();
}


// calaulate percentage
function Get_Result(){
  var sum=0;
  var c = false;    //define false: unclick & true: clicked
  var a = false;
  var b = false;
  var R;
  var result_for_print;
  
  range_a= $("#range-4a").val();
  range_b= $("#range-4b").val();
  bound_a=Math.floor(range_a/10);
  bound_b=Math.floor(range_b/10);
    
  $.getJSON("./static/info.json", function(data){ 


  //Update var c,a,b value
  for(i=0; i<checked_list.length; i++){
      if(checked_list[i] == "c")  c = true;
      else if(checked_list[i] == "a") a = true;
      else if(checked_list[i] == "b") b = true;
  }

  for(i=bound_a;i<=bound_b;i++){
    switch(i){
      case 2:
        sum += R_X(c, a, b, data, 20, 29);
      break;
      case 3:
        sum += R_X(c, a, b, data, 30, 39);
      break;
      case 4:
        sum += R_X(c, a, b, data, 40, 49);
      break;
      case 5:
        sum += R_X(c, a, b, data, 50, 59);
      break;
      case 6:
        sum += R_X(c, a, b, data, 60, 69);
      break;
      case 7:
        sum += R_X(c, a, b, data, 70, 79);
      break;
      case 8:
        //Calculate R value
        if(c == false && a == false && b == false)  R = data.R0['>=80'];
        else if(c == true && a == false && b == false) R = data.Rc['>=80'];
        else if(c == false && a == true && b == false) R = data.Ra['>=80'];
        else if(c == false && a == false && b == true) R = data.Rb['>=80'];
        else if(c == true && a == true && b == false) R = data.Rac['>=80'];
        else if(c == false && a == true && b == true) R = data.Rab['>=80'];
        else if(c == true && a == false && b == true) R = data.Rbc['>=80'];
        else if(c == true && a == true && b == true) R = data.Rabc['>=80'];
        else console.log("ERROR: Cannot find data in table. (Wrong value) checked_list=" + checked_list);

        //Calculate X value,  0 <= X <= 10
        var X = 10;
        var range_lower = 80;
        if(range_a - range_lower > 0) X = X - (range_a - range_lower);
        if(X < 0) console.log("Error: variable X should not lower than 0");

        sum += R*X ;
      break;
      default:
      break;
    }
  }
  sum /= 100000;    // The table is original_rate * 10^5
  result_for_print = 1 - Math.exp(-sum);
 // result_for_print *= 100;   //Because %
  document.getElementById("CIR_range").innerHTML = range_a+"-"+range_b;
  document.getElementById("result_CIR").innerHTML = (result_for_print).toFixed(5);
 // document.getElementById("result_Life_Expentancy").innerHTML = Get_Life_Expentancy()+"%";
 Get_Life_Expectancy(bound_b);
 Get_Life_Lost(bound_b);
 Get_Life_Expenditure(bound_b);
 // console.log("checked_list=" + checked_list);
 // console.log(sum);
  });
}
function Get_Life_Expectancy(range_upper){
  var result_low=0;
  var result_high=0;
  $.getJSON("./static/info.json", function(data){
       var range = range_upper+"0-"+range_upper+"9";
      // console.log(range);
       switch(bound_b){
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
         result_low=(data.life_expen[range].life_exp-data.life_expen[range].life_exp_SE*1.95).toFixed(1);
         result_high=(data.life_expen[range].life_exp+data.life_expen[range].life_exp_SE*1.95).toFixed(1);
         document.getElementById("result_Life_Expectancy").innerHTML = result_low+"-"+result_high+" Years";  
        break;
        case 8:
        default:
        document.getElementById("result_Life_Expectancy").innerHTML = "Due to the limitation of the data, there's no information could be given.";  
        break;
      }
  });
}
function Get_Life_Lost(range_upper){
  var result_low=0;
  var result_high=0;
  $.getJSON("./static/info.json", function(data){
       var range = range_upper+"0-"+range_upper+"9";
      // console.log(range);
       switch(bound_b){
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
         result_low=(data.life_expen[range].life_lost-data.life_expen[range].life_lost_SE*1.95).toFixed(1);
         result_high=(data.life_expen[range].life_lost+data.life_expen[range].life_lost_SE*1.95).toFixed(1);
         console.log(data.life_expen[range].life_lost);
         document.getElementById("result_Life_Lost").innerHTML = result_low+"-"+result_high+" Years";  
        break;
        case 8:
        default:
        document.getElementById("result_Life_Lost").innerHTML = "Due to the limitation of the data, there's no information could be given.";  
        break;
      }
  });
}
function Get_Life_Expenditure(range_upper){
  var result_low1=0;
  var result_high1=0;
  $.getJSON("./static/info.json", function(data){
       var range = range_upper+"0-"+range_upper+"9";
       console.log(range);
       switch(bound_b){
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
         result_low=(data.life_expen[range].cost_3-data.life_expen[range].cost_3_SE*1.95).toFixed(1);
         result_high=(data.life_expen[range].cost_3+data.life_expen[range].cost_3_SE*1.95).toFixed(1);
         document.getElementById("result_expenditure_3").innerHTML = result_low+"-"+result_high+" USD"; 
         result_low=(data.life_expen[range].cost_5-data.life_expen[range].cost_5_SE*1.95).toFixed(1);
         result_high=(data.life_expen[range].cost_5+data.life_expen[range].cost_5_SE*1.95).toFixed(1);
         document.getElementById("result_expenditure_5").innerHTML = result_low+"-"+result_high+" USD"; 
        break;
        case 8:
        default:
        document.getElementById("result_expenditure_3").innerHTML = "Due to the limitation of the data, there's no information could be given.";  
        document.getElementById("result_expenditure_5").innerHTML = "Due to the limitation of the data, there's no information could be given.";
        break;
      }

  });
}
function R_X(c, a, b, data, range_lower, range_upper){
        var range = range_lower + '-' + range_upper;

        //Calculate R value
        if(c == false && a == false && b == false)  R = data.R0[range];
        else if(c == true && a == false && b == false) R = data.Rc[range];
        else if(c == false && a == true && b == false) R = data.Ra[range];
        else if(c == false && a == false && b == true) R = data.Rb[range];
        else if(c == true && a == true && b == false) R = data.Rac[range];
        else if(c == false && a == true && b == true) R = data.Rab[range];
        else if(c == true && a == false && b == true) R = data.Rbc[range];
        else if(c == true && a == true && b == true) R = data.Rabc[range];
        else console.log("ERROR: Cannot find data in table. (Wrong value) checked_list=" + checked_list);

        //Calculate X value,  0 <= X <= 10
        var X = 10;
        if(range_a - range_lower > 0) X = X - (range_a - range_lower);
        if(range_upper - range_b > 0) X = X - (range_upper - range_b);
        if(X < 0) console.log("Error: variable X should not lower than 0");
        return R*X;
}
