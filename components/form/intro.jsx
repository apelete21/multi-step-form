import IntroStyles from "../../styles/Intro.module.css";

function Intro() {
  return (
    <section className={IntroStyles.introSection}>
      <h1 className={IntroStyles.introTitle}>
        Formulaire Covoiturage Entreprise
      </h1>
      <section className={IntroStyles.introBody}>
        <p className={IntroStyles.introPar}>
          TUKKIJAMM est une solution de covoiturage qui facilite le déplacement
          des salariés durant les heures de pointe.
        </p>
        <p className={IntroStyles.introPar}>
          Dans le cadre de ce questionnaire, nous sommes amenés à identifier les
          besoins de mobilité domicile - travail des salariés afin de vous
          proposer une meilleure solution de transport adaptée aux entreprises.
        </p>
        <p className={IntroStyles.introPar}>
          La question de la mobilité devient un problème (en termes de coût,
          perte de temps, retard, manque de confort et insécurité dans les
          transports) qui préoccupe toute entreprise ou salarié faisant des
          déplacements quotidiens pour aller au travail.
        </p>
        <p className={IntroStyles.introPar}>
          En remplissant ce formulaire, nous offrons au conducteur la
          possibilité de générer des revenus supplémentaires pour réduire ses
          frais de carburant et au passager des opportunités de transport rapide
          à des prix moins chers pour une mobilité durable et partagée.
        </p>
        <p className={IntroStyles.introPar}>
          Merci aux salariés de bien vouloir prendre 1 à 2 minutes de votre
          temps pour remplir ce formulaire.
        </p>
      </section>
    </section>
  );
}

export default Intro;
