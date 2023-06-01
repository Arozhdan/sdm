import { type ValueType } from "~/types";
import agent from "../agent";
import { toast } from "react-toastify";
import { type getDictionary } from "~/lang";
export interface FormData {
  name: string;
  email: string;
  phone: string;
  link: string;
  message: string;
}

export const submitForm = async (
  data: FormData,
  dictionary?: ValueType<ReturnType<typeof getDictionary>>
) => {
  try {
    await agent.post("/form-submissions", {
      data: {
        status: "new",
        ...data,
      },
    });
    toast.success(dictionary?.form.success || "Success");
  } catch (error) {
    toast.error(dictionary?.form.error || "Error");
    throw error;
  }
};
