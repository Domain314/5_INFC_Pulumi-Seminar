const aws = require("@pulumi/aws");

function createEc2Instance(subnet, securityGroup) {
    const userData = `#!/bin/bash
    apt-get update -y
    apt-get install nginx -y
    echo "Hello World" > /var/www/html/index.html
    systemctl start nginx
    systemctl enable nginx`;

    const ec2Instance = new aws.ec2.Instance("myInstance", {
        ami: "ami-0c7217cdde317cfec", // Replace with the latest Ubuntu AMI in your region, if outdated
        instanceType: "t2.micro",
        subnetId: subnet.id,
        associatePublicIpAddress: true,
        vpcSecurityGroupIds: [securityGroup.id],
        userData: userData,
        tags: {
            Name: "myNginx",
        },
        dependsOn: [securityGroup], // Explicit dependency
    });
    return ec2Instance;
}

module.exports = {
    createEc2Instance,
};
