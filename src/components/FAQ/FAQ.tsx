import { type FC } from "react";
import cn from "classnames";
import styles from "./FAQ.module.css";
import { Disclosure, Transition } from "@headlessui/react";
import { type FAQProps } from "./FAQ.props";
import { Typography } from "../ui";

export const FAQ: FC<FAQProps> = ({ className, faqs = [], ...props }) => {
  const classes = cn(className, styles.faqs);
  return (
    <div className={classes} {...props}>
      {faqs.map((faq, index) => (
        <Disclosure key={index} as={"div"} className={styles.faq}>
          <Disclosure.Button className={styles.question}>
            <Typography as="h4" variant="h2" className="text-left text-white">
              {faq.attributes.question}
            </Typography>
            <div className={styles.icon}>
              <span />
              <span />
            </div>
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className={styles.answer}>
              {faq.attributes.answer}
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
      ))}
    </div>
  );
};
