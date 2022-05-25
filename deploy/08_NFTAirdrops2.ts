export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const contract = "0xb79fa5c237D27dA6b062F9180717CD6169ba0c65";

    await deploy("NFTAirdrops2", {
        from: deployer,
        args: [contract, 162],
        log: true,
    });
};
