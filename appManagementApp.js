/* my plan:
// if there is no record,  add new records
// else, update the existing record
// I'll think about this case latar:
// even if there is a record, if a new app is added, we need to add it,
// so we need to do both for that case
// since I cannot figure out promise for now, I'm going to proceed
// with other parts that I can do.
//*/

(function(){
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
                "value": "testing"
            },
            'age': {
                'value': 100
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
            'dateCreated': {'value': '2015-03-25'},
           'dateModified':{'value': '2015-03-25'},
           'spaceId': {'value': 100},
           'spaceName': {'value': 'space name'},
           'threadId': {'value': 100},
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

async function f(){
    return Promise.resolve(1);
}

function foo(){alert('not good man');}

async function getSpaceForReal(spaceId = 12){
    var promiseSpace = new Promise((resolve, reject) => {
        resolve(getSpace(spaceId)),
        reject('error')
    });
    var mySpace = await promiseSpace;
    console.log(mySpace);
}

/*
process of fetching data and putting into records:
full path to a data: resp.attachedApps[i].property

*/

    kintone.events.on("app.record.index.show", function(event){
        // var mySpace = getSpace(12);
        let spaceId = 12;
        var body = {"id": spaceId};
        kintone.api(kintone.api.url('/k/v1/space', true), 'GET', body, function(resp) {
            // success
            console.log(resp);
            let myApps = resp.attachedApps;
            console.log(myApps);
            let totalNumApps = myApps.length;
            // get data from each app and add records into this app
            console.log('myApps[0]: ', myApps[0]);
            console.log('myApps[0].name: ', myApps[0].name);
            console.log('myApps[0].appId: ', myApps[0].appId);
            addOrUpdateRecords('update', null, myApps[0]);

            console.log(event);

        }, function(error) {
            // error
            console.log(error);
        });

        console.log("haha");
    });
})();

