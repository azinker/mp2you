import Image from "next/image";

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Premium gifting materials and fulfillment planning">
      <div className="hero-image hero-image-main">
        <Image
          src="/gallery-projects/wooga/blanket/01.jpg"
          alt="Open Orchid Society holiday box with blanket, ornament, and socks"
          fill
          priority
          sizes="(max-width: 920px) 90vw, 440px"
          className="hero-photo"
        />
      </div>
      <div className="hero-image hero-image-secondary">
        <Image
          src="/gallery-projects/vip-premium/phonograph/01.jpg"
          alt="VIP Premium holiday gift box with a custom illustrated design"
          fill
          sizes="(max-width: 920px) 46vw, 250px"
          className="hero-photo"
        />
      </div>
      <div className="hero-note hero-note-top">Custom branded boxes</div>
      <div className="hero-note hero-note-bottom">Warehousing + fulfillment ready</div>
    </div>
  );
}
