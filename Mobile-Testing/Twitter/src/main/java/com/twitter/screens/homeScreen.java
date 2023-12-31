package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class homeScreen extends base {
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Home\n" +
            "Tab 1 of 4\"]")
    public WebElement assertionElement;
    @AndroidFindBy(xpath = "//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[2]")
    public WebElement addTweetBtn;
    @AndroidFindBy(className = "android.widget.EditText")
    private WebElement tweetInput;
    @AndroidFindBy(xpath = "//android.widget.Button[@content-desc=\"Post\"]")
    private WebElement postBtn;
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ImageView[1]")
    private WebElement profileCircle;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Profile\"]")
    private WebElement profileBtn;

    @AndroidFindBy(xpath = "//(android.view.View[contains(@content-desc, 'test') and contains(@content-desc, '@testingg')])[1]")
    private WebElement latestTweet;


    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"2\"])[1]")
    private WebElement latestTweetLikeBtn;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Search\n" +
            "Tab 2 of 4\"]")
    private WebElement searchBtn;
    @AndroidFindBy(className = "android.widget.EditText")
    private WebElement searchInput;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"rawantest\n" +
            "@rawantest1\"]")
    private WebElement rawantest1SearchRes;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Home\n" +
            "Tab 1 of 4\"]")
    private WebElement homeBtn;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Messages\n" +
            "Tab 4 of 4\"]")
    private WebElement chatBtn;


    public void clickOnAddTweet() {
        addTweetBtn.click();
    }

    public void typeTweet(String tweetText) {
        tweetInput.sendKeys(tweetText);
    }

    public void clickOnTweetInput() {
        tweetInput.click();
    }

    public void clickOnpost() {
        postBtn.click();
    }

    public void clickOnProfile() {
        profileBtn.click();
    }

    public void clickOnprofileCircle() {
        profileCircle.click();
    }

    public String clickOnLatestTweetLikeBtn() {
        String latestTweetContent = latestTweet.getAttribute("content-desc");
        System.out.println(latestTweetContent);
        // Click on the like button of the latest tweet
        latestTweetLikeBtn.click();

        return latestTweetContent;

    }
    public void clickOnSearch(){
        searchBtn.click();
    }
    public void clickOnSearchInput(){
        searchInput.click();
    }
    public void typeSearch(String search){
        searchInput.sendKeys(search);
    }
    public void clickOnrawantest1(){
        rawantest1SearchRes.click();
    }
    public void clickOnHome(){
        homeBtn.click();
    }
    public void clickOnChat()
    {
        chatBtn.click();
    }

}
