package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class passAndUsernameScreen extends base {
    @AndroidFindBy(xpath = "(//android.widget.EditText)[2]")
    WebElement passwordInput;
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View/android.widget.Button")
    WebElement loginBtn;

    @AndroidFindBy(xpath = "//(*[@text='Enter your password'])")
    public WebElement assertionText;


    public void typePassword(String password) {
        passwordInput.sendKeys(password);
    }

    public void clickOnLoginBtn(){
        loginBtn.click();
    }
}
