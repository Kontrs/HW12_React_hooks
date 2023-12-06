import { useState, useRef, useEffect } from 'react';
import './App.css';

const App = (): JSX.Element => {
  //  Section 1 hooks

  const [list, setList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('Select a color:');
  const [colorList, setColorList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);

  //  Section 2 hooks

  const [section2InputValue, setsection2InputValue] = useState('');
  const [section2Count, setsection2Count] = useState(100);
  const [fontSize, setFontSize] = useState(40);
 
  //  Section 3 hooks

  const divRef = useRef<HTMLDivElement>(null);

  //  Section 1

  useEffect((): () => void => {
    timeoutRef.current = setTimeout((): void => {
      setIsDisabled(false);
    }, 5000);
    console.log('First Render');
    return (): void => {
      if(timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const handleClick = (): void => inputRef.current?.focus();

  const handleInput = (event: { target: { value: string; }; }): void => {
    const inputText = event.target.value;
    setInputValue(inputText);
  };

  const handleSubmit = (event: { preventDefault: () => void; }): void => {
    event.preventDefault();

    const updatedList = [...list];
    updatedList.push(inputValue);

    setList(updatedList);
    setInputValue('');

    setIsDisabled(true);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout((): void => {
      setIsDisabled(false);
    }, 5000);
  };

  const handleCount = (): void => setCount(count + 1);

  const handleColor = (event: { preventDefault: () => void; }): void => {
    event.preventDefault();
    const updatedColorList = [...colorList];
    if(color !== 'Select a color:') {
      updatedColorList.push(color);
      setColorList(updatedColorList);
      setColor('Select a color:');
    } else {
      return;
    }
    
  };

  //  Section 2

  useEffect((): void => {
    document.title = section2InputValue
  }, [section2InputValue]);

  useEffect((): void => {
    console.log('Render');
  }, [section2InputValue, section2Count, fontSize]);

  const handleSection2Input = (event: { target: { value: string; }; }): void => {
    const inputText = event.target.value;
    setsection2InputValue(inputText);
    console.log('Input Change');
  };
  
  const handleSection2Count = (): void => {
    setsection2Count(section2Count + 1);
    setFontSize(fontSize + 1);
    console.log('Changing count');
  };

  //  Section 3

  const handleColorToGold = (): void => {
    if(divRef.current !== null) {
      divRef.current.style.backgroundColor = 'gold';
    }
  };

  const handleCloning = (): void => {
    if(divRef.current !== null) {
      const divToClone = divRef.current;
      const clonedDiv = divToClone.cloneNode(true);
      const parentElement = divRef.current.parentElement;
      parentElement?.appendChild(clonedDiv);
    }
  };

  const handleDivToCorner = (): void => {
    if(divRef.current !== null) {
      divRef.current.style.position = 'absolute';
      divRef.current.style.left = '2000px';
      divRef.current.style.bottom = '850px';
      divRef.current.textContent = 'Esmu stūrī';
    }
  };

  return (
    <>
      <section className='page'>
        <form action="submit" className='form' onSubmit={handleSubmit}>
          <input 
            type="text"
            className="input"
            placeholder='Write something...'
            autoFocus
            onChange={handleInput}
            required
            value={inputValue}
            ref={inputRef}/>
          <button 
            className="button"
            onClick={handleClick}
            disabled={isDisabled}
            >Submit
          </button>
        </form>
        <ul className='listItem'>
          {list.map((string: string, index: number): JSX.Element => <li key={index}>{string}</li>)}
        </ul>
        <div className='countColorDiv'>
          <div className='countDiv'>
            <button className="button" onClick={handleCount}>Count: {count}</button>
            <div>{count * 2}</div>
          </div>
          <div className='colorDiv'>
            <div className='color-selector'>
              <button className="button" onClick={handleColor}>+</button>
              <select
                name="dropdown"
                value={color}
                onChange={(event): void => setColor(event.target.value) }>
                <option disabled >Select a color:</option>
                <option value='green'> Green</option>
                <option value='blue'>Blue</option>
                <option value='yellow'>Yellow</option>
                <option value='black'>Black</option>
                <option value='red'>Red</option>
                <option value='pink'>Pink</option>
                <option value='purple'>Purple</option>
                <option value='gold'>Gold</option>
              </select>
            </div>
            <div className="color-boxes">
              {colorList.map((color: string, index: number): JSX.Element => <div key={index} className='color-box' style={{backgroundColor: color}}></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className='page'>
        <button className='button' onClick={handleSection2Count}>+</button>
        <p style={{fontSize: `${fontSize}px`}}>Count: {section2Count}</p>
        <input onChange={handleSection2Input} className='input' type="text"/>
        <p>{section2InputValue}</p>
      </section>
      <section className='page'>
        <div className='button-div'>
          <button className='button' onClick={handleColorToGold}>Change box color</button>
          <button className='button' onClick={handleCloning}>Clone box</button>
          <button className='button' onClick={handleDivToCorner}>Cause chaos</button>
        </div>
        <div className='box-wrapper'>
          <div className='box' ref={divRef}/>
        </div>
      </section>
    </>
  )
}

export default App
