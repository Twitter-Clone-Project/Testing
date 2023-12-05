package com.app.screens;

import com.app.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class timeline extends base {

    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Login\"]")
    public WebElement loginBtn;
    @AndroidFindBy(xpath = "(//android.widget.EditText)[1]")
    public WebElement emailInput;
    @AndroidFindBy(xpath = "(//android.widget.EditText)[2]")
    public WebElement passInput;


    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"0\"])[1]")
    public  WebElement firstTweetRepostBefore;
    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"1\"])[2]")
    public WebElement firstTweetRepostAfter;

    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"1\"])[1]")
    public WebElement firstTweetReply;
    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"1\"])[3]")
    public WebElement firstTweetLikeBefore;

    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"0\"])[1]")
    public WebElement firstTweetLikeAfter;

    @AndroidFindBy(xpath = "(//android.view.View[@content-desc=\"0\"])[2]")
    public WebElement numOfRepliesTweetPage;

    @AndroidFindBy(xpath = "(//android.widget.EditText)[1]")
    public WebElement addReplyInputField;


    @AndroidFindBy(accessibility = "Reply")
    public WebElement addReplyInputButton;

    @AndroidFindBy(accessibility = "test\n" + "testing\uD83D\uDE44")
    public WebElement  tweet;

    @AndroidFindBy (xpath = "//android.view.View[@content-desc=\"Reply\"]")
    public WebElement showedReply;


}
