package com.app.testcases;

import com.app.base.base;
import com.app.screens.signUP;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class signUpTestcases extends base {
    signUP signScreen;
    protected Properties props;

    //@Test
    public void checkEmailAlreadyExist() throws InterruptedException, IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.sendKeys(props.getProperty("existedEmail"));
        String actualMessage=signScreen.emailErrorMessage.getText();
        Assert.assertEquals(actualMessage,"Email has already been taken.");



    }

    //@Test
    public void checkEmailIsValid() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.sendKeys(props.getProperty("invalidEmail"));
        String actualMessage=signScreen.emailErrorMessage.getText();
        Assert.assertEquals(actualMessage,"Please enter a valid email.");
    }
    //@Test
    public void checkInvalidName() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();
        signScreen.nameInputField.sendKeys(props.getProperty("invalidName"));
        String Errorname=signScreen.nameErrorMessage.getText();
        Assert.assertEquals(Errorname,"Must be 50 characters or fewer.");

    }
    //@Test
    public void closeAndCheckDataIsEmpty() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();
        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.sendKeys(props.getProperty("validEmail"));
        signScreen.backButton.click();
        signScreen.nextButtonLanguage.click();
        String content=signScreen.nameInputField.getText();
        Assert.assertEquals(content,"Name");


    }
    //    @Test
    public void checkIfDataConsistent() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();

        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.sendKeys(props.getProperty("validEmail"));
        signScreen.birthdayInputField.click();
        signScreen.selectedYear.click();
        signScreen.nextButtonInput.click();
        signScreen.nextButtonInput.click();
        String nameSignUp=signScreen.nameFieldSignUp.getText();
        String emailSignUp=signScreen.emailFieldSignUp.getText();
        Assert.assertEquals(nameSignUp,props.getProperty("validName"));
        Assert.assertEquals(emailSignUp,props.getProperty("validEmail"));


    }
    //    @Test
    public  void checkOnNextButtonIfDisabled() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();
        signScreen.nameInputField.sendKeys(props.getProperty("invalidName"));
        signScreen.emailInputField.sendKeys(props.getProperty("invalidEmail"));
        signScreen.birthdayInputField.click();
        signScreen.selectedYear.click();
        signScreen.nextButtonInput.click();
        boolean isDisabled= !signScreen.nextButtonInput.isEnabled();
        Assert.assertEquals(isDisabled,true);



    }
    //    @Test
    public void checkIfEmptyDataPassed() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();
        boolean isDisabled= !signScreen.nextButtonInput.isEnabled();
        Assert.assertEquals(isDisabled,true);
    }
    @Test
    public void checkValidCase() throws IOException {
        File propsFile=new File("src/test/resources/testData/userData.properties");
        inputfile=new FileInputStream(propsFile);
        props=new Properties();
        props.load(inputfile);
        signScreen=new signUP();
        signScreen.icon.click();

        signScreen.nagvDrawer.click();
        signScreen.createAccountButtonDrawer.click();
        signScreen.createAccountButton.click();
        signScreen.nextButtonLanguage.click();

        signScreen.nameInputField.sendKeys(props.getProperty("validName"));
        signScreen.emailInputField.sendKeys(props.getProperty("validEmail"));
        signScreen.birthdayInputField.click();
        signScreen.selectedYear.click();
        signScreen.nextButtonInput.click();
        signScreen.nextButtonInput.click();
        signScreen.nextButtonInput.click();

    }


}
