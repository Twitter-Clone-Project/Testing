package com.twitter.testcases;

import com.twitter.base.base;
import com.twitter.screens.*;
import io.appium.java_client.MobileBy;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.Test;

public class profile extends base {
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
    public void addTweet_addedInProfile() throws InterruptedException {
        addTweet_addedInProfile("flutter test tweet");
    }

    public void addTweet_addedInProfile(String tweet) throws InterruptedException {
        correctLogin();
        profileScreen = new profileScreen();
        homeScreen.clickOnAddTweet();
        homeScreen.clickOnTweetInput();
        homeScreen.typeTweet(tweet);
        homeScreen.clickOnpost();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        Assert.assertTrue(driver.findElement(By.xpath("(//android.view.View[contains(@content-desc, '" + tweet + "')])[1]")).isDisplayed(), "Element is not displayed.");
    }


    @Test
    public void addLikeFromHome_addedInLikes() throws InterruptedException {
        correctLogin();
        profileScreen = new profileScreen();
        String content = homeScreen.clickOnLatestTweetLikeBtn();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        profileScreen.clickOnLikesTab();
        Assert.assertTrue(driver.findElement(MobileBy.AccessibilityId(content)).isDisplayed(), "Tweet isn't added to likes");
    }

    @Test
    public void addLikeFromProfile_addedInLikes() throws InterruptedException {
        correctLogin();
        profileScreen = new profileScreen();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        String content = profileScreen.clickOnLatestTweetLikeBtn();
        profileScreen.clickOnLikesTab();
        profileScreen.refresh();
        Assert.assertTrue(driver.findElement(By.xpath("(//android.view.View[@content-desc=\"" + content + "\"])[1]")).isDisplayed(), "Tweet isn't added to likes");
    }

    @Test
    public void unlikeFromLikes_removedFromLikes() throws InterruptedException {
        correctLogin();
        profileScreen = new profileScreen();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        profileScreen.clickOnLikesTab();
        String content = profileScreen.clickOnLatestTweetLikeInLikesBtn();
        profileScreen.refresh();
        try {
            WebElement element = driver.findElement(By.xpath("(//android.view.View[@content-desc=\"" + content + "\"])"));
            Assert.assertFalse(element.isDisplayed(), "Tweet is displayed in likes, but it shouldn't be.");
        } catch (NoSuchElementException e) {
            // If NoSuchElementException is caught, it means the element is not present
            System.out.println("Tweet is not present in likes, which is the expected behavior.");
        }
    }

    @Test
    public void deleteTweet_deletedFromProfile() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        addTweet_addedInProfile("unique tweet3");
//        profileScreen=new profileScreen();
//        homeScreen.clickOnprofileCircle();
//        homeScreen.clickOnprofileCircle();
//        homeScreen.clickOnProfile();
        profileScreen.refresh();
        Thread.sleep(2000);
        String content = profileScreen.clickOnTweetOptions();
        profileScreen.clickOnDeletePost();
        profileScreen.refresh();
        try {
            WebElement element = driver.findElement(By.xpath("(//android.view.View[@content-desc=\"" + content + "\"])"));
            Assert.assertFalse(element.isDisplayed(), "Tweet is displayed in profile, but it shouldn't be.");
        } catch (NoSuchElementException e) {
            System.out.println("Tweet is not present in profile, which is the expected behavior.");
        }
    }

    @Test
    public void edit_profile() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        correctLogin();
        profileScreen = new profileScreen();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        profileScreen.clickOnEditProfile();
        profileScreen.clickOnName();
        profileScreen.clearName();
        profileScreen.typeName("rawanl");
        profileScreen.clickOnBio();
        profileScreen.clearBio();
        profileScreen.typeBio("bioooooooooooo");
        profileScreen.clickOnLoc();
        profileScreen.clearLoc();
        profileScreen.typeLoc("mokattammm");
        profileScreen.clickOnWeb();
        profileScreen.clearWeb();
        profileScreen.typeWeb("https://chat.openai.com/");
//        profileScreen.clickOnDob();
//        profileScreen.typeDob("12/27/2002");
        profileScreen.clickOnSave();
        Assert.assertTrue(profileScreen.editProfileAssertion.isDisplayed(), "edit profile hadn't updated");

    }

////////////////////////not working
    @Test
    public void follow() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        correctLogin();
        profileScreen = new profileScreen();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        profileScreen.clickOnFollowing();
        profileScreen.clickOnrawantest1InFollowing();
        profileScreen.clickOnFollow();
        driver.navigate().back();
        driver.navigate().back();



    }

    @Test
    public void mute() throws InterruptedException {
        synchronized (driver) {
            driver.wait(10000);
        }
        correctLogin();
        profileScreen = new profileScreen();
        homeScreen.clickOnprofileCircle();
        homeScreen.clickOnProfile();
        profileScreen.clickOnFollowing();
        profileScreen.clickOnrawantest1InFollowing();
        profileScreen.clickOnFollow();
        driver.navigate().back();
        driver.navigate().back();



    }



}
