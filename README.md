angel.co-jobs
=============

Scraping exercise using NodeJS

External Modules already added 1) Cheerio 2) Request



Usage:

1) move to the repository dowloaded eg cd /c/......
2) Configure config.js script manually as described in example section.
3) Save script.
4) run node angel.js.

All the results/urls will be shown up in the comand propmt and will be automatically saved to .csv file.
before starting the script change the excel sheet name in the angel script.

eg: I have generated the result for the configration below in output.csv file.

```
exports.config = {
location:'United States',
jobtypes:'full-time', 
remote:false,
role:'Software Engineer',
minsalary:'0',
maxsalary:'200',
companySize:'',
companyFunding:'Series A',
lastActive:'',
keyword:'Enterprise Software'
}

```
Shortcoming: does not work for multiple filters for same key eg 
location:'United States,New York' OR
jobtypes:'full-time,contract' OR
role:'software Engineer,Mobile Developer' OR
keyword:'Enterprise Software,E-Commerce' //will not generate any results//.



 



