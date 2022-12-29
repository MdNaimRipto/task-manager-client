import { format } from 'date-fns';
import React from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const UpdateTask = () => {
    const data = useLoaderData()
    const navigate = useNavigate()

    const handleUpdateTask = (e) => {
        e.preventDefault()
        const form = e.target
        const task = form.description.value
        const updatedTask = { task }
        fetch(`http://localhost:5000/updatedTask/${data._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                swal({
                    title: "Great job!",
                    text: "Your Task Updated Successfully!",
                    icon: "success",
                });
                navigate("/myTasks")
            })
    }
    return (
        <div className='mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl mb-12 h-screen mt-16 lg:mt-0'>
            <div>
                <h2 className='mt-8 font-semibold text-xl md:text-3xl pl-10'>Update Tasks</h2>
                <p className='text-gray-500 font-semibold pl-10 pt-2'>
                    {format(new Date(), "PPPP")}
                </p>
            </div>
            <div className="overflow-hidden">
                <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
                    <div className="flex flex-col items-center justify-center xl:flex-row">
                        <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                            <div className="relative">
                                <svg
                                    viewBox="0 0 52 24"
                                    fill="currentColor"
                                    className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block"
                                >
                                    <defs>
                                        <pattern
                                            id="766323e1-e594-4ffd-a688-e7275079d540"
                                            x="0"
                                            y="0"
                                            width=".135"
                                            height=".30"
                                        >
                                            <circle cx="1" cy="1" r=".7" />
                                        </pattern>
                                    </defs>
                                    <rect
                                        fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                                        width="52"
                                        height="24"
                                    />
                                </svg>
                                <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                                    <h3 className="mb-4 text-2xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                        Please Update Your Task
                                    </h3>
                                    <form onSubmit={handleUpdateTask}>
                                        <input
                                            className='w-full py-4 px-2 rounded-xl border border-gray-500 my-3'
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            readOnly />
                                        <input
                                            className='w-full pt-3 pb-10 px-2 rounded-xl border border-gray-500 my-3'
                                            type="text"
                                            name="description"
                                            placeholder='Task Description' />
                                        <input
                                            className='w-full py-4 px-2 rounded-xl bg-[#6589e7] text-white
                                            text-xl font-semibold my-3 cursor-pointer'
                                            type="submit"
                                            value="Add Task"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;