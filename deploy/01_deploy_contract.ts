import { DeployFunction, ProxyOptions } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deploying My Contract with account:", deployer);

  const addressList = readAddressList();
    
  // proxyContract: "TransparentUpgradeableProxy",StandardProxy目前还没调通
  const proxyOptions: ProxyOptions = {
    proxyContract: "TransparentUpgradeableProxy",
    viaAdminContract: "ProxyAdmin",
    execute: {
      // 只在初始化时执行
      init: {
        // 执行initialize方法
        methodName: "initialize",
        // 参数
        args: [1],
      },
    },
  };

  const myContract = await deploy("ZxjLogicImpl", {
    contract: "ZxjLogicImpl",
    from: deployer,
    proxy: proxyOptions,
    args: [],
    log: true,
  });

  console.log("===========================================================================");
  console.log("Proxy deployed to:", myContract.address);
  console.log("ZxjLogicImpl deployed to:", myContract.implementation);
  console.log("===========================================================================");

  addressList[network.name].MyContract = myContract.implementation;
  addressList[network.name].MyProxy = myContract.address;
  storeAddressList(addressList);
};

// npx hardhat deploy --network {network} --tags {Tag}
func.tags = ["MyContract"];
export default func;
