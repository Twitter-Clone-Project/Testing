package com.app.screens;

import com.app.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class settings extends base {
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Login\"]")
    public WebElement loginBtn;
    @AndroidFindBy(xpath = "(//android.widget.EditText)[1]")
    public WebElement emailInput;
    @AndroidFindBy(xpath = "(//android.widget.EditText)[2]")
    public WebElement passInput;
    @AndroidFindBy (accessibility = "Forgot Password?")
    public WebElement forgetPasswordButton;

    @AndroidFindBy (xpath = "(//android.widget.ImageView)[1]")
    public WebElement drawer;

    @AndroidFindBy (xpath = "//android.view.View[@content-desc=\"Settings\"]")
    public WebElement settingsButton;

    @AndroidFindBy (xpath = "//android.view.View[@content-desc=\"Settings\"]")
    public WebElement updateUserNameButton;

    @AndroidFindBy (accessibility = "Change your password\n" +
            "Change your password at any time.")
    public WebElement updatePassword;

    @AndroidFindBy (xpath = "(//android.widget.EditText)[2]")
    public WebElement newUserName;

    @AndroidFindBy (accessibility = "Done")
    public WebElement doneButtonUsername;
}