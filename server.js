var express = require('express'),
	url = require('url'),
	monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
var app = express();


function converDateToUnix(str){
	
	var dateSrt = str.replace(',','').split(' '),
		month = dateSrt[0],
		day = dateSrt[1],
		year = dateSrt[2];
	var result = monthLong.every(function(element, index, array){
		if (element == month) {
			return false;
		}
		return true
	});
	if(result){
		return {"unix":null,"natural":null};
	}else{
		var idx = monthLong.indexOf(month);
		if(idx != -1){
			idx = idx + 1;
			var unix = parseInt((new Date(year+'.'+idx+'.'+day).getTime() / 1000).toFixed(0));
			return {"unix":unix,"natural":str};
		}
	}
};
var converUnixToDate = function(unixDate){
	var dt = new Date(unixDate * 1000),
		year = dt.getFullYear(),
		month = monthLong[dt.getMonth()],
		date = dt.getDate();
	var natural = month + ' ' + date+ ', ' +year;
	return {"unix":unixDate,"natural":natural}
	
};
app.get('/:id',function(req, res){
	var getparm = req.params.id;
	if (isNaN(getparm)) {
		res.send(converDateToUnix(getparm));
	}else{
		res.send(converUnixToDate(getparm));	
	}
	
});

app.listen('8080', function(){
	console.log('This app listen port 8080');
})