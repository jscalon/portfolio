---
lang: en
title: "Sales Scorecards — Performance Reviews for the Whole Sales Force"
description: "Scorecard generator for the Mayoreo Group's sales force: it evaluates every sales rep, supervisor and manager on six indicators, writes a personalised reading of their results and delivers each scorecard as PDF and HTML, by email."
stack: ["TypeScript", "Node.js", "Puppeteer", "Handlebars", "Zod", "Nodemailer"]
cover: ../../../assets/covers/sales-scorecards.webp
featured: false
cv: false
order: 4
date: 2026-09-24
---

Scorecard generator for the sales force of the **Mayoreo Group**. It takes a period's closing
figures and evaluates every member of the sales force on six indicators, following its
hierarchy — sales rep, supervisor and manager. It writes a reading of the results meant for
each person, and delivers each scorecard as PDF and HTML, by email.

## The problem

Before, the "scorecard" each rep received was literally an Excel file with their figures:
sales, collections, assortment and customers. It was not visual, appealing or intuitive, and
the same file also held everyone else's results. On top of that, it was sent out one by one.

A table says how much someone sold, but it does not tell them how well they did against what
was expected of them, how they compare with people working in similar conditions, or where to
start improving. And giving every person that reading, in writing, was not feasible by hand:
there are dozens of reps per company, across several companies, and a hand-written review takes
time, varies with whoever writes it and is hard to keep consistent from one person to the next.

## The solution

A command-line tool that generates every scorecard in one go, from the same closing file the
company already produced. Each person receives only their own.

**Six indicators, one score out of a hundred.** Net sales, collections, order lines, SKUs,
brands and active customers, each with its own weight. Each indicator's attainment is actual
over target, and it earns points up to the target, never beyond: overshooting one does not
cover the gap in another. The total score places everyone in one of three bands.

**Each target, measured with the right yardstick.** Sales and collections are measured against
each zone's budget. The assortment indicators are measured against their level's standard, but
not all the same way: order lines grow with the size of the team, so their target is weighted by
size; SKUs and brands saturate — the catalogue is finite and the same brand in two zones counts
once — so their target is a simple average. Weighting them would have given large teams targets
that do not exist anywhere in the company.

![Performance detail table: actual, target, previous year, attainment, status and score for the six indicators](../../../assets/sales-scorecards/detail-table.webp)

*The performance detail, with sample data, weights and bands. Last year's figures are in view
as a reference but play no part in the calculation: the scorecard measures against the target,
not against oneself.*

**Each scorecard explains itself.** The text of each scorecard is written from its numbers: the
opening depends on the band, then what held up best, where the most points were lost and how
each comparison went. The three opportunities are the indicators where the most points were
lost, and each ends with a concrete next step. There are several wordings per case, chosen
deterministically: regenerating a scorecard never changes anyone's text, but two people with
the same result do not read the same thing.

![Three prioritised opportunities, each with its attainment bar, the situation in figures and a next step](../../../assets/sales-scorecards/opportunities.webp)

*The opportunities, with sample data. Each one states how many points can be recovered, the
situation in its own figures and a concrete next step: the scorecard does not stop at the
diagnosis.*

**Comparisons that inform.** Each rep sees their national, regional and local ranking. A group
of fewer than three people is not shown: "1 of 1" says nothing.

**One set of texts per level.** Supervisor scorecards consolidate their zones and do not reuse
the rep's wording: a supervisor does not visit customers, they lead the people who do, and
their gap almost always lies in a few zones, not all of them.

**Two formats, the same document.** Each scorecard comes out as PDF and as HTML, and each
format has its job. The PDF is the simple one: it fits exactly on two A4 pages and opens
anywhere. The HTML is the interactive one: self-contained, it opens on any phone with nothing
else needed and adds what paper cannot have. The score counts up to its value on opening, the
attainment bars fill as they scroll into view, each indicator shows its explanation on tap, and
hovering a table row highlights its opportunity too.

## My role

I was the **sole developer** of the tool: I designed the whole calculation and the texts, and
handled data loading, generation and delivery. I designed the scorecard's look together with
management, adjusting it to keep to the corporate visual standard.

- **Data:** reading the closing Excel file and matching it against each zone's org chart. Every
  row is validated with Zod, a library that checks at runtime that each value has the expected
  type and shape: an invalid row is reported and skipped without stopping the run. Exclusions
  are never silent: every run prints what was left out and why.
- **Periods:** besides the annual close, it evaluates any window of months. Over a quarter there
  is no distinct count, so those indicators are averaged across the months each zone has data
  for. The texts never name the period by hand: they use placeholders resolved for the period,
  so a quarterly scorecard does not say "fiscal year".
- **Texts:** over 400 conditional wordings, and a generated catalogue listing every one of them,
  the condition under which it appears and how many scorecards receive it, so management can
  approve the texts without opening each scorecard.
- **Rendering:** a Handlebars template converted to PDF with Puppeteer, using a single browser
  and a pool of reusable pages. The HTML's animations are switched off in the PDF.
- **Photos:** each scorecard carries its owner's photo. Photos are matched to names by
  similarity, tolerating word order, typos and middle names, and automatically cropped to a
  head-and-shoulders shot, anchoring the crop on the crown of the head and on the shoulder line
  that the uniform's polo shirt marks.
- **Delivery:** each rep receives their scorecards by email, with their supervisor copied. By
  default it is a dry run; the real send logs every email sent so it can resume without
  repeating, and it stops if an address does not resemble its owner's name, because sending
  someone another person's scorecard cannot be undone.
- **Several companies:** a single setting decides which one is generated. What differs between
  them — colour, fixed targets, ranking groups, exclusions — lives in each company's
  configuration.

## Project status

It was built for Febeca, to evaluate the close of the fiscal year, and management liked the
result so much that it decided to take that design to the rest of the group's companies. Later it stopped being used
only for the fiscal year: it also generates scorecards for other periods, such as quarters and
months. It marked a before and after in how scorecards are delivered: each person receives
their own, on its own, clear and by email, instead of a shared Excel file sent by hand.

It is an internal tool and its code lives in a private repository, so out of confidentiality
to the company this case does not include links. For the same reason, the screenshots use
invented data — sample people, figures, weights and bands; the only real face is mine, in place
of a sales rep.
