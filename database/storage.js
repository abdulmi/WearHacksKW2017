var Firebase = firebase.database().ref();
var patients = firebase.database().ref('patients');
var perscriptions = firebase.database().ref('perscriptions');


PerscriptionID = 0;

function time(h, m){
    var Time = {
        hours: h,
        minutes: minutes
    };
    return Time;
}

function schedule(interval, duration, time){
    var Schedule = {
        Interval: interval,
        Duration: duration,
        Start: time(8,0),
    }
    if (time){
        Schedule.Start = time;
    }
    else{
        Schedule.Start = time(8,0);
        Schedule.Count = Math.ceil(24/interval.Hour)-1;
    }
    return Schedule;
}

function createPatient(id, name, number, age, method){
    // patients.set({HealthCard: id});
    patients.child(id).set({
        Name: name,
        Phone: number,
        Age: age,
        Method: method
    });
    console.log("success");
}

function createPerscription(id, name, detail, schedule){
    perscriptions.ref().set({ID: PerscriptionID});
    perscriptions.ref(PerscriptionID).set({
        PatiendID: id,
        Name: name,
        Detail: detail,
        Schedule: schedule,
        Count: 0
    });
    PerscriptionID ++;
}

function getPhoneNumber(id, callback){
    patients.ref(id + "/Phone/").once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPatientName(id){

    patients.child(id).once('value').then(function(snapshot){
        console.log("start");
        if (snapshot.key){
            console.log(snapshot.child('Name').val());
            return (snapshot.key);
        }
        else{
            console.log("null");
            return null;
        }
    });

}

function getPerscriptionName(id, callback){
    perscriptions.child(id + "/Name/").once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.valI());
        }
        else{
            callback();
        }
    });
}

function getPatient(id, callback){
    patients.child().once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}

function getPerscription(id, callback){
    perscriptions.ref().once("value", function(snapshot){
        if (snapshot.val()){
            callback(snapshot.val());
        }
        else{
            callback();
        }
    });
}
