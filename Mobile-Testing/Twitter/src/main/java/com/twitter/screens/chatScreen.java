package com.twitter.screens;

import com.twitter.base.base;
import io.appium.java_client.pagefactory.AndroidFindBy;
import org.openqa.selenium.WebElement;

public class chatScreen extends base {
    @AndroidFindBy(className = "android.widget.EditText")
    private WebElement chatSearch;
    @AndroidFindBy(xpath = "//android.view.View[contains(@content-desc,'@rawantest1')]")
    private WebElement rawantest1Chat;
    @AndroidFindBy(className = "android.widget.EditText")
    private WebElement msgInput;

    @AndroidFindBy(xpath = "//(android.widget.Button)[2]")
    public WebElement sendBtn;
    @AndroidFindBy(xpath = "//android.view.View[contains(@content-desc,'neww msgg')]")
    public WebElement newMsg;

    public void clickOnChatSearch() {
        chatSearch.click();

    }

    public void typeSearch(String search) {
        chatSearch.sendKeys(search);
    }
    public void clickOnrawantest1Chat(){
        rawantest1Chat.click();
    }
    public void clickOnMsgInput()
    {
        msgInput.click();
    }
    public void typeMsg(String msg){
        msgInput.sendKeys(msg);
    }
    public void clickOnSend(){
        sendBtn.click();
    }
}
