/*
kintone.api(kintone.api.url('/k/v1/record', true) + '?app=20&id=100', 'GET', {}, function(resp) {
    // success
    console.log(resp)
}, function(error) {
    // error
    console.log(error);
});
*/
//const kintone = require('@kintone/kintone-js-sdk')

// return object of the space
function getSpace(spaceId){
    var body = {"id": spaceId};
    
    return kintone.api(kintone.api.url('/k/v1/space', true), 'GET', body, function(resp) {
        // success
        console.log(resp);
        var obj = Object.assign({}, resp);
        console.log(obj);
        var obj2 = resp;
        console.log(obj2);
        return obj2;
    }, function(error) {
        // error
        console.log(error);
    });
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
    }, function(error) {
        // error
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

function getApiList(){
    kintone.api(kintone.api.url('/k/v1/apis', true), 'GET', {}, function(resp) {
        // success
        console.log(resp);
    }, function(error) {
        // error
        console.log(error);
    });
}

function updateRecord(){
    var boo = 2;
    var id = null;
    if(boo === 1){
        id = 43;
    }
    var body = {
        "app": kintone.app.getId(),
        "id": id,
        "record": {
            "Text": {
                "value": "it works!"
            },
            'age': {
                'value': 777
            }
        }
    };
      
    kintone.api(kintone.api.url('/k/v1/record', true), 'POST', body, function(resp) {
       // success
        console.log(resp);
    }, function(error) {
         // error
        console.log(error);
    });
}

function addOrUpdateRecords(addOrUpdate){
    var recordId = null;
    if(addOrUpdate === 'update'){
        recordId = 47; // placeholder
    }
    var body = {
        'app': kintone.app.getId(),
        'id': recordId,
        'record': {
            'appName': {'value': 'yee'},
            'appId': {'value': 100},
           'dateCreated': {'value': '2015-03-25'},
           'dateModified':{'value': '2015-03-25'},
           'spaceId': {'value': 100},
           'spaceName': {'value': 'space name'},
           'threadId': {'value': 100},
           'totalNumRecord': {'value': 100},
           'mostRecentlyUpdatedRecord': {'value': 'https://www.google.com/'},
           'mostRecentlyAddedRecord': {'value': 'https://www.google.com/'},
           'dateOfMostRecentUpdate': {'value': '2015-03-25'},
           'dateOfMostRecentAdd': {'value': 2015-03-25},
           //'status': {'value': },
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

/* my plan:
// if there is no record,  add new records
// else, update the existing record
// I'll think about this case latar:
// even if there is a record, if a new app is added, we need to add it,
// so we need to do both for that case
*/
(function(){
    'use strict';
    kintone.events.on("app.record.index.show", function(event){
        /*
        var myApp = getApp(174);
        var myRecord = getRecord(176, 12);
        var myApi = getApiList();
        console.log(event.records[1]);
        console.log(event);
        //*/
        //var myApp = getApp(176);
        addOrUpdateRecords('add');
        //var mySpace = getSpace(12);
        console.log("got it");
    });
})();
