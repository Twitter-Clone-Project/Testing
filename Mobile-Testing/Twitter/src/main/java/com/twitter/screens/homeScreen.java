package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class homeScreen extends base {
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Home\n" +
            "Tab 1 of 4\"]")
    public WebElement assertionElement;
}
