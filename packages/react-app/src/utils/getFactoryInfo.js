import { abis } from "@my-app/contracts"
import { getPoolsInfo } from "./getPoolsInfo"

export const getFactoryInfo = async (factoryAddress, web3) => {
    const factory = new web3.eth.Contract(abis.factory, factoryAddress)

    const factoryInfo = {
        fee: await factory.methods.feeTo().call(),
        feeToSetter: await factory.methods.feeToSetter().call(),
        allPairsLength: await factory.methods.allPairsLength().call(),
        allPairs: []
    }

    for (let i = 0; i < factoryInfo.allPairsLength; i++) {
        factoryInfo.allPairs[i] = await factory.methods.allPairs(i).call();
    }

    factoryInfo.pairsInfo = await getPoolsInfo(factoryInfo.allPairs, web3)

    return factoryInfo
}