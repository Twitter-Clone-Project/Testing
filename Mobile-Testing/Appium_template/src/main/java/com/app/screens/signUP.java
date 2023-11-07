package com.app.screens;

import com.app.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;

public class signUP extends base {

    @AndroidFindBy(accessibility = "X")
    public WebElement icon;

    @AndroidFindBy(accessibility = "Show navigation drawer")
    public WebElement nagvDrawer;

    @AndroidFindBy(xpath = "(//android.view.View)[1]")
    public WebElement createAccountButtonDrawer;

    @AndroidFindBy(xpath = "(//android.widget.Button)[2]")
    public WebElement createAccountButton;
    @AndroidFindBy(xpath = "(//android.view.ViewGroup)[4]")
    public WebElement nextButtonLanguage;
    @AndroidFindBy(id = "com.twitter.android:id/name_edit_text")
    public WebElement nameInputField;
    @AndroidFindBy (id = "com.twitter.android:id/phone_or_email_edit_text")
    public WebElement emailInputField;
    @AndroidFindBy (id = "com.twitter.android:id/birthday_edit_text")
    public WebElement birthdayInputField;

    //next button and sign up button
    @AndroidFindBy (id = "com.twitter.android:id/cta_button")
    public WebElement nextButtonInput;

    @AndroidFindBy(id = "com.twitter.android:id/textinput_error")
    public WebElement emailErrorMessage;

    @AndroidFindBy(id = "com.twitter.android:id/textinput_error")
    public WebElement nameErrorMessage;

    @AndroidFindBy(id ="com.twitter.android:id/back_button")
    public WebElement backButton;

    @AndroidFindBy (xpath = "(//android.widget.Button)[2]")
    public WebElement selectedYear;

    @AndroidFindBy (id = "com.twitter.android:id/name_edit_text")
    public WebElement nameFieldSignUp;

    @AndroidFindBy(id = "com.twitter.android:id/phone_or_email_edit_text")
    public WebElement emailFieldSignUp;






}
