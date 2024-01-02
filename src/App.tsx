import { useState } from 'react';
import './App.css';
import StoryModal from './components/StoryModal';

interface Choice {
  text: string;
  next: number;
}

interface StorySection {
  id: number;
  text: string;
  choices: Choice[];
}

interface StoryData {
  [key: number]: StorySection;
}



export default function App() {

  // STATE MANAGEMENT
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [currentStoryName, setCurrentStoryName] = useState<string>("");

  async function fetchStoryData(storyName: string) {
    try {
      const response = await fetch(`${storyName}.json`);
      const data: StoryData = await response.json();
      setSelectedStory(data);
      setCurrentStoryName(storyName);
      setIsStoryModalOpen(true);
    } catch (error) {
      console.error("Error fetching story data:", error);
    }
  }




  return (
    <>
      <div id="storybooksMenu">
        <h1 id="storiesTitle">Enchanted Fairytales</h1>
        <h3 style={{ fontWeight: 'normal', fontStyle: 'italic' }}>Choose-Your-Own-Adventure Stories</h3>
        <hr />
        <div id="storyIndex">

          <div id="buzzlyDiv">
            <div className="spacing">

              <h4>Buzzly's Busy Day</h4>
              <p>Buzzly the honeybee embarks on an enchanting adventure through a vibrant meadow and a bustling hive, facing choices that teach him about bravery, friendship, and community.</p>
            </div>
            <button onClick={() => fetchStoryData('buzzly')}>
              <h2>Read 🐝</h2>
            </button>
          </div>

          <div id="whiskersDiv">
            <div className="spacing">
              <h4>The Magical Garden</h4>
              <p>Whiskers the curious cat discovers a hidden garden, encountering talking flowers and playful shadows, where each choice leads to riddles and games about the garden's magical wonders.</p>
            </div>
            <button onClick={() => fetchStoryData('whiskers')}>
              <h2>Read 🐈</h2>
            </button>
          </div>

          <div id="billyDiv">
            <div className="spacing">
              <h4>Billy and the Mountain</h4>
              <p>Billy the brave goat embarks on a thrilling journey up a mysterious mountain, encountering challenges and whimsical characters while learning about courage and perseverance along the way.</p>
            </div>
            <button onClick={() => fetchStoryData('billy')}>
              <h2>Read 🐐</h2>
            </button>
          </div>
        </div>
        <a href="https://github.com/amy-enn/react-fairytales" target="_blank">~ Github ~</a>

        <StoryModal
          storyData={selectedStory}
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          storyName={currentStoryName}
        />

      </div>


    </>
  )
}
