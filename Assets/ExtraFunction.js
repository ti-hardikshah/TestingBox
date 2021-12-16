jQuery(document).ready(function($){


 
    function ClosePopup(){
            event.preventDefault();
			$(".cd-popup").removeClass('is-visible');
    }

	$(window).focus(function(e) {
		// Do Focus Actions Here
			ClosePopup();
	});
	  

    //OpenPopup

    function OpenPopup(){
		alert("Open Popup call");
        event.preventDefault();
		$('.cd-popup').addClass('is-visible');
    }

	//open popup
	$('.cd-popup-trigger').on('click', function(event){
        event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			ClosePopup();
		}
	});

    //close popup
	$('.close').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.close') ) {
			ClosePopup();
		}
	});

     //close popup
	$('.open').on('click', function(event){
        openURL();
	});


	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
    
    function openURL() {
            window.open("https://fishermenlabs.com/ar-vr", "_blank");
        }
});
