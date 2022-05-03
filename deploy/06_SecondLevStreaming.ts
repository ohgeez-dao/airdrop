export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const levx = "0xf474E526ADe9aD2CC2B66ffCE528B1A51B91FCdC";
    const signer = "0xE9d4AFB6f8C9196972C6d9a74D5e54bBb7721f5B";
    const wallet = "0x0903f8892c06A99bf1D68088fAB597a0762e0BC8";

    await deploy("SecondLevxStreaming", {
        from: deployer,
        args: [levx, signer, wallet, 1654041600],
        log: true,
    });
};
