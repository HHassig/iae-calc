import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  static targets = ["detail"]


  connect() {
    // load default results
    var noRecord = "No record";
    var death = noRecord;
    var life_threatening = noRecord;
    var sig_consequences = noRecord;
    var incorrect_with_consent= noRecord;
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

    const iaeseverity = document.querySelector("#iaeseverity");
    iaeseverity.insertAdjacentHTML("beforeend", noRecord);

    const modifiedsatava = document.querySelector("#modifiedsatava");
    modifiedsatava.insertAdjacentHTML("beforeend", noRecord);

    const classintra = document.querySelector("#classintra");
    classintra.insertAdjacentHTML("beforeend", noRecord);

    const eaes = document.querySelector("#eaes");
    eaes.insertAdjacentHTML("beforeend", noRecord);

    $( 'input[name="death"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='death']:checked");
      death = selected.val();
    });
    $( 'input[name="life_threatening"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='life_threatening']:checked");
      life_threatening = selected.val();
    });
    $( 'input[name="sig_consequences"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='sig_consequences']:checked");
      sig_consequences = selected.val();
    });
    $( 'input[name="incorrect_with_consent"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='incorrect_with_consent']:checked");
      incorrect_with_incorrect_with_consent= selected.val();
    });
    $( 'input[name="intraoperative_course_change"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='intraoperative_course_change']:checked");
      intraoperative_course_change = selected.val();
    });
    $( 'input[name="unanticipated_conversion"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='unanticipated_conversion']:checked");
      unanticipated_conversion = selected.val();
    });
    $( 'input[name="aborted_incomplete"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='aborted_incomplete']:checked");
      aborted_incomplete = selected.val();
    });
    $( 'input[name="unplanned_stoma"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='unplanned_stoma']:checked");
      unplanned_stoma = selected.val();
    });
    $( 'input[name="unplanned_removal"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='unplanned_removal']:checked");
      unplanned_removal = selected.val();
    });
    $( 'input[name="intervention"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='intervention']:checked");
      intervention = selected.val();
    });
    $( 'input[name="post_op_care_change"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='post_op_care_change']:checked");
      post_op_care_change = selected.val();
    });
    $( 'input[name="intensive_care"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='intensive_care']:checked");
      intensive_care = selected.val();
    });
    $( 'input[name="re_operation"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='re_operation']:checked");
      re_operation = selected.val();
    });
    $( 'input[name="blood_loss_high"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='blood_loss_high']:checked");
      blood_loss_high = selected.val();
    });
    $( 'input[name="more_blood_units"]:radio' ).on('change', function(e) {
      var selected = $("input[type='radio'][name='more_blood_units']:checked");
      more_blood_units = selected.val();
    });

    $('input[type=radio]').click(function(e) {
      var eauiaic = "10";
      //EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC
      if (death == "no" && intervention == "no" && life_threatening == "no" && sig_consequences == "no" && incorrect_with_consent== "no" && unanticipated_conversion== "no" && aborted_incomplete== "no" && unplanned_stoma == "no" && organ == "no" && re_operation == "no" ) {
          //EAUIAIC
          eauiaic = "0";
      }
      if ((intervention == "yes" || more_blood_units == "yes" ) && death == "no" && life_threatening== "no" && sig_consequences == "no" && incorrect_with_consent== "no" &&unanticipated_conversion== "no" && aborted_incomplete== "no" && unplanned_stoma == "no" && organ == "no" && re_operation == "no" ) {
          //EAUIAIC
          eauiaic = "1";
      }
      if ((unanticipated_conversion == "yes" || sig_consequences =="yes" || re_operation == "yes") && death == "no" && life_threatening== "no" && incorrect_with_consent== "no" && aborted_incomplete== "no" && unplanned_stoma == "no" && organ == "no" ) {
          //EAUIAIC
          eauiaic = "2";
      }
      if (death == "no" && life_threatening == "yes" && incorrect_with_consent== "no" && aborted_incomplete== "no" && unplanned_stoma == "no" && organ == "no") {
          //EAUIAIC
          eauiaic = "3";
      }
      if (death == "no" && incorrect_with_consent== "no" && aborted_incomplete == "no" && unplanned_stoma == "no" && organ == "yes") {
          //EAUIAIC
          eauiaic = "4A";
      }
      if ((aborted_incomplete== "yes" ||unplanned_stoma == "yes" ) && death == "no" && incorrect_with_consent== "no" ) {
          //EAUIAIC
          eauiaic = "4B";
      }
      if (death == "no" && incorrect_with_consent== "yes") {
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
      console.log(eauiaic);
      // //iAE severity//iAE severity//iAE severity//iAE severity//iAE severity//iAE severity//iAE severity
      // iaeseverity = "10";
      // if (death == "no" && intervention == "no" && incorrect_with_consent== "no" && unanticipated_conversion== "no" && aborted_incomplete== "no" &&unplanned_stoma == "no" && organ == "no" && re_operation == "no") {
      //     //iAE severity
      //     iaeseverity = "I";
      // }
      // if (death == "no"  && intervention == "yes" && unanticipated_conversion== "no" && aborted_incomplete== "no" &&unplanned_stoma == "no" && organ == "no" && re_operation == "no") {
      //     //iAE severity
      //     iaeseverity = "II";
      // }
      // if (death == "no"  &&unanticipated_conversion== "no" && aborted_incomplete== "no" && organ == "yes" && re_operation == "no") {
      //     //iAE severity
      //     iaeseverity = "III";
      // }
      // if (death == "no" && (conversion == "yes" || aborted_incomplete== "yes" ||unplanned_stoma == "yes" || incorrect_with_consent== "yes") && re_operation == "no") {
      //     //iAE severity
      //     iaeseverity = "IV";
      // }
      // if (death == "no"  && re_operation == "yes") {
      //     //iAE severity
      //     iaeseverity = "V";
      // }
      // if (death == "yes") {
      //     //iAE severity
      //     iaeseverity = "VI";
      // }
      // var suffixt = "N/A";
      // if (more_blood_units == "yes") {
      //     //iAE severity
      //     suffixt = " T";
      // }
      // if (more_blood_units == "no") {
      //     //iAE severity
      //     suffixt = " ";
      // }
      // if (iaeseverity == "10") {
      //     //Failed to record a grade for iAE severity
      //     iaeseverity = "No record for iAE Severity.";
      // }

      // //ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava
      // modifiedsatava = "10";
      // if (death == "no" && life_threatening== "no" && sig_consequences == "no" &&unanticipated_conversion== "no" && aborted_incomplete== "no" &&unplanned_stoma == "no" && organ == "no" && re_operation == "no" && bloodrange == "no") {
      //     //ModifiedSatava
      //     modifiedsatava = "I";
      // }
      // if ((conversion == "yes" ||unplanned_stoma == "yes" || organ == "yes" || bloodrange == "yes" || aborted_incomplete== "yes") && death == "no" && life_threatening== "no" && sig_consequences == "no" ) {
      //     //ModifiedSatava
      //     modifiedsatava = "II";
      // }
      // if (death == "yes" || life_threatening== "yes" || sig_consequences == "yes" || re_operation == "yes") {
      //     //ModifiedSatava
      //     modifiedsatava = "III";
      // }
      // if (modifiedsatava == "10") {
      //     //Failed to record a grade for Modified Satava
      //     modifiedsatava = "No record for Modified Satava.";
      // }

      // //ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra
      // classintra = "10";
      // if (death == "no" && life_threatening== "no" && sig_consequences == "no" &&unanticipated_conversion== "no" && aborted_incomplete== "no" &&unplanned_stoma == "no" && organ == "no" && intervention == "no" && re_operation == "no" && bloodrange == "no") {
      //   //ClassIntra
      //   classintra = "0";
      // }
      // if ((deviation == "yes" || bloodrange == "yes") && death == "no" && life_threatening== "no" && sig_consequences == "no" &&unanticipated_conversion== "no" && aborted_incomplete== "no" &&unplanned_stoma == "no" && organ == "no" && intervention == "no" && re_operation == "no") {
      //   //ClassIntra
      //   classintra = "I";
      // }
      // if ((intervention == "yes" || aborted_incomplete== "yes") && death == "no" && life_threatening== "no" && sig_consequences == "no" &&unanticipated_conversion== "no" &&unplanned_stoma == "no" && organ == "no" ) {
      //   //ClassIntra
      //   classintra = "II";
      // }
      // if ((conversion == "yes" || organ == "yes" || re_operation == "yes" || more_blood_units == "yes") && life_threatening== "no" && sig_consequences == "no" &&unplanned_stoma == "no" && death == "no") {
      //   //ClassIntra
      //   classintra = "III";
      // }
      // if ((life_threatening== "yes" || sig_consequences == "yes" ||unplanned_stoma == "yes" ) && death == "no" ) {
      //   //ClassIntra
      //   classintra = "IV";
      // }
      // if (death == "yes") {
      //   //ClassIntra
      //   classintra = "V";
      // }
      // if (classintra == "10") {
      //   //Failed to record a grade for Class Intra
      //   classintra = "No record for Class Intra.";
      // }
      // //EAES//EAES//EAES//EAES//EAES//EAES//EAES
      // eaes = "10";
      // if (death == "no" && life_threatening== "no" && sig_consequences == "no" &&unanticipated_conversion== "no" && aborted_incomplete== "no" &&unplanned_stoma == "no" && organ == "no" && intervention == "no" && re_operation == "no" && bloodrange == "no" && postop =="no" && icu == "no") {
      //   //EAES
      //   eaes = "1";
      // }
      // if ((deviation == "yes" || bloodrange == "yes") && death == "no" && life_threatening== "no" && sig_consequences == "no" &&unanticipated_conversion== "no" && aborted_incomplete== "no" &&unplanned_stoma == "no" && organ == "no" && intervention == "no" && re_operation == "no" && postop =="no" && icu == "no") {
      //   //EAES
      //   eaes = "2";
      // }
      // if ((intervention == "yes" || aborted_incomplete== "yes" ||unplanned_stoma == "no" && organ == "yes" || sig_consequences == "yes" ||unanticipated_conversion== "yes" || more_blood_units == "yes" || postop == "yes") && death == "no" && life_threatening== "no"  && icu == "no") {
      //   //EAES
      //   eaes = "3";
      // }
      // if ((life_threatening== "yes" || re_operation == "yes" || icu == "yes" ) && death == "no") {
      //   //EAES
      //   eaes = "4";
      // }
      // if (death == "yes") {
      //   //EAES
      //   eaes = "5";
      // }
      // if (eaes == "10") {
      //   //Failed to record a grade for EAES
      //   eaes = "No record for EAES";
      // }

      const listItem = document.querySelector("span#eauiaic");
      const newItem = document.createElement("span");
      newItem.setAttribute("id", "eauiaic");
      newItem.innerHTML = eauiaic;
      listItem.parentNode.replaceChild(newItem, listItem);

      // const listItem2 = document.querySelector("span#iaeseverity");
      // const newItem2 = document.createElement("span");
      // newItem2.setAttribute("id", "iaeseverity");
      // newItem2.innerHTML = iaeseverity;
      // listItem2.parentNode.replaceChild(newItem2, listItem2);

      // const listItem3 = document.querySelector("span#iaeseverity");
      // const newItem2 = document.createElement("span");
      // newItem2.setAttribute("id", "iaeseverity");
      // newItem2.innerHTML = iaeseverity;
      // listItem2.parentNode.replaceChild(newItem2, listItem2);
    });
  }
}
