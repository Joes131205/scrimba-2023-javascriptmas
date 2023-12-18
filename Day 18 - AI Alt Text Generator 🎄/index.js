import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const dialogModal = document.getElementById('dialog-modal');
const buttonSend = document.getElementById("send");
const userInput = document.getElementById("user-input");
const imageEl = document.getElementById("image");

dialogModal.show();

buttonSend.addEventListener("click", async function(e) {
  if (userInput.value) {
    e.preventDefault();
    const text = userInput.value;
    userInput.value = "Loading... (The image will take a few seconds or more to load, please be patient!)";
    userInput.disabled = true;
    buttonSend.disabled = true;

    let image;

    try {
      image = await openai.images.generate({ model: "dall-e-3", prompt: text});
    } catch (error) {
      userInput.value = "";
      userInput.placeholder = "Error occurred :( Please try again...";
      setTimeout(function() {
        userInput.placeholder = "A winter scene...";
      }, 3000);
      buttonSend.disabled = false;
      userInput.disabled = false;
    } finally {
      if (image) {
        generateAltText(image.data[0].url)
        dialogModal.close();
      }
    }
  } else {
    e.preventDefault();
  }
});

async function generateAltText(imageUrl) {
    let response;
    try {
        response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
            {
                role: "user",
                content: [
                { type: "text", text: "What’s in this image?" },
                {
                    type: "image_url",
                    image_url: {
                    "url": imageUrl,
                    },
                },
                ],
            },
            ],
        });
    } catch (error) {
        console.error("Error while fetching alt text! :(");
        renderImage(imageUrl, "A winter scene...");
    } finally {
        if (response) {
            const altText = response.choices[0];
            renderImage(imageUrl, altText); 
        }
      }
}

function renderImage(imageUrl, altText) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = altText;
    imageContainer.appendChild(image);
}