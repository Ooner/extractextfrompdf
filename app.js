
// Import fs module
var fs = require('fs');

var texttt = require('pdf-to-text');

// count frequency module
var  count = require('count-array-values');

var textract = require('textract');

// Target file name 
var targetFile = "input.pdf";

textract.fromFileWithPath(targetFile, function( error, text) {
	if (error) 
		throw error;
	var targetArray = text.replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 
	
	// Stopwords file name
	var stopwordsfile = "stopwords_tr.txt";
    var stopwordsArray = fs.readFileSync(stopwordsfile).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

	for (var i = 0; i <targetArray.length ; i++) {
		  if(stopwordsArray.includes(targetArray[i])){
		  	 console.log("Stopword: " +targetArray[i]);
              targetArray.splice(i,1);
		  }
	}
	targetArray = count(targetArray);
    for (i of targetArray) {
		console.log(i.value + " = " + i.count);
	}
	
});

