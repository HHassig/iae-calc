import { Controller } from "@hotwired/stimulus"

// Live grade preview for the iAE calculator. The server owns the grading
// rules (app/models/iae_grading.rb); this controller posts the current
// answers to /grade and paints the returned grades into the results bar.
export default class extends Controller {
  static targets = ["form", "eauiaic", "severity", "satava", "classintra", "eaes"]

  connect() {
    this.refresh()
  }

  changed() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.refresh(), 120)
  }

  disconnect() {
    clearTimeout(this.timer)
  }

  async refresh() {
    if (!this.hasFormTarget) return

    let response
    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content
      response = await fetch("/grade", {
        method: "POST",
        headers: { "Accept": "application/json", ...(csrf && { "X-CSRF-Token": csrf }) },
        body: new FormData(this.formTarget)
      })
    } catch {
      return // offline or aborted: keep the previous values
    }
    if (!response.ok) return

    const { grades, bands } = await response.json()
    this.paint(this.eauiaicTarget, grades.eauiaic, bands.eauiaic)
    this.paint(this.severityTarget, grades.iae_severity + grades.suffix_t, bands.iae_severity)
    this.paint(this.satavaTarget, grades.modified_satava, bands.modified_satava)
    this.paint(this.classintraTarget, grades.class_intra, bands.class_intra)
    this.paint(this.eaesTarget, grades.eaes, bands.eaes)
  }

  paint(element, value, band) {
    element.textContent = value
    element.closest(".live-result").dataset.band = band
  }
}
