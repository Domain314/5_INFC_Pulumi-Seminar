const aws = require("@pulumi/aws");

function createVpc() {
    const vpc = new aws.ec2.Vpc("myVpc", {
        cidrBlock: "10.0.0.0/16",
        enableDnsSupport: true,
        enableDnsHostnames: true,
        tags: {
            Name: "myVpc",
        },
    });
    return vpc;
}

module.exports = {
    createVpc,
};
