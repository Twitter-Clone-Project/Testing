package com.twitter.screens;

import com.twitter.base.Base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class TwitterHomeScreen extends Base {
    @AndroidFindBy(accessibility = "Show navigation drawer")
    private WebElement SideNav;
    @AndroidFindBy(xpath = "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.widget.FrameLayout/androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[1]/android.view.View[3]/android.widget.Button")
    private WebElement loginBtn;

    public void clickOnLogin(){ //if send keys-->put parameters here
        loginBtn.click();
    }
    public void clickOnSideNav(){ //if send keys-->put parameters here
        SideNav.click();
    }
}
