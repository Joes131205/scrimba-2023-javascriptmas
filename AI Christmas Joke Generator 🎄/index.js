import OpenAI from "openai" 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const jokeDisplayEl = document.getElementById("joke-display")
document.getElementById('window-container').addEventListener('click', async function () {
    document.querySelector('.joke-display').style = "animation: hide-joke 0.3s forwards";
    document.querySelector('.left-door').style = "animation: left-close 0.3s forwards";
    document.querySelector('.right-door').style = "animation: right-close 0.3s forwards";
    
    const completion = await openai.chat.completions.create({
        messages: [{"role": "user", "content": "Create a funny Christmas joke without explanations or additional context."}],
        model: "gpt-3.5-turbo",
    });
    
    jokeDisplayEl.textContent = completion.choices[0].message.content;
    document.querySelector('.left-door').style = "animation: left-open 0.3s forwards";
    document.querySelector('.right-door').style = "animation: right-open 0.3s forwards";
    document.querySelector('.joke-display').style = "animation: display-joke 0.3s forwards";
})