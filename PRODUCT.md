# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step. Constrained by the deploy target: GitHub Pages
(user account `kopi111`). Form submissions POST to a Google Apps Script web app
that appends a row to a Google Sheet the user owns.

## Users

Officers of the Jamaica Constabulary Force who attended a Divisional Tasking
Meeting at which the Telecommunications Division delivered a Sensitization and
Communication presentation. Any rank. They fill the survey out shortly after the
meeting, usually on a phone, from a link passed to them — so the form must be
completable one-handed on a small screen in a few minutes.

Secondary audience: the Telecommunications Division staff who read the collected
responses in the Google Sheet and act on them.

## Product Purpose

Collect structured feedback on whether the Telecommunications Division's
sensitization presentation landed: was it useful, did it improve disaster
readiness, what was missed, and what follow-up is wanted. Success is a body of
responses across divisions that tells Telecoms where to run follow-up
consultation and how to reach staff more effectively.

## Positioning

An internal JCF instrument, not a public form. Its authority comes from being
recognisably from the Telecommunications Division — an officer opening the link
must be able to tell within a second that this is official force business and
not a phishing page.

## Operating Context

- Distributed as a link after a Divisional Tasking Meeting (likely WhatsApp or
  email), opened mostly on mobile data.
- Subject matter is emergency and disaster communications readiness, which is
  why Q2 and Q3 turn on natural disaster preparedness.
- Responses are identified: Division/Formation, rank and unit are required so
  answers can be grouped by division and followed up; the officer's name is
  optional so criticism stays candid.

## Capabilities and Constraints

- Pure client-side; no server the user controls beyond the Apps Script endpoint.
- Google Apps Script endpoint URL is pasted into a single config value by the
  user after deploy; no API keys or secrets in the repo.
- Must degrade gracefully: if the endpoint fails, the respondent must not lose
  their answers.
- Terminology: "Division/Formation", "Rank", "Unit", "Divisional Tasking
  Meeting", "Sensitization and Communication Meeting", "Telecommunications
  Division". Jamaican/British English spelling throughout.

## Brand Commitments

- Name shown: Jamaica Constabulary Force — Telecommunications Division.
- No official crest file supplied. Identity is wordmark-led with a custom SVG
  insignia mark; the real crest can replace it later.

## Evidence on Hand

The user's eleven draft questions (paraphrased, some incomplete) are the only
supplied content. No real response data, no photography, no logo file, no
attendance figures. Nothing about turnout, past surveys, or division counts may
be fabricated on the page.

## Product Principles

1. Finishable on a phone in under five minutes, or it does not get filled out.
2. Look unmistakably official on first paint — credibility is a functional
   requirement, not decoration.
3. Never lose a respondent's answers to a bad connection.
4. Ask only what Telecoms will actually act on; every question maps to a
   decision they have to make.
5. Identified enough to follow up, anonymous enough to criticise.

## Accessibility & Inclusion

Mixed-age workforce on varied devices. Requires large tap targets, real form
labels, visible focus, keyboard operability, and text that holds up at small
sizes in bright outdoor light.
