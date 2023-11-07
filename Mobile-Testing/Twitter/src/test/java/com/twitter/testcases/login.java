package com.twitter.testcases;

import com.twitter.base.base;
import com.twitter.screens.*;
import org.testng.annotations.Test;
import org.testng.Assert;

public class login extends base {
    emuHomeScreen home;
    twitterHomeScreen twitterHome;
    loginScreen loginScreen;
    typeEmailScreen typeEmailScreen;
    typeUsernameScreen typeUsernameScreen;
    passAndUsernameScreen passAndUsernameScreen;
    confirmationCodeScreen confirmationCodeScreen;
    whyChangePassScreen whyChangePassScreen;

    @Test
    public void correctLogin() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        home = new emuHomeScreen();
        home.clickOnX();

//        loginScreen = new loginScreen();
//        loginScreen.clickOnLogin();

        typeEmailScreen = new typeEmailScreen();
        typeEmailScreen.typeEmail("areegm32@gmail.com");
        typeEmailScreen.clickNextBtn();

        typeUsernameScreen = new typeUsernameScreen();
        typeUsernameScreen.typeUsername("Testing58349");
        typeUsernameScreen.clickOnNext();

        passAndUsernameScreen = new passAndUsernameScreen();
        passAndUsernameScreen.typePassword("nvp5U=uSiUxGb8.");
        passAndUsernameScreen.clickOnLoginBtn();
        passAndUsernameScreen.clickOnLoginBtn();
        passAndUsernameScreen.clickOnLoginBtn();
        passAndUsernameScreen.clickOnLoginBtn();
        twitterHome=new twitterHomeScreen();
        Assert.assertTrue(twitterHome.assertionText.isDisplayed(), "Element is not displayed.");
    }

    @Test
    public void falseEmail() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        home = new emuHomeScreen();
        home.clickOnX();
        typeEmailScreen = new typeEmailScreen();
        typeEmailScreen.typeEmail("areeggm32@gmail.com");
        typeEmailScreen.clickNextBtn();
        Assert.assertTrue(typeEmailScreen.assertionText.isDisplayed(), "Element is not displayed.");
    }

    @Test
    public void falsePassword() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        home = new emuHomeScreen();
        home.clickOnX();
        typeEmailScreen = new typeEmailScreen();
        typeEmailScreen.typeEmail("areegm32@gmail.com");
        typeEmailScreen.clickNextBtn();

        typeUsernameScreen = new typeUsernameScreen();
        typeUsernameScreen.typeUsername("Testing58349");
        typeUsernameScreen.clickOnNext();

        passAndUsernameScreen = new passAndUsernameScreen();
        passAndUsernameScreen.typePassword("nvp5U=uSiUxGb9.");
        passAndUsernameScreen.clickOnLoginBtn();
        Assert.assertTrue(passAndUsernameScreen.assertionText.isDisplayed(), "Element is not displayed.");

    }

    @Test
    public void forgetPasswordCorrectly () throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        home = new emuHomeScreen();
        home.clickOnX();
        typeEmailScreen=new typeEmailScreen();
        typeEmailScreen.clickOnForgetPassword();
        typeUsernameScreen=new typeUsernameScreen();
        typeUsernameScreen.forgetPassTypeEmail("areegm32@gmail.com");
        typeUsernameScreen.clickOnNext();
        confirmationCodeScreen=new confirmationCodeScreen();
        confirmationCodeScreen.clickOnNext();
    }
    @Test
    public void contForgetPasswordCorrectly () throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        confirmationCodeScreen=new confirmationCodeScreen();
        confirmationCodeScreen.clickOnAfterCodeNext();
        confirmationCodeScreen.typeNewPassword("nvp5U=uSiUxGb8.");
        confirmationCodeScreen.retypeNewPassword("nvp5U=uSiUxGb8.");
        confirmationCodeScreen.clickOnchangePass();
        confirmationCodeScreen.clickOnchangePass();
        whyChangePassScreen=new whyChangePassScreen();
        whyChangePassScreen.checkIForgotPass();
        whyChangePassScreen.clickOnNext();
        Assert.assertTrue(whyChangePassScreen.assertionText.isDisplayed(), "Element is not displayed.");
    }

    @Test
    public void forgetPasswordFalseEmail () throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        home = new emuHomeScreen();
        home.clickOnX();
        typeEmailScreen=new typeEmailScreen();
        typeEmailScreen.clickOnForgetPassword();
        typeUsernameScreen=new typeUsernameScreen();
        typeUsernameScreen.forgetPassTypeEmail("areeegm32@gmail.com");
        typeUsernameScreen.clickOnNext();
        confirmationCodeScreen=new confirmationCodeScreen();
        Assert.assertTrue(confirmationCodeScreen.assertionText.isDisplayed(), "Element is not displayed.");

    }
    @Test
    public void loginWithGoogle () throws InterruptedException {
        loginScreen=new loginScreen();
        loginScreen.clickOnLoginWithGoogle();
    }
}
