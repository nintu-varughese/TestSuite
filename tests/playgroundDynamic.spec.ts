import { test, expect } from "@playwright/test";
import DynamicTableExportPage from "../Pages/dynamicPage";
import * as path from "path";
import * as fs from "fs";
import * as XLSX from "xlsx";

test("Add row and verify in exported Excel", async ({ page }) => {
  const tablePage = new DynamicTableExportPage(page);
  const downloadDir = path.resolve("./downloads");
  if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir);
  await tablePage.navigate();
  const rowData = {
    name: "New Item",
    category: "Electronics",
    price: "1200",
    stock: "10",
  };
  await tablePage.addRow(
    rowData.name,
    rowData.category,
    rowData.price,
    rowData.stock
  );
  await tablePage.exportToExcel(downloadDir);
  const exportedFile = path.join(downloadDir, "exported_table.xlsx");
  expect(fs.existsSync(exportedFile)).toBeTruthy();

  // Read Excel content
  const workbook = XLSX.readFile(exportedFile);
  const sheetName = workbook.SheetNames[0];
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Check that a matching row exists
  const addedRow = sheet.find(
    (row: any) =>
      row.name?.toLowerCase() === rowData.name.toLowerCase() &&
      row.category?.toLowerCase() === rowData.category.toLowerCase() &&
      String(row.price) === rowData.price &&
      String(row.stock) === rowData.stock
  );
  expect(addedRow, "Expected added row to appear in Excel export").toBeTruthy();
});
