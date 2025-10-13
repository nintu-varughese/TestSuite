import { Page, test, Locator, expect } from "@playwright/test";
import { threadCpuUsage } from "process";
import fs from "fs";
import path from "path";
import { escape } from "querystring";

export default class CustomTask {
  readonly page: Page;
  readonly Morelink: Locator;
  readonly Downloadpage: Locator;
  readonly Downloadpageheading: Locator;
  readonly textBoxTxt: Locator;
  readonly GenerateButton: Locator;
  readonly Downloadfil: Locator;
  readonly Mainhead: Locator;
  readonly UploadPage: Locator;
  readonly UploadInput: Locator;
  readonly removebutton: Locator;
  readonly uploadbutton: Locator;
  readonly BrowseFile: Locator;
  readonly interactionLink: Locator;
  readonly Staticlink: Locator;
  readonly Dragandrop: Locator;
  readonly dragim1: Locator;
  readonly dragim2: Locator;
  readonly dragim3: Locator;
  readonly droparea: Locator;
  readonly checkdrop: Locator;
  readonly dynamicLink: Locator;
  readonly downloadButton: Locator;
  readonly angularImage: Locator;
  readonly mongoImage: Locator;
  readonly nodeImage: Locator;
  readonly staticPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Morelink = page.locator('//a[text()="More"]');
    this.Downloadpage = page.locator('//a[text()="File Download"]');
    this.Downloadpageheading = page.locator(
      '//h2[text()="File Download Demo for Automation"]'
    );
    this.textBoxTxt = page.locator('//textarea[@id="textbox"]');
    this.GenerateButton = page.locator('//button[@id="createTxt"]');
    this.Downloadfil = page.locator('//a[@id="link-to-download"]');
    this.Mainhead = page.locator('//h1[text()="Automation Demo Site "]');
    this.UploadPage = page.locator('//a[text()="File Upload"]');
    this.UploadInput = page.locator('//input[@id="input-4"]');
    this.removebutton = page.locator('//span[text()="Remove"]');
    this.uploadbutton = page.locator('//span[text()="Upload"]');
    this.BrowseFile = page.locator('//span[text()="Browse …"]');
    this.interactionLink = page.locator('//a[text()="Interactions "]');
    this.Staticlink = page.locator('//a[text()="Static "]');
    this.Dragandrop = page.locator('//a[text()="Drag and Drop "]');
    this.dragim1 = page.locator('//img[@id="angular"]');
    this.dragim2 = page.locator('//img[@id="mongo"]');
    this.dragim3 = page.locator('//img[@id="node"]');
    this.droparea = page.locator('//div[@id="droparea"]');
    this.checkdrop = page.locator('//div[@id="droparea"]');
    this.dynamicLink = page.locator('//a[text()="Dynamic "]');
    this.downloadButton = page.locator("#link-to-download");

    this.droparea = page.locator('//div[@id="droparea"]');
    this.angularImage = page.locator('//img[@id="angular"]');
    this.mongoImage = page.locator('//img[@id="mongo"]');
    this.nodeImage = page.locator('//img[@id="node"]');

    this.staticPage = page.locator('//a[text()="Static "]');
  }

  /**
   * Navigate to the demo website.
   * @param {void} - No parameters required.
   */
  async Launchwebsite() {
    await this.page.goto("https://demo.automationtesting.in/Static.html");
    await this.page.waitForTimeout(1000);
  }

  /**
   * Navigate to the "More" page.
   * @param {void} - No parameters required.
   */
  async GotoMorepage() {
    await this.Morelink.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Navigate to the "File Download" page.
   * @param {void} - No parameters required.
   */
  async NavigatetoDownloadpage() {
    await this.Downloadpage.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Enter text in the download text box.
   * @param {void} - No parameters required.
   */
  async Enterdataintextbox() {
    await this.textBoxTxt.fill("Hi i am Batman");
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(1000);
  }

  /**
   * Click the "Generate" button to create the download link.
   * @param {void} - No parameters required.
   */
  async GenerateDownlink() {
    await this.GenerateButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Download the generated file and validate its contents.
   * @param {void} - No parameters required.
   * @returns {Promise<void>} Verifies file existence, extension, and content.
   */
  async DownloadFile() {
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
    expect(fileContent).toBe("Hi i am Batman");
  }

  /**
   * Navigate to the "File Upload" page.
   * @param {void} - No parameters required.
   */
  async NavigatetoUploadpage() {
    await this.UploadPage.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Upload a file to the page.
   * @param {void} - No parameters required; file path is hardcoded inside method.
   */
  async uploadFile() {
    const fileInput = this.UploadInput;
    await fileInput.setInputFiles("Pages\\downloads\\info.txt");
    await this.page.waitForTimeout(1000);
  }

  /**
   * Remove the uploaded file.
   * @param {void} - No parameters required.
   */
  async removeFile() {
    await this.removebutton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Submit the uploaded file.
   * @param {void} - No parameters required.
   */
  async submitupload() {
    await this.uploadbutton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Navigate to the "Interactions" link.
   * @param {void} - No parameters required.
   */
  async NavigattoInteraction() {
    await this.interactionLink.click();
  }

  /**
   * Navigate to the "Static" page.
   * @param {void} - No parameters required.
   */
  async Navigatetostatic() {
    await this.Staticlink.click();
    await this.page.waitForTimeout(5000);
  }

  /**
   * Navigate to the "Drag and Drop" page.
   * @param {void} - No parameters required.
   */
  async gotodraganddrop() {
    await this.Dragandrop.click();
  }

  /**
   * Perform drag and drop for static images.
   * @param {void} - No parameters required.
   * @returns {Promise<void>} Performs drag-and-drop for Angular, Mongo, and Node images.
   */
  async staticdraganddrop() {
    const loc = this.droparea;
    await this.angularImage.dragTo(loc);
    await this.mongoImage.dragTo(loc);
    await this.nodeImage.dragTo(loc);
    await this.page.waitForTimeout(5000);
  }

  /**
   * Navigate to the dynamic page.
   * @param {void} - No parameters required.
   */
  async Navigatetodynamic() {
    await this.staticPage.hover();
    await this.dynamicLink.click();
  }

  /**
   * Perform drag and drop for dynamic images.
   * @param {void} - No parameters required.
   * @returns {Promise<void>} Performs drag-and-drop for Angular, Mongo, and Node images dynamically.
   */
  async dynamicdraganddrop() {
    const loc = this.droparea;
    await this.angularImage.dragTo(loc);
    await this.mongoImage.dragTo(loc);
    await this.nodeImage.dragTo(loc);
  }
}
