import openai from "./chatgpt";

const chatGptQuery = async (
  prompt: string,
  model: string,
  temperature: number | null
) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: temperature ?? 0.9, //this value sets the creativity vs logical settings of the model
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text) //ChatGPT could come up with multiple answers. ill just take the first one
    .catch(
      (error) =>
        `ChatGPT was unable to find an answer for that! (Error: ${error.message})`
    );

  return res;
};

export default chatGptQuery;
