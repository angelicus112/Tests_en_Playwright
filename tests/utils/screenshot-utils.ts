// tests/utils/screenshot-utils.ts
import { Page, TestInfo } from "@playwright/test";

export class ScreenshotUtils {
    constructor(private page: Page) {}

    async takeScreenshot(testInfo: TestInfo, name: string): Promise<void> {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await testInfo.attach(name, {
            body: screenshot,
            contentType: 'image/png',
        });
    }

    async takeScreenshotOnCondition(condition: boolean, testInfo: TestInfo, name: string): Promise<void> {
        if (condition) {
            await this.takeScreenshot(testInfo, name);
        }
    }
}