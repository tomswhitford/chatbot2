const axios = require('axios');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//it is working now.

const chatCompletion = async (prompt) => {
    try {
        const education = await fs.promises.readFile('training_data/education.txt', 'utf8');
        
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                // company information
                // { "role": "system", "content": about_bizzman_data },
                // areas of expertise
                // { "role": "system", "content": company_information_data },
                // key benefits
                { "role": "system", "content": education },
                { "role": "user", "content": prompt }
            ],
            temperature : 1.2
        });
        let content = response.data.choices[0].message.content;

        console.log(content);


        ///////////////////////////////   TTS    //////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////

        return {
            status: 1,
            response: content
        };
    } catch (error) {
        console.log(error);
        return {
            status: 0,
            response: 'Error'
        };
    }
};

//try {
//  const options = {
//    method: 'POST',
//      url: `https://api.openai.com/v1/chat/completions`,
//        headers: {
//          'Content-Type': 'application/json',
//          Authorization: 'Bearer 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',
//        },
//        data: {
//          "model": "gpt-3.5-turbo",
//          "messages": [
//            { "role": "system", "content": "121." },
//            { "role": "system", "content": "qwdqwd" },
//            { "role": "system", "content": "qwdqwd " },
//            { "role": "system", "content": "qwdqwdqwdqwd" },
//            {
//              "role": "user",
//              "content": "tell me about computer"
//            }
//         ]
//       }
//     };

//   const response = await axios.request(options);

//   console.log(response.data.choices[0])

//   if (response.status === 200 && response.statusText === 'OK') {
//     return 1;
//   } else {
//     return 0;
//   }
// } catch (error) {
//   console.error(error);
//   return 0;
// }
module.exports = {
    chatCompletion
};