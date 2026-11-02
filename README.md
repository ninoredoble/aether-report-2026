# Aether Report 2026

An interactive study, not a production system. One scroll-driven data story in the style of a printed annual report:
a small server room beside a small run-of-river hydro plant, followed month by month through a year.
A fixed chart on one side changes as you read the text on the other.

**All data is illustrative.** The river, the plant and the server room are invented. The monthly river shape is made up to
look like a river with a wet and a dry season; it is not taken from any gauge, plant or sensor. There are no live feeds,
no backend and no database. The page is static HTML, CSS and JavaScript, and the arithmetic runs in the browser.

## What the story shows

- A 220 kW plant whose output follows the river (84 kW in April, 220 kW in August).
- A server room drawing a flat 150 kW: 110 kW fixed load plus 40 kW of batch work.
- The river falls short from February to May and covers 91.1% of the year's electricity.
- If batch work is rescheduled towards the wet months (same yearly total), coverage rises to 97.9%.
  March and April still fall short; the study does not size a battery, grid tie or second source.

The month-by-month table is on the page, and a button downloads the same values as CSV (every row marked `illustrative`).

## Files

```
index.html   page and copy
styles.css   print-report layout, sticky stage, phone layout, reduced-motion rules
app.js       the model, the chart, and the scroll logic
assets/      four credited photographs from Wikimedia Commons (resized)
```

Works at phone width with no horizontal scroll. With `prefers-reduced-motion` the chart changes state without animating.

## Pictures

Photographs from Wikimedia Commons, resized: "Pulangi river in valencia" by arcibald (CC BY 2.0);
"Cagayan De Oro River, Borja Bridge Carmen", "Agus River, Iligan" by Patrickroque01 (CC BY-SA 4.0);
"Pulangi River, Maramag, Bukidnon, Philippines 002" by Obsidian Soul (CC BY-SA 4.0). They show real rivers; the study does not use any measurement of them.

## Licence

Code under the MIT licence, see `LICENSE`. Photographs keep their own licences above.
