
// Import fs module
var fs = require('fs');

// count frequency module
var  count = require('count-array-values');

var path = require('path');
var filePath = path.join(__dirname, 'input.pdf');

// Stopword
var stopwordsfile = "stopwords_tr.txt";
var stopwordsArray = fs.readFileSync(stopwordsfile).toString().replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 

var extract = require('pdf-text-extract');

// initilize banner
var banner = [];
banner[1] = ["çobanın","telefonu","un","bilgisayarı","sıfat","umut"];
banner[2] = ["sinema","yazın","filmini","gazete","çıktılar","dışarı"];
banner[0] = ["koştum","yazın","değerli","adresini","gitti","çobanın"];

// pageArray
var pageArray = [];

// extract pdf 
extract(filePath, function (err, pages) {

	if (err) {
    	console.log(err);
		return;
	}
  
	// page text divide word array
	for(i in pages) {
		// divide text word array
    	var targetArray = pages[i].replace(/[.,?!;():"'-]/g, "").replace(/\s+/g, " ").toLowerCase().split(" "); 
    	for (var i = 0; i <targetArray.length ; i++) {
			if(stopwordsArray.includes(targetArray[i])){

			// remove stop word from text
		  	//	console.log(targetArray[i]+i);
            	targetArray.splice(i,1);
			}
		}

        // count frequency
		targetArray = count(targetArray);

       // add each word array to pagearray
		pageArray.push(targetArray);

	}

    // display each page's word array and its frequency
	for(i in pageArray) {
		console.log("Content of page :" +i);
		for (j of pageArray[i]) {
			console.log(j.value + " = " + j.count);
		}
	}
    
    // page and count of its banners object 
    var pagebanner = {page:0};
    var countofBanner = [];
	
	// calculate banner of each page	     
	for(i in pageArray) {
		pagebanner = {page:0};
		for (j in banner) {
			var countt = 0;
			for (k of banner[j]) {
				if(pageArray[i].some(o => o.value === k)){
					countt+= pageArray[i].find(o => o.value === k).count;
				}
			}
            
            // add banner property to pagebanner object
			var str = "banner"+j;
          	pagebanner[str] = countt;
		}
              
		pagebanner["page"] = i;		

		// add pagebanner object to array
    	countofBanner[i] = pagebanner;
	}         
   
   // display each page and count of each banners
    console.log(countofBanner);

   // find max banner of each page
    for (i in countofBanner) {
    	var bannername = "banner";
    	var indexOfbanner = "";
    	var max = 0;
    	for (j in banner) {
              
    		if(countofBanner[i][bannername+j] > max){
            	max = countofBanner[i][bannername+j];
            	indexOfbanner = bannername+j;
            	
    		}
             
    	}

       // display max banner of each page
    	console.log("Page "+countofBanner[i]["page"]+" is related: " +indexOfbanner+" at "+countofBanner[i][indexOfbanner]+" point");
    }

});


