package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class loginInputsScreen extends base {
    @AndroidFindBy(xpath = "//(android.widget.EditText)[1]")
    private WebElement emailInput;
    @AndroidFindBy(xpath = "//(android.widget.EditText)[2]")
    public WebElement passInput;
    @AndroidFindBy (xpath="//android.view.View[@content-desc=\"Login\"]")
    private WebElement loginBtn;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Forgot Password?\"]")
    private WebElement forgetPassBtn;
    @AndroidFindBy(xpath = "//android.widget.EditText[2]/android.widget.Button")
    private WebElement passEye;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"No User With Email\"]")
    public WebElement emailAssertionElement;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Wrong Password\"]")
    public WebElement passAssertionElement;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Email cannot be empty\"]")
    public WebElement emptyEmailAssertion;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Email is not valid\"]")
    public WebElement emailFormAssertion;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Password length should be 6 or more\"]")
    public WebElement passFormAssertion;
    @AndroidFindBy(xpath = "//android.view.View[@content-desc=\"Password cannot be empty\"]")
    public WebElement emptyPassAssertion;

    public void typeEmail(String email){
        emailInput.sendKeys(email);
    }
    public void typePass(String pass){
        passInput.sendKeys(pass);
    }
    public void clickOnLogin(){
        loginBtn.click();
    }
    public void clickOnForgetPass(){
        forgetPassBtn.click();
    }

    public void clickOnEmailInput(){
        emailInput.click();
    }
    public void clickOnPassInput(){
        passInput.click();
    }
    public void clickOnPassEye(){passEye.click();}
}
