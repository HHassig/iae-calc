import { Controller } from "@hotwired/stimulus"
export default class extends Controller {
  static targets = ["detail"]

  connect() {
    console.log("Hi");
    // load default results
    // var eauiaic = "No record";
    // var iaeseverity = "No record";
    // var modifiedsatava = "No record";
    // var classintra = "No record";
    // var suffixt = "No record";
    // var eaes = "No record";
    const eauiaic = document.querySelector("#eauiaic");
    $('input[type=radio]').click(function(e) {
      var selected = $("input[type='radio'][name='death']:checked");
      var death = selected.val();
      console.log(death);
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
      eauiaic.insertAdjacentHTML("beforeend", death);
    });
  }
}
