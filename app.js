const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives= 10;

//Link text to content
playerLivesCount.textContent = playerLives;

//Generate the data

const getData = () => [
    {imgSrc:"./images/octopus.png", name:"octopus"},
    {imgSrc:"./images/cactus.png", name:"cactus"},
    {imgSrc:"./images/snowman.png", name:"snowman"},
    {imgSrc:"./images/cloud.jpg", name:"cloud"},
    {imgSrc:"./images/juice.png", name:"juice"},
    {imgSrc:"./images/neptune.jpg", name:"neptune"},
    {imgSrc:"./images/panda.png", name:"panda"},
    {imgSrc:"./images/santaclaus.jpg", name:"santaclaus"},
    {imgSrc:"./images/octopus.png", name:"octopus"},
    {imgSrc:"./images/cactus.png", name:"cactus"},
    {imgSrc:"./images/snowman.png", name:"snowman"},
    {imgSrc:"./images/cloud.jpg", name:"cloud"},
    {imgSrc:"./images/juice.png", name:"juice"},
    {imgSrc:"./images/neptune.jpg", name:"neptune"},
    {imgSrc:"./images/panda.png", name:"panda"},
    {imgSrc:"./images/santaclaus.jpg", name:"santaclaus"}
]

//Randomize function
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};
randomize()

//Card generator function

const cardGenerator = () => {
    const cardData = randomize();
    // Generate the HTML

    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        })
    });
    
};
//Check cards
const checkCards = (e)=> {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard')
    
    if (flippedCards.length === 2) {
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        } else {
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("Try again");
            }
        }
    }
    // Check if game won
    if (toggleCard.length === 16) {
        restart('You won')
    }
};

//Restart
    const restart = (text) => {
        let cardData = randomize();
        let faces = document.querySelectorAll(".face");
        let cards = document.querySelectorAll('.card');
        section.style.pointerEvents = 'none';
        cardData.forEach((item, index) => {
            cards[index].classList.remove("toggleCard");
            //Randomize
            setTimeout(() => {
                cards[index].style.pointerEvents = 'all'
                faces[index].src = item.imgSrc;
                cards[index].setAttribute('name', item.name);
                section.style.pointerEvents = 'all'
            }, 1000)
        })
        playerLives = 10;
        playerLivesCount.textContent = playerLives;
        setTimeout(() => window.alert(text), 100) ;
    }

cardGenerator();