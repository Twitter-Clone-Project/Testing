package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class homeScreen extends base {
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Home\n" +
            "Tab 1 of 4\"]")
    public WebElement assertionElement;
    @AndroidFindBy(xpath = "//(android.widget.Button)[1]")
    private WebElement addTweetBtn;
    @AndroidFindBy(className = "android.widget.EditText")
    private WebElement tweetInput;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Post\"]")
    private WebElement postBtn;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"r\"]")
    private WebElement profileCircle;
    @AndroidFindBy(xpath = "(//android.view.View[@content-desc=\"rawan\n" +
            "@rawann\n" +
            "flutter tweet test script \"])[1]")
    public WebElement assertionTweet;

    public void clickOnAddTweet(){
        addTweetBtn.click();
    }
    public void typeTweet(String tweetText){
        tweetInput.sendKeys(tweetText);
    }
    public void clickOnTweetInput(){
        tweetInput.click();
    }
    public void clickOnpost(){
        postBtn.click();
    }
    public void clickOnprofileCircle(){
        profileCircle.click();
    }
}
