import { type Settings } from "~/models/api/Settings";
import agent from "../agent";

export const getContacts = async () => {
  try {
    const response = await agent.get<{ data: Settings }>(
      "/setting?populate=contacts"
    );
    return response.data?.data;
  } catch (error) {
    throw error;
  }
};
