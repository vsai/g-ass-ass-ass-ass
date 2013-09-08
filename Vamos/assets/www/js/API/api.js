var apiLoader = {
    apis: ['venmoHandler.js',
           'carQueryHandler.js',
           'myGasFeedHandler.js'],
           'gmapsHandler.js'],
    firstString: "<script type='text/javascript' src='../js/API/",
    secondString: "'> </script>",
    loadApis: function(){
        this.apis.forEach(function(api){
            document.write(this.firstString + api + this.secondString);
        }.bind(this));
    },
};

apiLoader.loadApis();
