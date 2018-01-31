const url = require('url');

module.exports = function(app){
    let filter = {
        city : 11,
        sort : null,
        bhks : [],
        formBudget : null,
        toBudget : null,
        sort : null,
        listing : 1,
        page : 1
    }

    app.get('/filter', function(req, res){
        let queryData = url.parse(req.url, true).query;        
        if(queryData.remove){
            if(queryData.remove == 'bhks') filter.bhks = [];
            else if(queryData.remove == 'toPrice') filter.toBudget = null;
            else if(queryData.remove == 'fromPrice') filter.fromBudget = null;
            else if(queryData.remove == 'all'){
                filter.toBudget = null;
                filter.sort = null;
                filter.bhks = [];
            }
        }
        if(queryData.city){
            filter.city = queryData.city;
        }

        let redirectURL = '/results?page=' + filter.page + '&city=' + filter.city;

        if(queryData.listing == 1){
            filter.listing = 1;    
        }else if(queryData.listing == 2){
            filter.listing = 2;
        }else if(queryData.sorted == 'ASC'){
            filter.sort = 'ASC';
        }else if(queryData.sorted == 'DESC'){
            filter.sort = 'DESC';
        }else if(queryData.sorted == 'REL'){
            filter.sort = null;
        }else if(queryData.sorted == 'POP'){
            filter.sort = 'POP';
        }else if(queryData.sorted == 'RAT'){
            filter.sort = 'RAT';
        }else if(queryData.bhk){
            filter.bhks.push(queryData.bhk);
        }else if(queryData.toBudget){
            filter.toBudget = queryData.toBudget;
        }else if(queryData.fromBudget){
            filter.fromBudget = queryData.fromBudget;
        }

        if(filter.listing == 2){
            redirectURL += '&rental=true';
        }
        if(filter.sort){
            redirectURL = redirectURL + '&sorted=' + filter.sort;
        }
        if(filter.bhks.length > 0){
            let set = new Set(filter.bhks);
            redirectURL = redirectURL + "&bhk=" + Array.from(set);
        }
        if(filter.toBudget){
            redirectURL = redirectURL + "&toPrice=" + filter.toBudget;
        }
        if(filter.fromBudget){
            redirectURL = redirectURL + "&fromPrice=" + filter.fromBudget;
        }
        res.redirect(redirectURL);
    });
}