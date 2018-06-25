import React from 'react';

import Classes from './Button.css';

const button = (props) => {
	let tipo = 'Classes.'+props.btnType;
	return(props.disabled)?(
		<button className={Classes.SuccessDisabled} disabled>
			{props.children}
		</button>
	):(<button className={Classes.Success}>
			{props.children}
		</button>);
};

export default button;