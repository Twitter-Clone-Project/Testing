package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class loginScreen extends base {
    @AndroidFindBy(xpath = "")
    private WebElement loginBtn;
    @AndroidFindBy(xpath = "//(android.widget.Button[@text='Continue with Google'])")
    WebElement loginWithGoogleBtn;

    public void clickOnLogin() {
        loginBtn.click();
    }
    public void clickOnLoginWithGoogle(){loginWithGoogleBtn.click();}
}
