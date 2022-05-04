export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const contract = "0xb8b07d0f2990ddd5b99b6db59dd8356ca2b1302d";
    const levx = "0xf474E526ADe9aD2CC2B66ffCE528B1A51B91FCdC";
    const wallet = "0x0903f8892c06A99bf1D68088fAB597a0762e0BC8";

    await deploy("NFTAirdropsAndSales", {
        from: deployer,
        args: [contract, levx, wallet],
        log: true,
    });
};
