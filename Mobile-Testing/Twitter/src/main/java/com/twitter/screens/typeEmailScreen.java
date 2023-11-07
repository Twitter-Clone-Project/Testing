package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class typeEmailScreen extends base {
    @AndroidFindBy(id = "com.twitter.android:id/ocf_text_input_edit")
    WebElement emailInput;
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.View/android.view.View/android.widget.Button")
    WebElement nextBtn;
    @AndroidFindBy(xpath = "//(android.widget.Button)[1]")
    WebElement forgetPasswordbtn;
    @AndroidFindBy(xpath = "//(*[@text='To get started, first enter your phone, email, or @username'])")
    public WebElement assertionText;

    public void typeEmail(String email){
        emailInput.sendKeys(email);
    }
    public void clickNextBtn()
    {
        nextBtn.click();
    }
    public void clickOnForgetPassword(){
        forgetPasswordbtn.click();
    }
}
