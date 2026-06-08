import axios from "axios";

export const createTalk = async (text) => {
  const response = await axios.post(
    "https://api.d-id.com/talks",
    {
      source_url:
        "https://raw.githubusercontent.com/aj-aditya19/AI-Interview-Assistant/main/frontend/src/pages/Home/assets/interview-avator.jpg",

      script: {
        type: "text",
        input: text,
      },
    },
    {
      headers: {
        Authorization: `Basic ${process.env.DID_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const getTalk = async (id) => {
  const response = await axios.get(`https://api.d-id.com/talks/${id}`, {
    headers: {
      Authorization: `Basic ${process.env.DID_API_KEY}`,
    },
  });

  return response.data;
};
