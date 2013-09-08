var venmoHandler = function(){
    this.authURL = 'https://api.venmo.com/oauth/authorize?client_id=1340&scope=access_feed,access_profile,access_friends,make_payments&response_type=token';
    this.paymentURL = 'https://api.venmo.com/payments';

    // Token for the app
    this.token = null;
    this.timestamp = null;

    this.userId = null;
    this.myFriends = [];
     
    // The controller for the InAppBrowser.
    this.ref = null;

    // The callbacks need to persist as well.
    this.cbs = {};

    // Used to do the InAppBrowser redirect functions
    this.venmoConnect = function(callMeMaybe) {
        this.ref = window.open(this.authURL, '_blank', 'location=yes');
        this.cbs.callMeMaybe = callMeMaybe;        

        // Callback 
        this.cbs.loadstartCallback = function(event) {
            if (event.url.indexOf('www.google.com') !== -1) {
                this.token = event.url.split('access\_token=')[1];
                this.ref.close();
                this.cbs.removeAllEventListeners();
                this.ref = null;
                //alert('save url, close the window: ' + event.url);
                //alert(this.token);
                if (this.myFriends.length == 0) {
                    this.getMyFriends(this.cbs.callMeMaybe);
                } else {
                    if(this.cbs.callMeMaybe) {
                        this.cbs.callMeMaybe();
                    }
                }
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

    // contact: email, phone, or user_id. The type of contact to use.
    // noteIn: description of payment 
    // amount: positive -> payment, negative -> charge
    this.makePayment = function(contact, noteIn, amountIn, callback) {
        var method;
        var cbswagger = function(){
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
            var obj = {};
            obj[method] = contact;
            obj['access_token'] = this.token;
            obj['note'] = noteIn;
            obj['amount'] = amountIn;

            $.post('https://api.venmo.com/payments', obj, callback);
        }.bind(this);

        if (!this.token) {
            this.venmoConnect(cbswagger);
        } else {
            cbswagger();
        }
    }.bind(this);

    this.getMe = function(callback) {
        var cb = function(){
            var meURL = 'https://api.venmo.com/me?access_token=' + this.token;
            $.get(meURL, callback);
        }.bind(this);
 
        if (!this.token) {
            this.venmoConnect(cb);
        } else {
            cb();
        }
    }.bind(this);

    this.getMyFriends = function(callback) {
        //alert("im in getmyfriends");

        // Makes the API call to get the friends.  
        this.cbs.getMyFriendsHelper = function(data) {
            //alert('data[data]: ' + data['data'].length);
            this.myFriends = this.myFriends.concat(data['data']);
            //alert('getMyFriendsHelper: ' + this.myFriends.length);

            // Will be undefined if no next page.
            var nextURL = data['pagination']['next'];

            if (nextURL === undefined) {
//                alert("Done getting friends");
                if(callback) {
                    callback(this.myFriends);
                }
            } else {
                var url = nextURL + '&access_token='+this.token;
                //alert('calling helper again: ' + url);
                $.get(url, this.cbs.getMyFriendsHelper);
            }
        }.bind(this);

        this.cbs.getMeCallback = function(dataUser) {
            //alert(dataUser['data']['id']);
            //alert('Got user Id: ' + dataUser['data']['id']);
            this.userId = dataUser['data']['id'];
            var getFriendsURL = 'https://api.venmo.com/users/' +
                                this.userId +'/friends?';
            //alert(this.cbs.getMyFriendsHelper);
            //alert(this.token);
            $.get(getFriendsURL, {access_token: this.token}, this.cbs.getMyFriendsHelper);
        }.bind(this);

        this.cbs.connectCallBack = function() {
            //alert('Got access token');
            this.getMe(this.cbs.getMeCallback);
        }.bind(this);

        if (!this.token) {
            this.venmoConnect(this.cbs.connectCallBack);
        } else {
            this.cbs.connectCallBack();
        }
    }.bind(this);
};
