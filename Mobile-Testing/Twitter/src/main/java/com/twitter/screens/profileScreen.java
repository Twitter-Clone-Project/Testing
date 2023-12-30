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
    @AndroidFindBy(xpath = "//(android.view.View[contains(@content-desc, 'rawan') and contains(@content-desc, '@rawann')])[2]/android.view.View[2]")
    private WebElement latestTweetOptions;
    @AndroidFindBy(xpath = "//android.widget.Button[contains(@content-desc,'Select date')]")
    private WebElement editDate;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Delete Post\"]")
    private WebElement deletePostBtn;
    @AndroidFindBy (xpath = "//android.view.View[@content-desc=\"Edit Profile\"]")
    private WebElement editProfile;
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.widget.EditText[1]")
    private WebElement nameField;
    @AndroidFindBy (xpath="/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.widget.EditText[2]")
    private WebElement bioField;
    @AndroidFindBy (xpath="/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.widget.EditText[3]")
    private WebElement locField;
    @AndroidFindBy (xpath="//(android.widget.EditText)[4]")
    private WebElement webField;
    @AndroidFindBy (xpath="/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View/android.widget.EditText")
    private WebElement dobField;

    @AndroidFindBy (xpath="//android.view.View[@content-desc=\"Save\"]")
    private WebElement saveBtn;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"rawanl\n" +
            "@rawann\n" +
            "bioooooooooooo\n" +
            " mokattammm\n" +
            " Born December 31, 2020\n" +
            " Joined December 2023\"]")
    public WebElement editProfileAssertion;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Follow\"]")
    private WebElement followBtn;
    @AndroidFindBy(xpath = "//android.view.View[contains(@content-desc, 'Following')]")
    private WebElement following;
    @AndroidFindBy(xpath="//android.widget.ImageView[conatins(@content-desc, '@rawantest1')]")
    public WebElement rawantest1InFollowing;
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
    public String clickOnTweetOptions(){
        String latestTweetContent = latestTweet.getAttribute("content-desc");
        latestTweetOptions.click();
        return latestTweetContent;
    }
    public void clickOnDeletePost(){
        deletePostBtn.click();
    }
    public void clickOnEditProfile(){editProfile.click();}
    public void clickOnName(){nameField.click();}
    public void clickOnBio(){bioField.click();}
    public void clickOnLoc(){locField.click();}
    public void clickOnWeb(){webField.click();}
    public void clickOnDob(){dobField.click();}
    public void clearName(){nameField.clear();}
    public void clearBio(){bioField.clear();}
    public void clearLoc(){locField.clear();}
    public void clearWeb(){webField.clear();}
    public void clearDob(){dobField.clear();}

    public void typeName(String name){
        nameField.sendKeys(name);
    }
        public void typeBio(String name){
        bioField.sendKeys(name);
    }
        public void typeLoc(String name){
        locField.sendKeys(name);
    }
        public void typeWeb(String name){
        webField.sendKeys(name);
    }
        public void typeDob(String name){
        dobField.sendKeys(name);
    }

    public void clickOnSave(){saveBtn.click();}

    public void clickOnEditDate(){editDate.click();}

    public void clickOnFollow(){followBtn.click();}
    public void clickOnFollowing(){following.click();}
    public void clickOnrawantest1InFollowing(){rawantest1InFollowing.click();}


}
