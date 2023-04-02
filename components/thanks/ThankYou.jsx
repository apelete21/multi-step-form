import utilStyles from "../../styles/utils.module.css";
import thankYouStyles from "../../styles/ThankYou.module.css";
import Image from "next/image";

export default function ThankYou() {
  return (
    <section className={thankYouStyles.sectionThankYou}>
      <article className={thankYouStyles.articleThankYou}>
        <Image
          className={thankYouStyles.imageThankYou}
          src="/images/icon-thank-you.svg"
          alt=""
          aria-hidden="true"
          width={56}
          height={56}
        />
        <h1
          className={`${utilStyles.title} ${utilStyles.colorText} ${thankYouStyles.margins}`}
        >
          Merci!
        </h1>
        <p className={utilStyles.description}>
          Votre formulaire a été soumis avec succès. 
        </p>
      </article>
    </section>
  );
}
