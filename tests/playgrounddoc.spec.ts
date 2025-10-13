import { test } from "@playwright/test";
import StaticTablePage from "../Pages/staticPage";
import fs from "fs";

test.describe("Static Table Export Validations", () => {
  let staticTablePage: StaticTablePage;

  test.beforeEach(async ({ page }) => {
    staticTablePage = new StaticTablePage(page);
    await page.goto("https://www.playground.testingmavens.tools/components"); // Replace with your app URL
    await staticTablePage.goToStaticTablePage();
  });
  test("Validate Excel contains page table data", async ({ page }) => {
    const tableData = await staticTablePage.getTableData();
    const excelPath = await staticTablePage.downloadExcel();
    if (!fs.existsSync(excelPath)) {
      throw new Error(`Excel file not found at path: ${excelPath}`);
    }
    await staticTablePage.validateExcel(excelPath, tableData);
  });
});
