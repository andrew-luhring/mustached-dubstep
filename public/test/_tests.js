/*global should, exports, describe, mocha, it, jquery, expect, example, beforeEach, mocha */
(function(){
	"use strict";


function getWindowDimensions(){
	var win = {
		widthRem: (window.innerWidth / 10) + "rem",
		heightRem: (window.innerHeight / 10) + "rem",
		width: window.innerWidth,
		height: window.innerHeight,
		top: window.pageYOffset

	};
	return win;
}
function fullWindowResize(objToResize, currentWindowObj, animateTime) {
	var current;
	if (currentWindowObj instanceof jQuery) {
		current = currentWindowObj.get();
	} else{
		current = currentWindowObj;
	}
	var sec = $(objToResize),
		sections = $.makeArray(sec),
		currentHeight = current.height,
		currentTop = current.top;
	for (var i = 0; i < sections.length; i++) {
		var offsetTop = current.heightRem * i;
		$(sections).eq(i).addClass("animating").animate({
			"min-height": current.heightRem,
			"width": "100%",
			"top": offsetTop
		}, animateTime).removeClass("animating");
	}
}

	function Obj(selector){
		this.prototype = Object.create(jQuery.prototype);
		jQuery.call(this, selector);
		function jqTest (thingToTest){
			if(thingToTest.selector instanceof jQuery){
				return true;
			} else {
				return  false;
			}
		}
		function listProp (objectToListPropertiesOf){
			var arr = [];
			for (var i in objectToListPropertiesOf){
				if (objectToListPropertiesOf.hasOwnProperty(objectToListPropertiesOf[i])) {
				} else {
					var keys = i ;
					var props = objectToListPropertiesOf[i];
					arr.push(keys, props);
				}
			}
			return arr;
		}
		this.testString = "string";
		this.wasjQuery = jqTest(this);
		this.numberOfProperties = listProp(this).length + 1;
		this.listProperties = listProp(this);
	}
	function IframeObj(selector){
		Obj.call(this, selector);
		var thing = $(selector);
		this.width =  thing.width();
		this.height =  thing.height();
		this.resize  =  function(){
			fullWindowResize(this, win, 100);
		};
	}
	$("body").append("<iframe src ='http://localhost:5000' id='test'></iframe>");
	var win = getWindowDimensions();
	$(document).ready(function(){
	var didScroll
		,   animateScroll
		,   direction = "none"
		,   didResize
		,   current = win
		,   objSelector = "#test"
		,   $iframe = $(objSelector);
			win = getWindowDimensions();
			fullWindowResize($iframe, win, 1000);
});


	(function(){
		function quietMode(on, debuggerStatement){
			//turns off debugger statements for completed tasks.
			if( on !== true ){
				debuggerer(debuggerStatement);
			}
		}
		function debuggerer(smartAssRemark){
			if(smartAssRemark){
				console.log("\n >>>>>>>>>>>>>>>>>" +  smartAssRemark + "<<<<<<<<<<<<<<<<<  \n");
			} else {
				console.log("\n >>>>>>>>>>>>>>>>>DUDE YOU MESSED UP YOUR DEBUGGERER STATEMENT. TURN YOUR LIFE AROUND.<<<<<<<<<<<<<<<<<  \n");
			}
		}
		var quietModeIsOn = true
			,   $iframe = new IframeObj("#test");

		describe('make an object', function(){
			var obj = new Obj($("body"));
				it("will return an object", function(){
					var pass = obj + " is a valid object.";
					var failError = obj + " is NOT a valid object";
					expect(obj).to.be.a("object");
					if(typeof obj === "object"){
						quietMode(quietModeIsOn, pass );
					} else{
						quietMode(quietModeIsOn, failError );
					}
				});
		});
		describe("lists length properties array", function(){
			var obj = new Obj($("body"));
			it("will enumerate properties of an object", function(){
				var num = obj.numberOfProperties;
				expect(num).to.be.greaterThan(1);
				quietMode(quietModeIsOn, "the jQuery 'body' object has " + num + " properties");
			});
		});
		describe("verify properties exist", function(){
			var obj = new Obj($("body"));
			it("will list properties of the object", function(){
				var things = obj.listProperties;

				expect(things).to.not.be.empty();
				quietMode(quietModeIsOn, "the jQuery 'body' object has the properties " + things);

			});
		});
		describe("iframe", function(){
			it("exists", function(){
				if(!$iframe){
					expect().fail( "no iframe");
					quietMode(false, "no iframe");
				} else {
					expect($iframe);
					quietMode(quietModeIsOn, "iframe exists.");
				}
			});
		});
		describe("iframe's", function(){
		it("width should be  greater than or equal to window size's width", function(){
				var wid = new IframeObj($("#test"));
				var counter = 0;
				if( typeof wid.width !== "undefined"){
					var pass = "wid.width aka IframeObj's width is " + wid.width;
					expect(wid.width).to.be.lessThan(win.width);
					quietMode(quietModeIsOn, pass + " which is less than window width: " + win.width);
					expect(wid.width).to.be.greaterThan(299);
					quietMode(quietModeIsOn, wid.width + " wid.width is also greater than 299" );
				} else {
					var failError = "wid.width aka IframeObj is undefined";
					expect().fail( failError );
					quietMode(false, failError);
				}
		});
	});
})();
})();