package com.twitter.testcases;

import com.twitter.base.base;
import com.twitter.screens.*;
import io.appium.java_client.MobileBy;
import io.appium.java_client.TouchAction;
import io.appium.java_client.touch.offset.PointOption;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

public class notifications extends base {
    seeWhatsHappeningScreen seeWhatsHappeningScreen;
    loginInputsScreen loginInputsScreen;
    homeScreen homeScreen;
    profileScreen profileScreen;
    notificationsScreen notificationsScreen;



    public void correctLogin() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        homeScreen = new homeScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("areegm32@gmail.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1234");
        loginInputsScreen.clickOnLogin();
//        Assert.assertTrue(homeScreen.addTweetBtn.isDisplayed(), "Element is not displayed.");
    }

    @Test
    public void unfollowNotify() throws InterruptedException {
        correctLogin();
        homeScreen.clickOnSearch();
        homeScreen.clickOnSearchInput();
        homeScreen.typeSearch("rawantest1");
        TouchAction touchAction = new TouchAction(driver);
        touchAction.tap(PointOption.point(105,305 )).perform();
        profileScreen =new profileScreen();
        profileScreen.clickOnFollow();

    }

}

