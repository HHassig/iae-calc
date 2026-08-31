# iAE Grade Calculator

An [ICARUS Global Surgical Collaboration](https://clinicaltrials.gov/study/NCT05270603) tool that
grades an intraoperative adverse event (iAE) across the five published classification systems from
15 yes/no questions, live as you answer. Signed-in users can save entries and export them as CSV.

Live at https://iae-calc.hassig.com

## Grading systems

| Scale | Range | Source |
|---|---|---|
| EAUiaiC | 0 – 5B | Biyani et al., Eur Urol 2020 ([doi](https://doi.org/10.1016/j.eururo.2019.11.015)) |
| iAE Severity | I – VI (+T) | Kaafarani et al., J Am Coll Surg 2014 ([doi](https://doi.org/10.1016/j.jamcollsurg.2013.12.060)) |
| Modified Satava | I – III | Kazaryan et al., ISRN Surg 2013 ([doi](https://doi.org/10.1155/2013/625093)) |
| ClassIntra | 0 – V | Dell-Kuster et al., BMJ 2020 ([doi](https://doi.org/10.1136/bmj.m2917)) |
| EAES | 1 – 5 | Francis et al., Surg Endosc 2018 ([doi](https://doi.org/10.1007/s00464-018-6108-1)) |

## Architecture

All grading rules live in **one place**: [`app/models/iae_grading.rb`](app/models/iae_grading.rb)
(questions, rules, scale metadata, severity bands). Rules are evaluated most-severe-first, so
overlapping answers always receive the highest applicable grade.

- The live calculator posts answers to `POST /grade` (Stimulus
  [`calculator_controller.js`](app/javascript/controllers/calculator_controller.js)); the server
  returns grades + severity bands as JSON. There is no client-side copy of the rules.
- Saving an entry recomputes grades in a `before_save` on `Survey` — client-submitted grades are
  never trusted.

## Development

```
bundle install
bin/rails db:prepare
bin/dev          # http://localhost:3000
bin/rails test   # includes an exhaustive check over all 32,768 answer combinations
```

## Deploy

Kamal to inspiron (`config/deploy.yml`), local registry on `127.0.0.1:5556`:

```
kamal deploy
```

Rails 8 · SQLite · importmap · Tailwind + Sprockets/SCSS · Devise
