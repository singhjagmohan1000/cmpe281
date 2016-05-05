/**
 * JSON FOR COFFEE-TEA-DRINKWARES DATA
 */

var app = angular.module('myApp', []);
app.controller("Controller", ['$scope','$http' ,function($scope,$http) {
$scope.cart=[];
    var flag=[];

    $http({
        method: 'GET',
        url: '/alltea',

    }).
    then(function(response) {

        console.log(response.data);
        $scope.teacataloge=response.data;

    },function(response){
        alert("Failure");
    });
    $http({
        method: 'GET',
        url: '/allDrinkware',

    }).
    then(function(response) {

        console.log(response.data);
        $scope.drinkcataloge=response.data;

    },function(response){
        alert("Failure");
    });
    $http({
        method: 'GET',
        url: '/allCoffee',

    }).
    then(function(response) {

        console.log(response.data);
        $scope.coffecataloge=response.data;

    },function(response){
        alert("Failure");
    });
    $scope.addCart=function(item_id,category,quantity){
        alert(quantity);
        alert(category);
        item={"item_id":item_id,"category":category,"quantity":quantity};
        $http({
            method: 'POST',url: '/addCart',
            data: item
        }).
        then(function(response) {
            angular.forEach(response.data.items,function(items){
                var count=nCount(items);

                if(! flag[items.item_id])
                {flag[items.item_id] = true;
                    $scope.cart.push({"item_id":items.item_id,"count":count,"price":items.price*count});}


            })
            function  nCount(items)
            {var count = response.data.items.filter(function(d) { return d.item_id === items.item_id; }).length;
                return count;}
            console.log($scope.cart);
            $scope.bagItems=response.data.items.length;

        },function(response){
            alert("Failure");
        });
    }
   $scope.chkOut=function(cart){

    //    item={"item_id":item_id};
        $http({
            method: 'POST',url: '/checkOut',
            data: cart
        }).
        then(function(response) {

            console.log(response.data);
            alert("Product added");

        },function(response){
            alert("Failure");
        });
    }


        $http({
            method: 'GET',url: '/getCart'

        }).
        then(function(response) {
            //angular.forEach(response.data.items,function(items){
            //
            //});

            angular.forEach(response.data.items,function(items){
                var count=nCount(items);

                    if(! flag[items.item_id])
                    {flag[items.item_id] = true;
                    $scope.cart.push({"item_id":items.item_id,"count":count,"price":items.price*count});}


            })
           function  nCount(items)
            {var count = response.data.items.filter(function(d) { return d.item_id === items.item_id; }).length;
                return count;}
            console.log($scope.cart);
           $scope.bagItems=response.data.items.length;


        },function(response){
            alert("Failure");
            alert(response.data)
        });


}]);
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function(){

	$("#preloader").fadeOut("slow");

});

/* ========================================================================= */
/*  Welcome Section Slider
/* ========================================================================= */

$(function() {

    var Page = (function() {

        var $navArrows = $( '#nav-arrows' ),
            $nav = $( '#nav-dots > span' ),
            slitslider = $( '#slider' ).slitslider( {
                onBeforeChange : function( slide, pos ) {

                    $nav.removeClass( 'nav-dot-current' );
                    $nav.eq( pos ).addClass( 'nav-dot-current' );

                }
            } ),

            init = function() {

                initEvents();
                
            },
            initEvents = function() {

                // add navigation events
                $navArrows.children( ':last' ).on( 'click', function() {

                    slitslider.next();
                    return false;

                } );

                $navArrows.children( ':first' ).on( 'click', function() {
                    
                    slitslider.previous();
                    return false;

                } );

                $nav.each( function( i ) {
                
                    $( this ).on( 'click', function( event ) {
                        
                        var $dot = $( this );
                        
                        if( !slitslider.isActive() ) {

                            $nav.removeClass( 'nav-dot-current' );
                            $dot.addClass( 'nav-dot-current' );
                        
                        }
                        
                        slitslider.jump( i + 1 );
                        return false;
                    
                    } );
                    
                } );

            };

            return { init : init };

    })();

    Page.init();

});



$(document).ready(function(){

	/* ========================================================================= */
	/*	Menu item highlighting
	/* ========================================================================= */

	jQuery('#nav').singlePageNav({
		offset: jQuery('#nav').outerHeight(),
		filter: ':not(.external)',
		speed: 2000,
		currentClass: 'current',
		easing: 'easeInOutExpo',
		updateHash: true,
		beforeStart: function() {
			console.log('begin scrolling');
		},
		onComplete: function() {
			console.log('done scrolling');
		}
	});
	
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $(".navbar-brand a").css("color","#fff");
            $("#navigation").removeClass("animated-header");
        } else {
            $(".navbar-brand a").css("color","inherit");
            $("#navigation").addClass("animated-header");
        }
    });
	
	/* ========================================================================= */
	/*	Fix Slider Height
	/* ========================================================================= */	

    // Slider Height
    var slideHeight = $(window).height();
    
    $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);

    $(window).resize(function(){'use strict',
        $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);
    });
	
	
	
	$("#works, #testimonial").owlCarousel({	 
		navigation : true,
		pagination : false,
		slideSpeed : 700,
		paginationSpeed : 400,
		singleItem:true,
		navigationText: ["<i class='fa fa-angle-left fa-lg'></i>","<i class='fa fa-angle-right fa-lg'></i>"]
	});
	
	
	/* ========================================================================= */
	/*	Featured Project Lightbox
	/* ========================================================================= */

	$(".fancybox").fancybox({
		padding: 0,

		openEffect : 'elastic',
		openSpeed  : 650,

		closeEffect : 'elastic',
		closeSpeed  : 550,

		closeClick : true,
			
		beforeShow: function () {
			this.title = $(this.element).attr('title');
			this.title = '<h3>' + this.title + '</h3>' + '<p>' + $(this.element).parents('.portfolio-item').find('img').attr('alt') + '</p>';
		},
		
		helpers : {
			title : { 
				type: 'inside' 
			},
			overlay : {
				css : {
					'background' : 'rgba(0,0,0,0.8)'
				}
			}
		}
	});
	
});



// ========== END GOOGLE MAP ========== //

var wow = new WOW ({
	offset:       75,          // distance to the element when triggering the animation (default is 0)
	mobile:       false,       // trigger animations on mobile devices (default is true)
});
wow.init();

