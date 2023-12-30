package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class seeWhatsHappeningScreen extends base {
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Login\"]")
    private WebElement loginBtn;
    public void clickOnLogin(){
        loginBtn.click();
    }
}
