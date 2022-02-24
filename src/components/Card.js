import React from 'react'

export default function Card(props, isLoading) {

    const handleStyle = props.data.completed? {backgroundColor:"green"}:{backgroundColor:"red"};
    const text = props.data.completed? "Yes":"No";
  return (
    <tr className='text-center'>
        <td>{props.data.id}</td>
        <td>{props.data.title}</td>
        <td style={handleStyle}>{text}</td>
    </tr>
  )
}
