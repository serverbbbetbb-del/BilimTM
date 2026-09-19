const aiInput = document.getElementById("aiInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className =
        type === "user"
            ? "message user-message"
            : "message ai-message";

    message.textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function sendAI() {

    const question = aiInput.value.trim();

    if (!question) {
        return;
    }

    addMessage(question, "user");

    aiInput.value = "";

    setTimeout(() => {

        const answer = getAIAnswer(question);

        addMessage(answer, "ai");

    }, 500);
}


function askQuestion(question) {

    aiInput.value = question;

    sendAI();
}


function handleEnter(event) {

    if (event.key === "Enter") {
        sendAI();
    }
}


function getAIAnswer(question) {

    const q = question.toLowerCase();


    if (
        q.includes("2 + 2") ||
        q.includes("2+2")
    ) {
        return "2 + 2 = 4. 🧮";
    }


    if (
        q.includes("fotosintez") ||
        q.includes("fotosintez näme")
    ) {
        return "Fotosintez ösümlikleriň gün şöhlesiniň kömegi bilen suw we kömürturşy gazyny ulanyp, organiki maddalary we kislorody emele getirýän prosesidir. 🌱";
    }


    if (
        q.includes("fizika")
    ) {
        return "Fizika materiýanyň, energiýanyň we olaryň özara täsirleriniň kanunlaryny öwrenýän ylymdyr. ⚡";
    }


    if (
        q.includes("salam") ||
        q.includes("hello")
    ) {
        return "Salam! 👋 BilimTM-e hoş geldiň! Okuw soragyňy ýaz.";
    }


    if (
        q.includes("matematika")
    ) {
        return "Matematika boýunça meseläni doly ýaz. Men ony ädimme-ädim düşündirmäge synanyşaryn. 📐";
    }


    return "Bu häzirki wagtda BilimTM-iň demo AI jogaby. 🤖 Hakyky AI modelini birikdirenimizde, soragyňa has giňişleýin jogap berip bileris.";
}


function openBook(bookName) {

    const modal = document.getElementById("modal");
    const content = document.getElementById("modalContent");

    content.innerHTML = 
        <h2>📚 ${bookName}</h2>

        <p style="margin-top:15px;color:#9db1c0;">
            Bu bölüme soňra ${bookName} okuw kitaby,
            PDF faýllary, sapaklar we okuw materiallary
            goşular.
        </p>

        <button
            onclick="closeModal()"
            style="
                margin-top:25px;
                padding:12px 20px;
                border:0;
                border-radius:10px;
                background:#19d9d2;
                cursor:pointer;
            "
        >
            Ýap
        </button>
    ;

    modal.style.display = "flex";
}


function closeModal() {

    document.getElementById("modal").style.display = "none";
}


document
    .getElementById("bookSearch")
    .addEventListener("input", function () {

        const search = this.value.toLowerCase();

        const books =
            document.querySelectorAll(".book-card");

        books.forEach(book => {

            const name =
                book.dataset.name.toLowerCase();

            if (name.includes(search)) {
                book.style.display = "";
            } else {
                book.style.display = "none";
            }

        });

    });
