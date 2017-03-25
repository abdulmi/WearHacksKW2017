$(document).ready(function(){
  $("#btnAddSubscription").on('click', function(events) {
    $("#prescription-container").append('<div id="prescription-container">      <div class="prescription-section">      <input class="modal-subButton" id="btnRemovePrescription" type="image" src="res/del_sm.png"/><form><label for="inputlg">Prescription Name</label> <input class="form-control input-lg" type="text"/>    </form>    <form>      <label for="inputlg">Dosage</label>      <input class="form-control input-lg" type="text"/>    </form>    <form>      <label for="inputlg">Details</label>      <input class="form-control input-lg" type="text"/>    </form> </div> </div>');
      console.log("added");
  });
  $("#prescription-container").on('click', '#btnRemovePrescription', function(events) {
    $(this).closest('div').remove();
    console.log("removed");
  });
})
