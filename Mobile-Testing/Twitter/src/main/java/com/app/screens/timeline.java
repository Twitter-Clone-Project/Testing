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
    @AndroidFindBy (accessibility = "Forgot Password?")
    public WebElement forgetPasswordButton;


    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"1\"])[1]")
    public  WebElement firstTweetRepostBefore;
    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"2\"])[1]")
    public WebElement firstTweetRepostAfter;

    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"5\"])[1]")
    public WebElement firstTweetReply;
    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"1\"])[3]")
    public WebElement firstTweetLikeBefore;

    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"2\"])[1]")
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

    @AndroidFindBy(xpath = "(//android.widget.ImageView[@content-desc=\"3\"])[1]")
    public WebElement clickOnReplyIcon;

    @AndroidFindBy(xpath = "(//android.widget.Button)[2]")
    public WebElement addPostButton;

    @AndroidFindBy(xpath = "(//android.widget.EditText)[1]")
    public WebElement postInputField;

    @AndroidFindBy (accessibility = "Post")
    public WebElement postButton;
    @AndroidFindBy (xpath = "(//android.widget.ImageView)[2]")
    public  WebElement selectImages;

    @AndroidFindBy (xpath = "(//android.widget.FrameLayout)[2]")
    public WebElement image;
@AndroidFindBy(xpath = "//android.widget.LinearLayout[@content-desc=\"image2.jpg, \u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200E241\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E \u200E\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200EkB\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E, Dec 16\"]/android.widget.RelativeLayout/android.widget.FrameLayout[1]")
    public WebElement image2;
    @AndroidFindBy(xpath = "//android.widget.LinearLayout[@content-desc=\"image1.jpg, \u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200E390\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E \u200E\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200EkB\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E, Dec 16\"]/android.widget.RelativeLayout")
    public WebElement image3;
    @AndroidFindBy (xpath = "//android.widget.LinearLayout[@content-desc=\"image4.jpg, \u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200E430\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E \u200E\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200EkB\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E, Dec 16\"]/android.widget.RelativeLayout")
    public WebElement image4;
    @AndroidFindBy (xpath = "//android.widget.LinearLayout[@content-desc=\"image6.jpg, \u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200E307\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E \u200E\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200F\u200E\u200F\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200E\u200E\u200F\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200E\u200E\u200E\u200E\u200F\u200F\u200F\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200F\u200F\u200E\u200F\u200F\u200E\u200F\u200F\u200EkB\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200F\u200F\u200E\u200E\u200F\u200E\u200E\u200F\u200E, Dec 16\"]/android.widget.RelativeLayout/android.widget.FrameLayout[2]")
    public WebElement image5;

    @AndroidFindBy (id = "com.google.android.documentsui:id/action_menu_select")
    public WebElement selectImagesButtton;

    @AndroidFindBy (xpath = "(//android.widget.ImageView)[1]")
    public WebElement userImage;

    @AndroidFindBy(accessibility = "Profile")
    public WebElement profileButton;

    @AndroidFindBy (xpath = "//android.view.View[@content-desc=\"Search\n" +
            "Tab 2 of 4\"]")
    public WebElement searchIcon;

    @AndroidFindBy(accessibility = "3. Trending\n" +
            "#")
    public WebElement hashtagTrend;
    @AndroidFindBy (xpath = "(//android.widget.ImageView)[1]")
    public WebElement drawer;

    @AndroidFindBy (xpath = "//android.view.View[@content-desc=\"Settings\"]")
    public WebElement settingsButton;

    @AndroidFindBy (accessibility = "Username\n" +
            "@testing")
    public WebElement updateUserNameButton;

    @AndroidFindBy (accessibility = "Change your password\n" +
            "Change your password at any time.")
    public WebElement updatePassword;

    @AndroidFindBy (xpath = "(//android.widget.EditText)[1]")
    public WebElement newUserName;

    @AndroidFindBy (accessibility = "Done")
    public WebElement doneButtonUsername;

    @AndroidFindBy (xpath = "(//android.widget.EditText)[1]")
    public WebElement CurrentPass;
    @AndroidFindBy (xpath = "(//android.widget.EditText)[2]")
    public WebElement newPass;
    @AndroidFindBy (xpath = "(//android.widget.EditText)[3]")
    public WebElement ConfirmPass;

    @AndroidFindBy (accessibility = "Update Password")
    public WebElement UpdatePassButton;
}
