import { Locator, Page, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";

export default class CustomTask {
  readonly page: Page;
  readonly moreLink: Locator;
  readonly downloadPage: Locator;
  readonly downloadPageHeading: Locator;
  readonly textBoxTxt: Locator;
  readonly generateButton: Locator;
  readonly downloadFil: Locator;
  readonly mainHead: Locator;
  readonly uploadPage: Locator;
  readonly uploadInput: Locator;
  readonly removeButton: Locator;
  readonly uploadButton: Locator;
  readonly browseFile: Locator;
  readonly interactionLink: Locator;
  readonly staticLink: Locator;
  readonly dragAndDrop: Locator;
  readonly dragIm1: Locator;
  readonly dragIm2: Locator;
  readonly dragIm3: Locator;
  readonly dropArea: Locator;
  readonly checkDrop: Locator;
  readonly dynamicLink: Locator;
  readonly downloadButton: Locator;
  readonly angularImage: Locator;
  readonly mongoImage: Locator;
  readonly nodeImage: Locator;
  readonly staticPage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.moreLink = page.locator('//a[text()="More"]');
    this.downloadPage = page.locator('//a[text()="File Download"]');
    this.downloadPageHeading = page.locator(
      '//h2[text()="File Download Demo for Automation"]'
    );
    this.textBoxTxt = page.locator('//textarea[@id="textbox"]');
    this.generateButton = page.locator('//button[@id="createTxt"]');
    this.downloadFil = page.locator('//a[@id="link-to-download"]');
    this.mainHead = page.locator('//h1[text()="Automation Demo Site "]');
    this.uploadPage = page.locator('//a[text()="File Upload"]');
    this.uploadInput = page.locator('//input[@id="input-4"]');
    this.removeButton = page.locator('//span[text()="Remove"]');
    this.uploadButton = page.locator('//span[text()="Upload"]');
    this.browseFile = page.locator('//span[text()="Browse …"]');
    this.interactionLink = page.locator('//a[text()="Interactions "]');
    this.staticLink = page.locator('//a[text()="Static "]');
    this.dragAndDrop = page.locator('//a[text()="Drag and Drop "]');
    this.dragIm1 = page.locator('//img[@id="angular"]');
    this.dragIm2 = page.locator('//img[@id="mongo"]');
    this.dragIm3 = page.locator('//img[@id="node"]');
    this.dropArea = page.locator('//div[@id="droparea"]');
    this.checkDrop = page.locator('//div[@id="droparea"]');
    this.dynamicLink = page.locator('//a[text()="Dynamic "]');
    this.downloadButton = page.locator("#link-to-download");

    this.angularImage = page.locator('//img[@id="angular"]');
    this.mongoImage = page.locator('//img[@id="mongo"]');
    this.nodeImage = page.locator('//img[@id="node"]');
    this.staticPage = page.locator('//a[text()="Static "]');
  }

  async launchWebsite() {
    await this.page.goto("https://demo.automationtesting.in/Static.html");
    await this.page.waitForTimeout(1000);
  }

  async gotoMorePage() {
    await this.moreLink.click();
    await this.page.waitForTimeout(1000);
  }

  async navigateToDownloadPage() {
    await this.downloadPage.click();
    await this.page.waitForTimeout(1000);
  }

  async enterDataInTextBox() {
    await this.textBoxTxt.fill("Hi i am Batman");
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000);
  }

  async generateDownLink() {
    await this.generateButton.click();
    await this.page.waitForTimeout(1000);
  }

  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadButton.click(),
    ]);
    const filePath = path.resolve(
      __dirname,
      "..",
      "testdata",
      await download.suggestedFilename()
    );
    await download.saveAs(filePath);
    expect(fs.existsSync(filePath)).toBeTruthy();
    expect(path.extname(filePath)).toBe(".txt");
    const fileContent = fs.readFileSync(filePath, "utf-8").trim();
    expect(fileContent,"Name is not Batman").toBe("Hi i am Batman");
  }

  async navigateToUploadPage() {
    await this.uploadPage.click();
    await this.page.waitForTimeout(1000);
  }

  async uploadFile() {
    const fileInput = this.uploadInput;
    await fileInput.setInputFiles("Pages\\downloads\\info.txt");
    await this.page.waitForTimeout(1000);
  }

  async removeFile() {
    await this.removeButton.click();
    await this.page.waitForTimeout(1000);
  }

  async submitUpload() {
    await this.uploadButton.click();
    await this.page.waitForTimeout(1000);
  }

  async navigateToInteraction() {
    await this.interactionLink.click();
  }

  async navigateToStatic() {
    await this.staticLink.click();
    await this.page.waitForTimeout(5000);
  }

  async gotoDragAndDrop() {
    await this.dragAndDrop.click();
  }

  async staticDragAndDrop() {
    const loc = this.dropArea;
    await this.angularImage.dragTo(loc);
    await this.mongoImage.dragTo(loc);
    await this.nodeImage.dragTo(loc);
    await this.page.waitForTimeout(5000);
  }

  async navigateToDynamic() {
    await this.staticPage.hover();
    await this.dynamicLink.click();
  }

  async dynamicDragAndDrop() {
    const loc = this.dropArea;
    await this.angularImage.dragTo(loc);
    await this.mongoImage.dragTo(loc);
    await this.nodeImage.dragTo(loc);
  }
}
