package com.app.testcases;

import com.app.base.base;
import com.app.screens.signUP;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.time.Duration;
import java.util.NoSuchElementException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class signUpTestcases extends base {
    signUP signScreen;
    protected Properties props;
    @Parameters({"deviceName","platformName","platformVersion"})
@BeforeMethod
public void beforemethod(String deviceName, String platformName, String platformVersion) throws IOException {
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
    driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
}
@AfterMethod
public void AfterEach()
{
    driver.quit();
}
    @Test
    //faild -->bug
    public void didntwriteOTP() throws InterruptedException, IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("validEmail"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
        Wait<AndroidDriver> notRobotWait=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(2))
                .withTimeout(Duration.ofSeconds(40))
                .ignoring(NoSuchElementException.class);
        notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
        notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
        Assert.assertNotNull(signScreen.otpInputField);

    }

    @Test
    //passed
    public void checkEmailIsValid() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();

        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("invalidEmail"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
        Assert.assertNotNull(signScreen.notValidEmailMessage);
    }
    @Test
    //passed
    public void checkInvalidName() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("invalidName"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        String name=signScreen.nameInputField.getText();
        Assert.assertEquals(name.length(),50);
    }
//    @Test
    //passed
    public void closeAndCheckDataIsEmpty() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("validEmail"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.cancelButton.click();
        signScreen.signUpButtonWhatsHappeningPage.click();
        String name =signScreen.nameInputField.getText();
        System.out.println(name);
        Assert.assertEquals(name,"");


    }

        @Test
    //passed
    public  void checkIfEmailExisted() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
            signScreen.signUpButtonWhatsHappeningPage.click();
            signScreen.nameInputField.click();
            signScreen.nameInputField.sendKeys(props.getProperty("validName"));
            signScreen.userNameInputField.click();
            signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
            signScreen.emailInputField.click();
            signScreen.emailInputField.sendKeys(props.getProperty("existedEmail"));
            driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
            signScreen.birthdayInputField.click();
            signScreen.okButtonDate.click();
            signScreen.passwordInputField.click();
            signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
            driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
            signScreen.signUpButton.click();
            Wait<AndroidDriver> notRobotWait=new FluentWait<AndroidDriver>(driver)
                    .pollingEvery(Duration.ofSeconds(2))
                    .withTimeout(Duration.ofSeconds(40))
                    .ignoring(NoSuchElementException.class);
            notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
            notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
            Assert.assertNotNull(signScreen.otpInputField);

    }
        @Test
        //passed
    public void checkIfEmptyDataPassed() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
       signScreen.signUpButton.click();
       Assert.assertNotNull(signScreen.emptyNameMessage,"Name cannot be empty");
       Assert.assertNotNull(signScreen.emptyUserNameMessage,"Username cannot be empty");
       Assert.assertNotNull(signScreen.emptyEmailMessage,"Email cannot be empty");
       Assert.assertNotNull(signScreen.emptyDateMessage,"Date of birth cannot be empty");
       Assert.assertNotNull(signScreen.emptyPasswordMessage,"Password cannot be empty");
    }
    @Test
    //failed it is invalid --->passed
    public void checkBackButtonIAmNotRobot() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("existedEmail"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        Assert.assertNotNull(signScreen.nameInputField);
    }
    @Test
    public void checkValidCasePartOne() throws IOException, InterruptedException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        Thread.sleep(1000); // Sleep for 1 seconds
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        Thread.sleep(1000); // Sleep for 1 seconds
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("validEmail"));
        Thread.sleep(1000); // Sleep for 1 seconds

        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        Thread.sleep(1000); // Sleep for 1 seconds

        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
        Wait<AndroidDriver> notRobotWait=new FluentWait<AndroidDriver>(driver)
                .pollingEvery(Duration.ofSeconds(2))
                .withTimeout(Duration.ofSeconds(40))
                .ignoring(NoSuchElementException.class);
        notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
        notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
    }
//    @Test
    public void checkValidCasePartTwo() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();

        Assert.assertNull(signScreen.otpInputField);


    }
    @Test
    public void checkOnNameLengthValidation()throws IOException, InterruptedException
    {

        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("invalidNameLength"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("existedEmail"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
        Assert.assertNotNull(signScreen.nameInputField);

    }
@Test
    public void checkOnNameValidation()throws IOException, InterruptedException {

        File propsFile = new File("src/test/resources/testData/userData.properties");
        inputfile = new FileInputStream(propsFile);
        props = new Properties();
        props.load(inputfile);
        signScreen = new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("invalidNameWithNumbers"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("existedEmail"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
        Assert.assertNotNull(signScreen.nameInputField);
    }

    @Test
public void checkOnUserNameLengthValidation()throws IOException,InterruptedException
{

    File propsFile=new File("src/test/resources/testData/userData.properties");
    inputfile=new FileInputStream(propsFile);
    props=new Properties();
    props.load(inputfile);
    signScreen=new signUP();
    signScreen.signUpButtonWhatsHappeningPage.click();
    signScreen.nameInputField.click();
    signScreen.nameInputField.sendKeys(props.getProperty("validName"));
    signScreen.userNameInputField.click();
    signScreen.userNameInputField.sendKeys(props.getProperty("invalidUserNameLength"));
    signScreen.emailInputField.click();
    signScreen.emailInputField.sendKeys(props.getProperty("existedEmail"));
    driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
    signScreen.birthdayInputField.click();
    signScreen.okButtonDate.click();
    signScreen.passwordInputField.click();
    signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
    driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
    signScreen.signUpButton.click();
    Assert.assertNull(signScreen.nameInputField);

}
@Test
    public void arabicMobileDateFormat()throws IOException, InterruptedException
{

        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.signUpButtonWhatsHappeningPage.click();
        signScreen.nameInputField.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.userNameInputField.click();
        signScreen.userNameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.click();
        signScreen.emailInputField.sendKeys(props.getProperty("validEmail"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.birthdayInputField.click();
        signScreen.okButtonDate.click();
        signScreen.passwordInputField.click();
        signScreen.passwordInputField.sendKeys(props.getProperty("emailPassword"));
        driver.pressKey(new KeyEvent().withKey(AndroidKey.BACK));
        signScreen.signUpButton.click();
    Wait<AndroidDriver> notRobotWait=new FluentWait<AndroidDriver>(driver)
            .pollingEvery(Duration.ofSeconds(2))
            .withTimeout(Duration.ofSeconds(40))
            .ignoring(NoSuchElementException.class);
    notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
    notRobotWait.until(ExpectedConditions.invisibilityOf(signScreen.iAmNotRobot));
    Assert.assertNotNull(signScreen.otpInputField);

    }




}
