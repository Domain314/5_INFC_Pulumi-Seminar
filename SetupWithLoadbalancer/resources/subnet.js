const aws = require("@pulumi/aws");

function createSubnet(vpc, routeTable, zone, cidr) {
    const subnet = new aws.ec2.Subnet(`mySubnet-${zone}`, {
        vpcId: vpc.id,
        cidrBlock: cidr,
        mapPublicIpOnLaunch: true,
        tags: {
            Name: "mySubnet",
        },
        availabilityZone: zone
    });

    const routeTableAssociation = new aws.ec2.RouteTableAssociation(`myRouteTableAssociation-${zone}`, {
        subnetId: subnet.id,
        routeTableId: routeTable.id,
    });

    return subnet;
}

module.exports = {
    createSubnet,
};
