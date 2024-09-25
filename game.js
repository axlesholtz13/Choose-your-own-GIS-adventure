// Define the game story and structure
const storyNodes = {
    start: {
        text: "You are a GIS analyst working on a critical environmental project. Your first task is to gather spatial data for a region. Do you begin by collecting satellite imagery or survey ground data?",
        choices: [
            { text: "Collect satellite imagery", nextNode: 'satelliteImagery', animation: 'satellite' },
            { text: "Conduct ground surveys", nextNode: 'groundSurveys', animation: 'survey' }
        ]
    },
    satelliteImagery: {
        text: "You choose to gather satellite imagery. You now have a set of raster data. Do you perform supervised classification to detect land use or apply NDVI (Normalized Difference Vegetation Index) to assess vegetation health?",
        choices: [
            { text: "Perform supervised classification", nextNode: 'supervisedClassification', animation: 'classification' },
            { text: "Apply NDVI", nextNode: 'ndvi', animation: 'ndvi' }
        ]
    },
    groundSurveys: {
        text: "You choose to conduct ground surveys, mapping precise data points. A storm is coming, making fieldwork harder. Do you postpone the surveys or proceed despite the risk?",
        choices: [
            { text: "Postpone the surveys", nextNode: 'postponeSurveys', animation: 'storm' },
            { text: "Proceed with the surveys", nextNode: 'proceedSurveys', animation: 'fieldwork' }
        ]
    },
    // ... other nodes follow the same structure
    postponeSurveys: {
        text: "You decide to postpone the surveys. Unfortunately, the storm damages the area, making accurate field data difficult to gather. You lose crucial time and funding.",
        choices: [
            { text: "Start over", nextNode: 'start', animation: 'reset' }
        ]
    },
    proceedSurveys: {
        text: "You proceed with the surveys despite the storm. The data is accurate, but you face significant delays due to weather. However, the project moves forward.",
        choices: [
            { text: "Start over", nextNode: 'start', animation: 'reset' }
        ]
    }
    // Add other game branches here
};

// HTML elements
const storyTextElement = document.getElementById('story-text');
const choicesContainerElement = document.getElementById('choices-container');
const animationCanvas = document.getElementById('animationCanvas');
const ctx = animationCanvas.getContext('2d');

// Start the game
function startGame() {
    showNode('start');
}

// Display a story node
function showNode(nodeKey) {
    const node = storyNodes[nodeKey];
    storyTextElement.innerText = node.text;
    choicesContainerElement.innerHTML = '';

    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => {
            showNode(choice.nextNode);
            playAnimation(choice.animation);  // Play animation based on the choice
        };
        choicesContainerElement.appendChild(button);
    });
}

// Play animations based on user choices
function playAnimation(type) {
    ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height); // Clear previous animation

    if (type === 'satellite') {
        satelliteAnimation();
    } else if (type === 'survey') {
        surveyAnimation();
    } else if (type === 'storm') {
        stormAnimation();
    } else if (type === 'reset') {
        resetAnimation();
    }
}

// Simple pixel animations
function satelliteAnimation() {
    let x = 0;
    let satellite = setInterval(() => {
        ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
        ctx.fillStyle = 'gray';
        ctx.fillRect(x, 50, 40, 10); // Draw satellite
        ctx.fillStyle = 'blue';
        ctx.fillRect(100, 150, 200, 10); // Draw Earth

        x += 5;
        if (x > animationCanvas.width) {
            clearInterval(satellite);
        }
    }, 100);
}

function surveyAnimation() {
    let x = 0;
    let survey = setInterval(() => {
        ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 150, animationCanvas.width, 50); // Ground
        ctx.fillStyle = 'brown';
        ctx.fillRect(x, 130, 10, 20); // Surveyor

        x += 5;
        if (x > animationCanvas.width) {
            clearInterval(survey);
        }
    }, 100);
}

function stormAnimation() {
    let storm = setInterval(() => {
        ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, animationCanvas.width, 50); // Clouds
        ctx.fillStyle = 'blue';
        ctx.fillRect(Math.random() * animationCanvas.width, 50, 2, 50); // Rain drops

        if (Math.random() > 0.9) {
            clearInterval(storm);
        }
    }, 100);
}

function resetAnimation() {
    ctx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);
    ctx.fillStyle = 'black';
    ctx.fillText("Resetting...", 150, 100);
}

// Initialize the game
startGame();