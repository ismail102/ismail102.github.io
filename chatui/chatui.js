
// Data array for dynamic content
const users = [
    {
        name: "X",
        status: "X is online",
        image: "../images/icons/users/user-icon1.png",
        isOnline: true,
    },
    {
        name: "Y",
        status: "Y left 7 mins ago",
        image: "../images/icons/users/user-icon2.png",
        isOnline: false,
    },
    {
        name: "A",
        status: "A is online",
        image: "../images/icons/users/user-icon3.png",
        isOnline: true,
    },
    {
        name: "B",
        status: "B left 30 mins ago",
        image: "../images/icons/users/user-icon4.png",
        isOnline: false,
    },
    {
        name: "C",
        status: "C left 50 mins ago",
        image: "../images/icons/users/user-icon5.png",
        isOnline: false,
    },
];

const messages = [
    {
        sender: "Samim",
        type: "received",
        text: "Hi Uncle, It's me.",
        time: "8:40 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png" // Shortened image path
    },
    {
        sender: "Khalid",
        type: "sent",
        text: "C? Is that you?",
        time: "8:55 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
    },
    {
        sender: "Samim",
        type: "received",
        text: "Yes, it's me, C. Uncle, I'm in trouble,and I need money for bail.",
        time: "9:00 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
    },
    {
        sender: "Khalid",
        type: "sent",
        text: "What happend?",
        time: "9:05 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
    },
    {
        sender: "Samim",
        type: "received",
        text: "Please don't tell Mom or Dad.I'll get in so much trouble",
        time: "9:07 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
    },
    {
        sender: "Samim",
        type: "received",
        text: "Please help me!",
        time: "9:09 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
    },
    {
        sender: "Khalid",
        type: "sent",
        text: "What happend tell me?",
        time: "9:12 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
    },
    {
        sender: "Samim",
        type: "received",
        text: "I can't tell you. what happended rigth now.",
        time: "9:14 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
    },
    {
        sender: "Khalid",
        type: "sent",
        text: "I am calling you.",
        time: "9:17 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "Plz, don't do that now. I will call you later.",
        time: "9:18 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "Please be quick.",
        time: "9:19 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "How much you need?",
        time: "9:20 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "It's only 1000 dollars",
        time: "9:27 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "Okay I am sending to you paypal",
        time: "9:28 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "No no. Don't send to my paypal account. Send it different acc.",
        time: "9:29 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "Please send here. xyz@hotmail.com",
        time: "9:30 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "Who's account it is?",
        time: "9:31 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "My another account",
        time: "9:32 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "I don't know what happened?",
        time: "9:33 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "I will tell you when I am at home.",
        time: "9:34 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "Give me some time.",
        time: "9:35 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "Why?",
        time: "9:36 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "I don't have 1000 right now.",
        time: "9:37 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "How much you have now?",
        time: "9:38 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "About 300",
        time: "9:39 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        sender: "Samim",
        type: "received",
        text: "Okay. No problem. Send it now.",
        time: "9:40 AM, Today",
        imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "Khalid",
        type: "sent",
        text: "Okay sending.",
        time: "9:41 AM, Today",
        imgSrc: "../images/icons/users/user-icon3.png"
      },
      {
        // sender: "Khalid",
        type: "warning",
        text: "It seems like you are getting scammed. System identified it as scamming chat. Do you want AI to continue the conversation?",
        // time: "9:41 AM, Today",
        // imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        // sender: "Khalid",
        type: "yes",
        text: "User selected YES.",
        // time: "9:41 AM, Today",
        // imgSrc: "../images/icons/users/user-icon5.png"
      },
      {
        sender: "AI",
        type: "sent",
        text: "I can't send you money.",
        time: "10:00 AM, Today",
        imgSrc: "../images/icons/users/ai_icon.png" 
    },
    {
        sender: "Scammer",
        type: "received",
        text: "What happened?",
        time: "10:01 AM, Today",
        imgSrc: "../images/icons/users/scammer_icon.png"
    },
    {
        sender: "AI",
        type: "sent",
        text: "Paypal app is not working.",
        time: "10:02 AM, Today",
        imgSrc: "../images/icons/users/ai_icon.png"
    },
    {
        sender: "Scammer",
        type: "received",
        text: "Oh, No. Can you share your card picture?",
        time: "10:03 AM, Today",
        imgSrc: "../images/icons/users/scammer_icon.png"
    },
    {
        sender: "AI",
        type: "sent",
        text: "What you will do with the Card?",
        time: "10:04 AM, Today",
        imgSrc: "../images/icons/users/ai_icon.png"
    },
    {
        sender: "Scammer",
        type: "received",
        text: "I will pay the bill.",
        time: "10:00 AM, Today",
        imgSrc: "../images/icons/users/scammer_icon.png" 
      },
      {
        sender: "AI",
        type: "sent",
        text: "Where will you pay?",
        time: "10:01 AM, Today",
        imgSrc: "../images/icons/users/ai_icon.png"
      },
      {
        sender: "Scammer",
        type: "received",
        text: "One of the store here.",
        time: "10:02 AM, Today",
        imgSrc: "../images/icons/users/scammer_icon.png"
      },
      {
        sender: "AI",
        type: "sent",
        text: "What you bought?",
        time: "10:03 AM, Today",
        imgSrc: "../images/icons/users/ai_icon.png"
      },
      {
        sender: "Scammer",
        type: "received",
        text: "I didn't buy. But they charge me.",
        time: "10:04 AM, Today",
        imgSrc: "../images/icons/users/scammer_icon.png"
      },
      {
        sender: "AI",
        type: "sent",
        text: "For What?",
        time: "10:03 AM, Today",
        imgSrc: "../images/icons/users/ai_icon.png"
      },
      {
        sender: "Scammer",
        type: "received",
        text: "I will tell you later.",
        time: "10:04 AM, Today",
        imgSrc: "../images/icons/users/scammer_icon.png"
      }
];

// Function to render user list dynamically
function renderUserList(users) {
    const contactsBody = document.querySelector(".contacts_body .contacts");
    contactsBody.innerHTML = ""; // Clear existing content

    users.forEach((user) => {
        const userStatusClass = user.isOnline ? "online_icon" : "online_icon offline";

        const userItem = `
            <li>
                <div class="d-flex bd-highlight">
                    <div class="img_cont">
                        <img src="${user.image}" class="rounded-circle user_img">
                        <span class="${userStatusClass}"></span>
                    </div>
                    <div class="user_info">
                        <span>${user.name}</span>
                        <p>${user.status}</p>
                    </div>
                </div>
            </li>
        `;

        contactsBody.insertAdjacentHTML("beforeend", userItem);
    });
}

function renderMessaging(messages) {

    const chatContainer = document.getElementById("chatContainer");

    messages.forEach((msg) => {
        const messageDiv = document.createElement("div");
        if (msg.type !== "warning" && msg.type !== 'yes') {
            messageDiv.classList.add(
                "d-flex",
                msg.type === "received" ? "justify-content-start" : "justify-content-end",
                "mb-4"
            );
    
            const imgContainer = `<div class="img_cont_msg">
                <img src="${msg.imgSrc}" class="rounded-circle user_img_msg">
            </div>`;
    
            const messageContent = `<div class="${
                msg.type === "received" ? "msg_cotainer" : "msg_cotainer_send"
            }">
                ${msg.text}
                <span class="${
                    msg.type === "received" ? "msg_time" : "msg_time_send"
                }">${msg.time}</span>
            </div>`;
    
            if (msg.type === "received") {
                messageDiv.innerHTML = imgContainer + messageContent;
            } else {
                messageDiv.innerHTML = messageContent + imgContainer;
            }
        } else if (msg.type === "warning") {
            messageDiv.classList.add("popup");

            messageDiv.innerHTML = `<p>${msg.text}</p>
                         <div style="display: flex; justify-content: flex-end;"> 
                             <button id="yesButton">Yes</button>
                             <button id="noButton">No</button>
                         </div>`
        }
        else if (msg.type === "yes") {
            messageDiv.classList.add("popup");
            messageDiv.innerHTML = `<div>${msg.text}</div>`
        }

        chatContainer.appendChild(messageDiv);
    });
}
// Render the user list on page load
document.addEventListener("DOMContentLoaded", () => {
    renderUserList(users);
    renderMessaging(messages);
});