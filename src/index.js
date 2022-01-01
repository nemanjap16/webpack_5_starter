// style
import './global.reset.scss';
import './style/index.scss';
// js
import greet from './js/test';

greet();

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Production mode');
}
