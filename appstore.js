const request = require('request');
const cheerio = require('cheerio');
const 	async = require('async');

var baseCateURL = 'https://itunes.apple.com/us/genre/ios/id36?mt=8';

var temp = 'https://itunes.apple.com/us/genre/ios-books/id6018?mt=8&letter=A';

/////////////////Utility functions///////////////////

//Make the array unique (no duplication)
function unique(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}

function printArray(arr){
	for (var i = 0; i < arr.length; i++) {
		console.log(arr[i]);
	};
}

/////////////////Crawling functions///////////////////

// get all genre in the main appstore page
function getAllCateOfAppStore (baseCateURL) {
	console.log ('The genre for ios store: ');
	request(baseCateURL, function (err,res,html) {
		var $ = cheerio.load(html);
		var genreList = [];

		$('#genre-nav a').each(function(value,index){
			var a = $(this);
			// console.log(a.text());
			//console.log(a.attr('href'));
			genreList.push(a.attr('href'));
		});
		printArray(genreList);
		genreList.forEach(getAllPagesOfACate);
	});
}

//get all alphabet menu in a category
function getAllPagesOfACate (cateURL,callback) {
	request (cateURL, function(err,res,html) {
		var $ = cheerio.load(html);
		var letterList = [];
		$('#selectedgenre .list.alpha a').each(function(value,index){
			var a = $(this);
			// console.log(a.text());
			//console.log(a.attr('href'));
			letterList.push(a.attr('href'));
		});
		printArray(letterList);
	} );
}

request (temp, function (err,res,html) {
	var $ = cheerio.load(html);
	var list = [];
	$('#selectedgenre .paginate')[0];
	var a = $(this);
	console.log(a.attr('href'));
	a.find('li a').attr('href');
	console.log(a);
});



//get all 

//Main calling
//getAllCateOfAppStore(baseCateURL);


