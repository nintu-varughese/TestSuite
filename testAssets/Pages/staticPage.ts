import { Page, expect } from "@playwright/test";
import path from "path";
import * as XLSX from "xlsx";

/**
 * Handles operations related to the Static Table Export page,
 * including navigation, table data extraction, Excel export, and validation.
 */
export default class StaticTablePage {
  readonly page: Page;

  // Use artifacts folder for downloads
  artifactsDir = path.resolve(process.cwd(), ".artifacts");

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  componentsLink = '//a[@href="/components/static-table-export"]';
  excelExportBtn = '//button[text()="📊 Export to Excel"]';
  tableRows = '//div[@class="overflow-x-auto"]//tbody/tr';
  tableHeaders = '//div[@class="overflow-x-auto"]//thead/tr/th';
  exportPdfButton = '//a[text()="📋 Export to PDF"]';

  async goToStaticTablePage() {
    await this.page.click(this.componentsLink);
    await expect(this.page, "wrong url displayed").toHaveURL(/.*static-table-export/);
  }

  async getTableData() {
    const headers = await this.page.$$eval(this.tableHeaders, (th) =>
      th.map((el) => el.textContent?.trim())
    );
    const rows = await this.page.$$eval(this.tableRows, (trs) =>
      trs.map((tr) =>
        Array.from(tr.querySelectorAll("td")).map((td) =>
          td.textContent?.trim()
        )
      )
    );
    return { headers, rows };
  }

  async downloadExcel(): Promise<string> {
    const downloadFileName = "static_employee_data.xlsx";
    // Ensure artifacts directory exists
    const fs = await import("fs/promises");
    await fs.mkdir(this.artifactsDir, { recursive: true });

    const downloadPath = path.join(this.artifactsDir, downloadFileName);

    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.click(this.excelExportBtn),
    ]);

    await download.saveAs(downloadPath);
    return downloadPath;
  }

  async validateExcel(
    pathToExcel: string,
    tableData: { headers: string[]; rows: string[][] }
  ) {
    const workbook = XLSX.readFile(pathToExcel);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const excelJson: any[][] = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    });

    // Normalize headers (case-insensitive)
    const excelHeaders = (excelJson[0] as string[]).map((h) =>
      h.toLowerCase().trim()
    );
    const pageHeaders = tableData.headers.map((h) => h.toLowerCase().trim());
    expect(excelHeaders, "Header data is not expected").toEqual(pageHeaders);

    // Normalize rows: convert all values to strings and format salary like page table
    const excelRows = excelJson.slice(1).map((row) =>
      row.map((cell, idx) => {
        if (idx === 0) return String(cell); // ID as string
        if (idx === 5) return `$${Number(cell).toLocaleString()}`; // Salary with $ and commas
        return String(cell); // other cells as strings
      })
    );

    // Validate rows
    expect(excelRows, "Excel rows are not equal").toEqual(tableData.rows);
  }
}
