angel.co-jobs
=============

**Scraping exercise using NodeJS**

External Modules already added    
1. **Cheerio** 
2. **Request**

Requirments -  [Installing NodeJS](http://nodejs.org/download/) 



#####**Usage:**

    
1. Configure config.js script manually as described in example section.    
2. Save script.  
3. Change the excel sheet name in the angel.js script.
4. Move to the repository cloned eg cd /c/...... 
5. Run node angel.js.

All the results/urls will be shown up in the command propmt and will be automatically saved to .csv file.    


**eg**: I have generated the result for the configration below in output.csv file.

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
#####**Shortcoming:**    
does not work for multiple filters for same key eg     
location:'United States,New York' OR    
jobtypes:'full-time,contract' OR    
role:'software Engineer,Mobile Developer' OR    
keyword:'Enterprise Software,E-Commerce' //**will not generate any results**//.



 



