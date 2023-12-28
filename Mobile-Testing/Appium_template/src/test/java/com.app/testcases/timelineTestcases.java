package com.app.testcases;

import com.app.base.base;
import com.app.screens.settings;
import com.app.screens.timeline;
import io.appium.java_client.MobileBy;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;
import io.appium.java_client.remote.MobileCapabilityType;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;
import org.openqa.selenium.Keys;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.NoSuchElementException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;


public class timelineTestcases extends base {

    timeline timelinepage;
    protected Properties props;
    @Parameters({"deviceName","platformName","platformVersion"})
    @BeforeMethod
    public void beforemethod(String deviceName, String platformName, String platformVersion) throws IOException, FileNotFoundException {
        File propsFile=new File("src/main/resources/config/config.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        //TODO:change the path of apk file
        File appapk=new File("src/test/resources/apps/app-release.apk");
        DesiredCapabilities cap=new DesiredCapabilities();
        cap.setCapability(MobileCapabilityType.DEVICE_NAME, deviceName);
        cap.setCapability(MobileCapabilityType.PLATFORM_NAME, platformName);
        cap.setCapability(MobileCapabilityType.PLATFORM_VERSION, platformVersion);
        cap.setCapability(MobileCapabilityType.UDID, props.getProperty("Mobile_UDID"));
        cap.setCapability(MobileCapabilityType.AUTOMATION_NAME, props.getProperty("AndroidAutomationName"));
        cap.setCapability("ignoreHiddenApiPolicyError" , true);
        //TODO uncomment the following line
        cap.setCapability(MobileCapabilityType.APP, appapk.getAbsolutePath());
        URL url = new URL(props.getProperty("appiumServer"));
        driver = new AndroidDriver(url, cap);
        driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);

   timelinepage =new timeline();
       timelinepage.loginBtn.click();
        timelinepage.emailInput.click();
        timelinepage.emailInput.sendKeys("menna.ibrahim02@eng-st.cu.edu.eg");
        timelinepage.passInput.click();
        timelinepage.passInput.sendKeys("147258369");
        timelinepage.loginBtn.click();
    }

//    @AfterMethod
//    public void AfterEach()
//    {
//        driver.quit();
//    }
//    @Test
    public  void addLike() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.firstTweetLikeBefore.click();
        Assert.assertNotNull(timelinepage.firstTweetLikeAfter);
        timelinepage.firstTweetLikeAfter.click();

    }

//    @Test
    public  void addRepost() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.firstTweetRepostBefore.click();
        Assert.assertNotNull(timelinepage.firstTweetRepostAfter);
        timelinepage.firstTweetRepostAfter.click();

    }
//    @Test
    //Failed
    public void addReplyByClickingOnIcon() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.clickOnReplyIcon.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.sendKeys(props.getProperty("showedReplyText"));
        timelinepage.addReplyInputButton.click();
        Assert.assertNotNull(timelinepage.showedReply);

    }
//    @Test
    public void addReply() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.tweet.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.sendKeys(props.getProperty("showedReplyText"));
        timelinepage.addReplyInputButton.click();
        Assert.assertNotNull(timelinepage.showedReply);

    }

//        @Test
    public void addLongReply() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.tweet.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.sendKeys(props.getProperty("longReplyText"));
        boolean checkIfDisabled=timelinepage.addReplyInputButton.isDisplayed();
        Assert.assertTrue(checkIfDisabled);
    }
//        @Test
    public  void checkRepliesWithoutAddingReply() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.tweet.click();
        Assert.assertNotNull(timelinepage.showedReply);

    }
//    @Test
    //Failed
    public void emptyReply() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        WebElement tweet =driver.findElement(MobileBy.accessibilityId("test\n" +
                "@testingg\n" +
                "• 4m\n" +
                "post "));
        tweet.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.sendKeys(" ");
        Assert.assertFalse(timelinepage.addReplyInputButton.isEnabled());
    }
//    @Test
    //Failed
    public void emptyPost() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();

        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(2))
                .withTimeout(Duration.ofSeconds(40))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

        timelinepage.addPostButton.click();
        timelinepage.postInputField.click();
        timelinepage.postInputField.sendKeys(" ");
        Assert.assertFalse(timelinepage.postButton.isEnabled());
    }
    //@Test
    //passed
    public void addPost() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();

        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(2))
                .withTimeout(Duration.ofSeconds(40))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

        timelinepage.addPostButton.click();
        timelinepage.postInputField.click();
        timelinepage.postInputField.sendKeys("tweet");
        timelinepage.postButton.click();

    }
//    @Test
    //passed
    public void addPostWithImage() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();

        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(1))
                .withTimeout(Duration.ofSeconds(20))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

        timelinepage.addPostButton.click();
        timelinepage.postInputField.click();
        timelinepage.postInputField.sendKeys("tweet");
        timelinepage.selectImages.click();
        timelinepage.image.click();
        timelinepage.selectImagesButtton.click();
        timelinepage.postButton.click();

    }

//    @Test
    public void addPostWithFiveImage() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();

        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(1))
                .withTimeout(Duration.ofSeconds(20))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

        timelinepage.addPostButton.click();
        timelinepage.postInputField.click();
        timelinepage.postInputField.sendKeys("tweet");
        timelinepage.selectImages.click();
        timelinepage.image.click();
        timelinepage.image2.click();
        timelinepage.image3.click();
        timelinepage.image4.click();
        timelinepage.image5.click();
        timelinepage.selectImagesButtton.click();
        Assert.assertFalse(timelinepage.postButton.isEnabled());

    }

//@Test
public void addPostendlinebefore() throws IOException, InterruptedException {
    File propsFile=new File("src/test/resources/testData/userData.properties");
    inputfile=new FileInputStream(propsFile);
    props=new Properties();
    props.load(inputfile);
    timelinepage =new timeline();

    Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
            .pollingEvery(Duration.ofSeconds(2))
            .withTimeout(Duration.ofSeconds(40))
            .ignoring(NoSuchElementException.class);
    timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

    timelinepage.addPostButton.click();
    timelinepage.postInputField.click();
    driver.pressKey(new KeyEvent().withKey(AndroidKey.ENTER));
    driver.pressKey(new KeyEvent().withKey(AndroidKey.ENTER));
    driver.pressKey(new KeyEvent().withKey(AndroidKey.ENTER));
    driver.pressKey(new KeyEvent().withKey(AndroidKey.ENTER));
    timelinepage.postInputField.sendKeys("tweet enter test");
    timelinepage.postButton.click();

    timelinepage.userImage.click();
    timelinepage.profileButton.click();
    Assert.assertNotNull(driver.findElement(MobileBy.accessibilityId("test\n" +
            "@testingg\n" +
            "• now\n" +
            "tweet enter test ")));
//test
//@testingg
//• 27m
//tweeet
}
//@Test
    public void addLongPost() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();

        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(2))
                .withTimeout(Duration.ofSeconds(40))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

        timelinepage.addPostButton.click();
        timelinepage.postInputField.click();
        timelinepage.postInputField.sendKeys("tweetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
        Assert.assertFalse(timelinepage.postButton.isEnabled());
    }
////////////////////////////////////////////////trends and hashtags////////////////////////////////////////
//    @Test
public void addPostHashTag() throws IOException, InterruptedException {
    File propsFile=new File("src/test/resources/testData/userData.properties");
    inputfile=new FileInputStream(propsFile);
    props=new Properties();
    props.load(inputfile);
    timelinepage =new timeline();

    Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
            .pollingEvery(Duration.ofSeconds(2))
            .withTimeout(Duration.ofSeconds(40))
            .ignoring(NoSuchElementException.class);
    timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

    timelinepage.addPostButton.click();
    timelinepage.postInputField.click();
    timelinepage.postInputField.sendKeys("#");
    timelinepage.postButton.click();


}
//    @Test
    public void addPostdoubleHashTag() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();

        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(2))
                .withTimeout(Duration.ofSeconds(40))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));

        timelinepage.addPostButton.click();
        timelinepage.postInputField.click();
        timelinepage.postInputField.sendKeys("##");
        timelinepage.postButton.click();
//        timelinepage.searchIcon.click();
        timelinepage.searchIcon.click();
        try {
            Assert.assertFalse("not found",timelinepage.hashtagTrend.isDisplayed());
        }catch (NoSuchElementException e)
        {
            System.out.println("HashTag are not in the trend");
        }
    }
    ///////////////////////////////////////////
//    @Test
    public  void  updateUsername() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage=new timeline();
        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(1))
                .withTimeout(Duration.ofSeconds(20))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));
timelinepage.drawer.click();
timelinepage.settingsButton.click();

        timelinepage.updateUserNameButton.click();
        timelinepage.newUserName.click();
        timelinepage.newUserName.sendKeys("testing");
        timelinepage.doneButtonUsername.click();

    }
    @Test
    public  void  updatepassword() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage=new timeline();
        Wait<AndroidDriver> timeline=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(1))
                .withTimeout(Duration.ofSeconds(20))
                .ignoring(NoSuchElementException.class);
        timeline.until(ExpectedConditions.invisibilityOf(timelinepage.forgetPasswordButton));
        timelinepage.drawer.click();
        timelinepage.settingsButton.click();

        timelinepage.updatePassword.click();
        timelinepage.CurrentPass.click();
        timelinepage.CurrentPass.sendKeys("147258369");
        timelinepage.newPass.click();
        timelinepage.newPass.sendKeys("147258369");

        timelinepage.ConfirmPass.click();
        timelinepage.ConfirmPass.sendKeys("147258369");

        timelinepage.updatePassword.click();


    }
}
