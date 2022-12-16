import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  static targets = ["detail"]

  connect() {
    // load default results
    var noRecord = "No record";
    var death = noRecord;
    var life_threatening = noRecord;
    var sig_consequences = noRecord;
    var incorrect_with_consent = noRecord;
    var intraoperative_course_change = noRecord;
    var unanticipated_conversion = noRecord;
    var aborted_incomplete = noRecord;
    var unplanned_stoma = noRecord;
    var unplanned_removal = noRecord;
    var intervention = noRecord;
    var post_op_care_change = noRecord;
    var intensive_care = noRecord;
    var re_operation = noRecord;
    var blood_loss_high = noRecord;
    var more_blood_units = noRecord;


    const eauiaicDisplay = document.querySelector("#eauiaic");
    eauiaicDisplay.insertAdjacentHTML("beforeend", noRecord);

    const iaeseverityDisplay = document.querySelector("#iaeseverity");
    iaeseverityDisplay.insertAdjacentHTML("beforeend", noRecord);

    const modifiedsatavaDisplay = document.querySelector("#modifiedsatava");
    modifiedsatavaDisplay.insertAdjacentHTML("beforeend", noRecord);

    const classintraDisplay = document.querySelector("#classintra");
    classintraDisplay.insertAdjacentHTML("beforeend", noRecord);

    const eaesDisplay = document.querySelector("#eaes");
    eaesDisplay.insertAdjacentHTML("beforeend", noRecord);

    $('input[type=radio]').click(function(e) {
      var selected = $("input[type='radio'][name='death']:checked");
      death = selected.val();
      var selected = $("input[type='radio'][name='life_threatening']:checked");
      life_threatening = selected.val();
      var selected = $("input[type='radio'][name='sig_consequences']:checked");
      sig_consequences = selected.val();
      var selected = $("input[type='radio'][name='incorrect_with_consent']:checked");
      incorrect_with_consent = selected.val();
      var selected = $("input[type='radio'][name='intraoperative_course_change']:checked");
      intraoperative_course_change = selected.val();
      var selected = $("input[type='radio'][name='unanticipated_conversion']:checked");
      unanticipated_conversion = selected.val();
      var selected = $("input[type='radio'][name='aborted_incomplete']:checked");
      aborted_incomplete = selected.val();
      var selected = $("input[type='radio'][name='unplanned_stoma']:checked");
      unplanned_stoma = selected.val();
      var selected = $("input[type='radio'][name='unplanned_removal']:checked");
      unplanned_removal = selected.val();
      var selected = $("input[type='radio'][name='intervention']:checked");
      intervention = selected.val();
      var selected = $("input[type='radio'][name='post_op_care_change']:checked");
      post_op_care_change = selected.val();
      var selected = $("input[type='radio'][name='intensive_care']:checked");
      intensive_care = selected.val();
      var selected = $("input[type='radio'][name='re_operation']:checked");
      re_operation = selected.val();
      var selected = $("input[type='radio'][name='blood_loss_high']:checked");
      blood_loss_high = selected.val();
      var selected = $("input[type='radio'][name='more_blood_units']:checked");
      more_blood_units = selected.val();

      var eauiaic = "10";
      //EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC
      if (death == "no" && intervention == "no" && life_threatening == "no" && sig_consequences == "no" && incorrect_with_consent == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && re_operation == "no") {
        //EAUIAIC
        eauiaic = "0";
      }
      if ((intervention == "yes" || more_blood_units == "yes") && death == "no" && life_threatening == "no" && sig_consequences == "no" && incorrect_with_consent == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && re_operation == "no") {
        //EAUIAIC
        eauiaic = "1";
      }
      if ((unanticipated_conversion == "yes" || sig_consequences =="yes" || re_operation == "yes") && death == "no" && life_threatening == "no" && incorrect_with_consent == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" ) {
        //EAUIAIC
        eauiaic = "2";
      }
      if (death == "no" && life_threatening == "yes" && incorrect_with_consent == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no") {
        //EAUIAIC
        eauiaic = "3";
      }
      if (death == "no" && incorrect_with_consent == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "yes") {
        //EAUIAIC
        eauiaic = "4A";
      }
      if ((aborted_incomplete == "yes" || unplanned_stoma == "yes" ) && death == "no" && incorrect_with_consent == "no") {
        //EAUIAIC
        eauiaic = "4B";
      }
      if (death == "no" && incorrect_with_consent == "yes") {
        //EAUIAIC
        eauiaic = "5A";
      }
      if (death == "yes") {
        //EAUIAIC
        eauiaic = "5B";
      }
      if (eauiaic == "10") {
        //Failed to get a grade for EAUIAIC
        eauiaic = "No record for EAUIAIC.";
      }

      //iAE severity//iAE severity//iAE severity//iAE severity//iAE severity//iAE severity//iAE severity
      var iaeseverity = "10";
      if (death == "no" && intervention == "no" && incorrect_with_consent == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && re_operation == "no") {
          //iAE severity
          iaeseverity = "I";
      }
      if (death == "no"  && intervention == "yes" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && re_operation == "no") {
          //iAE severity
          iaeseverity = "II";
      }
      if (death == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_removal == "yes" && re_operation == "no") {
          //iAE severity
          iaeseverity = "III";
      }
      if (death == "no" && (unanticipated_conversion == "yes" || aborted_incomplete == "yes" || unplanned_stoma == "yes" || incorrect_with_consent == "yes") && re_operation == "no") {
          //iAE severity
          iaeseverity = "IV";
      }
      if (death == "no"  && re_operation == "yes") {
          //iAE severity
          iaeseverity = "V";
      }
      if (death == "yes") {
          //iAE severity
          iaeseverity = "VI";
      }
      var suffixt = "";
      if (more_blood_units == "yes") {
          //iAE severity
          suffixt = " T";
      }
      if (more_blood_units == "no") {
          //iAE severity
          suffixt = "";
      }
      if (iaeseverity == "10") {
          //Failed to record a grade for iAE severity
          iaeseverity = "No record for iAE Severity.";
      }

      //ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava
      var modifiedsatava = "10";
      if (death == "no" && life_threatening == "no" && sig_consequences == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && re_operation == "no" && blood_loss_high == "no") {
          //ModifiedSatava
          modifiedsatava = "I";
      }
      if ((unanticipated_conversion == "yes" || unplanned_stoma == "yes" || unplanned_removal == "yes" || blood_loss_high == "yes" || aborted_incomplete == "yes") && death == "no" && life_threatening == "no" && sig_consequences == "no" ) {
          //ModifiedSatava
          modifiedsatava = "II";
      }
      if (death == "yes" || life_threatening == "yes" || sig_consequences == "yes" || re_operation == "yes") {
          //ModifiedSatava
          modifiedsatava = "III";
      }
      if (modifiedsatava == "10") {
          //Failed to record a grade for Modified Satava
          modifiedsatava = "No record for Modified Satava.";
      }

      //ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra
      var classintra = "10";
      if (death == "no" && life_threatening == "no" && sig_consequences == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && intervention == "no" && re_operation == "no" && blood_loss_high == "no") {
        //ClassIntra
        classintra = "0";
      }
      if ((intraoperative_course_change == "yes" || blood_loss_high == "yes") && death == "no" && life_threatening == "no" && sig_consequences == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && intervention == "no" && re_operation == "no") {
        //ClassIntra
        classintra = "I";
      }
      if ((intervention == "yes" || aborted_incomplete == "yes") && death == "no" && life_threatening == "no" && sig_consequences == "no" && unanticipated_conversion == "no" && unplanned_stoma == "no" && unplanned_removal == "no") {
        //ClassIntra
        classintra = "II";
      }
      if ((unanticipated_conversion == "yes" || unplanned_removal == "yes" || re_operation == "yes" || more_blood_units == "yes") && life_threatening == "no" && sig_consequences == "no" && unplanned_stoma == "no" && death == "no") {
        //ClassIntra
        classintra = "III";
      }
      if ((life_threatening == "yes" || sig_consequences == "yes" || unplanned_stoma == "yes" ) && death == "no") {
        //ClassIntra
        classintra = "IV";
      }
      if (death == "yes") {
        //ClassIntra
        classintra = "V";
      }
      if (classintra == "10") {
        //Failed to record a grade for Class Intra
        classintra = "No record for Class Intra.";
      }

      //EAES//EAES//EAES//EAES//EAES//EAES//EAES
      var eaes = "10";
      if (death == "no" && life_threatening == "no" && sig_consequences == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && intervention == "no" && re_operation == "no" && blood_loss_high == "no" && post_op_care_change =="no" && intensive_care == "no") {
        //EAES
        eaes = "1";
      }
      if ((intraoperative_course_change == "yes" || blood_loss_high == "yes") && death == "no" && life_threatening == "no" && sig_consequences == "no" && unanticipated_conversion == "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && unplanned_removal == "no" && intervention == "no" && re_operation == "no" && post_op_care_change == "no" && intensive_care == "no") {
        //EAES
        eaes = "2";
      }
      if ((intervention == "yes" || aborted_incomplete == "yes" || unplanned_stoma == "no" && unplanned_removal == "yes" || sig_consequences == "yes" || unanticipated_conversion == "yes" || more_blood_units == "yes" || post_op_care_change == "yes") && death == "no" && life_threatening == "no"  && intensive_care == "no") {
        //EAES
        eaes = "3";
      }
      if ((life_threatening == "yes" || re_operation == "yes" || intensive_care == "yes" ) && death == "no") {
        //EAES
        eaes = "4";
      }
      if (death == "yes") {
        //EAES
        eaes = "5";
      }
      if (eaes == "10") {
        //Failed to record a grade for EAES
        eaes = "No record for EAES";
      }

      const listItem = document.querySelector("span#eauiaic");
      const newItem = document.createElement("span");
      newItem.setAttribute("id", "eauiaic");
      newItem.innerHTML = eauiaic;
      listItem.parentNode.replaceChild(newItem, listItem);

      const listItem2 = document.querySelector("span#iaeseverity");
      const newItem2 = document.createElement("span");
      newItem2.setAttribute("id", "iaeseverity");
      newItem2.innerHTML = iaeseverity;
      listItem2.parentNode.replaceChild(newItem2, listItem2);

      const listItem3 = document.querySelector("span#modifiedsatava");
      const newItem3 = document.createElement("span");
      newItem3.setAttribute("id", "modifiedsatava");
      newItem3.innerHTML = modifiedsatava;
      listItem3.parentNode.replaceChild(newItem3, listItem3);

      const listItem4 = document.querySelector("span#classintra");
      const newItem4 = document.createElement("span");
      newItem4.setAttribute("id", "classintra");
      newItem4.innerHTML = classintra;
      listItem4.parentNode.replaceChild(newItem4, listItem4);

      const listItem5 = document.querySelector("span#eaes");
      const newItem5 = document.createElement("span");
      newItem5.setAttribute("id", "eaes");
      newItem5.innerHTML = eaes;
      listItem5.parentNode.replaceChild(newItem5, listItem5);

      const listItem6 = document.querySelector("span#suffixt");
      const newItem6 = document.createElement("span");
      newItem6.setAttribute("id", "suffixt");
      newItem6.innerHTML = suffixt;
      listItem6.parentNode.replaceChild(newItem6, listItem6);
    });
  }
}
