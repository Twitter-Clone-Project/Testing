package com.twitter.testcases;

import com.twitter.base.base;
import com.twitter.screens.*;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.annotations.Test;
import org.testng.Assert;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;


public class login extends base {
    seeWhatsHappeningScreen seeWhatsHappeningScreen;
    loginInputsScreen loginInputsScreen;
    homeScreen homeScreen;
    forgetPassScreens forgetPassScreens;

    //////////////////////////BUG////////////////Fixed////////////////
    @Test
    public void correctLogin() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        homeScreen=new homeScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("rawanmostafa401@gmail.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1234");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(homeScreen.assertionElement.isDisplayed(), "Element is not displayed.");
    }
    @Test
    public void loginEmptyEmail() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        homeScreen=new homeScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1234");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(loginInputsScreen.emptyEmailAssertion.isDisplayed(), "Element is not displayed.");
    }
    @Test
    public void loginEmptyPass() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        homeScreen=new homeScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("rawanmostafa401@gmail.com");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(loginInputsScreen.emptyPassAssertion.isDisplayed(), "Element is not displayed.");
    }

    @Test
    public void falseEmail() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("rawaanmostafa401@gmail.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1234");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(loginInputsScreen.emailAssertionElement.isDisplayed(), "Element is displayed.");
    }
    @Test
    public void falseEmailForm() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
//        loginInputsScreen.typeEmail("ra@g");
        loginInputsScreen.typeEmail("ra.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1234");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(loginInputsScreen.emailFormAssertion.isDisplayed(), "Element is displayed.");
    }
    @Test
    public void falsePassForm() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("rawanmostafa401@gmail.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(loginInputsScreen.passFormAssertion.isDisplayed(), "Element is displayed.");
    }

    @Test
    public void falsePassword() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        loginInputsScreen = new loginInputsScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("rawanmostafa401@gmail.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1224");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(loginInputsScreen.passAssertionElement.isDisplayed(), "Element is not displayed.");

    }

    @Test
    public void forgetPasswordCorrectly() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnEmail();
        forgetPassScreens.typeEmail("rawanmostafa401@gmail.com");
        driver.hideKeyboard();
        forgetPassScreens.clickOnNext();
        WebDriverWait wait=new WebDriverWait(driver, Duration.ofSeconds(120));
        wait.until(ExpectedConditions.visibilityOf(forgetPassScreens.waitElement));
        forgetPassScreens.clickOnNewPassInput();
        forgetPassScreens.typeNewPass("test1234");
        forgetPassScreens.clickOnRetypeNewPassInput();
        forgetPassScreens.retypeNewPass("test1234");
        forgetPassScreens.clickOnDone();


        homeScreen=new homeScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen.clickOnEmailInput();
        loginInputsScreen.typeEmail("rawanmostafa401@gmail.com");
        loginInputsScreen.clickOnPassInput();
        loginInputsScreen.typePass("test1234");
        loginInputsScreen.clickOnLogin();
        Assert.assertTrue(homeScreen.assertionElement.isDisplayed(), "Element is not displayed.");
    }

    @Test
    public void forgetPasswordFalseEmail() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnEmail();
        forgetPassScreens.typeEmail("raawanmostafa401@gmail.com");
        driver.hideKeyboard();
        forgetPassScreens.clickOnNext();
        Assert.assertTrue(forgetPassScreens.emailAssertionElement.isDisplayed(),"Element is not displayed.");

    }
    @Test
    public void forgetPasswordEmptyEmail() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnNext();
        Assert.assertTrue(forgetPassScreens.emptyEmailAssertion.isDisplayed(),"Element is not displayed.");

    }

    @Test
    public void forgetPasswordEmptyOTP() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnEmail();
        forgetPassScreens.typeEmail("rawanmostafa401@gmail.com");
        driver.hideKeyboard();
        forgetPassScreens.clickOnNext();
        forgetPassScreens.clickOnVerifyOtp();

        Assert.assertTrue(forgetPassScreens.emptyOtpAssertion.isDisplayed(),"Element is not displayed.");
    }
    @Test
    public void forgetPasswordFalseOTP() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnEmail();
        forgetPassScreens.typeEmail("rawanmostafa401@gmail.com");
        driver.hideKeyboard();
        forgetPassScreens.clickOnNext();

        WebDriverWait wait=new WebDriverWait(driver, Duration.ofSeconds(120));
        wait.until(ExpectedConditions.visibilityOf(forgetPassScreens.otpAssertionElement));

        Assert.assertTrue(forgetPassScreens.otpAssertionElement.isDisplayed(),"Element is not displayed.");
    }
    /////////////////BUG///////////////////////Fixed////////////////////////
    @Test
    public void forgetPasswordResendOTPNew() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnEmail();
        forgetPassScreens.typeEmail("rawanmostafa401@gmail.com");
        driver.hideKeyboard();
        forgetPassScreens.clickOnNext();
        WebDriverWait wait=new WebDriverWait(driver, Duration.ofSeconds(130));
        wait.until(ExpectedConditions.visibilityOf(forgetPassScreens.resendOtpBtn));
        forgetPassScreens.clickOnResendOtp();
        wait.until(ExpectedConditions.visibilityOf(forgetPassScreens.waitElement));
        Assert.assertTrue(forgetPassScreens.waitElement.isDisplayed(), "Element is not displayed.");
    }
    @Test
    public void forgetPasswordResendOTPOld() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnEmail();
        forgetPassScreens.typeEmail("rawanmostafa401@gmail.com");
        driver.hideKeyboard();
        forgetPassScreens.clickOnNext();
        WebDriverWait wait=new WebDriverWait(driver, Duration.ofSeconds(130));
        wait.until(ExpectedConditions.visibilityOf(forgetPassScreens.resendOtpBtn));
        forgetPassScreens.clickOnResendOtp();
        wait.until(ExpectedConditions.visibilityOf(forgetPassScreens.otpAssertionElement));
        Assert.assertTrue(forgetPassScreens.otpAssertionElement.isDisplayed(),"Element is not displayed.");
    }
    @Test
    public void forgetPasswordMismatch() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        seeWhatsHappeningScreen = new seeWhatsHappeningScreen();
        seeWhatsHappeningScreen.clickOnLogin();
        loginInputsScreen = new loginInputsScreen();
        loginInputsScreen.clickOnForgetPass();
        forgetPassScreens=new forgetPassScreens();
        forgetPassScreens.clickOnEmail();
        forgetPassScreens.typeEmail("rawanmostafa401@gmail.com");
        driver.hideKeyboard();
        forgetPassScreens.clickOnNext();
        WebDriverWait wait=new WebDriverWait(driver, Duration.ofSeconds(120));
        wait.until(ExpectedConditions.visibilityOf(forgetPassScreens.waitElement));
        forgetPassScreens.clickOnNewPassInput();
        forgetPassScreens.typeNewPass("test1234");
        forgetPassScreens.clickOnRetypeNewPassInput();
        forgetPassScreens.retypeNewPass("test1237");
        forgetPassScreens.clickOnDone();
        Assert.assertTrue(forgetPassScreens.mismatchAssertionElement.isDisplayed(),"Element is not displayed.");
    }
    ////////////////BUG///////////////////
//    @Test
//    public void loginWithGoogle() throws InterruptedException {
//        loginScreen = new loginScreen();
//        loginScreen.clickOnLoginWithGoogle();
//    }
}
