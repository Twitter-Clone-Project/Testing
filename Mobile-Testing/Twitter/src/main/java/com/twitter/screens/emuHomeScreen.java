package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class emuHomeScreen extends base {
    @AndroidFindBy(xpath = "//*[@text='X']")
    private WebElement xIcon;

    public void clickOnX(){
        xIcon.click();
    }
}
