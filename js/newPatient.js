$(document).ready(function(){
  $("#btnAddSubscription").on('click', function(events) {
    $("#prescription-container").append('<div id="prescription-container">      <div class="prescription-section">   <h2>Add Prescription</h2>   <input class="modal-subButton" id="btnRemovePrescription" type="image" src="res/minus.png"/><form><label for="inputlg">Prescription Name</label> <input class="form-control input-lg" type="text"/>    </form>    <form>      <label for="inputlg">Dosage</label>      <input class="form-control input-lg" type="text"/>    </form>    <form>      <label for="inputlg">Details</label>      <input class="form-control input-lg" type="text"/>    </form> </div> </div>');

    var textDosage = '<label for="inputlg">Dosage schedule</label>    <label for="input-sm">Frequency (per day)</label>    <input class="form-control input-lg" type="text"/>    <label for="input-sm">Start time</label> <select class="hour input-lg" style="width: auto;">';

    for(var i = 0; i <= 9; i++){
      textDosage += "<option value=" + i + ">0" + i + "</option>";
    }
    for(var i = 10; i <=23; i++){
      textDosage += "<option value=" + i + ">" + i + "</option>";
    }
    textDosage += "</select>";
    textDosage += ":";
    textDosage += '<select class="minutes input-lg" style="width: auto;">'
    for(var i = 0; i <= 9; i++){
      textDosage += "<option value=" + i + ">0" + i + "</option>";
    }
    for(var i = 10; i <=59; i++){
      textDosage += "<option value=" + i + ">" + i + "</option>";
    }
    textDosage += "</select>"
    textDosage += "</form>"
    $('#prescription-container').append(textDosage);

      console.log("added");
  });

  $("#prescription-container").on('click', '#btnRemovePrescription', function(events) {
    $(this).closest('div').remove();
    console.log("removed");
  });

  $("#btnSaveNewPatient").on('click', function(events){
    console.log("save");
    var name = document.getElementById('inputPatientName').value;
    var id = document.getElementById('inputPatientID').value;
    var phone = document.getElementById('inputPatientPhone').value;
    var age = document.getElementById('inputPatientAge').value;
    var method = document.getElementById('inputPatientMethod').value;
    createPatient(id, name, phone, age, method);
  });

  $('#aExistingPatientModal').on('click', function(events){
    
    // var item = '<li class="list-group-item">Test Item</li>'
    // $('#existingPatientList').append(item);

    getAllPatients(function(data){
      // $('#existingPatientList')
      console.log(data);
      for(var item in data){
        console.log(data[item].Name);
        var patientName = data[item].Name;
        var listItem = '<li class="list-group-item">' + patientName + '</li>';
        $('#existingPatientList').append(listItem);
      }
    });

  });
})
