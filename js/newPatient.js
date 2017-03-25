$(document).ready(function(){
  $("#btnAddSubscription").on('click', function(events) {
    $("#prescription-container").append('<div id="prescription-container">      <div class="prescription-section">   <h2>Add Prescription</h2>   <input class="modal-subButton" id="btnRemovePrescription" type="image" src="res/minus.png"/><form><label for="inputlg">Prescription Name</label> <input class="form-control input-lg" type="text"/>    </form>    <form>      <label for="inputlg">Dosage</label>      <input class="form-control input-lg" type="text"/>    </form>    <form>      <label for="inputlg">Details</label>      <input class="form-control input-lg" type="text"/>    </form> </div> </div>');
      console.log("added");
  });

  $("#prescription-container").on('click', '#btnRemovePrescription', function(events) {
    $(this).closest('div').remove();
    console.log("removed");
  });

  $("#btnSaveNewPatient").on('click', function(events){
    console.log("save");
  });
})
