const aws = require("@pulumi/aws");

function createNetworkInterface(subnet, securityGroup) {
    const networkInterface = new aws.ec2.NetworkInterface("myNetworkInterface", {
        subnetId: subnet.id,
        privateIps: ["10.0.1.50"],
        securityGroups: [securityGroup.id],
    });
    return networkInterface;
}

module.exports = {
    createNetworkInterface,
};
