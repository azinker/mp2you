import type { Metadata } from "next";
import { BackToLab } from "../_shared/back-to-lab";
import { ConceptOne } from "./concept-one";

export const metadata: Metadata = {
  title: "Concept 01 — Editorial Luxury",
  description: "Editorial luxury homepage concept for MorePower2You.",
};

export default function ConceptOnePage() {
  return (
    <>
      <ConceptOne />
      <BackToLab current={1} />
    </>
  );
}
