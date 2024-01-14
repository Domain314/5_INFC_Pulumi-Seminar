"use strict";
const awsx = require("@pulumi/awsx");

function createLoadBalancer(vpcId, subnetIds, securityGroupId) {
    const sIds = subnetIds.map(subnet => subnet.id);
    // Create an ALB in the provided VPC listening on port 80.
    const alb = new awsx.lb.ApplicationLoadBalancer("web-traffic", {
        vpcId: vpcId,
        subnets: subnetIds,
        securityGroups: [securityGroupId],
        listeners: [{
            port: 80,
        }],
    });

    return alb;
}

module.exports = {
    createLoadBalancer
};
