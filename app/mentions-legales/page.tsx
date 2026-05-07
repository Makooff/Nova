import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Nova",
  description: "Mentions légales, informations légales et CGV de Nova, agence de production vidéo.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="pt-[52px]">
      <section className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-4">
            Légal
          </p>
          <h1
            className="font-sora font-thin tracking-tighter mb-12"
            style={{ fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.04em" }}
          >
            Mentions légales
          </h1>

          <div className="flex flex-col gap-10 font-sora font-light text-sm text-mid leading-relaxed">
            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Éditeur du site
              </h2>
              <p>
                Nova SRL<br />
                Rue de l&apos;Exemple 42<br />
                1000 Bruxelles — Belgique<br />
                BCE : BE 0000.000.000<br />
                Email : hello@nova-agency.be
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Hébergement
              </h2>
              <p>
                Vercel Inc.<br />
                340 Pine Street, Suite 701<br />
                San Francisco, CA 94104 — USA<br />
                vercel.com
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes, images, vidéos,
                logos, graphismes) est la propriété exclusive de Nova SRL et est protégé
                par les lois relatives à la propriété intellectuelle. Toute reproduction,
                même partielle, est strictement interdite sans autorisation préalable.
              </p>
            </div>

            <div id="cgv">
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Conditions générales de vente (CGV)
              </h2>
              <p className="mb-3">
                Les présentes conditions générales de vente régissent l&apos;ensemble des
                relations commerciales entre Nova SRL et ses clients.
              </p>
              <p className="mb-3">
                Tout devis accepté par le client vaut bon de commande et engage les deux
                parties. Un acompte de 40 % est demandé à la signature du devis. Le solde
                est facturé à la livraison finale des fichiers.
              </p>
              <p>
                Les délais de paiement sont de 30 jours à compter de la date de
                facturation. Tout retard de paiement entraîne des pénalités égales à
                3 fois le taux d&apos;intérêt légal en vigueur.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Litiges
              </h2>
              <p>
                En cas de litige, les parties s&apos;engagent à chercher une solution amiable
                avant tout recours judiciaire. À défaut d&apos;accord, les tribunaux de
                Bruxelles seront seuls compétents, le droit belge étant applicable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
