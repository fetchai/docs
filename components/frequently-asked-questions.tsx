import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { remark } from "remark";
import remarkHtml from "remark-html";
import styles from "./faq.module.css";
import parse from "html-react-parser";

const CheckIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={false}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <path
        d="M11.7169 0.624739C12.0944 1.00215 12.0944 1.61405 11.7169 1.99146L7.53719 6.17122C6.68796 7.02044 5.31108 7.02039 4.46193 6.17109L0.283 1.99145C-0.0943787 1.61401 -0.0943267 1.0021 0.283116 0.624725L0.624826 0.283073C1.00227 -0.0943061 1.61417 -0.0942539 1.99155 0.283189L5.99964 4.29196L10.0085 0.283058C10.3859 -0.0943526 10.9979 -0.0943527 11.3753 0.283058L11.7169 0.624739Z"
        fill="#BBC4CD"
      />
    </motion.svg>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  const [parsedAnswer, setParsedAnswer] = useState<React.ReactNode>(null);

  useEffect(() => {
    const parseMarkdown = async () => {
      const file = await remark().use(remarkHtml).process(answer);
      setParsedAnswer(parse(String(file)));
    };
    parseMarkdown();
  }, [answer]);

  return (
    <div>
      <div
        className={`nx-p-4 nx-flex nx-justify-between  nx-items-center nx-border-b  nx-rounded-t-lg nx-bg-white nx-mt-10 cursor-pointer`}
        onClick={onClick}
      >
        <span className="nx-font-medium">{question}</span>
        <span className="nx-cursor-pointer">
          <CheckIcon isOpen={isOpen} />
        </span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div
          className={`${styles.faqanswer} nx-text-slate-500 nx-p-4 nx-bg-white nx-rounded-b-lg`}
        >
          {parsedAnswer}
        </div>
      </motion.div>
    </div>
  );
};

interface FAQ {
  question: string;
  answer: string;
}

const FrequentlyAskedQuestions = ({ faqs }: { faqs: FAQ[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="nx-font-medium nx-ml-4 nx-text-3xl">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => toggleFAQ(index)}
        />
      ))}
    </div>
  );
};

export default FrequentlyAskedQuestions;
