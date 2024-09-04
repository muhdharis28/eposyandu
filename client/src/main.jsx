// main.js (or MyApp.js depending on your project structure)
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Tailwind and global styles
import App from './App';
import { PrimeReactProvider } from 'primereact/api';
import classNames from 'classnames';

// Import PrimeReact styles
import 'primereact/resources/themes/saga-blue/theme.css'; // Optional theme
import 'primereact/resources/primereact.min.css';         // Core CSS
import 'primeicons/primeicons.css';                       // PrimeReact icons
import 'primeflex/primeflex.css';                         // PrimeFlex for layout

// Define a simple TRANSITIONS object
const TRANSITIONS = {
  toggleable: {
    enter: 'transition ease-out duration-200',
    enterFrom: 'opacity-0 transform scale-95',
    enterTo: 'opacity-100 transform scale-100',
    leave: 'transition ease-in duration-150',
    leaveFrom: 'opacity-100 transform scale-100',
    leaveTo: 'opacity-0 transform scale-95',
  },
};

// Custom Design System using Tailwind CSS classes
const MyDesignSystem = {
  inputtext: {
    root: ({ props, context }) => ({
      className: classNames(
        'm-0',
        'font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg',
        {
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled,
        },
        {
          'text-lg px-4 py-4': props.size === 'large',
          'text-xs px-2 py-2': props.size === 'small',
          'p-3 text-base': props.size == null,
        }
      ),
    }),
  },
  panel: {
    header: ({ props }) => ({
      className: classNames(
        'flex items-center justify-between',
        'border border-gray-300 bg-gray-100 text-gray-700 rounded-tl-lg rounded-tr-lg',
        'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80',
        { 'p-5': !props.toggleable, 'py-3 px-5': props.toggleable }
      ),
    }),
    title: 'leading-none font-bold',
    toggler: {
      className: classNames(
        'inline-flex items-center justify-center overflow-hidden relative no-underline',
        'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition duration-200 ease-in-out',
        'hover:text-gray-900 hover:border-transparent hover:bg-gray-200 dark:hover:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]'
      ),
    },
    togglerIcon: 'inline-block',
    content: {
      className: classNames(
        'p-5 border border-gray-300 bg-white text-gray-700 border-t-0 last:rounded-br-lg last:rounded-bl-lg',
        'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80'
      ),
    },
    transition: TRANSITIONS.toggleable,
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider value={{pt: MyDesignSystem }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
