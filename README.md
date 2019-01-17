# AWS Serverless Website Canary

Monitor your website and get alerted of outages.

This application will continually check your website and send you an email when it detects a problem. Optionally, configure it to send a message to an SNS Topic which you can then use a Lambda Function to perform other notifications (e.g send a messag to a Slack room; page your oncall).

## Deploy through Serverless Applications Repository

1. Navigate to [aws-serverless-website-canary on the Serverless Applications Repository](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:347971939225:applications~aws-serverless-website-canary) and click Deploy
1. Specify parameters:
    1. `AlarmNotificationEmail` - Optional. Must specify either this or `AlarmNotificationTopic`. If you want to be notified via email, simply enter your email address here.
    1. `AlarmNotificationTopic` - Optional. Must specify either this or `AlarmNotificationEmail`. If you want to be notified via some other means, specify an SNS Topic ARN and set up a Lambda Function with your notification logic.
    1. `PuppeteerTestSchedule` - How frequently to run tests. Defaults to every minute. See [documentation for valid expressions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)
    1. `WaitForSelector` - Specify a DOM/CSS selector to wait for before the website is considered to be healthy. If the website loads dynamic data, it's a good idea to specify a DOM element that loads as a result of that data being successfully loaded.
    1. `WebsiteUrl` - The URL of the website you wish to monitor.
1. Click Deploy and wait for Creation to complete.
1. *Optional* Navigate to the Lambda Console's Application view to see metrics.

## Local Setup

```bash
npm run setup
ALARM_NOTIFICATION_EMAIL=your.email@example.com STACK_NAME=aws-website-canary npm run package-deploy
```