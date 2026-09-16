/**
 * JCF Telecommunications Division — Sensitization & Communication Survey
 *
 * Receives one survey response and appends it as a row to the sheet this
 * script is bound to. Deploy it as a web app (see README.md) and paste the
 * resulting /exec URL into assets/config.js.
 */

var SHEET_NAME = 'Responses';

var COLUMNS = [
  { key: 'reference',          header: 'Reference' },
  { key: 'submittedAt',        header: 'Submitted (UTC)' },
  { key: 'division',           header: 'Division / formation' },
  { key: 'rank',               header: 'Rank' },
  { key: 'unit',               header: 'Station / unit' },
  { key: 'attendance',         header: 'Attended?' },
  { key: 'officerName',        header: 'Name' },
  { key: 'contact',            header: 'Contact' },
  { key: 'helpful',            header: 'Q1 Areas helpful (1-5)' },
  { key: 'helpfulAreas',       header: 'Q1b Most helpful areas' },
  { key: 'clarity',            header: 'Q1c Pitched at right level' },
  { key: 'disasterUseful',     header: 'Q2 Useful in a disaster' },
  { key: 'betterPrepared',     header: 'Q3 Better prepared (1-5)' },
  { key: 'disasterConcern',    header: 'Q3b Biggest disaster concern' },
  { key: 'gapsExist',          header: 'Q4 Areas not addressed' },
  { key: 'gapsDetail',         header: 'Q4b Which areas' },
  { key: 'followUpNeeded',     header: 'Q5 Follow-up needed' },
  { key: 'followUpTopics',     header: 'Q5b Follow-up topics' },
  { key: 'followUpWhen',       header: 'Q5c Follow-up timeframe' },
  { key: 'commsChannels',      header: 'Q6 Improve communication via' },
  { key: 'commsBest',          header: 'Q6b Best single channel' },
  { key: 'actionsTaken',       header: 'Q7 Actions taken since' },
  { key: 'localOfficeEngaging',header: 'Q8 Local office engaging' },
  { key: 'localOfficeDetail',  header: 'Q8b What is going wrong' },
  { key: 'accessImprove',      header: 'Q9 Improve access via' },
  { key: 'overall',            header: 'Q10 Overall rating (1-5)' },
  { key: 'anythingElse',       header: 'Q11 Anything else' },
  { key: 'userAgent',          header: 'Device' }
];

/** Returns the Responses sheet, creating it with its header row if absent. */
function responseSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    writeHeaderRow(sheet);
  }
  return sheet;
}

function writeHeaderRow(sheet) {
  var headers = COLUMNS.map(function (column) { return column.header; });
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#314095')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

/** Flattens one answer into a single cell value. */
function cellValue(answer) {
  if (answer === null || answer === undefined) {
    return '';
  }
  if (Array.isArray(answer)) {
    return answer.join('; ');
  }
  return String(answer);
}

function rowFrom(response) {
  return COLUMNS.map(function (column) {
    return cellValue(response[column.key]);
  });
}

function jsonReply(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(request) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var response = JSON.parse(request.postData.contents);
    responseSheet().appendRow(rowFrom(response));
    return jsonReply({ ok: true, reference: response.reference || '' });
  } catch (error) {
    return jsonReply({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

/** Lets you confirm the deployment is live by opening the /exec URL. */
function doGet() {
  return jsonReply({ ok: true, service: 'JCF Telecoms sensitization survey' });
}
