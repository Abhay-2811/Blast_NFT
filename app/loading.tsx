import { Spinner } from "@nextui-org/react";

export default function Loading({ text }: { text: string }) {
  return (
    <div className="flex flex-row space-x-5 content-center align-middle mt-[10%]">
      <Spinner size="lg" />
      <p className=" text-lg text-blue-500">{text}</p>
    </div>
  );
}
