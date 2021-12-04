import { ethers } from "hardhat";
const { provider } = ethers;

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const owner = await provider.resolveName("multisig.levx.eth");
    const levx = await provider.resolveName("token.levx.eth");
    const weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    const router = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

    await deploy("ETHAirdrop", {
        from: deployer,
        args: [owner, levx, weth, router],
        log: true,
    });
};
