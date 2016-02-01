$(document).on("ready",function(){

	var $el = $("input");
	var $topBlurEl = $("#topBlur");
	var $topTrans = $("#topTrans");
	var $bottomTrans = $("#bottomTrans");
	var $bottomBlurEl = $("#bottomBlur");
	var elValues = {
		topBlur: 15,
		topTrans: 55,
		bottomTrans: 65,
		bottomBlur: 85,
		blur:2
	};


	function render(elValues) { 
		$('.tiltshift img').css({'-webkit-mask-box-image':"-webkit-linear-gradient(black " + elValues.topBlur + "%, transparent "+ elValues.topTrans + "%, transparent " + elValues.bottomTrans + "%, black " + elValues.bottomBlur + "%)", "-webkit-filter":"blur(" +elValues.blur + "px)"}); 
	}; 

	render(elValues);
	$el.on("input", function(){
		var thisEl = this.id;
		var thisVal = this.value;		
		for(var key in elValues) {
			if (key == thisEl) {
				elValues[key] = parseInt(thisVal);
			};
			render(elValues);
		}
	});


	document.getElementById('fileinput').addEventListener('change', function(){
    var file = this.files[0];
    $(".tiltshift img").attr("src", file.name);
    $(".tiltshift").css({"background": "url(" + file.name + ") no-repeat", "background-size": "1000px 667px"});
	}, false);

	
})
