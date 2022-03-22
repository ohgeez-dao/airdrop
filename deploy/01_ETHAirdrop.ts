export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const owner = "0x0903f8892c06A99bf1D68088fAB597a0762e0BC8";
    const levx = "0xf474E526ADe9aD2CC2B66ffCE528B1A51B91FCdC";
    const weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    const router = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

    await deploy("ETHAirdrop", {
        from: deployer,
        args: [owner, levx, weth, router],
        log: true,
    });
};
