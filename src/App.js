import React, {
  useState, // It allows us to use some kind of state in order to handle variables into the component
  useEffect // It allows us to interact with  side effects. ($1)
} from 'react';

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

function App() {

  // count: the initial state
  // setCount: the function we are going to use in order to set the value of count
  const [count, setCount] = useState(0);

  // We can use useState method multiple times
  const [isOn, setIsOn] = useState(false);

  // We can declare objets as parameters of the useState method 
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  // We can set a state based on a external API or value, like navigator API.
  const [status, setStatus] = useState(navigator.onLine);

  const [option, setOption] = useState('A');

  // We can assing an object to useState like "location" or we can access to the 
  // properties directly using ES6 detructuring: {latitud, longitude, speed} wich means => [location] and then use location.latitude.
  // const [location, setLocation] = useState(initialLocationState);
  const [{ latitude, longitude, speed }, setLocation] = useState(initialLocationState);
  let mounted = true; // ($2)

  // By default This method is executed after every render
  // This hook can be used to replace the componentDidMount or componendDidUpdate methods
  useEffect(() => {
    document.title = `You have clicked ${count} times`;

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    window.addEventListener('mousemove', handleMouseMove);

    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    // This function is a way to replicate the componentWillUnmount
    // returning this function and an epty array as the second parameter of useEffect
    // this function will only be executed on componentDidMount and on componentWillUnmount
    // in that case, the document.title assignment will not happen.
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };
  }, [count]); // Passing count as part of this array, we ensure that sideEffects related to that state will happen.


  const handleGeolocation = (event) => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    });
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  // This way we can access to the previous state of the component. using prevState function
  const incrementWithPrevState = () => {
    setCount(prevState => prevState + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  };

  const handleSelectChange = (event) => {
    setOption(event.currentTarget.value);
  };

  const getContentBySelectedOption = () => {
    switch (option) {
      case 'A':
        return <span>Option Selected: A</span>;
      case 'B':
        return <span>Option Selected: B</span>;
      case 'C':
      default:
        return <span>Option Selected: C</span>;
    }
  };

  return (
    <div className="App">

      <h2>Combo Example:</h2>
      <div>
        <span>Options:</span>
        <select onChange={handleSelectChange} value={option}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <div>
          <p>Content updated depending on the Selected Option:</p>
          {getContentBySelectedOption()}
        </div>
      </div>

      <hr />

      {
        option === 'A' &&
        <>
          <div>
            <button onClick={incrementWithPrevState}>I was clicked {count} times</button>
          </div>

          <hr />

          <h2>Counter Example:</h2>
          <div>
            <button onClick={incrementCount}>I was clicked {count} times</button>
          </div>
          <div>
            <button onClick={incrementWithPrevState}>I was clicked {count} times</button>
          </div>
        </>
      }

      <hr />

      <h2>Toggle Light:</h2>
      <img
        src={
          isOn
            ? 'https://icon.now.sh/highlight/fd0'
            : 'https://icon.now.sh/highlight/aaa'
        }
        alt="Flashlight"
        onClick={toggleLight}
        style={{ width: 30, height: 30 }}
      />

      <hr />

      <h2>Mouse Position</h2>
      <div>
        <p>X position: {mousePosition.x}</p>
        <p>Y position: {mousePosition.y}</p>
      </div>

      <hr />

      <h2>Network Status</h2>
      <div>
        <p>Your are <strong>{status ? 'online' : 'offline'}</strong></p>
      </div>

      <hr />

      <h2>Geolication</h2>
      <div>
        <p>Latitute:  <strong>{latitude}</strong></p>
        <p>Longitude:  <strong>{longitude}</strong></p>
        <p>Your speed is:  <strong>{!speed ? 0 : speed}</strong></p>
      </div>

      <hr />

      <h2>New Fragment Example:</h2>
      <>
        {/* Instead of write Fragment we can use this new react tags */}
        <p>This two paragraphs</p>
        <p>are defined within a Fragment with the new syntax</p>
      </>
    </div>
  );
}

export default App;


/**
 * Notes about this file.
 *
 * $1: More info about side-effects: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0
 * $2: In some cases, we don't have the ability to remove a listener. An example of that is the method navigator.geolocation.getCurrentPosition(handleGeolocation)
 * which doesn't provide a way to removeListener/unsuscribe. In that case, we can use a local variable that is going to be used to check if the handler will
 * be executed or not.
 *
 *
 */