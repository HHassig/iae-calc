import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="live-results-table"
export default class extends Controller {
  connect() {
    setBorderRadius(document.querySelectorAll(".relative"));
    const all_buttons = document.getElementsByClassName("form-check-input");
    for (var i = 0; i < all_buttons.length; i++) {
    all_buttons[i].addEventListener('click', function() {
      var questions = {}
      questions.death = document.querySelector('input[name="survey[death]"]:checked').value;
      questions.life_threatening = document.querySelector('input[name="survey[life_threatening]"]:checked').value;
      questions.sig_consequences = document.querySelector('input[name="survey[sig_consequences]"]:checked').value;
      questions.incorrect_with_consent = document.querySelector('input[name="survey[incorrect_with_consent]"]:checked').value;
      questions.intraoperative_course_change = document.querySelector('input[name="survey[intraoperative_course_change]"]:checked').value;
      questions.unanticipated_conversion = document.querySelector('input[name="survey[unanticipated_conversion]"]:checked').value;
      questions.aborted_incomplete = document.querySelector('input[name="survey[aborted_incomplete]"]:checked').value;
      questions.unplanned_stoma = document.querySelector('input[name="survey[unplanned_stoma]"]:checked').value;
      questions.unplanned_removal = document.querySelector('input[name="survey[unplanned_removal]"]:checked').value;
      questions.intervention = document.querySelector('input[name="survey[intervention]"]:checked').value;
      questions.post_op_care_change = document.querySelector('input[name="survey[post_op_care_change]"]:checked').value;
      questions.intensive_care = document.querySelector('input[name="survey[intensive_care]"]:checked').value;
      questions.re_operation = document.querySelector('input[name="survey[re_operation]"]:checked').value;
      questions.blood_loss_high = document.querySelector('input[name="survey[blood_loss_high]"]:checked').value;
      questions.more_blood_units = document.querySelector('input[name="survey[more_blood_units]"]:checked').value;
      setColors(questions);
      setResults(getValues(questions));
      }, false);
    }

    function setResults(results) {
      document.querySelector("#eauiaic-spot").innerHTML = results.eauiaic;
      document.querySelector("#iaeseverity-spot").innerHTML = results.iaeseverity;
      document.querySelector("#modifiedsatava-spot").innerHTML = results.modifiedsatava;
      document.querySelector("#classintra-spot").innerHTML = results.classintra;
      document.querySelector("#suffixt-spot").innerHTML = results.suffixt;
      document.querySelector("#eaes-spot").innerHTML = results.eaes;
      document.querySelector("#survey_eauiaic").innerHTML = results.eauiaic;
      document.querySelector("#survey_iae_severity").innerHTML = results.iaeseverity;
      document.querySelector("#survey_modified_satava").innerHTML = results.modifiedsatava;
      document.querySelector("#survey_class_intra").innerHTML = results.classintra;
      document.querySelector("#survey_suffix_t").innerHTML = results.suffixt;
      document.querySelector("#survey_eaes").innerHTML = results.eaes;
    }

    function getValues(questions) {
      var results = {}
      results.eauiaic = getEauiaic(questions);
      results.iaeseverity = getIaeseverity(questions);
      results.suffixt = getSuffixT(questions);
      results.modifiedsatava = getModifiedSatava(questions);
      results.classintra = getClassIntra(questions);
      results.eaes = getEaes(questions);
      return results;
    }

    function setColors(questions) {
      Object.keys(questions).forEach(function (key) {
        setColor(key, questions[key]);
      })
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

    function getEauiaic(questions) {
      var eauiaic = "No record for EAUIAIC.";
      if (questions.death == "false" && questions.intervention == "false" && questions.life_threatening == "false" && questions.sig_consequences == "false" && questions.incorrect_with_consent == "false" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" && questions.re_operation == "false") {
        eauiaic = "0";
      }
      if ((questions.intervention == "true" || questions.more_blood_units == "true") && questions.death == "false" && questions.life_threatening == "false" && questions.sig_consequences == "false" && questions.incorrect_with_consent == "false" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" && questions.re_operation == "false") {
        eauiaic = "1";
      }
      if ((questions.unanticipated_conversion == "false" || questions.sig_consequences == "true" || questions.re_operation == "true") && questions.death == "false" && questions.life_threatening == "false" && questions.incorrect_with_consent == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" ) {
        eauiaic = "2";
      }
      if (questions.death == "false" && questions.life_threatening == "true" && questions.incorrect_with_consent == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false") {
        eauiaic = "3";
      }
      if (questions.death == "false" && questions.incorrect_with_consent == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "true") {
        eauiaic = "4A";
      }
      if ((questions.aborted_incomplete == "true" || questions.unplanned_stoma == "true" ) && questions.death == "false" && questions.incorrect_with_consent == "false") {
        eauiaic = "4B";
      }
      if (questions.death == "false" && questions.incorrect_with_consent == "true") {
        eauiaic = "5A";
      }
      if (questions.death == "true") {
        eauiaic = "5B";
      }
      return eauiaic;
    }

    function getIaeseverity(questions) {
      var iaeseverity = "No record for iAE Severity.";
      if (questions.death == "false" && questions.intervention == "false" && questions.incorrect_with_consent == "false" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" && questions.re_operation == "false") {
        iaeseverity = "I";
      }
      if (questions.death == "false" && questions.intervention == "true" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" && questions.re_operation == "false") {
        iaeseverity = "II";
      }
      if (questions.death == "false" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_removal == "true" && questions.re_operation == "false") {
        iaeseverity = "III";
      }
      if (questions.death == "false" && (questions.unanticipated_conversion == "true" || questions.aborted_incomplete == "true" || questions.unplanned_stoma == "true" || questions.incorrect_with_consent == "true") && questions.re_operation == "false") {
        iaeseverity = "IV";
      }
      if (questions.death == "false" && questions.re_operation == "true") {
        iaeseverity = "V";
      }
      if (questions.death == "true") {
        iaeseverity = "VI";
      }
      return iaeseverity;
    }

    function getSuffixT(questions) {
      var suffixt = "N/A";
      if (questions.more_blood_units == "true") {
        suffixt = " T";
      }
      if (questions.more_blood_units == "false") {
        suffixt = "";
      }
      return suffixt;
    }

    function getModifiedSatava(questions) {
      var modifiedsatava = "No record for Modified Satava.";
      if (questions.death == "false" && questions.life_threatening == "false" && questions.sig_consequences == "false" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" && questions.re_operation == "false" && questions.blood_loss_high == "false") {
        modifiedsatava = "I";
      }
      if ((questions.unanticipated_conversion == "false" || questions.unplanned_stoma == "true" || questions.unplanned_removal == "true" || questions.blood_loss_high == "true" || questions.aborted_incomplete == "true") && questions.death == "false" && questions.life_threatening == "false" && questions.sig_consequences == "false" ) {
        modifiedsatava = "II";
      }
      if (questions.death == "true" || questions.life_threatening == "true" || questions.sig_consequences == "true" || questions.re_operation == "true") {
        modifiedsatava = "III";
      }
      return modifiedsatava;
    }

    function getClassIntra(questions) {
      var classintra = "No record for Class Intra.";
      if (questions.death == "false" && questions.life_threatening == "false" && questions.sig_consequences == "false" && questions.incorrect_with_consent == "false" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" && questions.intervention == "false" && questions.re_operation == "false" && questions.blood_loss_high == "false") {
        classintra = "0"
      }
      if ((questions.intraoperative_course_change == "true" || questions.blood_loss_high == "true") && questions.death == "false" && questions.life_threatening == "false" && questions.sig_consequences == "false" && questions.unanticipated_conversion == "false" && questions.aborted_incomplete == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" && questions.intervention == "false" && questions.re_operation == "false") {
        classintra = "I"
      }
      if ((questions.intervention == "true" || questions.aborted_incomplete == "true" || questions.more_blood_units == "true" || questions.re_operation == "true" || questions.incorrect_with_consent == "true") && questions.death == "false" && questions.life_threatening == "false" && questions.sig_consequences == "false" && questions.unanticipated_conversion == "false" && questions.unplanned_stoma == "false" && questions.unplanned_removal == "false" ) {
        classintra = "II";
      }
      if ((questions.life_threatening == "true" || questions.sig_consequences == "true" || questions.unplanned_stoma == "true" || questions.unanticipated_conversion == "false" || questions.unplanned_removal == "true") && questions.death == "false" ) {
        classintra = "III"
      }
      if (questions.death == "true") {
        classintra = "IV";
      }
      return classintra;
    }

    function getEaes(questions) {
      var eaes = "1";
      if (questions.intervention == "true" && questions.post_op_care_change == "false") {
        eaes = "2";
      }
      if (questions.post_op_care_change == "true" || questions.intraoperative_course_change == "true") {
        eaes = "3";
      }
      if (questions.life_threatening == "true" || questions.sig_consequences == "true" || questions.re_operation == "true" || questions.intensive_care == "true") {
        eaes = "4";
      }
      if (questions.death == "true") {
        eaes = "5";
      }
      return eaes;
    }
  }
}
