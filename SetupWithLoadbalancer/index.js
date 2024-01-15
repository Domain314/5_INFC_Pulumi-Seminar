"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

const vpc = require('./resources/vpc');
const internetGateway = require('./resources/internetGateway');
const routeTable = require('./resources/routeTable');
const subnet = require('./resources/subnet');
const securityGroup = require('./resources/securityGroup');
const networkInterface = require('./resources/networkInterface');
const elasticIP = require('./resources/elasticIP');
const ec2Instance = require('./resources/ec2Instance');
const loadBalancer = require('./resources/loadBalancer');

const az = ['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d', 'us-east-1e', 'us-east-1f'];
const ec2Amount = 3; // max: az.length

async function createInfrastructure() {
    const myVpc = vpc.createVpc();
    const myIgw = internetGateway.createInternetGateway(myVpc);
    const myRouteTable = routeTable.createRouteTable(myVpc, myIgw);
    const mySecurityGroup = securityGroup.createSecurityGroup(myVpc);

    const mySubnets = [];
    for (let i = 0; i < ec2Amount; i++) {
        mySubnets.push(subnet.createSubnet(myVpc, myRouteTable, az[i], `10.0.${i}.0/24`));
    }

    const myTargetGroup = new aws.lb.TargetGroup("myTargetGroup", {
        port: 80,
        protocol: "HTTP",
        vpcId: myVpc.id,
    });

    // Create Load Balancer
    const alb = loadBalancer.createLoadBalancer(myVpc.id, mySubnets, mySecurityGroup.id, myTargetGroup);


    // Create and attach EC2 instances to the Load Balancer
    for (let i = 0; i < ec2Amount; i++) {
        const instance = ec2Instance.createOneEc2Instance(mySubnets[i], mySecurityGroup, i);

        // Attach the EC2 instance to the Load Balancer
        new aws.alb.TargetGroupAttachment(`web-tga-${i}`, {
            targetGroupArn: myTargetGroup.arn,
            targetId: instance.id,
            port: 80
        });
    }

    // Export the URL of the Load Balancer
    return alb.loadBalancer.dnsName;
}

createInfrastructure().then(loadBalancerDns => {
    exports.loadBalancerDns = loadBalancerDns;
});