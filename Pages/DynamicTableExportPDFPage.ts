import { Page, expect, Locator } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";

export default class DynamicTableExportPDFPage {
  readonly page: Page;
  readonly nameInp: Locator;
  readonly categoryInp: Locator;
  readonly priceInp: Locator;
  readonly stockInp: Locator;
  readonly addButton: Locator;
  readonly pdfButton: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;
  downloadDir = path.resolve(__dirname, "../pgdownloads");
  constructor(page: Page) {
    this.page = page;
    this.nameInp = page.locator('//input[@placeholder="Name"]');
    this.categoryInp = page.locator('//input[@placeholder="Category"]');
    this.priceInp = page.locator('//input[@placeholder="Price"]');
    this.stockInp = page.locator('//input[@placeholder="Stock"]');
    this.addButton = page.locator('//button[contains(text(), "Add Row")]');
    this.pdfButton = page.locator('//a[text()="📋 Export to PDF"]');
    this.tableHeaders = page.locator('//div[@class="overflow-x-auto"]//thead/tr/th');
    this.tableRows = page.locator('//div[@class="overflow-x-auto"]//tbody/tr');

    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir, { recursive: true });
    }
  }

  async navigate() {
    await this.page.goto("https://www.playground.testingmavens.tools/components");
    await this.page.locator('//a[@href="/components/dynamic-table-export"]').click();
    await expect(this.page,"Loaded url is not correct").toHaveURL(/.*dynamic-table-export/);
  }

  async addRow(name: string, category: string, price: string, stock: string) {
    await this.nameInp.fill(name);
    await this.categoryInp.fill(category);
    // For input[type=number], price must be numeric string (remove $ or commas if present)
    const numericPrice = price.replace(/[^0-9.]/g, "");
    await this.priceInp.fill(numericPrice);
    await this.stockInp.fill(stock);
    await this.addButton.click();
  }

  async getHeadersAndRows() {
    const headers = await this.page.$$eval('//div[@class="overflow-x-auto"]//thead/tr/th', hs =>
      hs.map(el => el.textContent?.trim() || "")
    );
    const rows = await this.page.$$eval('//div[@class="overflow-x-auto"]//tbody/tr', trs =>
      trs.map(tr =>
        Array.from(tr.querySelectorAll("td")).map(td => td.textContent?.trim() || "")
      )
    );
    return { headers, rows };
  }

  async exportToPDF(): Promise<string> {
    const fileName = "dynamic_table_export.pdf";
    const filePath = path.join(this.downloadDir, fileName);
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.pdfButton.click(),
    ]);
    await download.saveAs(filePath);
    return filePath;
  }

  async extractPdfText(pdfPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const results: string[] = [];
      new PdfReader().parseFileItems(pdfPath, (err, item) => {
        if (err) return reject(err);
        if (!item) return resolve(results.join(" "));
        if (item.text) results.push(item.text.trim());
      });
    });
  }

  async validateAllTableDataPDF(pdfPath: string, tableData: { headers: string[], rows: string[][] }) {
    if (!fs.existsSync(pdfPath)) throw new Error(`PDF file not found at path: ${pdfPath}`);
    const pdfText = await this.extractPdfText(pdfPath);
    const normPdf = pdfText.replace(/[\$,]/g, "").replace(/\s+/g, "").toLowerCase();

    // Skip "Actions" column as it is not in the PDF export
    const excludedHeaders = ["actions"];

    for (const header of tableData.headers) {
      const normHeader = header.replace(/[\$,]/g, "").replace(/\s+/g, "").toLowerCase();
      if (excludedHeaders.includes(normHeader)) continue;
      if (!normPdf.includes(normHeader)) {
        throw new Error(`Header "${header}" not found in PDF`);
      }
    }

    for (const row of tableData.rows) {
      // Skip last cell assuming it is "Actions"
      for (const cell of row.slice(0, -1)) {
        const normCell = cell.replace(/[\$,]/g, "").replace(/\s+/g, "").toLowerCase();
        if (!normPdf.includes(normCell)) {
          throw new Error(`Cell value "${cell}" not found in PDF`);
        }
      }
    }
  }
}
