import { Page, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";

export default class StaticTablePDFPage {
  readonly page: Page;
  downloadDir = path.resolve(__dirname, "../pgdownloads");
  exportPdfButton = '//a[text()="📋 Export to PDF"]';
  tableHeaders = '//div[@class="overflow-x-auto"]//thead/tr/th';
  tableRows = '//div[@class="overflow-x-auto"]//tbody/tr';

  constructor(page: Page) {
    this.page = page;
    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir, { recursive: true });
    }
  }

  async goToStaticTablePage() {
    await this.page.click('//a[@href="/components/static-table-export"]');
    await expect(this.page,"Wrong url is displayed").toHaveURL(/.*static-table-export/);
  }

  async getTableData() {
    const headers = await this.page.$$eval(this.tableHeaders, ths =>
      ths.map(el => el.textContent?.trim() || "")
    );
    const rows = await this.page.$$eval(this.tableRows, trs =>
      trs.map(tr =>
        Array.from(tr.querySelectorAll("td")).map(td => td.textContent?.trim() || "")
      )
    );
    return { headers, rows };
  }

  async downloadPDF(): Promise<string> {
    const fileName = "static_employee_data.pdf";
    const filePath = path.join(this.downloadDir, fileName);
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.click(this.exportPdfButton),
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

  async validatePDF(
    pathToPDF: string,
    tableData: { headers: string[]; rows: string[][] }
  ) {
    if (!fs.existsSync(pathToPDF)) {
      throw new Error(`PDF file not found at path: ${pathToPDF}`);
    }
    const pdfText = await this.extractPdfText(pathToPDF);
    // Normalize for robust matching
    const normPdf = pdfText.replace(/[\$,]/g, "").replace(/\s+/g, "").toLowerCase();

    for (const header of tableData.headers) {
      const normHeader = header.replace(/[\$,]/g, "").replace(/\s+/g, "").toLowerCase();
      if (!normPdf.includes(normHeader)) {
        throw new Error(`Header "${header}" not found in PDF`);
      }
    }
    for (const row of tableData.rows) {
      for (const cell of row) {
        const normCell = cell.replace(/[\$,]/g, "").replace(/\s+/g, "").toLowerCase();
        if (!normPdf.includes(normCell)) {
          throw new Error(`Cell value "${cell}" not found in PDF`);
        }
      }
    }
  }
}
