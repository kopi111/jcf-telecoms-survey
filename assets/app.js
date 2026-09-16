/* =========================================================================
   JCF Telecommunications Division — Sensitization & Communication Survey
   Static, no build step. Answers are drafted locally and never lost to a
   bad connection; a failed submission is queued and retried.
   ========================================================================= */
(function () {
  "use strict";

  var DRAFT_KEY = "jcf-telecoms-survey/draft";
  var QUEUE_KEY = "jcf-telecoms-survey/queue";
  var COMMENT_LIMIT = 600;

  /* ---------------------------------------------------------------------
     Reference data
     --------------------------------------------------------------------- */

  var DIVISIONS = [
    "Kingston Central", "Kingston Eastern", "Kingston Western",
    "St. Andrew Central", "St. Andrew North", "St. Andrew South",
    "St. Catherine North", "St. Catherine South", "St. Thomas",
    "Clarendon", "Manchester", "St. Elizabeth",
    "St. James", "Hanover", "Westmoreland", "Trelawny",
    "St. Ann", "St. Mary", "Portland",
    "Mobile Reserve",
    "Public Safety and Traffic Enforcement Branch",
    "Criminal Investigation Branch",
    "Counter-Terrorism and Organised Crime Investigation Branch",
    "Narcotics Division",
    "Area Headquarters",
    "National Police College of Jamaica",
    "Telecommunications Division",
    "Other formation"
  ];

  var RANKS = [
    "District Constable", "Constable", "Corporal", "Sergeant", "Inspector",
    "Assistant Superintendent", "Deputy Superintendent", "Superintendent",
    "Senior Superintendent", "Assistant Commissioner", "Deputy Commissioner",
    "Civilian staff member", "Other"
  ];

  /* ---------------------------------------------------------------------
     The survey
     --------------------------------------------------------------------- */

  var SECTIONS = [
    {
      name: "Your details",
      title: "Your details",
      intro: "So responses can be grouped by formation and followed up. Your name is optional.",
      grid: true,
      questions: [
        { id: "division", type: "select", label: "Division or formation",
          required: true, options: DIVISIONS },
        { id: "rank", type: "select", label: "Rank", required: true, options: RANKS },
        { id: "unit", type: "text", label: "Station, unit or sub-office",
          hint: "For example: Half Way Tree Police Station, Traffic, Control Room.",
          required: true },
        { id: "attendance", type: "radio", label: "Were you at the presentation?",
          required: true, full: true,
          options: [
            "Yes, I attended in person",
            "No, but I was briefed on it afterwards",
            "No, I neither attended nor was briefed"
          ] },
        { id: "officerName", type: "text", label: "Your name",
          optional: true, hint: "Leave blank if you would rather answer anonymously." },
        { id: "contact", type: "text", label: "Contact for follow-up",
          optional: true, hint: "Email or mobile. Only used if you ask for a follow-up." }
      ]
    },

    {
      name: "The presentation",
      title: "The presentation",
      intro: "How useful the areas covered actually were.",
      questions: [
        { id: "helpful", type: "scale", label: "Were the areas of the presentation helpful?",
          required: true, lowLabel: "Not helpful", highLabel: "Extremely helpful",
          words: ["Not", "Slightly", "Fairly", "Very", "Extremely"] },
        { id: "helpfulAreas", type: "checkbox",
          label: "Which areas were the most helpful?",
          hint: "Choose as many as apply.", required: false,
          options: [
            "Radio procedure and voice discipline",
            "Call signs and net control",
            "Care, handling and charging of equipment",
            "Reporting faults and requesting repairs",
            "Communicating during a natural disaster",
            "Alternate communication when networks fail",
            "How to reach the Telecommunications Division",
            "Equipment issue, transfer and accountability"
          ] },
        { id: "clarity", type: "radio",
          label: "Was the presentation pitched at the right level for your officers?",
          required: true,
          options: [
            "Yes, about right",
            "Too basic — we needed more detail",
            "Too technical — it needed plainer terms",
            "Unsure"
          ] }
      ]
    },

    {
      name: "Disaster readiness",
      title: "Disaster readiness",
      intro: "Hurricane season, flooding, earthquake — whether this information holds up when it matters.",
      questions: [
        { id: "disasterUseful", type: "radio",
          label: "Will the information presented be useful in the event of a natural disaster?",
          required: true,
          options: ["Yes, definitely", "Probably", "Unsure", "No"] },
        { id: "betterPrepared", type: "scale",
          label: "Are you better prepared, having gained new information from the presentation?",
          required: true, lowLabel: "No change", highLabel: "Far better prepared",
          words: ["None", "A little", "Somewhat", "Well", "Fully"] },
        { id: "disasterConcern", type: "textarea",
          label: "What is your biggest remaining communication concern in a disaster?",
          optional: true,
          hint: "For example: dead spots, battery and charging, damaged repeaters, no backup to the mobile network.",
          placeholder: "The one thing that would leave you cut off…" }
      ]
    },

    {
      name: "Gaps & follow-up",
      title: "Gaps and follow-up",
      intro: "What was missed, and whether we need to come back.",
      questions: [
        { id: "gapsExist", type: "radio",
          label: "Were there any areas not suitably addressed by the presentation?",
          required: true, options: ["Yes", "No", "Not sure"] },
        { id: "gapsDetail", type: "textarea", label: "Which areas were not suitably addressed?",
          required: true, showIf: { id: "gapsExist", equals: "Yes" },
          placeholder: "Name the areas that were skipped or left unclear…" },
        { id: "followUpNeeded", type: "radio",
          label: "Is there a need for a follow-up consultation?",
          required: true, options: ["Yes", "No", "Not sure"] },
        { id: "followUpTopics", type: "textarea", label: "What should the follow-up cover?",
          required: true, showIf: { id: "followUpNeeded", equals: "Yes" },
          placeholder: "The topics worth a second visit…" },
        { id: "followUpWhen", type: "radio", label: "How soon should that follow-up happen?",
          required: true, showIf: { id: "followUpNeeded", equals: "Yes" },
          options: ["Within a month", "Within three months", "Within six months",
                    "Once a year is enough"] }
      ]
    },

    {
      name: "Communication & access",
      title: "Communication and access",
      intro: "How we reach your staff, what you have done since, and how to make us easier to get to.",
      questions: [
        { id: "commsChannels", type: "checkbox",
          label: "How can we improve our communication of this information to your staff?",
          hint: "Choose as many as apply.", required: true,
          options: [
            "Station visits by the Telecommunications team",
            "Telephone",
            "Email",
            "WhatsApp broadcast to a divisional group",
            "Printed handouts and Force Orders",
            "Short lectures at muster or parade",
            "A recorded video briefing officers can replay",
            "Refresher at each Divisional Tasking Meeting"
          ] },
        { id: "commsBest", type: "select",
          label: "Of those, which single channel works best for your division?",
          required: true,
          options: [
            "Station visits", "Telephone", "Email", "WhatsApp broadcast",
            "Printed handouts and Force Orders", "Lectures at muster or parade",
            "Recorded video briefing", "Refresher at Tasking Meetings"
          ] },
        { id: "actionsTaken", type: "checkbox",
          label: "What actions have you taken since the sensitization to improve communication?",
          hint: "Choose as many as apply.", required: true,
          options: [
            "Briefed my team",
            "Delivered a lecture or muster talk",
            "Carried out physical checks of radios and equipment",
            "Tested the radio net / carried out a net check",
            "Updated contact lists and call signs",
            "Reported outstanding faults to Telecommunications",
            "Assigned someone responsibility for communications",
            "Nothing yet"
          ] },
        { id: "localOfficeEngaging", type: "radio",
          label: "Is your local Telecommunications office engaging?",
          required: true, options: ["Yes", "No", "Not sure"] },
        { id: "localOfficeDetail", type: "textarea",
          label: "Tell us what is going wrong there.",
          required: true,
          showIfAny: { id: "localOfficeEngaging", equalsAny: ["No", "Not sure"] },
          placeholder: "Slow response, no answer on the line, no visits…" },
        { id: "accessImprove", type: "checkbox",
          label: "How do you think we can improve access to the Telecommunications Division?",
          hint: "Choose as many as apply.", required: true,
          options: [
            "A direct phone line to the division",
            "A named contact officer for each formation",
            "Scheduled meetings",
            "Team visits to divisions",
            "A dedicated WhatsApp or email address",
            "An on-call duty officer after hours",
            "A published fault-reporting procedure"
          ] },
        { id: "overall", type: "scale",
          label: "Overall, how would you rate the Sensitization and Communication Meeting?",
          required: true, lowLabel: "Poor", highLabel: "Excellent",
          words: ["Poor", "Fair", "Good", "Very good", "Excellent"] },
        { id: "anythingElse", type: "textarea",
          label: "Anything else the Telecommunications Division should know?",
          optional: true, placeholder: "The floor is yours…" }
      ]
    }
  ];

  /* ---------------------------------------------------------------------
     Small helpers
     --------------------------------------------------------------------- */

  function el(id) { return document.getElementById(id); }

  function make(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function readStored(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStored(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function clearStored(key) {
    try { window.localStorage.removeItem(key); } catch (error) { /* nothing to do */ }
  }

  function countQuestions() {
    return SECTIONS.reduce(function (total, section) {
      return total + section.questions.filter(function (question) {
        return !question.showIf && !question.showIfAny;
      }).length;
    }, 0);
  }

  function buildReference() {
    var stamp = new Date();
    var digits = String(stamp.getFullYear()).slice(2)
      + String(stamp.getMonth() + 1).padStart(2, "0")
      + String(stamp.getDate()).padStart(2, "0");
    var tail = Math.floor(1000 + Math.random() * 9000);
    return "TCD-" + digits + "-" + tail;
  }

  function checkMark() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3 8.5 6.5 12 13 4.5");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2.6");
    path.setAttribute("stroke-linecap", "square");
    svg.appendChild(path);
    return svg;
  }

  /* ---------------------------------------------------------------------
     Rendering
     --------------------------------------------------------------------- */

  function renderChoice(question, isMultiple) {
    var group = make("div", "opts");
    question.options.forEach(function (option, index) {
      var label = make("label", "opt");
      var input = document.createElement("input");
      input.type = isMultiple ? "checkbox" : "radio";
      input.name = question.id;
      input.value = option;
      input.id = question.id + "-" + index;

      var mark = make("span", "opt__mark" + (isMultiple ? "" : " opt__mark--radio"));
      mark.appendChild(checkMark());

      label.appendChild(input);
      label.appendChild(mark);
      label.appendChild(make("span", "opt__text", option));
      group.appendChild(label);
    });
    return group;
  }

  function renderScale(question) {
    var wrap = make("div");
    var row = make("div", "scale");
    question.words.forEach(function (word, index) {
      var value = index + 1;
      var cell = make("label", "scale__cell");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = question.id;
      input.value = String(value);
      var anchor = index === 0 ? question.lowLabel
        : (index === question.words.length - 1 ? question.highLabel : word);
      input.setAttribute("aria-label", value + " of 5 — " + anchor);
      cell.appendChild(input);
      cell.appendChild(make("span", "scale__num", String(value)));
      cell.appendChild(make("span", "scale__word", word));
      row.appendChild(cell);
    });
    wrap.appendChild(row);
    return wrap;
  }

  function renderSelect(question) {
    var select = make("select", "field__select");
    select.name = question.id;
    select.id = question.id;
    var blank = make("option", null, "Choose…");
    blank.value = "";
    select.appendChild(blank);
    question.options.forEach(function (option) {
      var node = make("option", null, option);
      node.value = option;
      select.appendChild(node);
    });
    return select;
  }

  function renderTextarea(question) {
    var wrap = make("div");
    var area = make("textarea", "field__textarea");
    area.name = question.id;
    area.id = question.id;
    area.rows = 4;
    area.maxLength = COMMENT_LIMIT;
    if (question.placeholder) { area.placeholder = question.placeholder; }

    var count = make("span", "field__count", COMMENT_LIMIT + " characters left");
    area.addEventListener("input", function () {
      var left = COMMENT_LIMIT - area.value.length;
      count.textContent = left + " characters left";
    });

    wrap.appendChild(area);
    wrap.appendChild(count);
    return wrap;
  }

  function renderText(question) {
    var input = make("input", "field__input");
    input.type = "text";
    input.name = question.id;
    input.id = question.id;
    if (question.placeholder) { input.placeholder = question.placeholder; }
    return input;
  }

  function renderControl(question) {
    if (question.type === "radio") { return renderChoice(question, false); }
    if (question.type === "checkbox") { return renderChoice(question, true); }
    if (question.type === "scale") { return renderScale(question); }
    if (question.type === "select") { return renderSelect(question); }
    if (question.type === "textarea") { return renderTextarea(question); }
    return renderText(question);
  }

  function isChoiceQuestion(question) {
    return question.type === "radio" || question.type === "checkbox" || question.type === "scale";
  }

  function renderQuestion(question) {
    var usesFieldset = isChoiceQuestion(question);
    var block = make(usesFieldset ? "fieldset" : "div", "q");
    block.dataset.question = question.id;
    if (question.full || usesFieldset || question.type === "textarea") {
      block.classList.add("q--full");
    }

    var heading = make(usesFieldset ? "legend" : "label",
      usesFieldset ? "q__legend" : "q__label", question.label);
    if (!usesFieldset) { heading.setAttribute("for", question.id); }
    if (question.optional) {
      heading.appendChild(make("span", "q__optional", "Optional"));
    }
    block.appendChild(heading);

    if (question.hint) { block.appendChild(make("p", "q__hint", question.hint)); }
    block.appendChild(renderControl(question));

    var error = make("p", "q__error");
    error.id = question.id + "-error";
    error.hidden = true;
    block.appendChild(error);

    if (question.showIf || question.showIfAny) {
      block.classList.add("followup");
      block.hidden = true;
    }
    return block;
  }

  function renderSection(section, index) {
    var node = make("section", "section");
    node.dataset.step = String(index);
    node.hidden = true;
    node.appendChild(make("h2", "section__title", section.title));
    node.appendChild(make("p", "section__intro", section.intro));

    var body = make("div", section.grid ? "form-grid" : null);
    section.questions.forEach(function (question) {
      body.appendChild(renderQuestion(question));
    });
    node.appendChild(body);
    return node;
  }

  /* ---------------------------------------------------------------------
     Reading and restoring answers
     --------------------------------------------------------------------- */

  var form = el("surveyForm");

  function allQuestions() {
    return SECTIONS.reduce(function (list, section) {
      return list.concat(section.questions);
    }, []);
  }

  function readAnswer(question) {
    if (question.type === "checkbox") {
      var checked = form.querySelectorAll('input[name="' + question.id + '"]:checked');
      return Array.prototype.map.call(checked, function (input) { return input.value; });
    }
    if (question.type === "radio" || question.type === "scale") {
      var picked = form.querySelector('input[name="' + question.id + '"]:checked');
      return picked ? picked.value : "";
    }
    var field = form.querySelector('[name="' + question.id + '"]');
    return field ? field.value.trim() : "";
  }

  function collectAnswers() {
    var answers = {};
    allQuestions().forEach(function (question) {
      answers[question.id] = readAnswer(question);
    });
    return answers;
  }

  function restoreAnswers(answers) {
    allQuestions().forEach(function (question) {
      var saved = answers[question.id];
      if (saved === undefined || saved === "" ) { return; }

      if (question.type === "checkbox") {
        (saved || []).forEach(function (value) {
          var box = form.querySelector('input[name="' + question.id + '"][value="' +
            window.CSS.escape(value) + '"]');
          if (box) { box.checked = true; }
        });
        return;
      }
      if (question.type === "radio" || question.type === "scale") {
        var radio = form.querySelector('input[name="' + question.id + '"][value="' +
          window.CSS.escape(saved) + '"]');
        if (radio) { radio.checked = true; }
        return;
      }
      var field = form.querySelector('[name="' + question.id + '"]');
      if (field) {
        field.value = saved;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  }

  /* ---------------------------------------------------------------------
     Conditional questions
     --------------------------------------------------------------------- */

  function isVisible(question) {
    if (question.showIf) {
      return readAnswer(byId(question.showIf.id)) === question.showIf.equals;
    }
    if (question.showIfAny) {
      return question.showIfAny.equalsAny.indexOf(readAnswer(byId(question.showIfAny.id))) !== -1;
    }
    return true;
  }

  function byId(id) {
    return allQuestions().filter(function (question) { return question.id === id; })[0];
  }

  function refreshConditionals() {
    allQuestions().forEach(function (question) {
      if (!question.showIf && !question.showIfAny) { return; }
      var block = form.querySelector('[data-question="' + question.id + '"]');
      if (block) { block.hidden = !isVisible(question); }
    });
  }

  /* ---------------------------------------------------------------------
     Validation
     --------------------------------------------------------------------- */

  function questionIsAnswered(question) {
    var answer = readAnswer(question);
    return question.type === "checkbox" ? answer.length > 0 : answer !== "";
  }

  function messageFor(question) {
    if (question.type === "checkbox") { return "Choose at least one option."; }
    if (isChoiceQuestion(question)) { return "Choose one option."; }
    if (question.type === "select") { return "Choose an option from the list."; }
    return "This answer is needed before you can continue.";
  }

  function showQuestionError(question, message) {
    var block = form.querySelector('[data-question="' + question.id + '"]');
    if (!block) { return; }
    block.classList.add("q--invalid");
    var error = el(question.id + "-error");
    error.textContent = message;
    error.hidden = false;
  }

  function clearQuestionError(question) {
    var block = form.querySelector('[data-question="' + question.id + '"]');
    if (!block) { return; }
    block.classList.remove("q--invalid");
    var error = el(question.id + "-error");
    error.hidden = true;
  }

  function validateSection(index) {
    var unanswered = [];
    SECTIONS[index].questions.forEach(function (question) {
      clearQuestionError(question);
      if (!question.required || !isVisible(question)) { return; }
      if (!questionIsAnswered(question)) {
        showQuestionError(question, messageFor(question));
        unanswered.push(question);
      }
    });
    return unanswered;
  }

  /* ---------------------------------------------------------------------
     Navigation
     --------------------------------------------------------------------- */

  var step = 0;
  var lastStep = SECTIONS.length - 1;

  function showStep(index, direction) {
    step = index;
    var nodes = form.querySelectorAll(".section");
    Array.prototype.forEach.call(nodes, function (node, position) {
      node.hidden = position !== index;
      if (position === index) {
        node.dataset.deploy = direction === "back" ? "back" : "in";
      } else {
        delete node.dataset.deploy;
      }
    });

    el("stepNow").textContent = String(index + 1).padStart(2, "0");
    el("progressName").textContent = SECTIONS[index].name;
    el("chevrons").setAttribute("aria-valuenow", String(index + 1));
    paintChevrons(index);

    el("backBtn").hidden = index === 0;
    el("nextBtn").hidden = index === lastStep;
    el("submitBtn").hidden = index !== lastStep;

    refreshConditionals();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function paintChevrons(index) {
    var bar = el("chevrons");
    Array.prototype.forEach.call(bar.children, function (chevron, position) {
      if (position < index) { chevron.dataset.state = "done"; }
      else if (position === index) { chevron.dataset.state = "current"; }
      else { delete chevron.dataset.state; }
    });
  }

  function goForward() {
    var unanswered = validateSection(step);
    if (unanswered.length > 0) {
      focusFirstProblem(unanswered[0]);
      return;
    }
    saveDraft();
    showStep(Math.min(step + 1, lastStep), "in");
  }

  function focusFirstProblem(question) {
    var block = form.querySelector('[data-question="' + question.id + '"]');
    if (!block) { return; }
    block.scrollIntoView({ behavior: "smooth", block: "center" });
    var focusable = block.querySelector("input, select, textarea");
    if (focusable) { focusable.focus({ preventScroll: true }); }
  }

  /* ---------------------------------------------------------------------
     Drafts
     --------------------------------------------------------------------- */

  var saveTimer = null;

  function saveDraft() {
    var stored = writeStored(DRAFT_KEY, { step: step, answers: collectAnswers() });
    el("savedNote").textContent = stored
      ? "Saved on this device"
      : "Could not save a draft on this device";
  }

  function scheduleSave() {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveDraft, 500);
  }

  /* ---------------------------------------------------------------------
     Submission
     --------------------------------------------------------------------- */

  function endpoint() {
    return (window.SURVEY_CONFIG && window.SURVEY_CONFIG.endpoint || "").trim();
  }

  function buildSubmission() {
    var answers = collectAnswers();
    answers.reference = buildReference();
    answers.submittedAt = new Date().toISOString();
    answers.userAgent = window.navigator.userAgent;
    return answers;
  }

  function send(payload) {
    return window.fetch(endpoint(), {
      method: "POST",
      /* text/plain keeps this a simple request, so no CORS preflight */
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    }).then(function (response) {
      if (!response.ok) { throw new Error("The server replied " + response.status + "."); }
      return response;
    });
  }

  function queueForRetry(payload) {
    var queue = readStored(QUEUE_KEY, []);
    queue.push(payload);
    writeStored(QUEUE_KEY, queue);
  }

  function flushQueue() {
    if (!endpoint()) { return; }
    var queue = readStored(QUEUE_KEY, []);
    if (queue.length === 0) { return; }

    var next = queue[0];
    send(next).then(function () {
      writeStored(QUEUE_KEY, queue.slice(1));
      flushQueue();
    }).catch(function () { /* stays queued for the next attempt */ });
  }

  function showError(heading, detail) {
    var box = el("formError");
    box.innerHTML = "";
    box.appendChild(make("strong", null, heading));
    box.appendChild(document.createTextNode(detail));
    box.hidden = false;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function finish(payload, wasHeldLocally) {
    clearStored(DRAFT_KEY);
    form.hidden = true;
    el("progress").hidden = true;
    el("done").hidden = false;
    el("doneRef").textContent = payload.reference;

    if (wasHeldLocally) {
      el("doneTitle").textContent = "Response saved on this device";
      el("doneBody").textContent = endpoint()
        ? "Your connection dropped, so your answers are held on this phone and "
          + "will be sent automatically the next time you open this page with a signal. "
          + "Please do not clear your browser data before then."
        : "This survey has not been connected to its response sheet yet, so your "
          + "answers are held on this device only. Once the Telecommunications "
          + "Division connects it, reopen this page and they will be sent.";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit(event) {
    event.preventDefault();
    el("formError").hidden = true;

    var unanswered = validateSection(step);
    if (unanswered.length > 0) {
      focusFirstProblem(unanswered[0]);
      return;
    }

    var payload = buildSubmission();
    var button = el("submitBtn");

    if (!endpoint()) {
      queueForRetry(payload);
      finish(payload, true);
      return;
    }

    button.disabled = true;
    button.textContent = "Sending…";

    send(payload).then(function () {
      finish(payload, false);
    }).catch(function () {
      queueForRetry(payload);
      finish(payload, true);
    }).then(function () {
      button.disabled = false;
      button.textContent = "Submit response";
    });
  }

  /* ---------------------------------------------------------------------
     Start-up
     --------------------------------------------------------------------- */

  function buildChevrons() {
    var bar = el("chevrons");
    SECTIONS.forEach(function () { bar.appendChild(make("span", "chevron")); });
  }

  function begin() {
    var draft = readStored(DRAFT_KEY, null);
    el("cover").hidden = true;
    form.hidden = false;
    el("progress").hidden = false;
    if (draft && draft.answers) {
      restoreAnswers(draft.answers);
      refreshConditionals();
    }
    showStep(draft ? Math.min(draft.step || 0, lastStep) : 0, "in");
  }

  function restart() {
    window.location.reload();
  }

  function init() {
    var host = el("sections");
    SECTIONS.forEach(function (section, index) {
      host.appendChild(renderSection(section, index));
    });

    buildChevrons();
    el("stepTotal").textContent = String(SECTIONS.length).padStart(2, "0");
    el("factQuestions").textContent = String(countQuestions());

    var draft = readStored(DRAFT_KEY, null);
    if (draft && draft.answers) {
      el("resumeNote").hidden = false;
      el("startBtn").textContent = "Resume the survey";
    }

    el("startBtn").addEventListener("click", begin);
    el("nextBtn").addEventListener("click", goForward);
    el("backBtn").addEventListener("click", function () {
      showStep(Math.max(step - 1, 0), "back");
    });
    el("againBtn").addEventListener("click", restart);
    form.addEventListener("submit", submit);

    form.addEventListener("change", function (event) {
      refreshConditionals();
      var name = event.target.name;
      var question = name ? byId(name) : null;
      if (question) { clearQuestionError(question); }
      scheduleSave();
    });
    form.addEventListener("input", scheduleSave);

    window.addEventListener("online", flushQueue);
    flushQueue();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
