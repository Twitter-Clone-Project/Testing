package com.twitter.testcases;

import com.twitter.base.base;
import com.twitter.screens.*;
import io.appium.java_client.MobileBy;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

public class messages extends base {
    seeWhatsHappeningScreen seeWhatsHappeningScreen;
    loginInputsScreen loginInputsScreen;
    homeScreen homeScreen;
    chatScreen chatScreen;



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
    public void messageConstraints() throws InterruptedException {
        correctLogin();
        chatScreen=new chatScreen();
        homeScreen.clickOnChat();
        chatScreen.clickOnrawantest1Chat();
        chatScreen.clickOnMsgInput();
        chatScreen.typeMsg(" ");
        Assert.assertFalse(chatScreen.sendBtn.isEnabled(), "button is not disabled!!!");

    }
}

