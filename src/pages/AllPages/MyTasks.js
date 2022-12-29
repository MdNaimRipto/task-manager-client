import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxUpdate } from "react-icons/rx"
import { VscCheckAll } from "react-icons/vsc"
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../ContextProvider/AuthProvider';
import Loading from '../shared/Loading';
import { PhotoView } from 'react-photo-view';

const MyTasks = () => {
    const { user } = useContext(AuthContext)
    const { data: descriptions = [], isLoading, refetch } = useQuery({
        queryKey: ['descriptions', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tasks?email=${user?.email}`);
            const data = await res.json()
            return data
        }
    })
    console.log(descriptions);
    if (isLoading) {
        return <Loading />
    }
    return (
        descriptions.map(description =>
            <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="border-2 shadow-2xl bg-base-100 rounded p-4 my-12">
                    <div className="flex justify-between my-4">
                        <h1 className="text-2xl md:text-3xl font-semibold">{description.title}</h1>
                        <div className="flex justify-center items-center text-xl">
                            <button
                                title="Complete Task"
                                className="btn  p-2 rounded mr-2 font-semibold hover:text-[#6589e7]">
                                <VscCheckAll />
                            </button>
                            <Link
                                title="Update Task"
                                className="btn  p-2 rounded mr-2 font-semibold hover:text-[#6589e7]">
                                <RxUpdate />
                            </Link>
                            <button
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
                    <p className="text-sm lg:text-lg text-gray-600 font-semibold">
                        {description.description}
                    </p>
                </div>
            </div >
        )
    );
};

export default MyTasks;