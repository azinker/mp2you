import type { Metadata } from "next";
import { BackToLab } from "../_shared/back-to-lab";
import { ConceptFour } from "./concept-four";

export const metadata: Metadata = {
  title: "Concept 04 — Unfurl",
  description: "A fluid cinematic homepage concept for MorePower2You.",
};

export default function ConceptFourPage() {
  return (
    <>
      <ConceptFour />
      <BackToLab current={4} />
    </>
  );
}
