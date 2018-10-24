package com.sunrj.application.System;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
@Component
public class TaskTest {
	/*@Scheduled(fixedDelay = 5000)  */
	
	@Scheduled(cron = "0 39 16 * * ?")
	public void doSomething() {   
	    System.out.println("-----------------5秒执行一次----------------");
	}  
}
