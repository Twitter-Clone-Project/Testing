package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class forgetPassScreens extends base {
    @AndroidFindBy(className = "android.widget.EditText")
    private WebElement emailInput;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Next\"]")
    private WebElement nextBtn;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Done\"]")
    public WebElement waitElement;
    @AndroidFindBy(xpath = "//(android.widget.EditText)[1]")
    private WebElement newPassInput;
    @AndroidFindBy(xpath = "//(android.widget.EditText)[2]")
    private WebElement retypeNewPassInput;

    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"No user registered with this email \"]")
    public WebElement emailAssertionElement;

    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Incorrect OTP\"]")
    public WebElement otpAssertionElement;

    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Password and confirmation should be same\"]")
    public WebElement mismatchAssertionElement;
    @AndroidFindBy(xpath = "//android.widget.Button[@content-desc=\"Resend!\"]")
    public WebElement resendOtpBtn;

    public void typeEmail(String email){emailInput.sendKeys(email);}
    public void clickOnEmail(){emailInput.click();}
    public void clickOnNext(){nextBtn.click();}
    public void clickOnNewPassInput(){newPassInput.click();}
    public void clickOnRetypeNewPassInput(){retypeNewPassInput.click();}
    public void typeNewPass(String pass){newPassInput.sendKeys(pass);}
    public void retypeNewPass(String pass){retypeNewPassInput.sendKeys(pass);}
    public void clickOnDone(){waitElement.click();}
    public void clickOnResendOtp(){resendOtpBtn.click();}



}
