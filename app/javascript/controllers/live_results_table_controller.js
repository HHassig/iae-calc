import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="live-results-table"
export default class extends Controller {
  connect() {
    setBorderRadius(document.querySelectorAll(".relative"));
    const all_buttons = document.getElementsByClassName("form-check-input");
    for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].addEventListener('click', function() {
      var eauiaic = "No record for EAUIAIC.";
      var iaeseverity = "No record for iAE Severity.";
      var modifiedsatava = "No record for Modified Satava.";
      var classintra = "No record for Class Intra.";
      var suffixt = "N/A";
      var eaes = "1";

      var death = document.querySelector('input[name="survey[death]"]:checked').value;
      setColor("death", death);

      var life_threatening = document.querySelector('input[name="survey[life_threatening]"]:checked').value;
      setColor("life_threatening", life_threatening);

      var sig_consequences = document.querySelector('input[name="survey[sig_consequences]"]:checked').value;
      setColor("sig_consequences", sig_consequences);

      var incorrect_with_consent = document.querySelector('input[name="survey[incorrect_with_consent]"]:checked').value;
      setColor("incorrect_with_consent", incorrect_with_consent);

      var intraoperative_course_change = document.querySelector('input[name="survey[intraoperative_course_change]"]:checked').value;
      setColor("intraoperative_course_change", intraoperative_course_change);

      var unanticipated_conversion = document.querySelector('input[name="survey[unanticipated_conversion]"]:checked').value;
      setColor("unanticipated_conversion", unanticipated_conversion);

      var aborted_incomplete = document.querySelector('input[name="survey[aborted_incomplete]"]:checked').value;
      setColor("aborted_incomplete", aborted_incomplete);

      var unplanned_stoma = document.querySelector('input[name="survey[unplanned_stoma]"]:checked').value;
      setColor("unplanned_stoma", unplanned_stoma);

      var unplanned_removal = document.querySelector('input[name="survey[unplanned_removal]"]:checked').value;
      setColor("unplanned_removal", unplanned_removal);

      var intervention = document.querySelector('input[name="survey[intervention]"]:checked').value;
      setColor("intervention", intervention);

      var post_op_care_change = document.querySelector('input[name="survey[post_op_care_change]"]:checked').value;
      setColor("post_op_care_change", post_op_care_change);

      var intensive_care = document.querySelector('input[name="survey[intensive_care]"]:checked').value;
      setColor("intensive_care", intensive_care);

      var re_operation = document.querySelector('input[name="survey[re_operation]"]:checked').value;
      setColor("re_operation", re_operation);

      var blood_loss_high = document.querySelector('input[name="survey[blood_loss_high]"]:checked').value;
      setColor("blood_loss_high", blood_loss_high);

      var more_blood_units = document.querySelector('input[name="survey[more_blood_units]"]:checked').value;
      setColor("more_blood_units", more_blood_units);

      //EAUIAIC
      if (death == "false" && intervention == "false" && life_threatening == "false" && sig_consequences == "false" && incorrect_with_consent == "false" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" && re_operation == "false") {
        //EAUIAIC
        eauiaic = "0";
      }
      if ((intervention == "true" || more_blood_units == "true") && death == "false" && life_threatening == "false" && sig_consequences == "false" && incorrect_with_consent == "false" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" && re_operation == "false") {
        //EAUIAIC
        eauiaic = "1";
      }
      if ((unanticipated_conversion == "false" || sig_consequences == "true" || re_operation == "true") && death == "false" && life_threatening == "false" && incorrect_with_consent == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" ) {
        //EAUIAIC
        eauiaic = "2";
      }
      if (death == "false" && life_threatening == "true" && incorrect_with_consent == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false") {
        //EAUIAIC
        eauiaic = "3";
      }
      if (death == "false" && incorrect_with_consent == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "true") {
        //EAUIAIC
        eauiaic = "4A";
      }
      if ((aborted_incomplete == "true" || unplanned_stoma == "true" ) && death == "false" && incorrect_with_consent == "false") {
        //EAUIAIC
        eauiaic = "4B";
      }
      if (death == "false" && incorrect_with_consent == "true") {
        //EAUIAIC
        eauiaic = "5A";
      }
      if (death == "true") {
        //EAUIAIC
        eauiaic = "5B";
      }

      //iAE severity//iAE severity//iAE severity//iAE severity//iAE severity//iAE severity//iAE severity
      if (death == "false" && intervention == "false" && incorrect_with_consent == "false" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" && re_operation == "false") {
        //iAE severity
        iaeseverity = "I";
      }
      if (death == "false" && intervention == "true" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" && re_operation == "false") {
        //iAE severity
        iaeseverity = "II";
      }
      if (death == "false" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_removal == "true" && re_operation == "false") {
        //iAE severity
        iaeseverity = "III";
      }
      if (death == "false" && (unanticipated_conversion == "true" || aborted_incomplete == "true" || unplanned_stoma == "true" || incorrect_with_consent == "true") && re_operation == "false") {
        //iAE severity
        iaeseverity = "IV";
      }
      if (death == "false" && re_operation == "true") {
        //iAE severity
        iaeseverity = "V";
      }
      if (death == "true") {
        //iAE severity
        iaeseverity = "VI";
      }

      if (more_blood_units == "true") {
        //iAE severity
        suffixt = " T";
      }
      if (more_blood_units == "false") {
        //iAE severity
        suffixt = "";
      }

      //ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava
      if (death == "false" && life_threatening == "false" && sig_consequences == "false" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" && re_operation == "false" && blood_loss_high == "false") {
        //ModifiedSatava
        modifiedsatava = "I";
      }
      if ((unanticipated_conversion == "false" || unplanned_stoma == "true" || unplanned_removal == "true" || blood_loss_high == "true" || aborted_incomplete == "true") && death == "false" && life_threatening == "false" && sig_consequences == "false" ) {
        //ModifiedSatava
        modifiedsatava = "II";
      }
      if (death == "true" || life_threatening == "true" || sig_consequences == "true" || re_operation == "true") {
        //ModifiedSatava
        modifiedsatava = "III";
      }

      //ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra
      if (death == "false" && life_threatening == "false" && sig_consequences == "false" && incorrect_with_consent == "false" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" && intervention == "false" && re_operation == "false" && blood_loss_high == "false") {
        //ClassIntra
        classintra = "0"
      }
      if ((intraoperative_course_change == "true" || blood_loss_high == "true") && death == "false" && life_threatening == "false" && sig_consequences == "false" && unanticipated_conversion == "false" && aborted_incomplete == "false" && unplanned_stoma == "false" && unplanned_removal == "false" && intervention == "false" && re_operation == "false") {
        //ClassIntra
        classintra = "I"
      }
      if ((intervention == "true" || aborted_incomplete == "true" || more_blood_units == "true" || re_operation == "true" || incorrect_with_consent == "true") && death == "false" && life_threatening == "false" && sig_consequences == "false" && unanticipated_conversion == "false" && unplanned_stoma == "false" && unplanned_removal == "false" ) {
        //ClassIntra
        classintra = "II";
      }
      if ((life_threatening == "true" || sig_consequences == "true" || unplanned_stoma == "true" || unanticipated_conversion == "false" || unplanned_removal == "true") && death == "false" ) {
        //ClassIntra
        classintra = "III"
      }
      if (death == "true") {
        //ClassIntra
        classintra = "IV";
      }

      //EAES//EAES//EAES//EAES//EAES//EAES//EAES//EAES//EAES//EAES
      if (intervention == "true" && post_op_care_change == "false") {
        eaes = "2";
      }
      if (post_op_care_change == "true" || intraoperative_course_change == "true") {
        eaes = "3";
      }
      if (life_threatening == "true" || sig_consequences == "true" || re_operation == "true" || intensive_care == "true") {
        eaes = "4";
      }
      if (death == "true") {
        eaes = "5";
      }
      document.querySelector("#eauiaic-spot").innerHTML = eauiaic;
      document.querySelector("#iaeseverity-spot").innerHTML = iaeseverity;
      document.querySelector("#modifiedsatava-spot").innerHTML = modifiedsatava;
      document.querySelector("#classintra-spot").innerHTML = classintra;
      document.querySelector("#suffixt-spot").innerHTML = suffixt;
      document.querySelector("#eaes-spot").innerHTML = eaes;
      }, false);
    }

    function setColor(elementName, value) {
      if (value === "true") {
        document.querySelector(`label[for="survey_${elementName}_true"`).style.backgroundColor = "#90ee90";
        document.querySelector(`label[for="survey_${elementName}_false"`).style.backgroundColor = "#CBD5E1";
      } else {
        document.querySelector(`label[for="survey_${elementName}_true"`).style.backgroundColor = "#CBD5E1";
        document.querySelector(`label[for="survey_${elementName}_false"`).style.backgroundColor = "#FF7F7F";
      }
    }

    function setBorderRadius(questions) {
      for (let i = 0; i < questions.length; i++) {
        let a = questions[i].querySelectorAll("label");
        a[0].style.borderRadius = "1em 0em 0em 1em";
        a[1].style.borderRadius = "0em 1em 1em 0em";
      }
    }
  }
}
