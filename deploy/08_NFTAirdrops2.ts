export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const contract = "0xa59a5B0C946086d6884455A6a556729d747d16D3";

    await deploy("NFTAirdrops2", {
        from: deployer,
        args: [contract, 162],
        log: true,
    });
};
