const aws = require("@pulumi/aws");

function createSubnet(vpc, routeTable) {
    const subnet = new aws.ec2.Subnet("mySubnet", {
        vpcId: vpc.id,
        cidrBlock: "10.0.1.0/24",
        mapPublicIpOnLaunch: true,
        tags: {
            Name: "mySubnet",
        },
    });

    const routeTableAssociation = new aws.ec2.RouteTableAssociation("myRouteTableAssociation", {
        subnetId: subnet.id,
        routeTableId: routeTable.id,
    });

    return subnet;
}

module.exports = {
    createSubnet,
};
