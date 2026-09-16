# Sensitization & Communication Survey

Feedback survey for officers who attended the **Telecommunications Division's**
Sensitization and Communication presentation at their Divisional Tasking Meeting.

Static HTML, CSS and JavaScript. No build step, no framework, no server.
Responses are appended to a Google Sheet you own.

---

## Step 1 — Create the Google Sheet and the endpoint

1. Go to <https://sheets.new> and name the spreadsheet
   **JCF Telecoms — Sensitization Survey Responses**.
2. In that sheet, choose **Extensions → Apps Script**.
3. Delete whatever is in `Code.gs` and paste in the full contents of
   [`apps-script/Code.gs`](apps-script/Code.gs) from this repository. Save.
4. Click **Deploy → New deployment**.
   - Click the gear beside *Select type* and choose **Web app**.
   - **Description:** `Survey endpoint`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone` ← this must be *Anyone*, not
     *Anyone with a Google account*, or officers will be asked to sign in.
   - Click **Deploy**, then **Authorize access** and approve the prompts.
     Google will warn that the app is not verified; choose **Advanced → Go to
     (project name)** and continue. It is your own script.
5. Copy the **Web app URL**. It ends in `/exec`.

Open that URL in a browser to check it. It should print
`{"ok":true,"service":"JCF Telecoms sensitization survey"}`.

## Step 2 — Connect the site to it

Open [`assets/config.js`](assets/config.js) and paste the URL between the quotes:

```js
window.SURVEY_CONFIG = {
  endpoint: "https://script.google.com/macros/s/AKfycb..................../exec",
  ...
};
```

Commit and push. That file holds no secret — the endpoint only accepts new rows,
it never hands anything back.

> **Until you do this**, the site runs in preview mode: the form works end to end
> but responses are held in the respondent's browser instead of being sent. The
> thank-you screen says so plainly rather than pretending it saved.

## Step 3 — Publish on GitHub Pages

In the repository: **Settings → Pages → Build and deployment**, set
*Source* to **Deploy from a branch**, branch **main**, folder **/ (root)**, save.

The site appears at `https://<user>.github.io/<repo>/` within a minute or two.
Share that link at the next Tasking Meeting.

## Changing the deployed script later

Apps Script keeps the `/exec` URL stable **only** if you redeploy as a new
version of the *same* deployment: **Deploy → Manage deployments →** pencil icon
**→ Version: New version → Deploy**. Creating a *new deployment* instead gives
you a different URL, and you would have to update `config.js` again.

---

## What the survey asks

| Section | Covers |
|---|---|
| 1. Your details | Division/formation, rank, unit, attendance. Name and contact optional. |
| 2. The presentation | How helpful the areas were, which landed, whether it was pitched right. |
| 3. Disaster readiness | Usefulness in a natural disaster, whether the officer is better prepared, remaining concerns. |
| 4. Gaps & follow-up | Areas not suitably addressed, whether follow-up consultation is needed and how soon. |
| 5. Communication & access | Best channels to reach staff, actions taken since, whether the local office is engaging, how to improve access, overall rating. |

Conditional questions only appear when they are relevant — asking "which areas
were not addressed" only after someone says there were any.

## Files

```
index.html              the page shell
assets/app.css          the design system
assets/app.js           survey schema, rendering, validation, submission
assets/config.js        the one value you paste after deploying — nothing else
assets/jcf-crest.png    the official JCF crest
apps-script/Code.gs     the Google Apps Script endpoint
DESIGN.md               the visual system and why it is what it is
PRODUCT.md              who this is for and what it must not fabricate
```

## Notes on how it behaves

- **Answers are never lost to a bad signal.** Every change is drafted to the
  device, so closing the page and reopening it resumes where the officer left
  off. A submission that cannot reach Google is queued and retried
  automatically the next time the page is opened with a connection.
- **Works on a phone in daylight.** Light ground, 56px minimum tap targets, and
  selected options invert *and* carry a stamped check, so they read without
  relying on colour.
- **Keyboard and screen-reader operable**, with visible focus throughout and
  motion disabled under `prefers-reduced-motion`.
- **`noindex`** is set — this is internal, not a public page.

## Editing the questions

Everything lives in the `SECTIONS` array at the top of `assets/app.js`. Add a
question there, then add a matching entry to `COLUMNS` in `apps-script/Code.gs`
so it gets its own column in the sheet, and redeploy the script as a new version
of the existing deployment.
