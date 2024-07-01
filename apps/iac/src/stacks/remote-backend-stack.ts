import CustomStack from "../custom-stack"
import {StackProps, aws_s3 as s3, RemovalPolicy, aws_dynamodb as dynamodb} from 'aws-cdk-lib';
import {Construct} from "constructs";
import { BaseConfig } from "../config";

export class RemoteBackendStack extends CustomStack {

    constructor(scope: Construct, id: string, props: StackProps, config: BaseConfig) {
        super(scope,id,props,config);
        this.s3(config)
        this.dynamodb(config)
    }

    s3(config: BaseConfig) {
        new s3.Bucket(this, 'bucket', {
            bucketName:  config.autoResourceName('bucket'),
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            enforceSSL: true,
            versioned: true,
            removalPolicy: RemovalPolicy.RETAIN,
        })
    }

    dynamodb(config: BaseConfig) {
        new dynamodb.TableV2(this, 'tf-table', {
            tableName: config.autoResourceName('dynamodb'),
            partitionKey: { name: 'LockID', type: dynamodb.AttributeType.STRING },
            pointInTimeRecovery: true
        });
    }

}
