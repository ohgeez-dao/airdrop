export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const contract = "0xb8b07d0f2990ddd5b99b6db59dd8356ca2b1302d";

    await deploy("NFTAirdropsForOhGeez", {
        from: deployer,
        args: [contract, 399],
        log: true,
    });
};
