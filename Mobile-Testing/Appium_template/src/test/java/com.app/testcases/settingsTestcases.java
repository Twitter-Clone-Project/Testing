package com.app.testcases;

import com.app.base.base;
import com.app.screens.settings;
import com.app.screens.timeline;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import org.junit.Assert;
import org.openqa.selenium.remote.DesiredCapabilities;
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


public class settingsTestcases extends base {
    settings settingsPage;
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
        AndroidDriver driver = new AndroidDriver(url, cap);
        driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);

        settingsPage =new settings();
        settingsPage.loginBtn.click();
        settingsPage.emailInput.click();
        settingsPage.emailInput.sendKeys("menna.ibrahim02@eng-st.cu.edu.eg");
        settingsPage.passInput.click();
        settingsPage.passInput.sendKeys("147258369");
        settingsPage.loginBtn.click();
        settingsPage.drawer.click();
        settingsPage.settingsButton.click();
    }

    @Test
    public  void  updateUsername() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        settingsPage=new settings();

        settingsPage.updateUserNameButton.click();
        settingsPage.newUserName.click();
        settingsPage.newUserName.sendKeys("testing");
        settingsPage.doneButtonUsername.click();

    }




}
