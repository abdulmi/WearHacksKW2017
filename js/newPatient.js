$(document).ready(function(){
// var db = require('../database/storage.js');
var a = 0;
  $("#btnAddSubscription").on('click', function(events) {

    a++;
    var prescriptionHeader = ' <div id="prescription-container">   <h2>Add Prescription</h2>   <input class="modal-subButton" id="btnRemovePrescription" type="image" src="res/minus.png"/> <div class="prescription-section"> ';
    var prescriptionNameForm = '<form><label for="inputlg">Prescription Name</label> <input class="form-control input-lg" id="addNewPrescriptionName_' + a + '" type="text"/> </form>';
    var prescriptionDetailForm = '<form>      <label for="inputlg">Details</label>      <input class="form-control input-lg" id="addNewPrescriptionDetails_' + a + '" type="text"/>    </form>';
    var prescriptionFooter = ' </div> </div>';
    var textDosage = '<label for="inputlg">Dosage Schedule</label>    <label for="input-sm">Frequency (per day)</label>    <input class="form-control input-lg" id="addNewPrescriptionDosage_' + a + '"type="text"/>   ';
    textDosage += '   <label for="input-sm">Dosage Duration</label>    <input class="form-control input-lg" id="addNewPrescriptionDuration_' + a + '"type="text"/>   ';

    textDosage += '<label for="input-sm">Start time</label> <select class="hour input-lg" id="addNewPrescriptionStartTimeHour_'+ a + '" style="width: auto;">';
    for(var i = 0; i <= 9; i++){
      textDosage += "<option value=" + i + ">0" + i + "</option>";
    }
    for(var i = 10; i <=23; i++){
      textDosage += "<option value=" + i + ">" + i + "</option>";
    }
    textDosage += "</select>";
    textDosage += ":";
    textDosage += '<select class="minutes input-lg" id="addNewPrescriptionStartTimeMinute_'+ a + '"style="width: auto;">'
    for(var i = 0; i <= 9; i++){
      textDosage += "<option value=" + i + ">0" + i + "</option>";
    }
    for(var i = 10; i <=59; i++){
      textDosage += "<option value=" + i + ">" + i + "</option>";
    }
    textDosage += "</select>"
    textDosage += "</form>"
    $('#prescription-container').append(prescriptionHeader + prescriptionNameForm + prescriptionDetailForm + textDosage + prescriptionFooter);

      console.log(a);
  });

  $("#prescription-container").on('click', '#btnRemovePrescription', function(events) {
    $(this).closest('div').remove();
    console.log("removed");
    a--;
    console.log(a);
  });

  $("#btnSaveNewPatient").on('click', function(events){
    console.log("save");
    var name = document.getElementById('inputPatientName').value;
    var id = document.getElementById('inputPatientID').value;
    var phone = document.getElementById('inputPatientPhone').value;
    var age = document.getElementById('inputPatientAge').value;
    var method = document.getElementById('inputPatientMethod').value;
    createPatient(id, name, phone, age, method);

    for(var i = 0; i < a; i++){
      var prescriptionName = document.getElementById('addNewPrescriptionName_'+a).value;
      var prescriptionDetail = document.getElementById('addNewPrescriptionDetails_'+a).value;
      var prescriptionDosage = document.getElementById('addNewPrescriptionDosage_'+a).value;
      var prescriptionDuration = document.getElementById('addNewPrescriptionDuration_'+a).value;
      var selectedHour = document.getElementById('addNewPrescriptionStartTimeHour_'+a);
      var selectedHourValue = selectedHour.options[selectedHour.selectedIndex].value;
      var selectedMinute = document.getElementById('addNewPrescriptionStartTimeMinute_'+a);
      var selectedMinuteValue = selectedHour.options[selectedHour.selectedIndex].value;

      console.log(prescriptionDetail);
      console.log(prescriptionName);
      var minutes = selectedHourValue * 60 + selectedMinuteValue;
      var pSchedule = schedule(prescriptionDosage, prescriptionDuration, minutes);
      createPerscription(id, prescriptionName, prescriptionDetail, pSchedule);

    }



  });

  $('#aExistingPatientModal').on('click', function(events){

      getAllPatients2(function(data){
        $('#existingPatientList').empty();
        data.forEach(function(child){
          console.log(child.key);
          var patientName = child.child("Name").val();
          var listItem = '<li class="list-group-item" value="' + child.key + '">' + patientName + '</li>';
          console.log(listItem);
          $('#existingPatientList').append(listItem);
        })})
    });


  $('#existingPatientList').on('click', 'li', function(events){
    // alert($(this).val());
    var patientID = $(this).val();

    //update patient name
    console.log(patientID);

    getPatientName(patientID, function(data){
      $('#existingPatientName').val(data);
    });

    //update patient age
    getPhoneNumber(patientID, function(data){
      $('#existingPatientPhone').val(data);
    });

    //update patient phone number
    getPatient(patientID, function(data){
      console.log(data);
      $('#existingPatientAge').val(data.child('Age').val());
    });

  })
});
