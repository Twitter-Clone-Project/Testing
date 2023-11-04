package com.twitter.testcases;

import com.twitter.base.Base;
import com.twitter.screens.EmuHomeScreen;
import com.twitter.screens.LoginScreen;
import com.twitter.screens.TwitterHomeScreen;
import org.testng.annotations.Test;


public class Login extends Base {
    EmuHomeScreen home;
    TwitterHomeScreen twitterHome;
    LoginScreen loginScreen;

    @Test
    public void testCase1() throws InterruptedException {
        home = new EmuHomeScreen();
        home.clickOnX();

        twitterHome = new TwitterHomeScreen();
        twitterHome.clickOnSideNav();
        synchronized (driver) {
            driver.wait(1000);
        }
        twitterHome.clickOnLogin();
        loginScreen=new LoginScreen();
        loginScreen.clickOnLogin();
    }
}
