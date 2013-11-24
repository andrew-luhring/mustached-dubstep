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
	this.selector = selector;
	this.prototype = this.prototype;
	this.testString = "string";
	this.isjQuery = function(){
		var result;
		if(this.selector instanceof jQuery){
			result = true;
		} else {
			result = false;
		}
		return result;
	};
	this.listProperties = function(justTheNumberInObject){
		var arr = [];
		for (var i in this){
			if (this.hasOwnProperty(this[i])) {
				//debuggerer("todo: I should figure out why this hasownproperty thing is important ");
			} else {
				var list = [ i , this[i] ];
				console.log(list);
				arr.push(list);
			}
		}
		if(justTheNumberInObject){
			alert(arr.length);
			return arr.length;
		} else {
			alert("winrar");
			return arr;
		}
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
	var quietModeIsOn = false
		,   $iframe = new iframeObj("#test");

	describe('make an object', function(){
		var obj = new Obj($("body"));
			it("will return an object", function(){
				expect(obj).to.be.a("object");
			});
	});
	describe("verify properties exist", function(){
		var obj= new Obj($("body"));
		it("will return properties of an object",function(){
			expect(obj.testString).to.eql("string");
		});
	});
	describe("lists length properties array", function(){
		var obj = new Obj($("body"));
		it("will enumerate properties of an object", function(){
			var num = obj.listProperties(true);
			expect(num).to.be.greaterThan(1);
			quietMode(quietModeIsOn, num);
		});
	});
	describe("verify properties exist", function(){
		var obj = new Obj($("body"));
		it("will list properties of the object", function(){
			var things = obj.listProperties(false);
			var num = obj.listProperties(true);
			var isjQuery = obj.isjQuery();
			expect(things).to.not.be.empty();
			quietMode(quietModeIsOn, things);
			quietMode(quietModeIsOn, isjQuery);
		});
	});
	describe("does iframe exist", function(){
		it("there should be an iframe.", function(){
			if(!$iframe){
				debuggerer("no iframe");
			}
			expect($iframe);
		});
	});
	describe("iframe", function(){
		it("should be  greater than or equal to window size", function(){
			setTimeout(function(){
				var wid = new iframeObj("#test")
					, resizeThis = wid.selector.selector;

				console.log(wid.width + " <=wid | win=>" + win.width);
				var counter = 0;
				expect(wid.width).to.be.lessThan(win.width).and.greaterThan(300);
			}, 100);
		});
	});
})();
})();