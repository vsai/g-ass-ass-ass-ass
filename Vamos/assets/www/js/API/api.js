var apiLoader = {
    apis: ['venmoHandler.js'],
    firstString: "<script type='text/javascript' src='js/API/",
    secondString: "'> </script>",
    writeApis: function(){
        this.apis.forEach(function(api){
            document.write(this.firstString + api + this.secondString);
        }.bind(this));
    },
};
apiLoader.writeApis();