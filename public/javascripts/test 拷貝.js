$(document).ready(function(){
	//console.log("hello");
	$.getJSON("/static/testJson.json", function(data){
			var context = data.glossary.title;
			var
			console.log("context "+ context);
	});
});