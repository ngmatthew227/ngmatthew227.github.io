# How to handle logging in Spring Boot

In Spring boot, it suggest to use Logback as the logging framework. This artical is to discuss how should we use the logback in spring boot base on my experience.

## How to import logger in spring boot

Direct import: 

```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-logging</artifactId>
      <version>2.1.11.RELEASE</version>
      <scope>compile</scope>
    </dependency>
```

Indirect import: 

use `spring-boot-starter` | `spring-boot-starter-web`, it will auto import

## How to config  logback (.properties / .yaml)

```properties
logging.file=logback-demo.log

# logging level: DEBUG -> INFO -> WARN -> ERROR
logging.level.root=DEBUG
logging.level.com.example.logbackdemo=INFO
```

---

```yaml
logging:
    file: logback-demo.log
    level:
        root: INFO
        com.example.logbackdemo: WARN
```

## How to config logback (xml)

For more complex setting of logging, logback allowed the user to perform more complex setting. 

Logback support the below file:

`logback-spring.xml, logback-spring.groovy, logback.xml, logback.groovy`

The config loading sequence as below

logback.xml -> application.properties -> logback-spring.xml

In this article, we will use logback-spring.xml as example. Below is some detail config properties and the function:

#### configuration

root tag, can used to set the full config of logback: 

- scan="true": auto scan, if set to true, it will update automatically

- scanPeriod="60 seconds": the frequency of scan

- debug="false": the mode of logback, if set to true, it will print some logback's debug info

#### property

- used to set the property, the can use like `${Property_Name}` in other place

```xml
# Declare
<property name="NAME1" value="value1" />


# Usage
<pattern>${NMAE1}</pattern>
```

#### conversionRule

- conversionWord: name used in pattern

- converterClass: the class used to log

```xml
<conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
<conversionRule conversionWord="wex" converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter" />
<conversionRule conversionWord="wEx" converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter" />

<property name="FILE_LOG_PATTERN"
        value="${FILE_LOG_PATTERN:-%d{yyyy-MM-dd HH:mm:ss.SSS} ${LOG_LEVEL_PATTERN:-%5p} --- [%t] %logger{100} : %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}" /> 

wEx
```

#### appender

The main component of the logback config. Can consider as the tasks of logback.  The most common appender:

1. ch.qos.logback.core.ConsoleAppender [Write the log to console]
   
   ```xml
   <appender name="CONSOLE_OUT" class="ch.qos.logback.core.ConsoleAppender">
       <encoder class="ch.qos.logback.classic.encodr.PatternLayoutEncoder">
           <pattern>${CONSOLE_LOG_PATTERN}</pattern>
           <charset>UTF-8</charset>
       </encoder>
   </appender>
   ```

2. ch.qos.logback.core.FileAppender [Write the log to file]
   
   ```xml
   <appender name="FILE" class="ch.qos.logback.core.FileAppender">
       <!-- the file write log, relative path or absolute path -->
       <file>testFile.log</file>
       <!-- the rule of append log, default is true, won't clear the orginal file -->
       <append>true</append>
       <!-- will the log will write to the file immediate, default is true -->
       <immdiateFlush>true</immdiateFlush>
       <encoder class="ch.qos.logback.classic.encodr.PatternLayoutEncoder">
           <pattern>${CONSOLE_LOG_PATTERN}</pattern>
           <charset>UTF-8</charset>
       </encoder>
   </appender>
   ```



3. ch.qos.logback.core.rolling.RollingFileAppender [Write the log to file with more advance config, can split log to different file base on the config]
   
   ```xml
   <appender name="FILE_OUT" class="ch.qos.logback.core.rolling.RollingFileAppender">
       <encoder class="ch.qos.logback.classic.encodr.PatternLayoutEncoder">
           <pattern>${CONSOLE_LOG_PATTERN}</pattern>
           <charset>UTF-8</charset>
       </encoder>
       <!-- the file write log, relative path or absolute path -->
       <file>testFile.log</file>
   
       <!-- rolling policy: SizeAndTimeBasedRollingPolicy | TimeBasedRollingPolicy  -->
       <rollingPolicy>
           <!-- the file name create rule  -->        
           <fileNamePattern>${LOG_FILE}.%d{yyyy-MM-dd}.%i.gz</fileNamePattern>
           <!-- if the size of logs > max size allowed, delete log?  -->        
           <cleanHistoryOnStart>true</cleanHistoryOnStart>
           <!-- max single log file size  -->        
           <maxFileSize>20MB</maxFileSize>
           <!-- the total disk size capacity  -->        
           <totalSizeCap>1GB</totalSizeCap>
           <!-- the max number of log file to keep  -->        
           <maxHistory>10</maxHistory>
       </rollingPolicy>    
   
   </appender>
   ```



#### root

How the root setting of logging, can use more than one appender

```xml
<root level="INFO">
     <!-- ref = name set in appender  --> 
    <appender-ref ref="CONSOLE-WITH-COLOR" />
    <appender-ref ref="FILE" />
</root>
```



#### logger

How the setting for some package

```xml
<!-- name * | level | additivity  --> 
<!-- name: package name  --> 
<!-- additivity: will the log also utput to the lopper level, like root  --> 
<logger name="com.example.logbackdemo.IndexAction" level="INFO" additivity="false" >
    <appender-ref ref="CONSOLE-WITH-COLOR" />
</logger>
```



#### springProfile

This tag used to indicate what kind of config should be use under different env

```xml
<springProfile name="local,dev">
	<root level="INFO">
		<appender-ref ref="CONSOLE-WITH-COLOR"/>
		<appender-ref ref="FILE"/>
	</root>
</springProfile>

<springProfile name="prod">
	<root level="INFO">
		<appender-ref ref="CONSOLE-WITH-COLOR"/>
		<appender-ref ref="FILE"/>
	</root>
</springProfile>
```



### Full Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xml>
<configuration>
	<conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter" />
	<conversionRule conversionWord="wex" converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter" />
	<conversionRule conversionWord="wEx" converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter" />

	<property name="CONSOLE_LOG_PATTERN"
		value="${CONSOLE_LOG_PATTERN:-%d{yyyy-MM-dd HH:mm:ss.SSS} ${LOG_LEVEL_PATTERN:-%5p} ${PID:- } --- [%t] %-40.40logger{39} : %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}" />
	<property name="FILE_LOG_PATTERN"
		value="${FILE_LOG_PATTERN:-%d{yyyy-MM-dd HH:mm:ss.SSS} ${LOG_LEVEL_PATTERN:-%5p} --- [%t] %logger{100} : %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}" />

	<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>${CONSOLE_LOG_PATTERN}</pattern>
			<charset>utf8</charset>
		</encoder>
	</appender>

  <!-- Env: Local -->
	<springProfile name="local">
		<property name="LOG_FILE" value="local.log" />
    <root level="INFO">
			<appender-ref ref="FILE" />
			<appender-ref ref="CONSOLE" /> 
		</root>
		<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
			<encoder>
				<pattern>${FILE_LOG_PATTERN}</pattern>
				<charset>utf8</charset>
			</encoder>
			<file>${LOG_FILE}</file>
			<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
				<fileNamePattern>${LOG_FILE}.%d{yyyy-MM-dd}</fileNamePattern>
				<maxHistory>30</maxHistory>
			</rollingPolicy>
		</appender>
		<logger name="com.matt.important" level="DEBUG" additivity="false">
			<appender-ref ref="FILE" />
			<appender-ref ref="CONSOLE" /> 
		</logger>
	</springProfile>


  <!-- Env: Production -->
	<springProfile name="prd">
		<property name="LOG_FILE" value="/app/logs/server-log.log" />
		<property name="LOGIN_FILE" value="/app/logs/login-log.log" />

		<root level="WARN">
			<appender-ref ref="FILE" />
		</root>

    <!-- Appender 1 -->
		<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
			<encoder>
				<pattern>${LOG_FILE}</pattern>
				<charset>utf8</charset>
			</encoder>
			<file>${LOG_FILE}</file>
			<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
				<fileNamePattern>${LOG_FILE}.%d{yyyy-MM-dd}</fileNamePattern>
				<maxHistory>30</maxHistory>
			</rollingPolicy>
		</appender>

    <!-- Appender 2 -->
		<appender name="LOGIN" class="ch.qos.logback.core.rolling.RollingFileAppender">
			<encoder>
				<pattern>${LOG_FILE}</pattern>
				<charset>utf8</charset>
			</encoder>
			<file>${LOGIN_FILE}</file>
			<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
				<fileNamePattern>${LOGIN_FILE}.%d{yyyy-MM-dd}</fileNamePattern>
				<maxHistory>30</maxHistory>
			</rollingPolicy>
		</appender>


		<logger name="com.example.login.service" level="INFO" additivity="false">
			<appender-ref ref="LOGIN" />
		</logger>

		<logger name="com.example.main" level="INFO" additivity="false">
			<appender-ref ref="FILE" />
		</logger>
	</springProfile>

</configuration>
```




**Done**


