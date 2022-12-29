import React, { useContext } from 'react';
import { AuthContext } from '../../ContextProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import swal from 'sweetalert';
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxUpdate } from "react-icons/rx"
import { PhotoView } from 'react-photo-view';
import Loading from '../shared/Loading';

const CompletedTasks = () => {
    const { user } = useContext(AuthContext)
    const { data: descriptions = [], isLoading, refetch } = useQuery({
        queryKey: ['descriptions', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://task-manager-server-seven.vercel.app/completedTasks?email=${user?.email}`);
            const data = await res.json()
            return data
        }
    })

    const handleNotComplete = (_id) => {
        fetch(`https://task-manager-server-seven.vercel.app/completedTasks/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                swal({
                    title: "Great job!",
                    text: "Your task added again in my task!",
                    icon: "success",
                });
                refetch()
            })
    }

    const handleDelete = (_id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://task-manager-server-seven.vercel.app/tasks/${_id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            swal("Your task has been deleted!", {
                                icon: "success"
                            });
                            refetch()
                        })
                } else {
                    swal("Your file is safe!");
                }
            });
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {
                descriptions.length ?
                    descriptions.map(description =>
                        <div
                            key={description._id}
                            className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                            <div className="border-2 shadow-2xl bg-base-100 rounded p-4 my-12">
                                <div className="flex justify-between my-4">
                                    <h1 className="text-2xl md:text-3xl font-semibold">{description.title}</h1>
                                    <div className="flex justify-center items-center text-xl">
                                        <button
                                            onClick={() => handleNotComplete(description._id)}
                                            title="Return to MyTasks"
                                            className="btn  p-2 rounded mr-2 font-semibold hover:text-[#6589e7]">
                                            <RxUpdate />
                                        </button>
                                        <button
                                            onClick={() => { handleDelete(description._id) }}
                                            title="Delete Task"
                                            className="btn  p-2 rounded mr-2 font-semibold hover:text-[#6589e7]">
                                            <RiDeleteBin6Line />
                                        </button>

                                    </div>
                                </div>
                                {
                                    description.img &&

                                    <PhotoView src={description?.img}>
                                        <img src={description?.img} alt="" className='w-12 h-12 mb-3' />
                                    </PhotoView>

                                }
                                <p className="text-sm lg:text-lg text-gray-900 font-semibold mb-3">
                                    {description.description}
                                </p>
                                <p className="text-sm text-gray-600 font-semibold">
                                    Task Added: {description.addedTime}
                                </p>
                            </div>
                        </div >
                    )
                    :
                    <div className='flex justify-center items-center mt-16'>
                        <h2 className='text-xl md:text-3xl font-semibold'>
                            You Haven't Completed Any Tasks Yet!
                        </h2>
                    </div>
            }
        </>
    );
};

export default CompletedTasks;