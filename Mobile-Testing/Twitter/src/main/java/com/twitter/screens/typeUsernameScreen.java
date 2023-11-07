package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class typeUsernameScreen extends base {
    @AndroidFindBy(id="com.twitter.android:id/ocf_text_input_edit")
    WebElement usernameInput;
    @AndroidFindBy(className="android.widget.Button")
    WebElement nextBtn;
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.EditText")
    WebElement forgetPassEmailInput;
    public void typeUsername(String username){
        usernameInput.sendKeys(username);
    }
    public void clickOnNext(){
        nextBtn.click();
    }
    public void forgetPassTypeEmail(String email){
        forgetPassEmailInput.sendKeys(email);
    }
}
