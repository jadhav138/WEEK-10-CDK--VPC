
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcCdkProjectStack extends cdk.Stack {
  // Ensure this is public so it can be accessed from other stacks
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the VPC
    this.vpc = new ec2.Vpc(this, 'MyVPC', {
      maxAzs: 2, // Using 2 availability 
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
        {
          name: 'Database',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });

    // Output VPC ID for visibility
    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      description: 'VPC ID',
    });
  }
}
