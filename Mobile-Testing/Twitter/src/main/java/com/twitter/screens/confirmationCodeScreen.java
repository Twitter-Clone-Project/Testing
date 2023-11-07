package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class confirmationCodeScreen extends base {
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View/android.widget.Button")
    WebElement nextBtn;
    @AndroidFindBy(xpath="/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View/android.widget.Button")
    WebElement afterCodeNextBtn;

    @AndroidFindBy(xpath="//(android.widget.EditText)[1]")
    WebElement newPassInput;
    @AndroidFindBy(id="com.twitter.android:id/confirmation_edit_text")
    WebElement retypeNewPassInput;
    @AndroidFindBy(className="android.widget.Button")
    WebElement changePassBtn;
    @AndroidFindBy(xpath = "//(android.widget.TextView[@text='Find your X account'])")
    public WebElement assertionText;

    public void clickOnNext(){
        nextBtn.click();
    }
    public void clickOnAfterCodeNext(){
        afterCodeNextBtn.click();
    }
    public void typeNewPassword(String newPass){
        newPassInput.sendKeys(newPass);
    }
    public void retypeNewPassword(String newPass){
        retypeNewPassInput.sendKeys(newPass);
    }
    public void clickOnchangePass(){
        changePassBtn.click();
    }
}
