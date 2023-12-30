package com.twitter.listeners;

import org.testng.ITestListener;
import org.testng.ITestResult;

import java.io.PrintWriter;
import java.io.StringWriter;

public class TestListener implements ITestListener {
    public void OnTestFailure(ITestResult result){
        if(result.getThrowable() !=null){
            StringWriter sw =new StringWriter();
            PrintWriter pw =new PrintWriter(sw);
            result.getThrowable().printStackTrace(pw);
            System.out.println(sw.toString());
        }
    }
}
