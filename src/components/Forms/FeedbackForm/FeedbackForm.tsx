import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import {
  Logo,
  Typography,
  Select,
  Button,
  Input,
  TextArea,
  LogoS,
} from "~/components/ui";
import Image from "next/image";
import { type ValueType } from "~/types";
import { type getDictionary } from "~/lang";

interface FeedbackFormProps {
  onSubmit: (
    name: string,
    phone: string,
    email: string,
    link: string,
    message: string
  ) => Promise<void>;
  dictionary?: ValueType<ReturnType<typeof getDictionary>>;
}

const defaultForm = {
  name: {
    value: "",
    error: "",
  },
  phone: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  instagram: {
    value: "",
    error: "",
  },
  text: {
    value: "",
    error: "",
  },
};

export const FeedbackForm = ({ onSubmit, dictionary }: FeedbackFormProps) => {
  const [form, setForm] = useState(defaultForm);

  const setName = (value: string) => {
    const filteredValue = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    setForm({
      ...form,
      name: {
        ...form.name,
        value: filteredValue,
        error: "",
      },
    });
  };

  const setPhone = (value: string) => {
    const reg = /[^0-9+]/g;
    const filteredValue = value.replace(reg, "");
    setForm({
      ...form,
      phone: {
        ...form.phone,
        value: filteredValue,
        error: "",
      },
    });
  };

  const setEmail = (value: string) => {
    setForm({
      ...form,
      email: {
        ...form.email,
        value: value,
        error: "",
      },
    });
  };

  const setInstagram = (value: string) => {
    setForm({
      ...form,
      instagram: {
        ...form.instagram,
        value: value,
        error: "",
      },
    });
  };

  const setText = (value: string) => {
    setForm({
      ...form,
      text: {
        ...form.text,
        value: value,
        error: "",
      },
    });
  };

  const validate = () => {
    let isValid = true;
    Object.entries(form).forEach(([key, val]) => {
      if (!val.value) {
        isValid = false;
        setForm((prev) => ({
          ...prev,
          [key]: {
            value: val.value,
            error: "Поле обязательно для заполнения",
          },
        }));
      }
    });
    return isValid;
  };

  const resetForm = () => setForm(defaultForm);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      await onSubmit(
        form.name.value,
        form.phone.value,
        form.email.value,
        form.instagram.value,
        form.text.value
      );
      resetForm();
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="hidden lg:block">
        <span className="absolute left-1/2 top-2/3 z-20 -translate-x-full text-7xl font-bold uppercase tracking-wider text-secondary/25">
          SMM
        </span>
        <span className="absolute left-0 top-1/4 z-20 max-w-3xl pb-10 pl-10 pt-24 text-7xl font-bold uppercase tracking-wider text-secondary/25">
          DIGITAL-MARKETING
        </span>
        <div
          className="absolute -bottom-20
		-left-20 z-20 h-72 w-72
		transform rounded-full bg-gradient-to-br from-accent/10 
		to-accent/50 shadow-2xl shadow-accent blur-3xl filter"
        />
        <div
          className="z absolute left-1/4 top-0
		z-20 h-96 w-96 -translate-y-1/2
		transform rounded-full bg-gradient-to-br from-accent/10 
		to-accent/30 shadow-2xl shadow-accent blur-3xl filter"
        />
      </div>
      <div className="absolute left-0 top-0 hidden h-full w-1/2 lg:block">
        <div className="relative z-10 h-full w-full">
          <Image
            src={
              process.env.NEXT_PUBLIC_API_URL! +
              "/uploads/digital_d10e489127.png"
            }
            fill
            alt=""
          />
        </div>
      </div>
      <div className="container lg:flex">
        <div className="relative z-20 flex w-full flex-shrink-0 flex-col justify-between gap-12 overflow-hidden pb-6 pt-16 text-primary lg:w-1/2 lg:text-white">
          <Typography as="h4" variant="big" className="max-w-md">
            {dictionary?.form.title}
          </Typography>
          <div className="hidden lg:block">
            <LogoS />
          </div>
        </div>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-start justify-center pb-6 pt-16 lg:w-1/2 lg:pl-12"
        >
          <Typography
            as="h4"
            variant="h1"
            className="text-primary"
            weight="regular"
          >
            {dictionary?.form.your_contacts}
          </Typography>
          <div className="mt-12 grid w-full grid-cols-2 gap-9">
            <Input
              className="col-span-2 lg:col-span-1"
              label={dictionary?.form.name || ""}
              value={form.name.value}
              error={form.name.error}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label={dictionary?.form.phone || ""}
              className="col-span-2 lg:col-span-1"
              placeholder="+7"
              value={form.phone.value}
              error={form.phone.error}
              type="tel"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Input
              className="col-span-2"
              label={dictionary?.form.email || ""}
              type="email"
              value={form.email.value}
              error={form.email.error}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Typography
              as="h4"
              variant="h1"
              className="mt-4 text-primary"
              weight="regular"
            >
              {dictionary?.form.about_project}
            </Typography>
            <Input
              className="col-span-2"
              label={dictionary?.form.project_link || ""}
              value={form.instagram.value}
              error={form.instagram.error}
              onChange={(e) => {
                setInstagram(e.target.value);
              }}
            />
            <TextArea
              className="col-span-2"
              label={dictionary?.form.project_description || ""}
              value={form.text.value}
              error={form.text.error}
              onChange={(e) => {
                setText(e.currentTarget.value);
              }}
            />
          </div>
          <div className="mt-12 w-full items-end gap-10 lg:flex">
            <Button
              type="submit"
              color="primary"
              className="w-full flex-shrink-0 lg:w-auto"
              size="large"
              icon={<ArrowUpRightIcon />}
            >
              {dictionary?.general.leave_request}
            </Button>
            <Typography
              as="span"
              variant="body3"
              className="mt-5 block text-gray-600 lg:mt-0"
            >
              {dictionary?.form.agreement}
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};
