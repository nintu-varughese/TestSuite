import { Page, test, Locator, expect } from '@playwright/test';
import { threadCpuUsage } from 'process';
import fs from 'fs';
import path from 'path';
import { escape } from 'querystring';

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

  constructor(page: Page) {
    this.page = page;
    this.Morelink = page.locator('//a[text()="More"]');
    this.Downloadpage = page.locator('//a[text()="File Download"]');
    this.Downloadpageheading = page.locator('//h2[text()="File Download Demo for Automation"]');
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
  }

  // Navigate to the demo website
  async Launchwebsite() {
    await this.page.goto('https://demo.automationtesting.in/Static.html');
    await this.page.waitForTimeout(1000);
  }

  // Navigate to the "More" page
  async GotoMorepage() {
    await this.Morelink.click();
    await this.page.waitForTimeout(1000);
  }

  // Navigate to the "File Download" page
  async NavigatetoDownloadpage() {
    await this.Downloadpage.click();
    await this.page.waitForTimeout(1000);
  }

  // Enter text in the download text box
  async Enterdataintextbox() {
    await this.textBoxTxt.fill('Hi i am Batman');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000);
  }

  // Click the "Generate" button to create download link
  async GenerateDownlink() {
    await this.GenerateButton.click();
    await this.page.waitForTimeout(1000);
  }

  // Download the generated file and validate its contents
  async DownloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.page.locator("#link-to-download").click(),
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

  // Navigate to the "File Upload" page
  async NavigatetoUploadpage() {
    await this.UploadPage.click();
    await this.page.waitForTimeout(1000);
  }

  // Upload a file to the page
  async uploadFile() {
    const fileInput = this.UploadInput;
    await fileInput.setInputFiles('Pages\\downloads\\info.txt');
    await this.page.waitForTimeout(1000);
  }

  // Remove the uploaded file
  async removeFile() {
    await this.removebutton.click();
    await this.page.waitForTimeout(1000);
  }

  // Submit the uploaded file
  async submitupload() {
    await this.uploadbutton.click();
    await this.page.waitForTimeout(1000);
  }

  // Navigate to the "Interactions" link
  async NavigattoInteraction() {
    await this.interactionLink.click();
  }

  // Navigate to the "Static" page
  async Navigatetostatic() {
    await this.Staticlink.click();
    await this.page.waitForTimeout(5000);
  }

  // Navigate to the "Drag and Drop" page
  async gotodraganddrop() {
    await this.Dragandrop.click();
  }

  // Perform drag and drop for static images
  async staticdraganddrop() {
    const loc = this.page.locator('//div[@id="droparea"]');
    await this.page.locator('//img[@id="angular"]').dragTo(loc);
    await this.page.locator('//img[@id="mongo"]').dragTo(loc);
    await this.page.locator('//img[@id="node"]').dragTo(loc);
    await this.page.waitForTimeout(5000);
  }

  // Navigate to the dynamic page
  async Navigatetodynamic() {
    await this.page.hover('//a[text()="Static "]');
    await this.dynamicLink.click();
  }

  // Perform drag and drop for dynamic images
  async dynamicdraganddrop() {
    const loc = this.page.locator('//div[@id="droparea"]');
    await this.page.locator('//img[@id="angular"]').dragTo(loc);
    await this.page.locator('//img[@id="mongo"]').dragTo(loc);
    await this.page.locator('//img[@id="node"]').dragTo(loc);
  }
}
