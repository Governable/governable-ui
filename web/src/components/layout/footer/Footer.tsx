'use client';

export default function Footer() {
  return (
    <footer className="flex flex-1 flex-col justify-end">
      <div className="flex flex-col justify-between gap-16 bg-boat-footer-dark-gray py-12">
        <div className="container mx-auto flex w-full flex-col justify-between gap-16 px-8 md:flex-row">
          <div className="container flex w-full flex-col items-center justify-between gap-1">
            <div>GOVERNABLE</div>
            <p>Utilizing Brevis + Wormhole.</p>
            <p>Bootstrapped using Base's build-onchain-app</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
