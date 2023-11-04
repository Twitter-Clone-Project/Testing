package com.twitter.screens;

import com.twitter.base.Base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class EmuHomeScreen extends Base {
    @AndroidFindBy(accessibility = "X")
    private WebElement xIcon;

    public void clickOnX(){ //if send keys-->put parameters here
        xIcon.click();
    }
}
