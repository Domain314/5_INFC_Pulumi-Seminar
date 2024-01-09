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

async function createInfrastructure() {
    const myVpc = vpc.createVpc();
    const myIgw = internetGateway.createInternetGateway(myVpc);
    const myRouteTable = routeTable.createRouteTable(myVpc, myIgw);
    const mySubnet = subnet.createSubnet(myVpc, myRouteTable);
    const mySecurityGroup = securityGroup.createSecurityGroup(myVpc);
    const myNetworkInterface = networkInterface.createNetworkInterface(mySubnet, mySecurityGroup);
    const myEip = elasticIP.createElasticIp();
    const myInstance = ec2Instance.createEc2Instance(mySubnet, mySecurityGroup);

    const eipAssociation = new aws.ec2.EipAssociation("eipAssoc", {
        instanceId: myInstance.id,
        allocationId: myEip.allocationId
    });
}

createInfrastructure();