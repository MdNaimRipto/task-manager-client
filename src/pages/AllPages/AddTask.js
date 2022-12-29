import { format } from 'date-fns';
import React, { useContext } from 'react';
import swal from 'sweetalert';
import banner from "../../Assets/task_banner.jpg"
import { AuthContext } from '../../ContextProvider/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext)

    const handleTaskSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const description = form.description.value
        const img = form.img.files[0]
        const formData = new FormData();
        formData.append('image', img)
        const url = 'https://api.imgbb.com/1/upload?key=cd143a9b2573c176586ba52f643962d2'

        if (description.length && img?.name?.length) {
            fetch(url, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(imageData => {
                    const imgUrl = imageData.data.display_url;
                    const task = {
                        email: user?.email,
                        title: title,
                        description: description,
                        img: imgUrl,
                        addedTime: format(new Date(), "PPPP"),
                        completed: false
                    }
                    if (imageData.success) {
                        fetch("https://task-manager-server-seven.vercel.app/tasks", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(task)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                form.reset()
                                swal({
                                    title: "Great job!",
                                    text: "Your Task Added Successfully!",
                                    icon: "success",
                                });
                            })
                    }
                })
        }
        else if (description.length && !img?.name?.length) {
            const task = {
                email: user?.email,
                title: title,
                description: description,
                addedTime: format(new Date(), "PPPP"),
                completed: false
            }
            fetch("https://task-manager-server-seven.vercel.app/tasks", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(task)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    form.reset()
                    swal({
                        title: "Great job!",
                        text: "Your Task Added Successfully!",
                        icon: "success",
                    });
                })
        }
        else if (!description.length && img?.name?.length) {
            fetch(url, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(imageData => {
                    const imgUrl = imageData.data.display_url;
                    const task = {
                        email: user?.email,
                        title: title,
                        img: imgUrl,
                        addedTime: format(new Date(), "PPPP"),
                        completed: false
                    }
                    if (imageData.success) {
                        fetch("https://task-manager-server-seven.vercel.app/tasks", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(task)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                form.reset()
                                swal({
                                    title: "Great job!",
                                    text: "Your Task Added Successfully!",
                                    icon: "success",
                                });
                            })
                    }
                })
        }
    }
    return (
        <div className='mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl mb-12 h-screen mt-16 lg:mt-0'>
            <div>
                <h2 className='mt-8 font-semibold text-xl md:text-3xl pl-10'>Add Tasks</h2>
                <p className='text-gray-500 font-semibold pl-10 pt-2'>
                    {format(new Date(), "PPPP")}
                </p>
            </div>
            <div className="overflow-hidden">
                <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
                    <div className="flex flex-col items-center justify-between xl:flex-row">
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
                                        Please Add a Task
                                    </h3>
                                    <form onSubmit={handleTaskSubmit}>
                                        <input
                                            className='w-full py-4 px-2 rounded-xl border border-gray-500 my-3'
                                            type="text"
                                            name="title"
                                            placeholder='Task Title'
                                            required />
                                        <input
                                            className='w-full pt-3 pb-10 px-2 rounded-xl border border-gray-500 my-3'
                                            type="text"
                                            name="description"
                                            placeholder='Task Description' />
                                        <input
                                            className='block w-full text-lg text-gray-900 border border-gray-400 rounded-xl cursor-pointer my-3'
                                            type="file"
                                            name="img" />
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
                        <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12 hidden lg:block">
                            <img src={banner} alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;