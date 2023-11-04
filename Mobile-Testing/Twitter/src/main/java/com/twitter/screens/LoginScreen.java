package com.twitter.screens;

import com.twitter.base.Base;
import com.twitter.base.Base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;
public class LoginScreen extends Base{
@AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.view.ViewGroup/android.widget.LinearLayout[2]/android.view.ViewGroup[2]/android.widget.Button")
private WebElement loginBtn;
public void clickOnLogin()
{
    loginBtn.click();
}
}
