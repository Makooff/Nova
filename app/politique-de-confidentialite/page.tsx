import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Nova",
  description:
    "Politique de confidentialité et traitement des données personnelles conformément au RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <main className="pt-[52px]">
      <section className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-wider text-light mb-4">
            RGPD
          </p>
          <h1
            className="font-sora font-thin tracking-tighter mb-12"
            style={{ fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.04em" }}
          >
            Politique de confidentialité
          </h1>

          <div className="flex flex-col gap-10 font-sora font-light text-sm text-mid leading-relaxed">
            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Responsable du traitement
              </h2>
              <p>
                Nova SRL, BCE BE 0000.000.000, Rue de l&apos;Exemple 42, 1000 Bruxelles.
                Contact : laytored@gmail.com
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Données collectées
              </h2>
              <p className="mb-3">
                Dans le cadre de l&apos;utilisation de notre site et de notre formulaire de
                contact, nous collectons les données suivantes :
              </p>
              <ul className="flex flex-col gap-2 pl-4">
                {[
                  "Nom et prénom",
                  "Adresse email",
                  "Numéro de téléphone (optionnel)",
                  "Type de projet et budget estimé",
                  "Contenu du message",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-border shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Finalités du traitement
              </h2>
              <p>
                Les données collectées sont utilisées exclusivement pour répondre à vos
                demandes de devis et assurer le suivi commercial de nos projets. Elles ne
                sont jamais transmises à des tiers à des fins commerciales.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Durée de conservation
              </h2>
              <p>
                Vos données sont conservées pendant une durée maximale de 3 ans à compter
                de notre dernier contact. Au-delà, elles sont supprimées ou anonymisées.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Vos droits
              </h2>
              <p>
                Conformément au RGPD (Règlement UE 2016/679), vous disposez d&apos;un droit
                d&apos;accès, de rectification, d&apos;effacement, de portabilité et d&apos;opposition
                concernant vos données personnelles. Pour exercer ces droits, contactez-nous
                à : laytored@gmail.com
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Cookies
              </h2>
              <p>
                Ce site utilise uniquement des cookies techniques strictement nécessaires
                au fonctionnement du site. Aucun cookie de traçage publicitaire ou
                analytique tiers n&apos;est déposé sans votre consentement.
              </p>
            </div>

            <div>
              <h2 className="font-sora font-medium text-base text-black mb-3">
                Contact & réclamations
              </h2>
              <p>
                Pour toute question relative à la protection de vos données, vous pouvez
                nous écrire à laytored@gmail.com. Vous avez également le droit
                d&apos;introduire une plainte auprès de l&apos;Autorité de protection des données
                (APD) belge : apd-gba.be.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
