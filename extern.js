var config = require('./config'); //config object

var urlDetails = new Object(); 

urlDetails.tab = 'find' //default if no filters added

var configration = config.config; 

//create urlDetails object with all the parameters
if(configration.location.length>0){
	urlDetails['filter_data[locations][]'] = configration.location;
}

if(configration.jobtypes.length>0){
	urlDetails['filter_data[types][]'] = configration.jobtypes;
}

if(configration.remote!=null){
	urlDetails['filter_data[remote]'] = configration.remote;
}else{
	urlDetails['filter_data[remote]'] = false;
}

if(configration.role.length>0){
	urlDetails['filter_data[roles][]'] = configration.role;
}

if(configration.minsalary!='' && configration.maxsalary!=''){
	urlDetails['filter_data[salary][min]'] = configration.minsalary;
	urlDetails['filter_data[salary][max]'] = configration.maxsalary;
}else{
	urlDetails['filter_data[salary][min]'] = 0;
	urlDetails['filter_data[salary][max]'] = 200;	
}

if(configration.companySize!=''){
	urlDetails['filter_data[company_size]'] = configration.companySize;
}

if(configration.companyFunding!=''){
	urlDetails['filter_data[company_stage][]'] = configration.companyFunding;
}

if(configration.lastActive!=''){
	urlDetails['filter_data[last_active]'] = configration.lastActive;
}

if(configration.keyword!=''){
	urlDetails['filter_data[markets][]'] = configration.keyword;
}


 	exports.objectID = urlDetails; //export objectID

	console.log(urlDetails);
