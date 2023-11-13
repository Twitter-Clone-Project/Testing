package com.twitter.base;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import io.appium.java_client.remote.MobileCapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.PageFactory;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Parameters;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.util.Properties;

public class base {
    protected FileInputStream inputStream;
    protected Properties prop;
    protected static AndroidDriver driver;
    public base(){
        PageFactory.initElements(new AppiumFieldDecorator(driver),this);
    }

    @Parameters({"deviceName", "platformName", "platformVersion"})
    @BeforeClass
    public void beforeClass(String deviceName, String platformName, String platformVersion) throws Exception {

        File propFile = new File("src\\main\\resources\\config\\config.properties");
        inputStream = new FileInputStream(propFile);
        prop = new Properties();
        prop.load(inputStream);
        File app = new File(prop.getProperty("androidAppPath"));
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability(MobileCapabilityType.DEVICE_NAME, deviceName);
        caps.setCapability(MobileCapabilityType.PLATFORM_NAME, platformName);
        caps.setCapability(MobileCapabilityType.PLATFORM_VERSION, platformVersion);
        caps.setCapability(MobileCapabilityType.AUTOMATION_NAME, prop.getProperty("androidAutomationName"));
        caps.setCapability(MobileCapabilityType.APP, app.getAbsolutePath());
        driver = new AndroidDriver(new URL(prop.getProperty("appiumServer")), caps);

    }
    @AfterClass
    public void afterClass(){
        driver.quit();
    }
}
