import React from "react";
import styles from "./styles.module.scss";
import { Accordion } from "./ui/Accordion";
import { ScrollbarProvider } from "@/app/providers/ScrollbarProvider";
import Header from "@/widgets/Header";

const FaqPage = () => {
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
        <h1>Вопросы и ответы</h1>
        <div className={styles.content}>
          <Accordion title={"Какие существуют способы оплаты?"}>
            <div>
              <p>
                {`This Policy is subject to and made a part of the Usacashlink.com
              Terms of Use ("Terms"), which are incorporated into this Policy by
              reference.`}
              </p>
              <p>
                {`Thank you for visiting the Usacashlink.com website located at
              Usacashlink.com (the "Website" or "Sites"). The Website is owned
              and operated by Usacashlink.com ("Usacashlink.com", "we", "us", or
              "our"). Usacashlink.com is committed to protecting the privacy of
              our visitors ("visitors" or "you") personally identifiable
              information ("Personal Info", "Personal Information", or "PII").
              We provide this Privacy Policy in order to explain our online
              information practices and the choices you can make about the way
              your information is used by us. This Privacy Policy describes how
              we collect, receive, use, store, share, transfer, and process your
              Personal Information, as well as your rights in determining what
              we do with the information that we collect or hold about you. You
              agree to this Privacy Policy, in its entirety, when you access or
              use our Website; and/or (b) Partner with Usacashlink.com to
              provide its products or services("Services"). If you do not agree
              to this Privacy Policy in its entirety, you are not authorized to
              register and/or use the Website in any manner or form whatsoever.`}
              </p>
              <p>
                {`The Sites are intended for adult use only, and we do not knowingly
              collect any Personal Information from a minor. If you learn that a
              child has, in violation of this Policy, provided their Personal
              Information, please report it to us for deletion. In the event
              that we learn that a child has provided us with Personal
              Information, we will delete it. Please see section 11, "Children,"
              for more info.`}
              </p>
            </div>
          </Accordion>
          <Accordion title={"Какие существуют способы оплаты?"}>
            <div>
              <p>
                {`This Policy is subject to and made a part of the Usacashlink.com
              Terms of Use ("Terms"), which are incorporated into this Policy by
              reference.`}
              </p>
              <p>
                {`Thank you for visiting the Usacashlink.com website located at
              Usacashlink.com (the "Website" or "Sites"). The Website is owned
              and operated by Usacashlink.com ("Usacashlink.com", "we", "us", or
              "our"). Usacashlink.com is committed to protecting the privacy of
              our visitors ("visitors" or "you") personally identifiable
              information ("Personal Info", "Personal Information", or "PII").
              We provide this Privacy Policy in order to explain our online
              information practices and the choices you can make about the way
              your information is used by us. This Privacy Policy describes how
              we collect, receive, use, store, share, transfer, and process your
              Personal Information, as well as your rights in determining what
              we do with the information that we collect or hold about you. You
              agree to this Privacy Policy, in its entirety, when you access or
              use our Website; and/or (b) Partner with Usacashlink.com to
              provide its products or services("Services"). If you do not agree
              to this Privacy Policy in its entirety, you are not authorized to
              register and/or use the Website in any manner or form whatsoever.`}
              </p>
              <p>
                {`The Sites are intended for adult use only, and we do not knowingly
              collect any Personal Information from a minor. If you learn that a
              child has, in violation of this Policy, provided their Personal
              Information, please report it to us for deletion. In the event
              that we learn that a child has provided us with Personal
              Information, we will delete it. Please see section 11, "Children,"
              for more info.`}
              </p>
            </div>
          </Accordion>
          <Accordion title={"Какие существуют способы оплаты?"}>
            <div>
              <p>
                {`This Policy is subject to and made a part of the Usacashlink.com
              Terms of Use ("Terms"), which are incorporated into this Policy by
              reference.`}
              </p>
              <p>
                {`Thank you for visiting the Usacashlink.com website located at
              Usacashlink.com (the "Website" or "Sites"). The Website is owned
              and operated by Usacashlink.com ("Usacashlink.com", "we", "us", or
              "our"). Usacashlink.com is committed to protecting the privacy of
              our visitors ("visitors" or "you") personally identifiable
              information ("Personal Info", "Personal Information", or "PII").
              We provide this Privacy Policy in order to explain our online
              information practices and the choices you can make about the way
              your information is used by us. This Privacy Policy describes how
              we collect, receive, use, store, share, transfer, and process your
              Personal Information, as well as your rights in determining what
              we do with the information that we collect or hold about you. You
              agree to this Privacy Policy, in its entirety, when you access or
              use our Website; and/or (b) Partner with Usacashlink.com to
              provide its products or services("Services"). If you do not agree
              to this Privacy Policy in its entirety, you are not authorized to
              register and/or use the Website in any manner or form whatsoever.`}
              </p>
              <p>
                {`The Sites are intended for adult use only, and we do not knowingly
              collect any Personal Information from a minor. If you learn that a
              child has, in violation of this Policy, provided their Personal
              Information, please report it to us for deletion. In the event
              that we learn that a child has provided us with Personal
              Information, we will delete it. Please see section 11, "Children,"
              for more info.`}
              </p>
            </div>
          </Accordion>
          <Accordion title={"Какие существуют способы оплаты?"}>
            <div>
              <p>
                {`This Policy is subject to and made a part of the Usacashlink.com
              Terms of Use ("Terms"), which are incorporated into this Policy by
              reference.`}
              </p>
              <p>
                {`Thank you for visiting the Usacashlink.com website located at
              Usacashlink.com (the "Website" or "Sites"). The Website is owned
              and operated by Usacashlink.com ("Usacashlink.com", "we", "us", or
              "our"). Usacashlink.com is committed to protecting the privacy of
              our visitors ("visitors" or "you") personally identifiable
              information ("Personal Info", "Personal Information", or "PII").
              We provide this Privacy Policy in order to explain our online
              information practices and the choices you can make about the way
              your information is used by us. This Privacy Policy describes how
              we collect, receive, use, store, share, transfer, and process your
              Personal Information, as well as your rights in determining what
              we do with the information that we collect or hold about you. You
              agree to this Privacy Policy, in its entirety, when you access or
              use our Website; and/or (b) Partner with Usacashlink.com to
              provide its products or services("Services"). If you do not agree
              to this Privacy Policy in its entirety, you are not authorized to
              register and/or use the Website in any manner or form whatsoever.`}
              </p>
              <p>
                {`The Sites are intended for adult use only, and we do not knowingly
              collect any Personal Information from a minor. If you learn that a
              child has, in violation of this Policy, provided their Personal
              Information, please report it to us for deletion. In the event
              that we learn that a child has provided us with Personal
              Information, we will delete it. Please see section 11, "Children,"
              for more info.`}
              </p>
            </div>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
