
// Import fs module
var fs = require('fs');

// Target file name 
var targetFile = "input.pdf";

// Stopwords file name
var stopwordsfile = "stopwords_tr.txt";


// Read file into string array
function readFile(filename){
	var array = fs.readFileSync(filename).toString().replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
	return array;
}

// Create target string array
var targetArray = readFile(targetFile);


// Create stopwords string array
var stopwordsArray = readFile(stopwordsfile);


function displayArray(array){
	for(i in array) {
    	console.log(array[i]+"\t");
    }
}


// display array
 displayArray(targetArray);

// calculate frequency and remove stopwords function
 function calculateFrequency(targetArray,stopwordsArray){
 	var frequencyMap = new Map();
 	for(i in targetArray) {
    	if(!stopwordsArray.includes(targetArray[i])){
     		if(frequencyMap.has(targetArray[i])){
    			frequencyMap.set(targetArray[i],frequencyMap.get(targetArray[i])+1);
    		}else{
        		frequencyMap.set(targetArray[i],1);
    		}
		}else{
			// write removed stopwords
    		console.log("Stopword "+targetArray[i]);
     	}
	}
	return frequencyMap;
 }


// calculate frequency and remove stopwords
var frequencyMap = calculateFrequency(targetArray,stopwordsArray);

//Display frequency function
function displayFrequency(frequencyMap){
	for (var [key, value] of frequencyMap.entries()) {
		console.log(key + " = " + value);
	}
}

// Display frequency of each word
displayFrequency(frequencyMap);

