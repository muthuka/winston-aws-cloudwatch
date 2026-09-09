# winston-aws-cloudwatch

[![npm](https://img.shields.io/npm/v/@muthu16/winston-aws-cloudwatch.svg)](https://www.npmjs.com/package/@muthu16/winston-aws-cloudwatch) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/)

A [Winston](https://www.npmjs.com/package/winston) 3 transport for
[Amazon CloudWatch Logs](https://aws.amazon.com/cloudwatch/).

Requires **Node.js 20+**. Logging uses AWS SDK for JavaScript v3
(`@aws-sdk/client-cloudwatch-logs`).

## Install

```sh
npm install @muthu16/winston-aws-cloudwatch winston
```

## Usage

```js
const winston = require('winston')
const CloudWatchTransport = require('@muthu16/winston-aws-cloudwatch')

const logger = winston.createLogger({
  transports: [
    new CloudWatchTransport({
      logGroupName: '...', // REQUIRED
      logStreamName: '...', // REQUIRED
      createLogGroup: true,
      createLogStream: true,
      submissionInterval: 2000,
      submissionRetryCount: 1,
      batchSize: 20,
      awsConfig: {
        region: 'us-east-1'
        // Optional: accessKeyId, secretAccessKey.
        // Otherwise the default credential chain is used (env, shared
        // config, IAM role, etc.).
      },
      formatLog: item =>
        `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
    })
  ]
})
```

If `createLogGroup` or `createLogStream` is enabled, an already-existing group
or stream is treated as success.

## Options

| Option | Default | Description |
| --- | --- | --- |
| `logGroupName` | — | CloudWatch log group (required) |
| `logStreamName` | — | CloudWatch log stream (required) |
| `createLogGroup` | `false` | Create the log group if it does not exist |
| `createLogStream` | `false` | Create the log stream if it does not exist |
| `submissionInterval` | `2000` | Minimum ms between batch submissions |
| `submissionRetryCount` | `1` | Extra attempts after `InvalidSequenceTokenException` |
| `batchSize` | `20` | Max log events per `PutLogEvents` call |
| `awsConfig` | `null` | Options passed to `CloudWatchLogsClient` |
| `formatLog` | built-in | `(item) => string` used as the event message |
| `formatLogItem` | built-in | `(item) => { message, timestamp }` (ignored if `formatLog` is set) |

## Error Handling

If logging to CloudWatch fails, the transport emits an `error` event. Subscribe
to it to [avoid crashes](https://github.com/winstonjs/winston#awaiting-logs-to-be-written-in-winston):

```js
logger.on('error', err => {
  console.error('CloudWatch logging failed', err)
})
```

## But Why?

As you may have noticed, there is also
[winston-cloudwatch](https://www.npmjs.com/package/winston-cloudwatch), which
predates this module. After making some contributions to that one, I felt like
writing my own version. Feel free to use whichever you like best.

This package is a maintained fork of
[timdp/winston-aws-cloudwatch](https://github.com/timdp/winston-aws-cloudwatch),
published as [`@muthu16/winston-aws-cloudwatch`](https://www.npmjs.com/package/@muthu16/winston-aws-cloudwatch).

## Author

[Tim De Pauw](https://tmdpw.eu/)

## License

MIT
