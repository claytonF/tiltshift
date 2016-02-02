(function(){
	$(document).on("ready",function(){

		var $el = $("input");
		var $imgsource = $("#imgsource");
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

	    $("#imageChange").on("click",function(){
	        var imgSrc = $imgsource.val();
	        function validateURL(imgSrc) {
			    if( /\.(jpe?g|png|gif|bmp)$/i.test(imgSrc)) {
			    	$(".tiltshift img").attr("src", imgSrc);
		    		$(".tiltshift").css({"background": "url(" + imgSrc + ") no-repeat", "background-size": "1000px 667px"});
			    };
			}
	    	validateURL(imgSrc);
	    });
	});
})();


