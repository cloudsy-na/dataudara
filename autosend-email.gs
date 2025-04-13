function kirimSheetSebagaiCSV() {
  const timezone = Session.getScriptTimeZone();  // atau bisa pakai SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const today = new Date();
  const tanggalSaja = Utilities.formatDate(today, timezone, "yyyy-MM-dd");

  const sheetName = "Data Udara"; // Ganti dengan nama sheet kamu
  const emailTujuan = "diawan.andri@gmail.com"; // Ganti dengan email tujuan
  const subject = "udara.jakarta_" + tanggalSaja;
  const body = "Berikut file CSV Data Udara yang dikirim otomatis dari Google Sheets. Tanggal  " + tanggalSaja;

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  let csv = data.map(row => row.join(",")).join("\n");

  const blob = Utilities.newBlob(csv, "text/csv", "udara.jakarta_" + tanggalSaja + ".csv");

  MailApp.sendEmail({
    to: emailTujuan,
    subject: subject,
    body: body,
    attachments: [blob]
  });
}
