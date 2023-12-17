package com.app.testcases;

import com.app.base.base;
import com.app.screens.timeline;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import org.junit.Assert;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
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
    @Test
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

    @Test
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
    @Test
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
    @Test
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

        @Test
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
        @Test
    public  void checkRepliesWithoutAddingReply() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.tweet.click();
        Assert.assertNotNull(timelinepage.showedReply);

    }
    @Test
    public void EmptyReply() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        timelinepage =new timeline();
        timelinepage.tweet.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.click();
        timelinepage.addReplyInputField.sendKeys(" ");
        timelinepage.addReplyInputButton.click();
        Assert.assertTrue(timelinepage.addReplyInputButton.isDisplayed());
    }

}
