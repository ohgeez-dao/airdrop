export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const owner = "0x0903f8892c06A99bf1D68088fAB597a0762e0BC8";
    const levx = "0xf474E526ADe9aD2CC2B66ffCE528B1A51B91FCdC";

    await deploy("LevxAirdrop", {
        from: deployer,
        args: [owner, levx],
        log: true,
    });
};
