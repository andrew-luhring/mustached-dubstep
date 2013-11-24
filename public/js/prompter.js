(function(){
	"use strict";
var code = {}
	,   $viewport = $("html,body");

code.foo = function(){
	alert("foo");
	return "foo";
	};
function checkPercentage(value){
	if(value > 100){
		value = value / 10;
		checkPercentage(value);
		console.log("fail " + value);
	} else {
		console.log("pass " + value);
		return value;
	}
}

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
var obj = {}
    , workTypes = []
    , ref = []
    , pos
    , counter = 0
    , initialWinDim = getWindowDimensions();
    //window / post
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
    //window / post
function scrollToThing(thing, callback) {
        if ( typeof $(thing).attr("id") !== "undefined" ){
            var selector = $(thing)
                , sT = selector.offset().top
                , $viewport = $("html, body");
            $viewport.animate({
                scrollTop: sT
            }, 2000, function(){
                console.log($(thing).length);
                resizeTheThings(thing, false);
            });
        } else {
            console.log("can't scroll because undefined.");
            return false;
        }
    if ( callback && typeof callback === "function"){
        callback();
    }
}
    //window
function resizeTheThings(thing, isOwnParent, callback) {
        var selector = thing
            , currentWindowHeight = getWindowDimensions()
            , $objToResize;
            if(typeof isOwnParent === "undefined" || isOwnParent === true ){
                console.log("is own parent");
                $objToResize = $(selector);
            } else {
                console.log("is NOT own parent");
                var $post = $(selector).parent(".post");
                $objToResize = $post.children(".post-full").children("a");
            }
        if (callback && typeof(callback) === "function") {
            callback();
        }
    }
    //obj / post
function moveNav(removeDefault) {
        if (removeDefault) {
            $("#main_nav.default_nav").switchClass("default_nav", "responsive_nav");
        } else {
            $("#main_nav.responsive_nav").switchClass("responsive_nav", "default_nav");
        }
    }
    //nav
function checkNav(current) {
    current.top = $(window).scrollTop();
    current.height = $(window).height();
    if (current.top > current.height && $("#main_nav").hasClass("default_nav")) {
        //if further from top than height and default still exists
        moveNav(true);
    } else if (current.top < current.height && $("#main_nav").hasClass("default_nav") === false) {
        //if less than top and not default still exists.
        moveNav(false);
    } else {
    }
}
    //window
jQuery(document).ready(function () {
    var didScroll
        , animateScroll
        , direction = "none"
        , didResize
        , win = getWindowDimensions()
        , current = win;
	checkNav(current);
	//
	$("#fullscreen").on("click", function(){
		var example = document.querySelector("#example_container")
			,   fs_width = $("#viewport_width").val()
			,   fs_height = $("#viewport_height").val();

		fs_width = checkPercentage(fs_width);
		fs_height = checkPercentage(fs_height);

		$("#example_container").width(fs_width + "%");
		$("#example_container").height(fs_height + "%");
		if (example.requestFullscreen) {
			example.requestFullscreen();
		} else if (example.mozRequestFullScreen) {
			example.mozRequestFullScreen();
		} else if (example.webkitRequestFullscreen) {
			example.webkitRequestFullscreen();
		}
	});

fullWindowResize("#test, body > header, #textarea, body > main", win, 100);
	//
	$("#fullscreen").on("click", function(){
		var example = document.querySelector("#example_container")
			,   fs_width = $("#viewport_width").val()
			,   fs_height = $("#viewport_height").val();

		fs_width = checkPercentage(fs_width);
		fs_height = checkPercentage(fs_height);

		$("#example_container").width(fs_width + "%");
		$("#example_container").height(fs_height + "%");
		if (example.requestFullscreen) {
			example.requestFullscreen();
		} else if (example.mozRequestFullScreen) {
			example.mozRequestFullScreen();
		} else if (example.webkitRequestFullscreen) {
			example.webkitRequestFullscreen();
		}
	});

	$("body,html").on("scroll mousedown DOMMouseScroll mousewheel keyup", function (e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel") {
            $viewport.stop(true, false);
        }
    });
    //
    $('a').not(".allow").click(function (e) {
        e.preventDefault();
    });
    //
    $(".command").click(function () {
        var post = $(this).attr('href');
        scrollToThing(post, function(){
        });
    });
	//
    $(document).mousewheel(function (event, delta, deltaX, deltaY) {
        if (deltaY >= 15 || deltaY <= -15) {
            didScroll = true;
        }
        if (deltaY >= 55 || deltaY <= -55){
            didScroll = true;
            animateScroll = true;
            if( deltaY > 0 ){
                direction = "up";
            } else if ( deltaY < 0 ){
                direction = "down";
            }
        }
    });
    setInterval(function () {
        if(didScroll === true && animateScroll === true ){
            didScroll = false;
            animateScroll = false;
            counter = 0;
            checkNav(current);
        } else if (didScroll) {
            didScroll = false;
            checkNav(current);
        }
    }, 1000);
});



$("#page_head input, #page_head select").on("change", function(){
		var example_height = $("#site-head-content").height();
	console.log(example_height);
	if($("#example_container").hasClass("hide")){

		$("#example_container").removeClass("hide", "slow").css({
				"height" : example_height
			,   "max-height": example_height
		});

	}
});

$("input, label, a, textarea, button, h1, h2 ").attr("draggable", "true");

(function(){
	function DraggedObject(objectBeingDragged, eventHook){
		var obj = $(objectBeingDragged);
		this.jqObj = obj;
		this.width = obj.width();
	    this.height = obj.height();
	    this.posX = eventHook.originalEvent.pageX;
	    this.posY = eventHook.originalEvent.pageY;
		this.beenMoved = obj.hasClass("moved");
		this.updateState = function(){
			obj.addClass("moved");
		};
		this.updatePosition = function(x, y){
			obj.css({
				top: y
				,   left: x
			});
		};
	}

	$("[draggable='true']").on("dragstart", function(e){
		var starter= new DraggedObject(this, e);
		starter.updateState();

		}).on("drop", function(e){
			e.preventDefault();
		}).on("dragend", function(e){

		var ender = new DraggedObject(this, e);
			ender.updatePosition(ender.posX, ender.posY);
		});
})();
})();