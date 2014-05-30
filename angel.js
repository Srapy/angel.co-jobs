var request = require('request'); //Http Client Module To Make requests to Server.
var cheerio = require('cheerio'); //implementation of core jQuery designed specifically for the server.
var fs = require('fs'); //File System Module.


var config = require('./extern'); //Configration Filter Route

var doc = fs.createWriteStream('output.csv'); //Create .csv file to store results.

var bool = true; 
var startup_ids = [];
var startup_urls = [];
var startup_index = 0;
var companyName = '';
var companyUrl = '';
var companyArea = '';
var companyFundRaising = '';
var companyFunctionalArea = '';

//Request Options
var options = {
    url: 'https://angel.co/job_listings/startup_ids',
    headers: {
        'X-CSRF-Token':'gmlXh7e6DGoB4M0VDN/rBBLPKG9KoBToL9/gY5KWH6E=',
        'X-Requested-With':'XMLHttpRequest',
        'User-Agent': 'request'
    },
    form:config.objectID
};

console.log(options);

//Collect Company IDs
		request.post(options,function(err,res,body){

		try{
		if(!err && res.statusCode==200){

			var $ = cheerio.load(body);
			startup_ids = $.html().split('[')[1].split(']')[0].split(',');
			console.log('No. Of StartUps Found = '+startup_ids.length);
			console.log('Waiting For Results......');

			if(startup_ids.length>0){
				company_urls();  //Collect Urls.
			}else{
				console.log('No StartUp Found');
			}
		
		}else if(res.Status==404){

			console.log('page not found');

		}
	}catch(err){console.log(err+' '+'Check Internet Connection');}

});



//Collect Company Urls
var company_urls = function(){

if(startup_ids.length>0){
	for(var i = 0;i<startup_ids.length;i++){

		request('https://angel.co/job_listings/browse_startups_table?startup_ids%5B%5D='+startup_ids[i],function(err,res,body){

			if(!err){
				
			var $ = cheerio.load(body);

			try{
			startup_urls[startup_index] = $('div.startup-row.section div.pic a').attr('href');			
			company_details(startup_urls[startup_index]);
			console.log(startup_urls[startup_index]);
			startup_index++;
			}catch(err){console.log(err);}
			
			}

		});
	}
}
}

//Collect Company Details and store in Output.csv file
var company_details = function(url){

	try{
		request(url,function(err,res,body){
			
			if(!err){

			var $ = cheerio.load(body);

			try{
				companyName = $('div.summary div.editable_region div.show div.main.standard.g-lockup.larger div.text h1.name').text().replace(/\n?\t?\r|\n|\t|\r/g,'').replace(/\s\s+/g,'').replace(/&nbsp;/g,'').replace(/,/g,'').trim();
			}catch(er){console.log(err);}

			try{
				companyUrl = $('a.company_url').attr('href');
			}catch(er){console.log(err);}

			try{
				companyArea = $('div.summary div.editable_region div.show div.main.standard.g-lockup.larger div.text div.tags a:nth-child(1)').text().replace(/\n?\t?\r|\n|\t|\r/g,'').replace(/\s\s+/g,'').replace(/&nbsp;/g,'').replace(/,/g,'').trim();
			}catch(er){console.log(err);}

			try{
				companyFundRaising = $('div.raised').eq(0).text().replace(/\n?\t?\r|\n|\t|\r/g,'').replace(/\s\s+/g,'').replace(/,/g,'').trim();
			}catch(err){console.log(err)}

			try{
				$('div.summary div.editable_region div.show div.main.standard.g-lockup.larger div.text div.tags a').each(function(){
					companyFunctionalArea = companyFunctionalArea+'/'+$(this).text().replace(/\n?\t?\r|\n|\t|\r/g,'').replace(/\s\s+/g,'').replace(/&nbsp;/g,'').replace(/,/g,'').trim();
				});

				companyFunctionalArea = companyFunctionalArea.replace(companyArea,'');

			}catch(er){}

			if(companyName===''||undefined===companyName){
				companyName = 'N.A.';
			}

			if(companyUrl===''||undefined===companyUrl){
				companyUrl = 'N.A.';
			}

			if(companyArea===''||undefined===companyArea){
				companyArea = 'N.A.';
			}

			if(companyFunctionalArea===''||undefined===companyFunctionalArea){
				companyFunctionalArea = 'N.A.';
			}

			if(companyFundRaising===''||undefined===companyFundRaising){
				companyFundRaising = 'N.A.';
			}

			if(bool==true){
				header();
				bool = false;				
			}
			
			var out = companyName+','+companyUrl+','+companyArea+','+companyFundRaising+','+companyFunctionalArea+'\n';
			console.log(out);
			doc.write(out);
			clear();
			
			}
		});
	}catch(er){}
}

//Clear Variables
var clear = function(){

			out = '';
			companyArea = '';
			companyUrl = '';
			companyName = '';
			companyFundRaising = '';
			companyFunctionalArea = '';

}


//Create Excel Header.
var header = function(){

			var out = 'CompanyName'+','+'Url'+','+'Area'+','+'Fund Raising'+','+'Functional Area'+'\n';
			doc.write(out);
};

