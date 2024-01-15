const aws = require("@pulumi/aws");

function createOneEc2Instance(subnet, securityGroup, id) {
    const userData = `#!/bin/bash
    apt-get update -y
    apt-get install nginx -y
    echo "${createUserData(id)}" > /var/www/html/index.html
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
        dependsOn: [securityGroup, subnet], // Explicit dependency
    });
    return ec2Instance;
}

function createUserData(id) {
    return `
<!DOCTYPE html>
<html lang="en" class="dark">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Hello World</title>
    <meta property='og:title' content='Hello World'>
    <meta name='twitter:title' content='Hello World'>

    <meta name='description' content='Hello World - IaaC - Terraform Workshop'>
    <meta property='og:description' content='Hello World - IaaC - Terraform Workshop'>
    <meta name='twitter:description' content='Hello World - IaaC - Terraform Workshop'>
    <meta name="author" content="Domain314">

</head>

<body>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        @keyframes rainbowFlow {
            0% {
                color: hsl(0, 53%, 37%);
            }

            12.5% {
                color: hsl(44, 53%, 37%);
            }

            25% {
                color: hsl(89, 53%, 37%);
            }

            37.5% {
                color: hsl(133, 53%, 37%);
            }

            50% {
                color: hsl(178, 53%, 37%);
            }

            62.5% {
                color: hsl(222, 53%, 37%);
            }

            75% {
                color: hsl(267, 53%, 37%);
            }

            87.5% {
                color: hsl(311, 53%, 37%);
            }

            100% {
                color: hsl(355, 53%, 37%);
            }
        }

        .animate-flow {
            animation: rainbowFlow 5s infinite linear;
        }

        .main {
            height: 100vh;
            width: 100vw;
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <div class="main">
        <h1 class="animate-flow">Hello World, ${id}!</h1>
    </div>
</body>

</html>`;
}


module.exports = {
    createOneEc2Instance
};
