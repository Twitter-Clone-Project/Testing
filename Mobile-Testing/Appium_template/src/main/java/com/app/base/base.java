package com.app.base;

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
import java.io.IOException;
import java.net.URL;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class base {
    protected static AndroidDriver driver;
    protected Properties props;
    protected FileInputStream inputfile;
    public base()
    {
        PageFactory.initElements(new AppiumFieldDecorator(driver),this);
    }

    @Parameters({"deviceName","platformName","platformVersion"})
    @BeforeClass
    public void beforeclass(String deviceName, String platformName, String platformVersion) throws IOException {
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
    @AfterClass
    public void AfterEach()
    {
        driver.quit();
    }
}
