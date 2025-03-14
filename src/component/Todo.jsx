// import React, { useReducer, useState } from 'react';
// import { IoMdAdd } from "react-icons/io";
// import { MdModeEditOutline } from "react-icons/md";
// import { RiDeleteBin7Fill } from "react-icons/ri";

// let reducer = (state, action) => {
//     console.log('Reducer action:', action);
//     switch (action.type) {
//         case "Add":
//             return [...state, action.payload];
//         case "Remove":
//             return state.filter(task => task !== action.payload);
//         case "Update":
//             console.log('Updating task at index:', action.index, 'with value:', action.newValue);
//             return state.map((task, index) => index === action.index ? action.newValue : task);
//         default:
//             break;
//     }
// }

// const Todo = () => {
//     let [state, dispatch] = useReducer(reducer, []);
//     console.log('State:', state);

//     let [task, setTask] = useState('');
//     console.log('Task:', task);

//     let [updateTask, setUpdateTask] = useState('');
//     let [updateIndex, setUpdateIndex] = useState(null);

//     return (
//         <div>
//             <section className=' h-[20vh] w-[30%] m-auto mt-15 rounded-xl flex'>
//                 <div className='text-center pt-13 '>
//                     <input type="text" value={updateIndex !== null ? updateTask : task} onChange={(e) => {
//                         if (updateIndex !== null) {
//                             setUpdateTask(e.target.value);
//                         } else {
//                             setTask(e.target.value);
//                         }
//                     }} className='bg-gray-200 w-[200px] outline-none rounded-lg ' placeholder='       Add your data...' />
//                 </div>
//                 <div className="text-center bg-[#412A7B] w-[60px] text-white m-auto p-1 rounded-lg">
//                     <button onClick={() => {
//                         if (updateIndex !== null) {
//                             console.log('Updating task:', updateTask, 'at index:', updateIndex);
//                             if (updateTask.trim() !== '') {
//                                 dispatch({ type: "Update", payload: { index: updateIndex, newValue: updateTask } });
//                                 setUpdateIndex(null);
//                                 setUpdateTask('');
//                             } else {
//                                 alert("Please enter a task.");
//                             }
//                         } else {
//                             if (task.trim() !== '') {
//                                 dispatch({ type: "Add", payload: task });
//                                 setTask('');
//                             } else {
//                                 alert("Please enter a task.");
//                             }
//                         }
//                     }}>{updateIndex !== null ? <MdModeEditOutline /> : <IoMdAdd />}</button>
//                 </div>
//             </section>
//             {
//                 state.map((ele, index) => {
//                     return (
//                         <ol key={index} className='flex w-[30%] m-auto mt-10 justify-evenly'>
//                             <li className='w-[250px]'>{ele}</li>
//                             <li className="text-center bg-[red] w-[50px]  m-auto p-1 rounded-lg">
//                                 <button onClick={() => dispatch({ type: "Remove", payload: ele })}><RiDeleteBin7Fill/></button>
//                             </li>
//                             <li className='text-center bg-[green] w-[50px] m-auto p-1 rounded-lg'>
//                                 <button onClick={() => {
//                                     console.log('Setting update index:', index, 'and task:', ele);
//                                     setUpdateTask(ele);
//                                     setUpdateIndex(index);
//                                 }}><MdModeEditOutline/></button>
//                             </li>
//                         </ol>
//                     );
//                 })
//             }
//         </div>
//     );
// }

// export default Todo;



import React, { useReducer, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";

let reducer = (state, action) => {
    switch (action.type) {
        case "Add":
            return [...state, action.payload];
        case "Remove":
            return state.filter((_, index) => index !== action.payload); // Remove task by index
        case "Update":
            return state.map((task, index) =>
                index === action.payload.index ? action.payload.newValue : task
            );
        default:
            return state;
    }
};

const Todo = () => {
    const [state, dispatch] = useReducer(reducer, []);
    const [task, setTask] = useState('');
    const [updateTask, setUpdateTask] = useState('');
    const [updateIndex, setUpdateIndex] = useState(null);

    return (
        <div>
            {/* Input Section */}
            <section className='h-[20vh] w-[30%] m-auto mt-15 rounded-xl flex'>
                <div className='text-center pt-13'>
                    <input
                        type="text"
                        value={updateIndex !== null ? updateTask : task}
                        onChange={(e) => {
                            updateIndex !== null
                                ? setUpdateTask(e.target.value)
                                : setTask(e.target.value);
                        }}
                        className='bg-gray-200 w-[200px] outline-none rounded-lg p-2'
                        placeholder='    Add your task...'
                    />
                </div>
                <div className="text-center bg-[#412A7B] w-[60px] text-white m-auto p-1 rounded-lg mt-14">
                    <button
                        onClick={() => {
                            if (updateIndex !== null) {
                                // Update Task Logic
                                if (updateTask.trim() !== '') {
                                    dispatch({
                                        type: "Update",
                                        payload: { index: updateIndex, newValue: updateTask },
                                    });
                                    setUpdateIndex(null);
                                    setUpdateTask('');
                                } else {
                                    alert("Please enter a valid task.");
                                }
                            } else {
                                // Add Task Logic
                                if (task.trim() !== '') {
                                    dispatch({ type: "Add", payload: task });
                                    setTask('');
                                } else {
                                    alert("Please enter a valid task.");
                                }
                            }
                        }}
                    >
                        {updateIndex !== null ? <MdModeEditOutline /> : <IoMdAdd />}
                    </button>
                </div>
            </section>

            {/* Task List */}
            {state.map((ele, index) => (
                <ol key={index} className='flex w-[30%] m-auto mt-10 justify-evenly'>
                    <li className='w-[250px]'>{ele}</li>
                    <li className="text-center bg-[red] w-[50px] m-auto p-1 rounded-lg">
                        <button onClick={() => dispatch({ type: "Remove", payload: index })}>
                            <RiDeleteBin7Fill />
                        </button>
                    </li>
                    <li className='text-center bg-[green] w-[50px] m-auto p-1 rounded-lg'>
                        <button
                            onClick={() => {
                                setUpdateTask(ele);
                                setUpdateIndex(index);
                            }}
                        >
                            <MdModeEditOutline />
                        </button>
                    </li>
                </ol>
            ))}
        </div>
    );
};

export default Todo;
