import { ethers } from "hardhat";
const { provider } = ethers;

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const owner = await provider.resolveName("multisig.levx.eth");
    const levx = await provider.resolveName("token.levx.eth");

    await deploy("LevxAirdrop", {
        from: deployer,
        args: [owner, levx],
        log: true,
    });
};
