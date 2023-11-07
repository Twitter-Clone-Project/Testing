package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class whyChangePassScreen extends base {
    @AndroidFindBy(xpath = "//(android.widget.RadioButton)[1]")
    WebElement iForgotPassCheck;

    @AndroidFindBy(className = "android.widget.Button")
    WebElement nextBtn;
    @AndroidFindBy(xpath = "//(android.widget.TextView[@text='You’re all set'])")
    public WebElement assertionText;

    public void checkIForgotPass(){
        if (!iForgotPassCheck.isSelected()) {
            iForgotPassCheck.click();
        }
    }
    public void clickOnNext(){
        nextBtn.click();
    }
}
