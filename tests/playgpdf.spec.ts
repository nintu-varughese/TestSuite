import { test, expect } from "@playwright/test";
import StaticTablePDFPage from "../Pages/StaticTablePDFPage";
import fs from "fs";

test.describe("Static Table Export PDF Validations", () => {
  let pdfPage: StaticTablePDFPage;

  test.beforeEach(async ({ page }) => {
    pdfPage = new StaticTablePDFPage(page);
    await page.goto("https://www.playground.testingmavens.tools/components");
    await pdfPage.goToStaticTablePage();
  });

  test("Validate PDF contains page table data", async ({ page }) => {
    const tableData = await pdfPage.getTableData();
    const pdfPath = await pdfPage.downloadPDF();
    expect(fs.existsSync(pdfPath),"Path file doesnot exist").toBeTruthy();
    await pdfPage.validatePDF(pdfPath, tableData);
  });
});
