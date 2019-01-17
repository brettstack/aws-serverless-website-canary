# Serverless Chrome Layer

Creates a Lambda Layer with Headless Chromium Binary. See https://github.com/adieuadieu/serverless-chrome for additional information on building Headless Chromium for Lambda.

## Deploy through Serverless Applications Repository

To deploy this application to your account, navigate to [serverless-chrome-layer on the Serverless Applications Repository](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:347971939225:applications~serverless-chrome-layer) and click Deploy.

## Publish to Serverless Applications Repository

```bash
# See https://docs.aws.amazon.com/serverlessrepo/latest/devguide/serverless-app-publishing-applications.html#publishing-application-through-aws-console for instructions on configuring an S3 Bucket for Serverless Applications Repository.
SAR_ASSETS_S3_BUCKET=your-bucket-configured-with-sar-resource-policy sam package \
--template-file template.yaml \
--output-template-file template.packaged.yaml \
--s3-bucket $SAR_ASSETS_S3_BUCKET

sam publish \
--template template.packaged.yaml \
--region us-east-1
```