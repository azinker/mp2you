import type { Metadata } from "next";
import { BackToLab } from "../_shared/back-to-lab";
import { ConceptThree } from "./concept-three";

export const metadata: Metadata = {
  title: "Concept 03 — Immersive Gifting",
  description: "Immersive cinematic homepage concept for MorePower2You.",
};

export default function ConceptThreePage() {
  return (
    <>
      <ConceptThree />
      <BackToLab current={3} />
    </>
  );
}
