/* my plan:
// if there is no record,  add new records
// else, update the existing record
// I'll think about this case latar:
// even if there is a record, if a new app is added, we need to add it,
// so we need to do both for that case
// since I cannot figure out promise for now, I'm going to proceed
// with other parts that I can do.
//*/

/*
Psuedo code
1. on index.show call the initialize function
2. declare funciton "initialize"
3. declare a "getApps" funciton
4. run getApps function to get apps data and assign the result to a new variable "allApps" 
var allApps = getApps();
5. declare "getExistingAppRecords" function
6. run "getExistingAppRecords" function and assign the result to a new variable "existingRecords" 
var existingRecords = getExistingAppRecords()
*/

(function(){
    kintone.events.on("app.record.index.show", function(event){
        'use strict';
        // return object of the space
    function getSpace(spaceId){
        var body = {"id": spaceId};
        kintone.api(kintone.api.url('/k/v1/space', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
            return resp;
        }, function(error) {
            // error
            console.log(error);
        });
    }
    
    
    async function getSpaceHelper(spaceId = 12){
        var promiseSpace = new Promise((resolve, reject) => {
            resolve(getSpace(spaceId)),
            reject('error')
        });
        var mySpace = await promiseSpace;
        console.log(mySpace);
    }
    
    
    function getApp(appId){
        var body = {
            "id": appId
        };
        kintone.api(kintone.api.url('/k/v1/app', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
            console.log(resp.name);
            console.log(resp.spaceId);
            return resp;
        }, function(error) {
            // error
            console.log(error);
        });
    }
    
    function getAppHelper(appId){
        return (new Promise(function(resolve){
            return getApp(appId);
        }).then(function(response){
            console.log('testing');
        }).catch(function(error){
            console.log(error);
        }), function(error){
            console.log(error);
        });
    }
    
    function getRecord(appId, recordId){
        kintone.api(kintone.api.url('/k/v1/record', true) + '?app=' + appId + '&id=' + recordId, 'GET', {}, function(resp) {
            // success
            console.log(resp)
        }, function(error) {
            // error
            console.log(error);
        });
    }
    
        
    // takes a full ISO 8601 string and returns in a form of yyyy-mm-dd
    function toShortISO(string){
        let result = "";
        for(let i = 0; i < 10; i++){
            result += string[i];
        }
        return result;
    }
    
    // all the values in the record are placeholders for now
    function addOrUpdateRecords(addOrUpdate, recordId = null, app){
        var recordId = null;
        if(addOrUpdate === 'update'){
            recordId = 21; // placeholder
        }
        var body = {
            'app': kintone.app.getId(),
            'id': recordId,
            'record': {
                'appName': {'value': app.name},
                'appId': {'value': app.appId},
                'dateCreated': {'value': toShortISO(app.createdAt)},
               'dateModified':{'value': toShortISO(app.modifiedAt)},
               'spaceId': {'value': 100},
               'spaceName': {'value': 'space name'},
               'threadId': {'value': app.threadId},
               'totalNumRecord': {'value': 100},
               'mostRecentlyUpdatedRecord': {'value': 'https://www.google.com/'},
               'mostRecentlyAddedRecord': {'value': 'https://www.google.com/'},
               'dateOfMostRecentUpdate': {'value': '2015-03-25'},
               'dateOfMostRecentAdd': {'value': '2015-03-25'},
               // status depends on conditions determined later
               //'status': {'value': ''},
               'averageLogIns': {'value': 100},
               'averageNumRecordCreated': {'value': 100},
               'averageNumRecordUpdated': {'value': 100},
               'totalComments': {'value': 100},
               'totalExpImp': {'value': 100}
            }
        }
        
        var action = 'PUT'; // to update (most of times after first one)
        if (addOrUpdate === 'add'){
            action = 'POST'; // to add (only for the first time)
        }
        kintone.api(kintone.api.url('/k/v1/record', true), action, body, function(resp) {
            // success
            console.log(resp);
        }, function(error) {
            // error
            console.log(error);
        });
    }
    
    
    function samplePromise(){
        kintone.events.on('app.record.index.show', function(event) {
            return kintone.api('/k/v1/records', 'GET',  {app: 20}).then(function(resp) {
                alert("First pop-up");
            }).then(function(){
                alert("Second pop-up");//This should appear after the function before is resolved.
            }).catch(function(error) {
                var errmsg = 'There was an error when retrieving the data';      
                 //If an error is included in the response message, show it
                 if (error.message !== undefined){
                    errmsg += '\n' + error.message;
                 }
                 alert(errmsg);
            });
        });
    }
    
    
    /*
    process of fetching data and putting into records:
    full path to a data: resp.attachedApps[i].property
    full path in other words: admin -> spaces -> apps -> data
    the function addOrUpdate does everything for data within apps
    so I need another function to take care of outside of apps -> space
    although I could pass a space object instead of app object into this function,
    I feel like that would make the function less flexible, and I don't like that 
    since I plan to use this function as one of repeated used one to modify
    record. In that case, I'd need a parent function
    psudo code:
    General overview of my approach:
        get all spaces
        from each space, get all apps,
        from each app, get all data,
        add the required data from the apps as records
    */
        
        // var mySpace = getSpace(12);
        let spaceId = 12;
        var body = {"id": spaceId};
        kintone.api(kintone.api.url('/k/v1/space', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
            let myApps = resp.attachedApps;
            // get data from each app and add records into this app
            console.log('myApps[0]: ', myApps[0]);
            console.log(getSpace(12));
            console.log(event);

        }, function(error) {
            // error
            console.log(error);
        });
        let promise = new Promise(resolve => {
            resolve(getApp(117));
        });
        promise.then(
            result => console.log(result),
            error => alert(error)
        );

        console.log(getSpaceHelper());
        console.log("test");
    });
})();