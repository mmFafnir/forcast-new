import { NextPage } from "next";
import styles from "./style.module.scss";
import { Header } from "@/widgets/Header";
import { IFetchSeo } from "@/pagesComponent/types/IFetchSeo";
import { clearHtmlString } from "@/shared/helper/clearHtmlString";

interface IProps {
  seo: IFetchSeo;
  breadCrumbs: {
    title: string;
    href: string;
  }[];
  text: {
    ru_text: string;
    en_text: string;
  };
}
const Privacy: NextPage<IProps> = ({ seo, text, breadCrumbs }) => {
  return (
    <>
      <Header breadCrumbs={breadCrumbs} />
      <div className={styles.page}>
        <h1>{seo.ceo_h}</h1>
        <div dangerouslySetInnerHTML={{ __html: text.ru_text }} />
      </div>
    </>
  );
};

export default Privacy;
