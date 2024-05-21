import {
  WalletClient,
  createPublicClient,
  createWalletClient,
  formatUnits,
  http,
  parseUnits,
} from "viem";
import { blastSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { contractData } from "@/contracts/build";

export const publicClient = createPublicClient({
  chain: blastSepolia,
  transport: http(),
});

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
);

const walletClient = createWalletClient({
  account,
  chain: blastSepolia,
  transport: http(),
});

// mint erc721
export const mintERC721 = async (user_address: `0x${string}`) => {
  const hash = await walletClient.writeContract({
    address: contractData.erc721.contractAddress as `0x${string}`,
    abi: contractData.erc721.abi,
    functionName: "safeMint",
    args: [user_address],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
};

// mint erc1155
export const mintERC1155 = async (user_address: `0x${string}`) => {
  const hash = await walletClient.writeContract({
    address: contractData.erc1155.contractAddress as `0x${string}`,
    abi: contractData.erc1155.abi,
    functionName: "mint",
    args: [user_address, 1, 1, "0x"],
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
};

export const claimGas = async (contract: "erc721" | "erc1155") => {
  const hash = await walletClient.writeContract({
    address: contractData[contract].contractAddress as `0x${string}`,
    abi: contractData[contract].abi,
    functionName: "claimMyContractsGas",
  });
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt.transactionHash;
};
