import { ethers } from "hardhat";
const { provider } = ethers;

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const levx = await provider.resolveName("token.levx.eth");
    const signer = await provider.resolveName("levx.eth");
    const wallet = await provider.resolveName("multisig.levx.eth");

    await deploy("LevxStreaming", {
        from: deployer,
        args: [levx, signer, wallet, 1650499200],
        log: true,
    });
};
