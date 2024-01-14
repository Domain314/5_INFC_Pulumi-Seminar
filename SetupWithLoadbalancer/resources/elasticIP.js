const aws = require("@pulumi/aws");

function createElasticIp() {
    const eip = new aws.ec2.Eip("myEip", {
        // networkInterface: networkInterface.id,
        domain: "vpc"
    });
    return eip;
}

module.exports = {
    createElasticIp,
};
