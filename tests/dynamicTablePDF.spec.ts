import { test, expect } from "@playwright/test";
import DynamicTableExportPDFPage from "../Pages/DynamicTableExportPDFPage";
import fs from "fs";
import path from "path";

test("Add row and validate all table data in exported PDF", async ({ page }) => {
  const pdfPage = new DynamicTableExportPDFPage(page);
  const downloadDir = path.resolve("./pgdownloads");
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);

  await pdfPage.navigate();

  await pdfPage.addRow("Row PDF Test", "Books", "11.99", "7");

  const tableData = await pdfPage.getHeadersAndRows();

  const pdfPath = await pdfPage.exportToPDF();
  expect(fs.existsSync(pdfPath),"Pdf path doesnot exist").toBeTruthy();

  await pdfPage.validateAllTableDataPDF(pdfPath, tableData);
});
