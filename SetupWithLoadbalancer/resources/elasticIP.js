const aws = require("@pulumi/aws");

function createElasticIp() {
    const eip = new aws.ec2.Eip("myEip", {
        domain: "vpc"
    });
    return eip;
}

module.exports = {
    createElasticIp,
};
