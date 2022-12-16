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


    const eauiaic = document.querySelector("#eauiaic");
    eauiaic.insertAdjacentHTML("beforeend", noRecord);

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

    $('input[type=radio]').click(function(e) {
      var selected = $("input[type='radio'][name='threat']:checked");
      var threat = selected.val();
      $('.threatResult').html(threat);
      var selected = $("input[type='radio'][name='longterm']:checked");
      var longterm = selected.val();
      $('.longtermResult').html(longterm);
      var selected = $("input[type='radio'][name='consent']:checked");
      var consent = selected.val();
      $('.consentResult').html(consent);
      var selected = $("input[type='radio'][name='deviation']:checked");
      var deviation = selected.val();
      $('.deviationResult').html(deviation);
      var selected = $("input[type='radio'][name='conversion']:checked");
      var conversion = selected.val();
      $('.conversionResult').html(conversion);
      var selected = $("input[type='radio'][name='aborted']:checked");
      var aborted = selected.val();
      $('.abortedResult').html(aborted);
      var selected = $("input[type='radio'][name='stoma']:checked");
      var stoma = selected.val();
      $('.stomaResult').html(stoma);
      var selected = $("input[type='radio'][name='organ']:checked");
      var organ = selected.val();
      $('.organResult').html(organ);
      var selected = $("input[type='radio'][name='intervention']:checked");
      var intervention = selected.val();
      $('.interventionResult').html(intervention);
      var selected = $("input[type='radio'][name='postop']:checked");
      var postop = selected.val();
      $('.postopResult').html(postop);
      var selected = $("input[type='radio'][name='icu']:checked");
      var icu = selected.val();
      $('.icuResult').html(icu);
      var selected = $("input[type='radio'][name='reoperation']:checked");
      var reoperation = selected.val();
      $('.reoperationResult').html(reoperation);
      var selected = $("input[type='radio'][name='bloodrange']:checked");
      var bloodrange = selected.val();
      $('.bloodrangeResult').html(bloodrange);
      var selected = $("input[type='radio'][name='twounits']:checked");
      var twounits = selected.val();
      $('.twounitsResult').html(twounits);

      var eauiaic = "10";
        //EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC//EAUIAIC
        if (death == "no" && intervention =="no" && threat == "no" && longterm == "no" && consent == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && reoperation == "no" ) {
            //EAUIAIC
            eauiaic = "0";
        }
        if ((intervention == "yes" || twounits == "yes" ) && death == "no" && threat == "no" && longterm == "no" && consent == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && reoperation == "no" ) {
            //EAUIAIC
            eauiaic = "1";
        }
        if ((conversion == "yes" || longterm =="yes" || reoperation == "yes") && death == "no" && threat == "no" && consent == "no" && aborted == "no" && stoma == "no" && organ == "no" ) {
            //EAUIAIC
            eauiaic = "2";
        }
        if (death == "no" && threat == "yes" && consent == "no" && aborted == "no" && stoma == "no" && organ == "no") {
            //EAUIAIC
            eauiaic = "3";
        }
        if (death == "no" && consent == "no" && aborted == "no" && stoma == "no" && organ == "yes") {
            //EAUIAIC
            eauiaic = "4A";
        }
        if ((aborted == "yes" || stoma == "yes" ) && death == "no" && consent == "no" ) {
            //EAUIAIC
            eauiaic = "4B";
        }
        if (death == "no" && consent == "yes") {
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
        if (death == "no" && intervention == "no" && consent == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && reoperation == "no") {
            //iAE severity
            iaeseverity = "I";
        }
        if (death == "no"  && intervention == "yes" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && reoperation == "no") {
            //iAE severity
            iaeseverity = "II";
        }
        if (death == "no"  && conversion == "no" && aborted == "no" && organ == "yes" && reoperation == "no") {
            //iAE severity
            iaeseverity = "III";
        }
        if (death == "no" && (conversion == "yes" || aborted == "yes" || stoma == "yes" || consent == "yes") && reoperation == "no") {
            //iAE severity
            iaeseverity = "IV";
        }
        if (death == "no"  && reoperation == "yes") {
            //iAE severity
            iaeseverity = "V";
        }
        if (death == "yes") {
            //iAE severity
            iaeseverity = "VI";
        }
        var suffixt = "N/A";
        if (twounits == "yes") {
            //iAE severity
            suffixt = " T";
        }
        if (twounits == "no") {
            //iAE severity
            suffixt = " ";
        }
        if (iaeseverity == "10") {
            //Failed to record a grade for iAE severity
            iaeseverity = "No record for iAE Severity.";
        }

        //ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava//ModifiedSatava
        var modifiedsatava = "10";
        if (death == "no" && threat == "no" && longterm == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && reoperation == "no" && bloodrange == "no") {
            //ModifiedSatava
            modifiedsatava = "I";
        }
        if ((conversion == "yes" || stoma == "yes" || organ == "yes" || bloodrange == "yes" || aborted == "yes") && death == "no" && threat == "no" && longterm == "no" ) {
            //ModifiedSatava
            modifiedsatava = "II";
        }
        if (death == "yes" || threat == "yes" || longterm == "yes" || reoperation == "yes") {
            //ModifiedSatava
            modifiedsatava = "III";
        }
        if (modifiedsatava == "10") {
            //Failed to record a grade for Modified Satava
            modifiedsatava = "No record for Modified Satava.";
        }

        //ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra//ClassIntra
        var classintra = "10";
        if (death == "no" && threat == "no" && longterm == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && intervention == "no" && reoperation == "no" && bloodrange == "no") {
          //ClassIntra
          classintra = "0";
        }
        if ((deviation == "yes" || bloodrange == "yes") && death == "no" && threat == "no" && longterm == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && intervention == "no" && reoperation == "no") {
          //ClassIntra
          classintra = "I";
        }
        if ((intervention == "yes" || aborted == "yes") && death == "no" && threat == "no" && longterm == "no" && conversion == "no" && stoma == "no" && organ == "no" ) {
          //ClassIntra
          classintra = "II";
        }
        if ((conversion == "yes" || organ == "yes" || reoperation == "yes" || twounits == "yes") && threat == "no" && longterm == "no" && stoma == "no" && death == "no") {
          //ClassIntra
          classintra = "III";
        }
        if ((threat == "yes" || longterm == "yes" || stoma == "yes" ) && death == "no" ) {
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
        if (death == "no" && threat == "no" && longterm == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && intervention == "no" && reoperation == "no" && bloodrange == "no" && postop =="no" && icu == "no") {
          //EAES
          eaes = "1";
        }
        if ((deviation == "yes" || bloodrange == "yes") && death == "no" && threat == "no" && longterm == "no" && conversion == "no" && aborted == "no" && stoma == "no" && organ == "no" && intervention == "no" && reoperation == "no" && postop =="no" && icu == "no") {
          //EAES
          eaes = "2";
        }
        if ((intervention == "yes" || aborted == "yes" || stoma == "no" && organ == "yes" || longterm == "yes" || conversion == "yes" || twounits == "yes" || postop == "yes") && death == "no" && threat == "no"  && icu == "no") {
          //EAES
          eaes = "3";
        }
        if ((threat == "yes" || reoperation == "yes" || icu == "yes" ) && death == "no") {
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
      newItem.innerHTML = death;
      listItem.parentNode.replaceChild(newItem, listItem);

      const listItem2 = document.querySelector("span#iaeseverity");
      const newItem2 = document.createElement("span");
      newItem2.setAttribute("id", "iaeseverity");
      newItem2.innerHTML = iaeseverity;
      listItem2.parentNode.replaceChild(newItem2, listItem2);
    });
  }
}
