import { useState, useEffect } from 'react';

interface StoryModalProps {
    storyData: StoryData | null;
    isOpen: boolean;
    onClose: () => void;
    storyName: string;
}

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




export default function StoryModal({ storyData, isOpen, onClose, storyName }: StoryModalProps) {

    const [currentSectionId, setCurrentSectionId] = useState<number>(1);

    // console.log(storyData);




    useEffect(() => {
        let buttonBorderColor;
        let buttonBackgroundColor;
        let borderColor;
        switch (storyName) {
            case 'buzzly':
                buttonBorderColor = 'saddlebrown';
                borderColor = 'goldenrod';
                buttonBackgroundColor = 'mistyrose';
                break;
            case 'whiskers':
                buttonBorderColor = 'lightblue';
                borderColor = 'lightblue';
                buttonBackgroundColor = 'mistyrose';
                break;
            case 'billy':
                buttonBorderColor = 'green';
                borderColor = 'green';
                buttonBackgroundColor = 'mistyrose';
                break;
            default:
                buttonBorderColor = 'black';
                borderColor = 'black';
                buttonBackgroundColor = 'mistyrose';
                break;
        }

        console.log(`Setting border color to: ${borderColor}`); // Debugging line
        document.documentElement.style.setProperty('--border-color', borderColor);
        document.documentElement.style.setProperty('--button-border-color', buttonBorderColor);
        document.documentElement.style.setProperty('--button-bg-color', buttonBackgroundColor);
    }, [storyName]);

    useEffect(() => {
        setCurrentSectionId(1);
    }, [storyData]);




    if (!isOpen || !storyData) return null;

    const currentSection = storyData ? storyData.find((section: StorySection) => section.id === currentSectionId) : null;

    function handleChoiceClick(nextSectionId: number) {
        setCurrentSectionId(nextSectionId);
    }




    return (
        <div className="story-modal">
            <div className="modal-content">
                <div id="textAndImage">

                    <img src={`/images/${storyName}/${currentSection.image}`} />
                    <div id="textAndButtons">
                    <p>{currentSection.text}</p>
                    <div id="navButtonsDiv">

                        {currentSection.choices.map((choice: string) => (
                            <button key={choice.next} onClick={() => handleChoiceClick(choice.next)}>
                                {choice.text}
                            </button>
                        ))}
                        <button onClick={onClose}>close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}