const aws = require("@pulumi/aws");

function createRouteTable(vpc, igw) {
    const routeTable = new aws.ec2.RouteTable("myRouteTable", {
        vpcId: vpc.id,
        routes: [
            {
                cidrBlock: "0.0.0.0/0",
                gatewayId: igw.id,
            },
        ],
        tags: {
            Name: "myRouteTable",
        },
    });
    return routeTable;
}

module.exports = {
    createRouteTable,
};
