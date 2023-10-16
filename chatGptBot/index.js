const chatLog = document.getElementById('chat-log'),
userInput = document.getElementById('user-input'),
sendButton = document.getElementById('send-button'),
buttonIcon = document.getElementById('button-icon'),
 info = document.querySelector('.info');

 sendButton.addEventListener('click', sendMessage);
 userInput.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        sendMessage();
    }
 });

 function sendMessage() {
    const message = userInput.value.trim();
    //if message is empty dont do anything
    if(message === ''){
        return;
    }
    //if message - developer - show our message
    else if (message === 'developer') {
        //clear input value 
        userInput.value = '';
        //append message as user - 
        appendMessage('user', message);
        // fake timeout 
        setTimeout(() => {
            appendMessage('bot', 'This shit coded by kayas');
            // change button icon to default
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');

        }, 2000);
        return;
    }

    //else if none of above append users message to screen

    appendMessage('user', message);
    userInput.value = '';


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2684321697msh4b349ff949477ebp149d2ejsnab8cb5be68b2',
            'X-RapidAPI-Host': 'chat-gpt-ai-bot.p.rapidapi.com'
        },
    body: `{"messages":[{"role":"user","content":"${message}"}]}`

    };
    
    fetch('https://chat-gpt-ai-bot.p.rapidapi.com/GenerateAIWritter?prompt=write%20an%20email%20template%20for%20Employee%20Anniversary%20with%20emojis', options).then((response) => response.json()).then((response) => {
        appendMessage('bot', response.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if(err.name === 'TypeError') {
            appendMessage('bot', 'Error : check your api key bitch!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
 }

 function appendMessage(sender, message) {
    info.style.display = "none";
    // change send button icon to loading using fontawesome
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    // add icons depending on who send message bot or user
    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;

}

