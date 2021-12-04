import { ethers } from "hardhat";
const { provider } = ethers;

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const owner = await provider.resolveName("multisig.levx.eth");
    const levx = await provider.resolveName("token.levx.eth");
    const signer = await provider.resolveName("levx.eth");

    await deploy("LevxStreaming", {
        from: deployer,
        args: [owner, levx, signer],
        log: true,
    });
};
