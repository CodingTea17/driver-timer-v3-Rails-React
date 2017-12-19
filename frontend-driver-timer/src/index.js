import ReactDOM from 'react-dom';
import './styles/index.css';
import jsx from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
