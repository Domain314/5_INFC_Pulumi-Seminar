const aws = require("@pulumi/aws");

function createOneEc2Instance(subnet, securityGroup, id) {
    const userData = `#!/bin/bash
    apt-get update -y
    apt-get install nginx -y
    echo "Hello World" > /var/www/html/index.html
    systemctl start nginx
    systemctl enable nginx`;

    const ec2Instance = new aws.ec2.Instance(`myInstance-${id}`, {
        ami: "ami-0c7217cdde317cfec", // Replace with the latest Ubuntu AMI in the region, if outdated
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

function createManyEc2Instances(subnet, securityGroup, count) {
    let instances = [];

    for (let i = 0; i < count; i++) {
        const userData = `#!/bin/bash
        apt-get update -y
        apt-get install nginx -y
        echo "Hello World" > /var/www/html/index.html
        systemctl start nginx
        systemctl enable nginx`;

        const instance = new aws.ec2.Instance(`myInstance-${i}`, {
            ami: "ami-0c7217cdde317cfec", // Replace with the latest Ubuntu AMI in the region, if outdated
            instanceType: "t2.micro",
            subnetId: subnet.id,
            associatePublicIpAddress: true,
            vpcSecurityGroupIds: [securityGroup.id],
            userData: userData,
            tags: {
                Name: `myInstance-${i}`,
            },
            dependsOn: [securityGroup], // Explicit dependency
        });

        instances.push(instance);
    }

    return instances;
}


module.exports = {
    createOneEc2Instance,
    createManyEc2Instances,
};
