import { NextPage } from "next";
import styles from "./styles.module.scss";
import { Accordion } from "./ui/Accordion";
import { Header } from "@/widgets/Header";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
import { TypeFaq } from "@/shared/types/faq";

interface IProps {
  seo: IFetchSeo;
  faqs: TypeFaq[];
}

const FaqPage: NextPage<IProps> = async ({ seo, faqs }) => {
  return (
    <>
      <Header
        breadCrumbs={[
          {
            title: "Вопросы и ответы",
            href: "faq",
          },
        ]}
      />
      <div className={styles.page}>
        <h1>{seo.ceo_h}</h1>
        <div className={styles.content}>
          {faqs.map((faq) => (
            <Accordion key={faq.id} title={faq.ru_faq}>
              <div>
                <p>{faq.ru_replay}</p>
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqPage;
