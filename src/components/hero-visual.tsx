import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Premium gifting materials and fulfillment planning">
      <div className="hero-image hero-image-main">
        <Image
          src="/legacy-images/Wooden-box.jpg"
          alt="Premium custom gift box reference"
          width={640}
          height={520}
          priority
          loading="eager"
        />
      </div>
      <div className="hero-image hero-image-secondary">
        <Image src="/legacy-images/Explosion-box-1.jpg" alt="Custom unboxing reference" width={360} height={360} />
      </div>
      <div className="hero-image hero-image-generated">
        <Image src="/generated-assets/image-contact-sheet-gifting.png" alt="Generated premium gifting imagery direction" width={520} height={390} />
      </div>
      <div className="hero-note hero-note-top">Custom branded boxes</div>
      <div className="hero-note hero-note-bottom">Warehousing + fulfillment ready</div>
      <div className="hero-swatch swatch-gold" aria-hidden="true" />
      <div className="hero-swatch swatch-green" aria-hidden="true" />
    </div>
  );
}
