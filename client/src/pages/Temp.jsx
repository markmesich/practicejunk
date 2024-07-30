import { useReducer } from 'react';
import axios from 'axios';
import '../App.css';



const Temp = () => {
    // const [oldWords, setWords] = useState('');
  // const [count, setCount] = useState(0);
  // const [box, setBox] = useState(true);
  // const [curColor, newColor] = useState('#282c34');
  // const [currentTypi, newTypi] = useState('')
  // const [currentBody, newBody] = useState('')
    const initialState = { 
        count: 0,
        
        curColor: '#282c34',
        box: true,
        currentTypi: '',
        currentBody: '',
        currentWords: ''
      };
    
      function reducer(state, action) {
        switch (action.type) {
          case 'increment':
            return { ...state, count: state.count + 1};
            case 'decrement':
              return { ...state, count: state.count - 1};
            case 'clearText':
              const newState = { ...state };
              action.payload.forEach(field => {
                newState[field] = '';
              });
              return newState;
            case 'setColor':
              return { ...state, curColor: action.payload };
            case 'toggleBox':
              return { ...state, box: action.payload };
            case 'setTypi':
              return { ...state, currentTypi: action.payload };
            case 'setBody':
              return { ...state, currentBody: action.payload };
            case 'setWords':
              return { ...state, currentWords: action.payload };
            default:
              throw new Error();
        }
      }
    
      const [state, dispatch] = useReducer(reducer, initialState);
    
      const getWords = async () => {
        try {
        const { data } = await axios.get('https://api.chucknorris.io/jokes/random')
        console.log(data.value)
        // setWords(data.value) // useState call
        dispatch ({ type: 'setWords', payload: data.value}) // Reducer call
        } catch(err)  {
          console.log(err)
        }
      }
      const clearText = async (fields) => {
        dispatch({ type: 'clearText', payload: fields})
        // newTypi('');
        
      };
        // const clearTypi = async () => {
        //   newTypi('');
        //   newBody('');
        // }
        
      // const getTypi = () => {
      //   axios.get('https://jsonplaceholder.typicode.com/posts')
      //     .then(res => {
      //       const getRandomIndex = Math.floor(Math.random() * res.data.length);
      //       newTypi(res.data[getRandomIndex].title);
      //       newBody(res.data[getRandomIndex].body);
      //     });
      // };
      const getTypi = async () => {
        try {
          const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
          const getRandomIndex = Math.floor(Math.random() * data.length);
          // currentTypi(data[getRandomIndex].title); // useState call
          dispatch ({ type: 'setTypi', payload: data[getRandomIndex].title}) // Reducer call
          // newBody(data[getRandomIndex].body); // useState call
          dispatch ({ type: 'setBody', payload: data[getRandomIndex].body}) // Reducer call
        } catch (err) {
          console.log(err);
        }
      };
     
      
    
      // function addClick() {
      //   setCount(count + 1);
      // }
    
      // function subtractClick() {
      //   setCount(count - 1);
      // }
      
    
      const toggleBox = (e) => {
        dispatch({ type: 'toggleBox', payload: e.target.checked })
      }
    
      function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
      }
      
      const  setRandomColor = () => {
        dispatch({ type: 'setColor', payload: getRandomColor() })
      }
      
        
      const returnDefColor = () => {
        dispatch({ type: 'setColor', payload: '#282c34' })
      }
      
      const randomArrayApi = async () => {
        await getTypi();
      }

        return (           
            <div className='temp-container'style={{ backgroundColor: state.curColor }}>
              <>
                <label>
                  <input
                    type="checkbox"
                    checked={state.box}
                    onChange={toggleBox}
                  />
                  wow a checkbox!
                </label>
                <p>
                  Counter:
                  <div>{state.count}</div>
                </p>
                <button onClick={() => dispatch({ type: 'increment' })} className="bg-white p-2">add 1</button>
                <button onClick={() => dispatch({ type: 'decrement' })} className="bg-white p-2">subtract 1</button>
                <button onClick={setRandomColor} className="bg-white p-2">randomize the background color</button>
                <button onClick={returnDefColor} className="bg-white p-2">default background</button>
                <p>{state.currentWords}</p>
                <button onClick={getWords} className="bg-white p-2">chuck norris joke</button>
                <button onClick={() => clearText(['currentWords'])} className="bg-white p-2">clear</button>
                <p>{state.currentTypi}</p>
                <p>{state.currentBody}</p>
                <button onClick={randomArrayApi} className="bg-white p-2">grab random array api title and body</button>
                <button onClick={() => clearText(['currentTypi', 'currentBody'])} className="bg-white p-2">clear</button>
              </>
             
            </div>
            )}

export default Temp