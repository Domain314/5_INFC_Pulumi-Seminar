const aws = require("@pulumi/aws");

function createElasticIp(networkInterface) {
    const eip = new aws.ec2.Eip("myEip", {
        networkInterface: networkInterface.id,
        domain: "vpc",
        associateWithPrivateIp: "10.0.1.50"
    });
    return eip;
}

module.exports = {
    createElasticIp,
};
