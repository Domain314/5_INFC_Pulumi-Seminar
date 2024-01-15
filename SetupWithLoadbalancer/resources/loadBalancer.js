"use strict";
const awsx = require("@pulumi/awsx");

function createLoadBalancer(vpcId, subnetIds, securityGroupId, targetGroup) {

    // Create an ALB in the provided VPC listening on port 80.
    const alb = new awsx.lb.ApplicationLoadBalancer("web-traffic", {
        vpcId: vpcId,
        subnets: subnetIds,
        // subnetIds: subnetIds,
        securityGroups: [securityGroupId],
        listener: {
            port: 80,
            defaultActions: [{
                type: "forward",
                targetGroupArn: targetGroup.arn
            }],
        }
    });

    return alb;
}

module.exports = {
    createLoadBalancer
};
