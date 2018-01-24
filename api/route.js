const url = require('url');
const request = require('request');

module.exports = function(app){

    app.get('/results', function(req, res){
        //Get all query parameters from the URL
        var queryData = url.parse(req.url, true).query;

        //Base URL
        var base_url = 'http://www.makaan.com/petra/app/v4/listing?';
        
        //Required Selectors
        var selectors = 'selector={"fields":["localityId","displayDate","listing","property","project","builder","displayName","locality","suburb","city","state","currentListingPrice","companySeller","company","user","id","name","label","listingId","propertyId","projectId","propertyTitle","unitTypeId","resaleURL","description","postedDate","verificationDate","size","measure","bedrooms","bathrooms","listingLatitude","listingLongitude","studyRoom","servantRoom","pricePerUnitArea","price","localityAvgPrice","negotiable","rk","buyUrl","rentUrl","overviewUrl","minConstructionCompletionDate","maxConstructionCompletionDate","halls","facingId","noOfOpenSides","bookingAmount","securityDeposit","ownershipTypeId","furnished","constructionStatusId","tenantTypes","bedrooms","balcony","floor","totalFloors","listingCategory","possessionDate","activeStatus","type","logo","profilePictureURL","score","assist","contactNumbers","contactNumber","isOffered","mainImageURL","mainImage","absolutePath","altText","title","imageCount","geoDistance","defaultImageId","updatedAt","qualityScore","projectStatus","throughCampaign","addedByPromoter","listingDebugInfo","videos","imageUrl","rk","penthouse","studio","paidLeadCount","listingSellerTransactionStatuses","allocation","allocationHistory","masterAllocationStatus","status","sellerCompanyFeedbackCount","companyStateReraRegistrationId"]'

        //Filters go here
        //Rental/BuySell Filter
        let rentalSelector = '["Primary","Resale"]'
        if(queryData.rental){
            rentalSelector = '["Rental"]';
        }
        
        //Sorting Filter
        let sortOrder = queryData.sorted;
        let sorting = '}';
        if(sortOrder){
            sorting = ', "sort":[{"field":"price","sortOrder":"' + sortOrder + '"}]}';
        }
        
        let bedrooms = '';
        if(queryData.bhk){
            bedrooms = ', {"equal":{"bedrooms":['+ queryData.bhk +']}}'
        }
        if(queryData.bhk==4){
            bedrooms = ', {"equal":{"bedrooms":[4, 5, 6, 7, 8, 9]}}'
        }
        
        var filters = ',"filters":{"and":[{"equal":{"cityId":11}},{"equal":{"listingCategory":'+ rentalSelector +'}}'+ bedrooms +']},';

        //Paging
        //Get page number to figure out starting record (Each page has 20 records)
        let start = (queryData.page - 1)*20;
        var paging = '"paging":{"start":'+start+',"rows":20}';


        var remaining = '&includeNearbyResults=false&includeSponsoredResults=false&sourceDomain=Makaan';
        
        var urls = base_url + selectors + filters + paging + sorting + remaining;
            
        request(urls, function(err, resp, body) {
            body = JSON.parse(body);
            let requiredValues = body.data[0];
            res.render('pages/index', {data: requiredValues});
        });
    })
};
