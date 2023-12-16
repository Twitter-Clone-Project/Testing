package com.twitter.testcases;

import com.twitter.base.base;
import com.twitter.screens.forgetPassScreens;
import com.twitter.screens.homeScreen;
import com.twitter.screens.loginInputsScreen;
import com.twitter.screens.seeWhatsHappeningScreen;
import org.testng.Assert;
import org.testng.annotations.Test;

public class profile extends base{
    seeWhatsHappeningScreen seeWhatsHappeningScreen;
    loginInputsScreen loginInputsScreen;
    homeScreen homeScreen;



    public void correctLogin() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        homeScreen=new homeScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("areegm32@gmail.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1234");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(homeScreen.assertionElement.isDisplayed(), "Element is not displayed.");
    }
    @Test
    public void addTweet_addedInProfile() throws InterruptedException {
        correctLogin();
        homeScreen.clickOnAddTweet();
        homeScreen.clickOnTweetInput();
        homeScreen.typeTweet("flutter tweet test script");
        homeScreen.clickOnpost();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnprofileCircle();
        Assert.assertTrue(homeScreen.assertionTweet.isDisplayed(), "Element is not displayed.");
    }

}
