import { NextPage } from "next";
import styles from "./style.module.scss";
import { ScrollbarProvider } from "@/app/providers/ScrollbarProvider";

const Privacy: NextPage = () => {
  return (
    <div className={styles.page}>
      <h1>Политика конфиденциальности</h1>
      <div>
        <h2>1. PRIVACY POLICY. </h2>
        <p>
          {`This Policy is subject to and made a part of the Usacashlink.com Terms
          of Use ("Terms"), which are incorporated into this Policy by
          reference. Thank you for visiting the Usacashlink.com website located
          at Usacashlink.com (the "Website" or "Sites"). The Website is owned
          and operated by Usacashlink.com ("Usacashlink.com", "we", "us", or
          "our"). Usacashlink.com is committed to protecting the privacy of our
          visitors ("visitors" or "you") personally identifiable information
          ("Personal Info", "Personal Information", or "PII"). We provide this
          Privacy Policy in order to explain our online information practices
          and the choices you can make about the way your information is used by
          us. This Privacy Policy describes how we collect, receive, use, store,
          share, transfer, and process your Personal Information, as well as
          your rights in determining what we do with the information that we
          collect or hold about you. You agree to this Privacy Policy, in its
          entirety, when you access or use our Website; and/or (b) Partner with
          Usacashlink.com to provide its products or services("Services"). If
          you do not agree to this Privacy Policy in its entirety, you are not
          authorized to register and/or use the Website in any manner or form
          whatsoever. The Sites are intended for adult use only, and we do not
          knowingly collect any Personal Information from a minor. If you learn
          that a child has, in violation of this Policy, provided their Personal
          Information, please report it to us for deletion. In the event that we
          learn that a child has provided us with Personal Information, we will
          delete it. Please see section 11, "Children," for more info.`}
        </p>
      </div>
      <div>
        <h2>2. NOTICE AT COLLECTION</h2>
        <p>
          We may collect or process various categories of Personal Information.
          The section directly below titled, “Personal Information We Collect,
          Use, and Share,” contains information on the categories of Personal
          Information collected and/or whether we sell or share Personal
          Information. As an overview, we may collect identifiers, personal
          information categories contained in customer records, characteristics
          of protected classifications, commercial information, professional or
          employment-related information, education information, internet,
          technical, or other similar electronic network activity information,
          sensitive Personal Information, and inferences drawn from other
          Personal Information. We retain the information for as long as needed
          to meet the purpose of processing and in accordance with this Policy.
        </p>
        <p>
          If you have a request regarding your information and would like to
          exercise your rights under applicable law, please contact us through
          the methods provided in the, “CONTACT US,” section below. To exercise
          your right to ask that we do not sell, share, or use your Personal
          Information for targeted advertising send an e-mail
          info@usacashlink.com.
        </p>
      </div>
      <div>
        <h2>3. PERSONAL INFORMATION WE COLLECT, USE, AND SHARE</h2>
        <p>
          For purposes of this Policy, “Personal Information” is information
          that identifies, relates to, describes, is capable of being associated
          with, or could reasonably be linked, directly or indirectly, with a
          particular individual, device, or household. Below, we describe how we
          will handle your Personal Information in accordance with this Policy
          and describe the information we may have collected, how it may be used
          or shared, and the sources below.
        </p>
      </div>
      <div>
        <h2>3.1 INFORMATION YOU PROVIDE</h2>
        <p>
          We may collect Personal Information when you voluntarily provide it to
          us through our forms on our Sites, including the information you
          provide to our service providers or other parties who collect it on
          our behalf in relation to our Services. For example, this could
          include Personal Information such as name, address, email address,
          telephone number, social security number, and date of birth.
        </p>
        <p>
          Your decision to provide any Personal Information is voluntary.
          However, please note that if you do not provide certain Personal
          Information, we may not be able to accomplish some purposes outlined
          in this Policy and you may not be able to use or access certain
          Services on our Sites.
        </p>
      </div>
      <div>
        <h2>3.2 AUTOMATICALLY COLLECTED INFORMATION</h2>
        <p>
          {` We automatically collect and store certain types of information about
          your use of our Services, including information about your interaction
          with products, content, and Services available through our Sites. Like
          many websites, we use "cookies" and other unique identifiers, and we
          obtain certain types of information when your web browser or device
          accesses our Website and other content served by or on behalf of
          Usacashlink.com on other websites. Please see our, “Cookie Policy,”
          for more info.`}
        </p>
      </div>
      <div>
        <h2>3.3 INFORMATION FROM THIRD PARTIES</h2>
        <div>
          We may obtain additional information about you from third parties such
          as marketers, affiliates, partners, researchers, social networks,
          service providers, data services companies, and others. We may combine
          information that we collect from you with information about you that
          we obtain from such third parties and information derived from any
          other subscription, product, or service we provide. We may also obtain
          Personal Data indirectly, such as from publicly available sources
          (e.g., websites or publicly accessible databases), third-party data
          vendors, and third-party partners and collaborators. We may combine
          Personal Data from multiple online and offline sources.
        </div>
      </div>
    </div>
  );
};

export default Privacy;
