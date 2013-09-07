var venmoHandler;

venmoHandler = {
  authURL: 'https://api.venmo.com/oauth/authorize?client_id=1340&scope=access_feed,access_profile,access_friends,make_payments&response_type=token',
  token: null,
  venmoConnect: function() {
    /*
        make it go to the authURL, receive the redirect, ignore it, but extract the token part
        assign it to the token
    */
    console.log(this.authURL);

    // this.token = 'yolo';
    return console.log('Connected. Yeah boi!');
  },
  makePayment: function(contact, noteIn, amountIn) {
    var method, paymentUrl;
    paymentUrl = 'https://api.venmo.com/payments';
    if (this.token === null) {
      venmoConnect();
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
    $.post(paymentUrl, {
      access_token: this.token,
      method: contact,
      note: noteIn,
      amount: amountIn
    }, function(data) {
      console.log("In post: Successfully made payment");
      return console.log(data);
    });
    return console.log('End function: made payment');
  }
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

};


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