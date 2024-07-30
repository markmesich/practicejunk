import { useState } from "react"


const Prompt = () => {
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [currentURL, setCurrentURL] = useState('');
    const [error, setError] = useState(false)
    const handlePrompt = (e) => {
        e.preventDefault();
        const promptText = e.target.elements.prompt.value;
        setCurrentPrompt(promptText);
        console.log('Prompt stored:', currentPrompt);
    }
    const handleURL = (e) => {
        e.preventDefault();
        const grabURL = e.target.elements.inputURL.value;
        setCurrentURL(grabURL);
    }
    return (
        <div className='prompt'>
            <form onSubmit={handleURL}>
                <input type='text' name='inputURL' placeholder='URL' />
                <button type='submit'>Submit URL</button>
                <h>{currentURL ? 'Submitted' : ''}</h>
                {error && <span>Invalid URL</span>}
            </form>
            <form onSubmit={handlePrompt}>
                <input type='text' name='prompt' placeholder='prompt' />
                <button type='submit'>Save Prompt</button>
                <h>current prompt:</h>
                <h>{currentPrompt}</h>
                {error && <span>Invalid Prompt</span>}
            </form>
            <form>
            <label>
               
            <select className="dropdown">
                <option value="1">OpenAI</option>
                <option value="2">Gemini</option>
                <option value="3">Azure</option>
            </select>
            </label>
            </form>
            <button type='submit'>Run</button>
        </div>

    )
}

export default Prompt