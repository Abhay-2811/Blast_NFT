"use client";
import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  claimGas,
  mintERC1155,
  mintERC721,
} from "@/utils/contract_Interaction";
import Loading from "./loading";
import { useState } from "react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState<{ state: boolean; text: string }>({
    state: false,
    text: "",
  });
  const [completed, setCompleted] = useState<{ state: boolean; hash: string }>({
    state: false,
    hash: "",
  });
  const owner = "0x81fB09281398eC28495dFCE5D1170eAc905e70E5";
  const clickERC721 = async () => {
    setLoading({ state: true, text: "Minting token..." });
    const txn_hash = await mintERC721(address as `0x{string}`);
    console.log(txn_hash);
    setCompleted({ state: true, hash: txn_hash });
    setLoading({ state: false, text: "" });
  };
  const clickERC1155 = async () => {
    setLoading({ state: true, text: "Minting token..." });
    const txn_hash = await mintERC1155(address as `0x{string}`);
    console.log(txn_hash);
    setCompleted({ state: true, hash: txn_hash });
    setLoading({ state: false, text: "" });
  };

  const clickClaim = async (contract: "erc721" | "erc1155") => {
    setLoading({ state: true, text: "Claiming gas..." });
    const txn_hash = await claimGas(contract);
    console.log(txn_hash);
    setCompleted({ state: true, hash: txn_hash });
    setLoading({ state: false, text: "" });
  };

  if (loading.state) {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <Loading text={loading.text} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-row space-x-10">
        <h1 className="text-3xl">Mint NFT on Blast</h1>
        <ConnectButton />
      </div>

      <div className="flex flex-row justify-between space-x-60 mt-[100px]">
        <div className="flex flex-col space-y-10 items-center">
          <h1 className=" font-semibold text-medium">ERC721 Contract</h1>
          <Button
            color="primary"
            isDisabled={!isConnected}
            variant="bordered"
            onClick={clickERC721}
          >
            Mint ERC721
          </Button>
          <div className="flex flex-col items-center space-y-3">
            <Button
              color="danger"
              variant="bordered"
              isDisabled={!isConnected || address !== owner}
              onClick={() => clickClaim("erc721")}
            >
              Claim Gas{" "}
            </Button>
            <p>Can only be called by contract owner</p>
          </div>
        </div>
        <Divider orientation="vertical" className=" text-blue-300" />
        <div className="flex flex-col space-y-10 items-center">
          <h1 className=" font-semibold text-medium">ERC1155 Contract</h1>
          <Button
            color="primary"
            isDisabled={!isConnected}
            variant="bordered"
            onClick={clickERC1155}
          >
            Mint ERC1155
          </Button>
          <div className="flex flex-col items-center space-y-3">
            <Button
              color="danger"
              variant="bordered"
              isDisabled={!isConnected || address !== owner}
              onClick={() => clickClaim("erc1155")}
            >
              Claim Gas{" "}
            </Button>
            <p>Can only be called by contract owner</p>
          </div>
        </div>
      </div>

      {completed.state && (
        <div className=" mt-[100px] text-medium">
          Transaction:{" "}
          <a
            href={`https://testnet.blastscan.io/tx/${completed.hash}`}
            target="_blank"
            className=" underline text-blue-100"
          >
            {completed.hash}
          </a>
        </div>
      )}
    </main>
  );
}
