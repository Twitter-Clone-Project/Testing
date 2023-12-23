package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.MobileBy;
import io.appium.java_client.TouchAction;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class profileScreen extends base {

    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Likes\n" +
            "Tab 2 of 2\"]")
    private WebElement likesTab;

    @AndroidFindBy(xpath = "(//android.view.View[@content-desc=\"rawan\n" +
            "@rawann\n" +
            "flutter tweet test script \"])[1]")
    public WebElement assertionTweet;

    @AndroidFindBy(xpath = "//(android.view.View[contains(@content-desc, 'rawan') and contains(@content-desc, '@rawann')])[2]")
    private WebElement latestTweet;

    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"2\"])[1]")
    private WebElement latestTweetLikeBtn;
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.widget.ImageView")
    private WebElement refreshElement;
    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"1\"])[1]")
    public WebElement latestTweetInLikes;

    public void clickOnLikesTab() {
        likesTab.click();
    }

    public String clickOnLatestTweetLikeBtn() {
        String latestTweetContent = latestTweet.getAttribute("content-desc");
        System.out.println(latestTweetContent);
        String xpath = "(//android.view.View[@content-desc=\"" + latestTweetContent + "\"])[1]/android.widget.ImageView[3]";
        driver.findElement(By.xpath(xpath)).click();

        return latestTweetContent;

    }
    public String clickOnLatestTweetLikeInLikesBtn() {
        String latestTweetContent = latestTweetInLikes.getAttribute("content-desc");
        System.out.println(latestTweetContent);
        driver.findElement(By.xpath("//(android.widget.ImageView[@content-desc=\"1\"])[1]")).click();
        return latestTweetContent;
    }

    public void refresh() {

        String contentDesc = refreshElement.getAttribute("content-desc");

        if (contentDesc != null) {
            String uiAutomatorCommand = "new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollBackward();";
            driver.findElement(MobileBy.AndroidUIAutomator(uiAutomatorCommand)).click();
        } else {
            System.out.println("Content-desc attribute is null for the refresh element.");
        }
    }
}
