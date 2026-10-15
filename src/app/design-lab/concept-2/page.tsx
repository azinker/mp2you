import type { Metadata } from "next";
import { BackToLab } from "../_shared/back-to-lab";
import { ConceptTwo } from "./concept-two";

export const metadata: Metadata = {
  title: "Concept 02 — Kinetic Creative",
  description: "Kinetic creative-studio homepage concept for MorePower2You.",
};

export default function ConceptTwoPage() {
  return (
    <>
      <ConceptTwo />
      <BackToLab current={2} />
    </>
  );
}
