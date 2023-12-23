package com.twitter.testcases;

import com.twitter.base.base;
import com.twitter.screens.*;
import io.appium.java_client.MobileBy;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

public class profile extends base{
    seeWhatsHappeningScreen seeWhatsHappeningScreen;
    loginInputsScreen loginInputsScreen;
    homeScreen homeScreen;
    profileScreen profileScreen;


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
        profileScreen=new profileScreen();
        homeScreen.clickOnAddTweet();
        homeScreen.clickOnTweetInput();
        homeScreen.typeTweet("flutter tweet test script");
        homeScreen.clickOnpost();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        Assert.assertTrue(profileScreen.assertionTweet.isDisplayed(), "Element is not displayed.");
    }

    @Test
    public void addLikeFromHome_addedInLikes() throws InterruptedException {
        correctLogin();
        profileScreen=new profileScreen();
        String content=homeScreen.clickOnLatestTweetLikeBtn();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        profileScreen.clickOnLikesTab();
        Assert.assertTrue(driver.findElement(MobileBy.AccessibilityId(content)).isDisplayed(),"Tweet isn't added to likes");
    }
    @Test
    public void addLikeFromProfile_addedInLikes() throws InterruptedException {
        correctLogin();
        profileScreen=new profileScreen();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        String content=profileScreen.clickOnLatestTweetLikeBtn();
        profileScreen.clickOnLikesTab();
        profileScreen.refresh();
        Assert.assertTrue(driver.findElement(By.xpath("(//android.view.View[@content-desc=\""+content+"\"])[1]")).isDisplayed(),"Tweet isn't added to likes");
    }
    @Test
    public void unlikeFromLikes_removedFromLikes() throws InterruptedException {
        correctLogin();
        profileScreen=new profileScreen();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        profileScreen.clickOnLikesTab();
        String content=profileScreen.clickOnLatestTweetLikeInLikesBtn();
        profileScreen.refresh();
        try {
            WebElement element = driver.findElement(By.xpath("(//android.view.View[@content-desc=\"" + content + "\"])"));
            Assert.assertFalse(element.isDisplayed(), "Tweet is displayed in likes, but it shouldn't be.");
        } catch (NoSuchElementException e) {
            // If NoSuchElementException is caught, it means the element is not present
            System.out.println("Tweet is not present in likes, which is the expected behavior.");
        }
    }
}
