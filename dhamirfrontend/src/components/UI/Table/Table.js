import React from 'react';

const table = (props) => {
	const headers = (<tr>
			{props.headers.map(item => (<th>{item}</th>))}
		</tr>);
	return (<table>
		<thead>
			{headers}
		</thead>
		<tbody>
			{props.rows}
		</tbody>
		<tfoot>
		</tfoot>
	</table>)
};

export default table;