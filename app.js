
// Import fs module
var fs = require('fs');

// extract
var extract = require('pdf-text-extract');

// count frequency module
var  count = require('count-array-values');

var path = require('path');
var filePath = path.join(__dirname, 'input.pdf');

// Stopword
var stopwordsfile = path.join(__dirname, 'stopword/stopwords_tr.txt');
var stopwordsArray = fs.readFileSync(stopwordsfile).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

// read files
var cogeleri1file = path.join(__dirname, 'cumleninogeleri/cumleninogeleri1.pdf');
var cogeleri1Array = fs.readFileSync(cogeleri1file).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

var cogeleri2file = path.join(__dirname, 'cumleninogeleri/cumleninogeleri2.pdf');
var cogeleri2Array = fs.readFileSync(cogeleri2file).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

var cogeleri3file = path.join(__dirname, 'cumleninogeleri/cumleninogeleri3.pdf');
var cogeleri3Array = fs.readFileSync(cogeleri3file).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

var sozcukturleri1file = path.join(__dirname, 'sozcukturleri/sozcukturleri1.pdf');
var sozcukturleri1Array = fs.readFileSync(sozcukturleri1file).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

var sozcukturleri2file = path.join(__dirname, 'sozcukturleri/sozcukturleri2.pdf');
var sozcukturleri2Array = fs.readFileSync(cogeleri3file).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

// remove stopword
function removeStopword(targetArray,stopwordsArray){
	for (var i = 0; i <targetArray.length ; i++) {
		if(stopwordsArray.some(o => o == targetArray[i])){
			// remove stop word from text
		  	//console.log(targetArray[i]+" removed");
            targetArray.splice(i,1);
		}else{
			//console.log(targetArray[i]+" unremoved----------------------------------------------------------------------");
		}
	}
}

//console.log("cogeleri1Array");
removeStopword(cogeleri1Array,stopwordsArray);
// count frequency
cogeleri1Array = count(cogeleri1Array);
//console.log("cogeleri2file");
removeStopword(cogeleri2Array,stopwordsArray);
// count frequency
cogeleri2Array = count(cogeleri2Array);
//console.log("cogeleri3file");
removeStopword(cogeleri3Array,stopwordsArray);
// count frequency
cogeleri3Array = count(cogeleri3Array);


//console.log("sozcukturleri1Array");
removeStopword(sozcukturleri1Array,stopwordsArray);
// count frequency
sozcukturleri1Array = count(sozcukturleri1Array);
//console.log("sozcukturleri2Array");
removeStopword(sozcukturleri2Array,stopwordsArray);
// count frequency
sozcukturleri2Array = count(sozcukturleri2Array);

/*console.log("cogeleri1Array");
console.log(cogeleri1Array);
console.log("cogeleri2file");
console.log(cogeleri2Array);
console.log("cogeleri3file");
console.log(cogeleri3Array);
*/
var  mergedArray1 = mergeFileArray(cogeleri1Array,cogeleri2Array);
mergedArray1 = mergeFileArray(mergedArray1,cogeleri3Array);
var  mergedArray2 = mergeFileArray(sozcukturleri1Array,sozcukturleri2Array);

function mergeFileArray(FileArray1,FileArray2){
    var  mergedArray = [];
    //console.log("all elemnt of file1------------------------------------------------------");
	for (i of FileArray1) {
		mergedArray.push(i);
		//console.log(i);
	}   
	for (j of FileArray2) {
		if(!FileArray1.some(o => o.value === j.value)){
			//console.log("different elemnt of file2--------------------------------------------------");
			mergedArray.push(j);
			//console.log(j);
		}else{
			//console.log("same elemnt of file2---------------------------------------------------------");
		//	console.log(j);
		//	console.log(FileArray1.find(o => o.value === j.value));
		}
	}    

   return mergedArray;
}

/*
console.log("mergedArray1");
console.log(mergedArray1);


console.log("mergedArray2");
console.log(mergedArray2); */

var topic = {
	ders : "",
	konu : ""
}

var mergedArray = [];

topic["ders"] = "Türkçe";
topic["konu"] = "Cümlenin Öğeleri";
topic["features"] = mergedArray1;
mergedArray.push(topic);

topic = {};
topic["ders"] = "Türkçe";
topic["konu"] = "Sözcük Türleri";
topic["features"] = mergedArray2;
mergedArray.push(topic);

for (i in mergedArray) {
	console.log("Ders : "+mergedArray[i]["ders"]);
	console.log("Konu : "+mergedArray[i]["konu"]);
	console.log("features : ");
	for(j of mergedArray[i]["features"]){
        console.log(j);
	}
}

//console.log(mergedArray);

// sınıflandırma kısmı burda yapılacak
extract(filePath, function (err, pages) {

	if (err) {
    	console.log(err);
		return;
	}

});