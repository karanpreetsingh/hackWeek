const url = require('url');
const request = require('request');
const bodyParser = require('body-parser');

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     
        extended: true
      })); 

    app.get('/', function(req, res){
        res.redirect('/results?page=1&city=11');
    });


    app.post('/search', function(req, res){
        const city = (req.body.search).toLowerCase();

        const cityMap = {
            'mumbai': 18,
            'gurgaon': 11,
            'kolkata': 16
        }

        let id = cityMap[city];;
        if(!cityMap[city]){
            id = 11;
        }
        let url = '/results?page=1&city='+id;
        res.redirect(url);
    });
    

    app.get('/results', function(req, res){
        //Get all query parameters from the URL
        let queryData = url.parse(req.url, true).query;

        //Base URL
        let base_url = 'http://www.makaan.com/petra/app/v4/listing?';
        
        //Required Selectors
        let selectors = 'selector={"fields":["localityId","displayDate","listing","property","project","builder","displayName","locality","suburb","city","state","currentListingPrice","companySeller","company","user","id","name","label","listingId","propertyId","projectId","propertyTitle","unitTypeId","resaleURL","description","postedDate","verificationDate","size","measure","bedrooms","bathrooms","listingLatitude","listingLongitude","studyRoom","servantRoom","pricePerUnitArea","price","localityAvgPrice","negotiable","rk","buyUrl","rentUrl","overviewUrl","minConstructionCompletionDate","maxConstructionCompletionDate","halls","facingId","noOfOpenSides","bookingAmount","securityDeposit","ownershipTypeId","furnished","constructionStatusId","tenantTypes","bedrooms","balcony","floor","totalFloors","listingCategory","possessionDate","activeStatus","type","logo","profilePictureURL","score","assist","contactNumbers","contactNumber","isOffered","mainImageURL","mainImage","absolutePath","altText","title","imageCount","geoDistance","defaultImageId","updatedAt","qualityScore","projectStatus","throughCampaign","addedByPromoter","listingDebugInfo","videos","imageUrl","rk","penthouse","studio","paidLeadCount","listingSellerTransactionStatuses","allocation","allocationHistory","masterAllocationStatus","status","sellerCompanyFeedbackCount","companyStateReraRegistrationId"]'

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
        
        //BHK Filter
        let bedrooms = '';
        if(queryData.bhk){
            bedrooms = ', {"equal":{"bedrooms":['+ queryData.bhk +']}}'
        }
        if(queryData.bhk==4){
            bedrooms = ', {"equal":{"bedrooms":[4, 5, 6, 7, 8, 9]}}'
        }
        
        //Budget Filter
        let budgetFilter = ''
        if(queryData.fromPrice || queryData.toPrice){
            let from = queryData.fromPrice || 0;
            let to = queryData.toPrice;
            budgetFilter = ',{"range":{"price":{"from":'+ from + ', "to":' + to + '}}}';
        }
        
        let filters = ',"filters":{"and":[{"equal":{"cityId":'+ queryData.city +'}},{"equal":{"listingCategory":'+ rentalSelector +'}}'+ bedrooms + budgetFilter +']},';

        //Paging
        //Get page number to figure out starting record (Each page has 20 records)
        let start = (queryData.page - 1)*20;
        let paging = '"paging":{"start":'+start+',"rows":20}';


        let remaining = '&includeNearbyResults=false&includeSponsoredResults=false&sourceDomain=Makaan';
        
        let urls = base_url + selectors + filters + paging + sorting + remaining;
            
        request(urls, function(err, resp, body) {
            body = JSON.parse(body);
            let requiredValues = body.data[0];
            res.render('pages/index', {data: requiredValues});
        });
    })
};
