const aws = require("@pulumi/aws");

function createSecurityGroup(vpc) {
    const securityGroup = new aws.ec2.SecurityGroup("mySecurityGroup", {
        vpcId: vpc.id,
        description: "Allow SSH, HTTP, HTTPS, and all outbound",
        ingress: [
            {
                protocol: "tcp",
                fromPort: 22,  // SSH
                toPort: 22,
                cidrBlocks: ["0.0.0.0/0"]
            },
            {
                protocol: "tcp",
                fromPort: 80,  // HTTP
                toPort: 80,
                cidrBlocks: ["0.0.0.0/0"]
            },
            {
                protocol: "tcp",
                fromPort: 443,  // HTTPS
                toPort: 443,
                cidrBlocks: ["0.0.0.0/0"]
            },
        ],
        egress: [
            {
                protocol: "-1",
                fromPort: 0,
                toPort: 0,
                cidrBlocks: ["0.0.0.0/0"]
            },
        ],
    });
    return securityGroup;
}

module.exports = {
    createSecurityGroup,
};
