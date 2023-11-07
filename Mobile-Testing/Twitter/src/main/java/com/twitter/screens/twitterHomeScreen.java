package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class twitterHomeScreen extends base {

    @AndroidFindBy(xpath = "//android.widget.LinearLayout[@content-desc=\"For you\"]")
    public WebElement assertionText;

}
