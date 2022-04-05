export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const levx = "0xf474E526ADe9aD2CC2B66ffCE528B1A51B91FCdC";

    await deploy("LevxPayout", {
        from: deployer,
        args: [levx],
        log: true,
    });
};
