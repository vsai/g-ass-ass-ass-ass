var venmoHandler = function(){
    this.authURL = 'https://api.venmo.com/oauth/authorize?client_id=1340&scope=access_feed,access_profile,access_friends,make_payments&response_type=token';
    this.paymentURL = 'https://api.venmo.com/payments';

    // Token for the app
    this.token = null;
 
    // The controller for the InAppBrowser.
    this.ref = null;

    // The callbacks need to persist as well.
    this.cbs = {};

    // Used to do the InAppBrowser redirect functions
    this.venmoConnect = function() {
        this.ref = window.open(this.authURL, '_blank', 'location=yes');
         
        // Callback 
        this.cbs.loadstartCallback = function(event) {
            if (event.url.indexOf('www.google.com') !== -1) {
                this.token = event.url.split('access\_token=')[1];
                this.ref.close();
                this.cbs.removeAllEventListeners();
                this.ref = null;
                alert('save url, close the window: ' + event.url);
                alert(this.token);
            }
        }.bind(this);

        // Callback 
        this.cbs.loadstopCallback = function(event) {
            //alert('stop: ' + event.url);
        };

        // Callback 
        this.cbs.loaderrorCallback = function(event) {
            //alert('error: ' + event.message);
        };

        // Callback 
        this.cbs.exitCallback = function(event) {
            //alert(event.type);
        };

        this.cbs.removeAllEventListeners = function() {
           this.ref.removeEventListener('loadstart', this.cbs.loadstartCallback); 
           this.ref.removeEventListener('loadstop', this.cbs.loadstopCallback); 
           this.ref.removeEventListener('loaderror', this.cbs.loaderrorCallback); 
           this.ref.removeEventListener('exit', this.cbs.exitCallback);            
        }.bind(this);

        var addAllEventListeners = function() {
           this.ref.addEventListener('loadstart', this.cbs.loadstartCallback); 
           this.ref.addEventListener('loadstop', this.cbs.loadstopCallback); 
           this.ref.addEventListener('loaderror', this.cbs.loaderrorCallback); 
           this.ref.addEventListener('exit', this.cbs.exitCallback); 
        }.bind(this);

        // Only add the event listeners after everything is done.
        addAllEventListeners();
    }.bind(this);

    // contact: The type of contact to use.
    // noteIn: 
    // amount: 
    this.makePayment = function(contact, noteIn, amountIn) {
        var method;
        if (this.token === null) {
            this.venmoConnect();
        }
        if (typeof contact === 'string') {
            method = (function() {
                switch (false) {
                    case !(contact.indexOf('@') !== -1):
                        return 'email';
                    case !(contact.length === 10):
                        return 'phone';
                    default:
                        return 'user_id';
                }
            })();
        }
        $.post(this.paymentUrl, 
               { access_token: this.token,
                 method: contact,
                 note: noteIn,
                 amount: amountIn
               },
               function(data) {
                    console.log("In post: Successfully made payment");
                    return console.log(data);
               });
        console.log('End function: made payment');
    }.bind(this);
};
  /*    
  getMe: () ->
    if (@token is null)
      venmoConnect()
    
    meURL = 'https: //api.venmo.com/me?access_token=' + auth_token
  */

  /*make request. take the result and return the user
  */

  /*  
  getFriends: () ->
     if (@token is null)
     venmoConnect()
    console.log @token
  */



// var venmoHandler = {
// 	venmoOAuthURL: 'yolo',

// 	token: '',

// 	makePayment: function(auth_token) {
// 		console.log('making payment');
// 		token = 'swag';
// 	},

// 	getFriends: function(auth_token) {
// 		console.log('getting friends');
// 		console.log(token);

// 	}
// };



// var mkPayment = function(access_token, phone, email, user_id, note, amount) {
// 	var result;
// 	$.ajax({
// 		type: 'POST',
// 		url: 'https://api.venmo.com/payments',
// 		datatype: 'jsonp',
// 		async: 'false',
// 		success: function(data) {
// 			result = data;
// 		}
// 	})
// 	return result;
// }


// venmoHandler.mkPayment()
