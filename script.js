// Initialize speech synthesis
const synth = window.speechSynthesis;

// DOM elements
const voiceSelect = document.getElementById('voiceSelect');
const textInput = document.getElementById('textInput');
const speakButton = document.getElementById('speakButton');

// Load available voices
function loadVoices() {
  const voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Populate voices list on load
window.onload = () => {
  loadVoices();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
  }
};

// Speak text
function speak() {
  const text = textInput.value;
  if (!text) return alert('Please enter text to speak!');

  const utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voiceSelect.value;
  utterance.voice = synth.getVoices().find(voice => voice.name === selectedVoice);

  synth.speak(utterance);
}

// Event listener for button
speakButton.addEventListener('click', speak);
