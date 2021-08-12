const profiles = [
  {
    "imageName": "reynald.jpeg",
    "header": "What's up, It is Reynald",
    "bio": "Liyeuk Reynald is a fourth-year student at the African Leadership College. He hails from Cameroon, often referred to as Africa in miniature. He has a keen interest in functional programming, backend software engineering and big data. He is passionate about how technology can be used to improve healthcare, education and agriculture.",
    "linkedIn": "https://www.linkedin.com/in/liyeuk-reynald-joabet-942472161/",
    "github": "https://github.com/reynaldjoabet",
    "twitter": "https://twitter.com/reynaldjoabet",


  },
  {
    "imageName": "cynthia.jpeg",
    "header": "Hi, It is Cynthia",
    "bio": "Cynthia is a front-end developer aspiring to be a full stack developer. She's worked with languages including Java and JavaScript, as well as frameworks like VUE and React. Cynthia is currently looking for opportunities to grow her front end skills and learn more about the backend side.",
    "linkedIn": "http://www.linkedin.com/in/ciradu2204",
    "github": "https://github.com/ciradu2204",
    "twitter": "https://twitter.com/IraduCynthia",

  },
  {
    "imageName": "celine.jpeg",
    "header": "What's up, It is Celine ",
    "bio": "An audacious, creative, and self-driven woman whose passion lies in designing UI & UX for software and web applications. I've worked on different tools for wireframing, mockups, and prototypes such as Balsamiq, Figma, and Adobe XD. I dream of becoming a product designer in the future.",
    "linkedIn": "https://www.linkedin.com/in/celine-ishimwe-67b593109/",
    "github": "",
    "twitter": "https://twitter.com/__celinish"

  },
  {
    "imageName": "Rudo.jpg",
    "header": "Hi, It is  Rudo ",
    "bio": " I am front-end web developer and I am an aspiring UI/UX designer. For web development, I am fluent in HTML, CSS and JavaScript with a growing interest in JavaScript frameworks such as React. At present, I am looking into expanding my design field of interest. ",
    "linkedIn": "https://www.linkedin.com/in/rudo-courtney-togara-ab1108184/",
    "github": "https://github.com/Rudo-Courtney",
    "twitter": ""
  }
]

let loading = false;

const createElement = (leftElement) => {
  let div = document.createElement("div");
  div.className = "profile";
  div.id = leftElement;
  let img = document.createElement("img");
  img.src = "../images/author/" + profiles[leftElement].imageName
  let div2 = document.createElement("div");
  div2.innerHTML = `<h3> ${profiles[leftElement].header}</h3> <p>${profiles[leftElement].bio}</p> <div class="socialIcons"> 
  ${(profiles[leftElement].linkedIn !== "")? `<a target="_blank" href="${profiles[leftElement].linkedIn}" class="fab fa-linkedin-in"></a>` : `` }  
   ${(profiles[leftElement].github !== "")? `<a  target="_blank" href="${profiles[leftElement].github}" class="fab fa-github"></a> `: `` }  
   ${(profiles[leftElement].twitter !== "")?  `<a  target="_blank" href="${profiles[leftElement].twitter}" class="twitter">@</a> `: `` }  </div>`
  div.appendChild(img);
  div.appendChild(div2);
  return div;
}


let leftElement = 0;
let rightElement = 1;
let element = 0;
const leftSide = () => {
  if (leftElement > 0 && window.innerWidth > 1024) {
    let removeDiv = document.getElementById(rightElement);
    let currentDiv = document.getElementById(leftElement);
    let addDiv = createElement(--leftElement);
    document.getElementById("profiles").insertBefore(addDiv, currentDiv);
    document.getElementById("profiles").removeChild(removeDiv);
    rightElement--;
  } else if (element > 0 && window.innerWidth < 1023) {
    let removeDiv = document.getElementById(element);
    let addDiv = createElement(--element);
    document.getElementById("profiles").appendChild(addDiv);
    document.getElementById("profiles").removeChild(removeDiv);
  }
}
const rightSide = () => {
  if (rightElement < profiles.length - 1 && window.innerWidth > 1024) {
    let removeDiv = document.getElementById(leftElement);
    let addDiv = createElement(++rightElement);
    document.getElementById("profiles").appendChild(addDiv);
    document.getElementById("profiles").removeChild(removeDiv);
    leftElement++;
  } else if (element < profiles.length - 1 && window.innerWidth < 1023) {
    let removeDiv = document.getElementById(element);
    let addDiv = createElement(++element);
    document.getElementById("profiles").appendChild(addDiv);
    document.getElementById("profiles").removeChild(removeDiv);
  }
}

const addProfiles = () => {
  let i = 0;
  let max = (window.innerWidth > 1023) ? 2 : 1;
  while (i < max) {
    let div = createElement(i);
    document.getElementById("profiles").appendChild(div);
    i++;
  }
}

addProfiles()

const resetErrors = () => {
  let successMessage = document.getElementById("successMessageDiv");
  let fullNameError = document.getElementById("fullNameError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");
  successMessage.innerHTML = "";
  fullNameError.innerHTML = "";
  emailError.innerHTML = "";
  messageError.innerHTML = ""

}

const resetForm = () => {
  let fullName = document.getElementById("fname");
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  fullName.value = "";
  email.value = "";
  message.value = "";

}

const isLoading = (loading) => {

  if (loading) {
    document.getElementById("loader").style.display = "flex";
    document.getElementById("submit").disabled = true;
  } else {
    document.getElementById("loader").style.display = "none";
    document.getElementById("submit").disabled = false;

  }
}

isLoading(loading);

const formValidation = () => {

  let fullName = document.getElementById("fname").value;
  let fullNameError = document.getElementById("fullNameError");
  let successMessage = document.getElementById("successMessageDiv");

  let h3 = document.createElement("h3");
  h3.id = "sucessMessage";

  let email = document.getElementById("email").value;
  let emailError = document.getElementById("emailError");

  let message = document.getElementById("message").value;
  let messageError = document.getElementById("messageError");


  if (fullName === "") {
    fullNameError.innerHTML = "Full Name is needed"
  }

  if (email === "") {
    emailError.innerHTML = "Email is needed"
  }

  if (message === "") {
    messageError.innerHTML = "Message is needed "
  }


  if (email !== "" && message !== "" && fullName !== "") {
    resetForm();
    loading = true;
    isLoading(loading);
    Email.send({
      SecureToken: "3fb9a956-1064-4111-b24f-098c8f9a289e",
      To: `c.iradukund@alustudent.com`,
      From: 'c.iradukund@alustudent.com',
      Subject: `${fullName} From Natural&Weather`,
      Body: `${message} from ${email}`,
    }).then(() => {
      loading = false;
      isLoading(loading);
      h3.innerHTML = "Mail sent successfully";
      successMessage.appendChild(h3);
    }).catch(error => console.log(error));


  }


}

const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  resetErrors();
  formValidation();
})