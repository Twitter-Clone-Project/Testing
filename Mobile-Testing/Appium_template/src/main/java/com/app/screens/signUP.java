package com.app.screens;

import com.app.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

public class signUP extends base {

    @AndroidFindBy(accessibility = "SignUp")
    public WebElement signUpButtonWhatsHappeningPage;

    @AndroidFindBy(xpath = "(//android.widget.EditText)[1]")
    public WebElement nameInputField;
    @AndroidFindBy(xpath = "(//android.widget.EditText)[2]")
    public WebElement userNameInputField;
    @AndroidFindBy (xpath = "(//android.widget.EditText)[3]")
    public WebElement emailInputField;
    @AndroidFindBy (xpath = "(//android.widget.EditText)[4]")
    public WebElement birthdayInputField;
    @AndroidFindBy (accessibility = "OK")
    public WebElement okButtonDate;

    @AndroidFindBy (xpath = "(//android.widget.EditText)[5]")
    public WebElement passwordInputField;

    @AndroidFindBy (accessibility = "Sign up")
    public WebElement signUpButton;

    @AndroidFindBy (xpath = "//android.view.View[@content-desc=\"Terms\"]/android.widget.TextView")
    public WebElement iAmNotRobot;

    @AndroidFindBy (accessibility = "Email is not valid")
    public WebElement notValidEmailMessage;

    @AndroidFindBy (accessibility = "Cancel")
    public WebElement cancelButton;
    @AndroidFindBy (xpath = "(//android.widget.EditText)[1]")
    public WebElement otpInputField;

    @AndroidFindBy (accessibility = "Invalid input data: Invalid value")
    public WebElement invalidOTPMessage;
    @AndroidFindBy(accessibility = "Incorrect OTP")
    public WebElement incorrectOTPMessage;

    @AndroidFindBy(accessibility = "Name cannot be empty")
    public WebElement emptyNameMessage;

    @AndroidFindBy(accessibility = "Username cannot be empty")
    public WebElement emptyUserNameMessage;

    @AndroidFindBy(accessibility = "Email cannot be empty")
    public WebElement emptyEmailMessage;

    @AndroidFindBy(accessibility = "Date of birth cannot be empty")
    public WebElement emptyDateMessage;

    @AndroidFindBy(accessibility = "Password cannot be empty")
    public WebElement emptyPasswordMessage;



}
