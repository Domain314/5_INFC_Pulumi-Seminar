const aws = require("@pulumi/aws");

function createInternetGateway(vpc) {
    const igw = new aws.ec2.InternetGateway("myIgw", {
        vpcId: vpc.id,
        tags: {
            Name: "myIgw",
        },
    });
    return igw;
}

module.exports = {
    createInternetGateway,
};
